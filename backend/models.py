from pydantic import BaseModel, EmailStr, Field
from typing import Optional, Dict, Any
from datetime import datetime
import uuid


class Purchase(BaseModel):
    """Modelo para compras realizadas via Kiwify."""
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    kiwify_transaction_id: str
    customer_email: EmailStr
    customer_name: str
    product_id: str
    product_name: str
    amount: float
    status: str  # 'pending', 'approved', 'declined', 'refunded', 'chargeback'
    payment_method: Optional[str] = None  # 'credit_card', 'pix', 'boleto'
    purchase_date: datetime = Field(default_factory=datetime.utcnow)
    kiwify_event_type: Optional[str] = None
    webhook_payload: Optional[Dict[str, Any]] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)


class DownloadAccess(BaseModel):
    """Modelo para gerenciar acesso aos downloads."""
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    purchase_id: str
    customer_email: EmailStr
    access_token: str = Field(default_factory=lambda: str(uuid.uuid4()))
    download_url: str
    expires_at: Optional[datetime] = None
    download_count: int = 0
    max_downloads: int = 3
    created_at: datetime = Field(default_factory=datetime.utcnow)


class WebhookLog(BaseModel):
    """Modelo para logs de webhooks recebidos."""
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    event_type: str
    payload: Dict[str, Any]
    signature: Optional[str] = None
    processed: bool = False
    error: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)


class CheckoutRequest(BaseModel):
    """Request para criar checkout."""
    customer_email: EmailStr
    customer_name: str
    product_id: str


class CheckoutResponse(BaseModel):
    """Response do checkout."""
    success: bool
    checkout_url: str
    product: Dict[str, Any]
