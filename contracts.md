# Contratos de API - Pack Cinematográfico Premium

## 1. Dados Mockados (Frontend Atual)

Atualmente no arquivo `/app/frontend/src/mock.js`:

### 1.1 Product Data
- `productData`: Informações do produto (nome, preço, features, FAQs, etc.)
- `testimonials`: Depoimentos de clientes
- `showcaseScenes`: URLs dos 9 vídeos de showcase
- `resultVideo`: Vídeo de resultado da edição

**Status**: Dados estáticos no frontend. Não requerem backend inicialmente, mas podem ser migrados para MongoDB se precisar de gestão dinâmica.

---

## 2. Estrutura do Banco de Dados (MongoDB)

### 2.1 Collection: `purchases`
Armazena transações de compra via Kiwify.

```javascript
{
  _id: ObjectId,
  kiwify_transaction_id: String (unique),
  customer_email: String,
  customer_name: String,
  product_id: String,
  product_name: String,
  amount: Number,
  status: String, // 'pending', 'approved', 'declined', 'refunded', 'chargeback'
  payment_method: String, // 'credit_card', 'pix', 'boleto'
  purchase_date: Date,
  kiwify_event_type: String, // 'compra_aprovada', 'compra_recusada', etc.
  webhook_payload: Object, // Payload completo do webhook
  created_at: Date,
  updated_at: Date
}
```

### 2.2 Collection: `download_access` (Opcional)
Gerencia acesso aos downloads do pack.

```javascript
{
  _id: ObjectId,
  purchase_id: ObjectId, // Referência à purchase
  customer_email: String,
  access_token: String, // Token único para download
  download_url: String, // URL do pack
  expires_at: Date,
  download_count: Number,
  max_downloads: Number, // Ex: 3 downloads permitidos
  created_at: Date
}
```

### 2.3 Collection: `webhook_logs`
Log de todos os webhooks recebidos (para debugging).

```javascript
{
  _id: ObjectId,
  event_type: String,
  payload: Object,
  signature: String,
  processed: Boolean,
  error: String,
  created_at: Date
}
```

---

## 3. APIs Backend Necessárias

### 3.1 GET `/api/product`
Retorna informações do produto (opcional - pode continuar no frontend).

**Response**:
```json
{
  "success": true,
  "product": {
    "id": "pack_cinematografico_premium",
    "name": "Pack Cinematográfico Premium",
    "price": 37.00,
    "original_price": 167.00,
    "description": "...",
    "features": [...],
    "faqs": [...]
  }
}
```

---

### 3.2 POST `/api/checkout/create`
Cria uma sessão de checkout e retorna URL do Kiwify.

**Request**:
```json
{
  "customer_email": "cliente@example.com",
  "customer_name": "João Silva",
  "product_id": "pack_cinematografico_premium"
}
```

**Response**:
```json
{
  "success": true,
  "checkout_url": "https://pay.kiwify.com.br/XXXXXXX",
  "product": {
    "name": "Pack Cinematográfico Premium",
    "price": 37.00
  }
}
```

**Implementação**:
- Validar dados do cliente
- Buscar product_id do Kiwify (via API ou configuração)
- Construir URL de checkout do Kiwify com parâmetros
- Retornar URL para redirecionamento

---

### 3.3 POST `/api/webhooks/kiwify`
Recebe webhooks do Kiwify para processar eventos de pagamento.

**Headers Recebidos**:
- `x-kiwify-signature`: Assinatura HMAC-SHA256 para validação

**Request Body (Exemplo - Compra Aprovada)**:
```json
{
  "event": "compra_aprovada",
  "data": {
    "id": "txn_123456",
    "product_id": "prod_pack_cinema",
    "customer_email": "cliente@example.com",
    "customer_name": "João Silva",
    "amount": 37.00,
    "payment_method": "credit_card",
    "status": "approved",
    "purchase_date": "2025-12-01T10:30:00Z"
  }
}
```

**Response**:
```json
{
  "status": "success",
  "message": "Webhook processed"
}
```

