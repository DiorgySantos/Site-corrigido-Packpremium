from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    """Configurações da aplicação."""
    
    # MongoDB
    mongo_url: str
    db_name: str = "pack_cinematografico"
    
    # Kiwify
    kiwify_product_id: str = "pack_cinematografico_premium"
    kiwify_webhook_secret: Optional[str] = None
    kiwify_checkout_base_url: str = "https://pay.kiwify.com.br"
    
    # Product Info
    product_name: str = "Pack Cinematográfico Premium"
    product_price: float = 37.00
    product_original_price: float = 167.00
    
    # Storage
    pack_download_url: str = "https://storage.example.com/pack-cinematografico.zip"
    download_token_expiry_days: int = 30
    max_downloads_per_token: int = 3
    
    class Config:
        env_file = ".env"
        case_sensitive = False
        extra = "ignore"  # Ignora campos extras no .env


settings = Settings()
