from fastapi import APIRouter, HTTPException
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from datetime import datetime, timedelta

from models import CheckoutRequest, CheckoutResponse, DownloadAccess
from config import settings

router = APIRouter(prefix="/api/checkout", tags=["checkout"])
logger = logging.getLogger(__name__)

# MongoDB connection
mongo_url = os.environ.get('MONGO_URL')
client = AsyncIOMotorClient(mongo_url)
db = client[settings.db_name]


@router.post("/create", response_model=CheckoutResponse)
async def create_checkout(request: CheckoutRequest):
    """
    Cria uma sessão de checkout e retorna URL do Kiwify.
    
    Para Kiwify, a URL de checkout é construída com parâmetros
    que identificam o cliente e o produto.
    """
    try:
        # Validar produto
        if request.product_id != settings.kiwify_product_id:
            raise HTTPException(
                status_code=404,
                detail="Produto não encontrado"
            )
        
        # Construir URL de checkout do Kiwify
        # Formato: https://pay.kiwify.com.br/PRODUCT_ID?email=...&name=...
        checkout_url = f"{settings.kiwify_checkout_base_url}/{settings.kiwify_product_id}"
        checkout_url += f"?email={request.customer_email}"
        checkout_url += f"&name={request.customer_name}"
        
        logger.info(f"Checkout criado para {request.customer_email}")
        
        return CheckoutResponse(
            success=True,
            checkout_url=checkout_url,
            product={
                "id": settings.kiwify_product_id,
                "name": settings.product_name,
                "price": settings.product_price,
                "original_price": settings.product_original_price
            }
        )
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Erro ao criar checkout: {e}")
        raise HTTPException(
            status_code=500,
            detail="Erro ao processar checkout"
        )


@router.get("/download/{access_token}")
async def get_download_link(access_token: str):
    """
    Valida token e retorna link de download do pack.
    """
    try:
        # Buscar access token no banco
        download_access = await db.download_access.find_one({
            "access_token": access_token
        })
        
        if not download_access:
            raise HTTPException(
                status_code=404,
                detail="Token inválido ou não encontrado"
            )
        
        # Converter para model
        access = DownloadAccess(**download_access)
        
        # Verificar expiração
        if access.expires_at and datetime.utcnow() > access.expires_at:
            raise HTTPException(
                status_code=403,
                detail="Token expirado"
            )
        
        # Verificar limite de downloads
        if access.download_count >= access.max_downloads:
            raise HTTPException(
                status_code=403,
                detail="Limite de downloads atingido"
            )
        
        # Incrementar contador de downloads
        await db.download_access.update_one(
            {"access_token": access_token},
            {"$inc": {"download_count": 1}}
        )
        
        return {
            "success": True,
            "download_url": access.download_url,
            "expires_at": access.expires_at,
            "downloads_remaining": access.max_downloads - access.download_count - 1
        }
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Erro ao processar download: {e}")
        raise HTTPException(
            status_code=500,
            detail="Erro ao processar solicitação"
        )