**Eventos do Kiwify**:
- `compra_aprovada`: Compra aprovada - liberar acesso
- `compra_recusada`: Compra recusada - notificar cliente
- `compra_reembolsada`: Reembolso - revogar acesso
- `chargeback`: Chargeback - revogar acesso e flaggar
- `pix_gerado`: Código Pix gerado - aguardar pagamento
- `boleto_gerado`: Boleto gerado - aguardar pagamento

**Implementação**:
1. Validar assinatura do webhook
2. Salvar payload em `webhook_logs`
3. Processar evento baseado no `event_type`
4. Salvar/atualizar `purchases`
5. Se `compra_aprovada`: gerar acesso ao download
6. Enviar email de confirmação (opcional)
7. Retornar 200 OK imediatamente

---

### 3.4 GET `/api/download/:access_token`
Valida token e retorna link de download do pack.

**Response (Success)**:
```json
{
  "success": true,
  "download_url": "https://storage.example.com/pack-cinematografico.zip",
  "expires_at": "2025-12-31T23:59:59Z",
  "downloads_remaining": 2
}
```

**Response (Expired/Invalid)**:
```json
{
  "success": false,
  "error": "Token inválido ou expirado"
}
```

**Implementação**:
- Validar `access_token`
- Verificar se não expirou
- Verificar limite de downloads
- Incrementar contador de downloads
- Retornar URL assinada temporária do storage

---

### 3.5 POST `/api/admin/purchases` (Opcional - Admin)
Lista todas as compras (dashboard admin).

**Request**:
```json
{
  "status": "approved",
  "page": 1,
  "limit": 50
}
```

**Response**:
```json
{
  "success": true,
  "purchases": [...],
  "pagination": {
    "total": 150,
    "page": 1,
    "pages": 3
  }
}
```

---

## 4. Integração Kiwify

### 4.1 Configuração no Kiwify
1. Criar produto no dashboard Kiwify
2. Configurar webhook URL: `https://seu-dominio.com/api/webhooks/kiwify`
3. Copiar `product_id` do produto
4. Gerar webhook secret para validação de assinatura

### 4.2 Variáveis de Ambiente (.env)
```env
# Kiwify
KIWIFY_PRODUCT_ID=prod_xxxxxxxxxxx
KIWIFY_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx
KIWIFY_CHECKOUT_BASE_URL=https://pay.kiwify.com.br

# Storage (para hospedar o pack)
STORAGE_URL=https://seu-storage.com
PACK_DOWNLOAD_URL=https://seu-storage.com/pack-cinematografico.zip
```

### 4.3 Fluxo de Compra

1. **Cliente clica "QUERO O PACK AGORA"**
   - Frontend chama `POST /api/checkout/create`
   - Backend retorna `checkout_url` do Kiwify
   - Frontend redireciona para Kiwify

2. **Cliente completa pagamento no Kiwify**
   - Kiwify processa pagamento
   - Kiwify envia webhook para `/api/webhooks/kiwify`

3. **Backend processa webhook**
   - Valida assinatura
   - Salva purchase no MongoDB
   - Gera `access_token` para download
   - Envia email com link de acesso

4. **Cliente acessa email e faz download**
   - Cliente clica no link com `access_token`
   - Backend valida token
   - Retorna URL de download
   - Cliente baixa o pack

---

## 5. Remoção dos Mocks e Integração

### 5.1 Atualizar Botões de CTA

**Arquivo**: `/app/frontend/src/pages/Home.jsx`

**Antes** (Mock):
```javascript
<Button 
  onClick={() => alert('Integração com Kiwify será implementada!')}
  ...
>
  QUERO O PACK AGORA
</Button>
```

