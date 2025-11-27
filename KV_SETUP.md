# Vercel KV Setup

Para usar el sistema de ranking, necesitas configurar Vercel KV (Redis).

## Pasos para configurar:

1. Ve a [Vercel Dashboard](https://vercel.com/dashboard/stores)
2. Crea un nuevo KV Store
3. Copia las variables de entorno:
   - `KV_URL`
   - `KV_REST_API_URL`
   - `KV_REST_API_TOKEN`
   - `KV_REST_API_READ_ONLY_TOKEN`

4. Agrega estas variables en:
   - **Desarrollo local**: Crea un archivo `.env.local` con las variables
   - **Producción**: Agrega las variables en Vercel Dashboard > Settings > Environment Variables

## Para desarrollo local:

Crea `.env.local` en la raíz del proyecto:

```
KV_URL=tu_kv_url
KV_REST_API_URL=tu_rest_api_url
KV_REST_API_TOKEN=tu_token
KV_REST_API_READ_ONLY_TOKEN=tu_read_only_token
```

## Nota:

**Para desarrollo local**: El sistema funciona sin KV configurado usando almacenamiento en memoria. Los scores se guardarán durante la sesión pero se perderán al reiniciar el servidor.

**Para producción**: Es necesario configurar KV para que los scores persistan entre reinicios y sean accesibles globalmente.

