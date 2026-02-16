from fastapi import APIRouter, Request, HTTPException, status
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import hmac
import hashlib
import json
from datetime import datetime, timedelta

from models import Purchase, WebhookLog, DownloadAccess
from config import settings

router = APIRouter(prefix="/api/webhooks", tags=["webhooks"])
logger = logging.getLogger(__name__)

# MongoDB connection
mongo_url = os.environ.get('MONGO_URL')
client = AsyncIOMotorClient(mongo_url)
db = client[settings.db_name]


def verify_webhook_signature(payload: bytes, signature: str) -> bool:
    """
    Verifica assinatura HMAC-SHA256 do webhook Kiwify.
    """
    if not signature or not settings.kiwify_webhook_secret:
        logger.warning("Assinatura ou webhook secret ausente")
        return False
    
    try:
        expected_signature = hmac.new(
            settings.kiwify_webhook_secret.encode(),
            payload,
            hashlib.sha256
        ).hexdigest()
        
        return hmac.compare_digest(signature, expected_signature)
    except Exception as e:
        logger.error(f"Erro ao verificar assinatura: {e}")
        return False


async def handle_purchase_approved(payload: dict):
    """
    Processa compra aprovada.
    Cria registro de compra e gera acesso ao download.
    """
    try:
        data = payload.get('data', {})
        
        # Criar registro de compra
        purchase = Purchase(
            kiwify_transaction_id=data.get('id', 'unknown'),
            customer_email=data.get('customer_email', ''),
            customer_name=data.get('customer_name', ''),
            product_id=settings.kiwify_product_id,
            product_name=settings.product_name,
            amount=data.get('amount', settings.product_price),
            status='approved',
            payment_method=data.get('payment_method'),
            kiwify_event_type='compra_aprovada',
            webhook_payload=payload
        )
        
        # Salvar compra
        await db.purchases.insert_one(purchase.dict())
        
        logger.info(f"Compra aprovada: {purchase.kiwify_transaction_id} - {purchase.customer_email}")
        
        # Gerar acesso ao download
        download_access = DownloadAccess(
            purchase_id=purchase.id,
            customer_email=purchase.customer_email,
            download_url=settings.pack_download_url,
            expires_at=datetime.utcnow() + timedelta(days=settings.download_token_expiry_days),
            max_downloads=settings.max_downloads_per_token
        )
        
        await db.download_access.insert_one(download_access.dict())
        
        logger.info(f"Acesso ao download criado: {download_access.access_token}")
        
        # TODO: Enviar email com link de download
        # send_purchase_confirmation_email(purchase, download_access)
        
        return True
    
    except Exception as e:
        logger.error(f"Erro ao processar compra aprovada: {e}")
        raise


async def handle_purchase_declined(payload: dict):
    """
    Processa compra recusada.
    """
    try:
        data = payload.get('data', {})
        
        purchase = Purchase(
            kiwify_transaction_id=data.get('id', 'unknown'),
            customer_email=data.get('customer_email', ''),
            customer_name=data.get('customer_name', ''),
            product_id=settings.kiwify_product_id,
            product_name=settings.product_name,
            amount=data.get('amount', settings.product_price),
            status='declined',
            payment_method=data.get('payment_method'),
            kiwify_event_type='compra_recusada',
            webhook_payload=payload
        )
        
        await db.purchases.insert_one(purchase.dict())
        
        logger.info(f"Compra recusada: {purchase.customer_email}")
        
        # TODO: Enviar email notificando sobre recusa
        
        return True
    
    except Exception as e:
        logger.error(f"Erro ao processar compra recusada: {e}")
        raise


async def handle_purchase_refunded(payload: dict):
    """
    Processa reembolso.
    Revoga acesso ao download.
    """
    try:
        data = payload.get('data', {})
        transaction_id = data.get('id')
        
        # Atualizar status da compra
        await db.purchases.update_one(
            {"kiwify_transaction_id": transaction_id},
            {"$set": {"status": "refunded", "updated_at": datetime.utcnow()}}
        )
        
        # Revogar acesso ao download
        purchase = await db.purchases.find_one({"kiwify_transaction_id": transaction_id})
        if purchase:
            await db.download_access.delete_many({"purchase_id": purchase['id']})
        
        logger.info(f"Reembolso processado: {transaction_id}")
        
        return True
    
    except Exception as e:
        logger.error(f"Erro ao processar reembolso: {e}")
        raise


async def handle_chargeback(payload: dict):
    """
    Processa chargeback.
    Revoga acesso e flagga cliente.
    """
    try:
        data = payload.get('data', {})
        transaction_id = data.get('id')
        
        # Atualizar status da compra
        await db.purchases.update_one(
            {"kiwify_transaction_id": transaction_id},
            {"$set": {"status": "chargeback", "updated_at": datetime.utcnow()}}
        )
        
        # Revogar acesso ao download
        purchase = await db.purchases.find_one({"kiwify_transaction_id": transaction_id})
        if purchase:
            await db.download_access.delete_many({"purchase_id": purchase['id']})
        
        logger.warning(f"Chargeback processado: {transaction_id}")
        
        return True
    
    except Exception as e:
        logger.error(f"Erro ao processar chargeback: {e}")
        raise


@router.post("/kiwify")
async def handle_kiwify_webhook(request: Request):
    """
    Recebe e processa webhooks do Kiwify.
    """
    try:
        # Obter payload e assinatura
        body = await request.body()
        signature = request.headers.get("x-kiwify-signature", "")
        
        # Validar assinatura (skip se webhook_secret não configurado)
        if settings.kiwify_webhook_secret:
            if not verify_webhook_signature(body, signature):
                logger.warning("Webhook com assinatura inválida recebido")
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Assinatura inválida"
                )
        
        # Parsear payload
        payload = json.loads(body)
        event_type = payload.get('event')
        
        # Logar webhook
        webhook_log = WebhookLog(
            event_type=event_type,
            payload=payload,
            signature=signature
        )
        await db.webhook_logs.insert_one(webhook_log.dict())
        
        logger.info(f"Webhook recebido: {event_type}")
        
        # Processar evento
        try:
            if event_type == 'compra_aprovada':
                await handle_purchase_approved(payload)
            elif event_type == 'compra_recusada':
                await handle_purchase_declined(payload)
            elif event_type == 'compra_reembolsada':
                await handle_purchase_refunded(payload)
            elif event_type == 'chargeback':
                await handle_chargeback(payload)
            elif event_type in ['pix_gerado', 'boleto_gerado']:
                logger.info(f"Evento {event_type} registrado")
            else:
                logger.warning(f"Tipo de evento desconhecido: {event_type}")
            
            # Marcar webhook como processado
            await db.webhook_logs.update_one(
                {"id": webhook_log.id},
                {"$set": {"processed": True}}
            )
        
        except Exception as e:
            # Logar erro mas retornar 200 para evitar retries do Kiwify
            error_msg = str(e)
            await db.webhook_logs.update_one(
                {"id": webhook_log.id},
                {"$set": {"processed": False, "error": error_msg}}
            )
            logger.error(f"Erro ao processar webhook: {error_msg}")
        
        return {
            "status": "success",
            "event": event_type,
            "message": "Webhook processado"
        }
    
    except json.JSONDecodeError:
        logger.error("Payload JSON inválido")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Payload JSON inválido"
        )
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Erro ao processar webhook: {e}")
        # Retornar 200 mesmo com erro para evitar retries do Kiwify
        return {"status": "error", "message": str(e)}