**Depois** (Integrado):
```javascript
const handleCheckout = async () => {
  try {
    setLoading(true);
    const response = await axios.post(`${API}/checkout/create`, {
      customer_email: 'temp@example.com', // Ou coletar via form
      customer_name: 'Cliente',
      product_id: 'pack_cinematografico_premium'
    });
    
    if (response.data.success) {
      // Redirecionar para Kiwify
      window.location.href = response.data.checkout_url;
    }
  } catch (error) {
    console.error('Erro ao criar checkout:', error);
    alert('Erro ao processar. Tente novamente.');
  } finally {
    setLoading(false);
  }
};

<Button 
  onClick={handleCheckout}
  disabled={loading}
  ...
>
  {loading ? 'Processando...' : 'QUERO O PACK AGORA'}
</Button>
```

### 5.2 Criar Componentes Adicionais (Opcional)

- **Email Capture Modal**: Coletar email antes de redirecionar
- **Thank You Page**: Página de confirmação pós-compra
- **Download Page**: Página protegida com token para download

---

## 6. Segurança

### 6.1 Validação de Webhook
- Sempre validar `x-kiwify-signature` usando HMAC-SHA256
- Rejeitar webhooks com assinatura inválida (401)
- Logar todas tentativas para análise

### 6.2 Access Tokens
- Usar UUID v4 para tokens de download
- Tokens com expiração (ex: 30 dias)
- Limitar número de downloads por token

### 6.3 Rate Limiting
- Limitar requests no endpoint de webhook
- Proteger endpoints públicos contra DDoS

---

## 7. Email Notifications (Opcional)

### 7.1 Email de Compra Aprovada
**Trigger**: Webhook `compra_aprovada`

**Conteúdo**:
- Obrigado pela compra
- Link de download com access_token
- Instruções de uso
- Suporte

### 7.2 Email de Recusa
**Trigger**: Webhook `compra_recusada`

**Conteúdo**:
- Notificar sobre falha no pagamento
- Sugerir tentar novamente
- Link para novo checkout

---

## 8. Checklist de Implementação Backend

- [ ] Criar modelos MongoDB (purchases, download_access, webhook_logs)
- [ ] Implementar `POST /api/checkout/create`
- [ ] Implementar `POST /api/webhooks/kiwify` com validação de assinatura
- [ ] Implementar processamento de eventos (compra_aprovada, recusada, etc.)
- [ ] Implementar `GET /api/download/:access_token`
- [ ] Configurar produto no Kiwify
- [ ] Configurar webhook URL no Kiwify
- [ ] Testar fluxo completo de compra
- [ ] Adicionar variáveis de ambiente
- [ ] Atualizar frontend para chamar APIs reais
- [ ] Remover alerts/mocks do frontend
- [ ] Implementar emails de notificação (opcional)
- [ ] Hospedar pack em storage (S3, Google Cloud, etc.)
- [ ] Testar webhooks com eventos reais do Kiwify

---

## 9. Testes

### 9.1 Testar Webhook Localmente
Use ngrok ou similar para expor localhost e receber webhooks do Kiwify durante desenvolvimento.

```bash
ngrok http 8001
# Configurar URL no Kiwify: https://xxxxx.ngrok.io/api/webhooks/kiwify
```

### 9.2 Simular Webhooks
Criar script para enviar webhooks fake ao endpoint:

```bash
curl -X POST http://localhost:8001/api/webhooks/kiwify \
  -H "Content-Type: application/json" \
  -H "x-kiwify-signature: GENERATED_SIGNATURE" \
  -d '{"event":"compra_aprovada","data":{...}}'
```

---

## 10. Próximos Passos

1. **Implementar Backend**: Criar todas as rotas acima
2. **Configurar Kiwify**: Produto + Webhook
3. **Integrar Frontend**: Substituir mocks por chamadas reais
4. **Testar End-to-End**: Simular compra completa
5. **Deploy**: Publicar e validar em produção

---

**Observações**:
- O playbook de integração Kiwify já foi fornecido anteriormente com detalhes de OAuth, autenticação e exemplos de código
- Priorizar simplicidade: começar com fluxo básico (checkout + webhook + download)
- Adicionar features avançadas depois (admin dashboard, analytics, etc.)
