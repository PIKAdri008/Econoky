# Guía de Configuración Paso a Paso

Esta guía te ayudará a configurar Econoky desde cero.

## Paso 1: Instalar Dependencias

```bash
npm install
```

## Paso 2: Configurar Supabase

### 2.1 Crear Proyecto en Supabase

1. Ve a [https://supabase.com](https://supabase.com) y crea una cuenta (si no tienes una)
2. Crea un nuevo proyecto
3. Anota tu **URL del proyecto** y tu **anon key** (las encontrarás en Settings > API)

### 2.2 Configurar la Base de Datos

1. En tu proyecto de Supabase, ve a **SQL Editor**
2. Copia todo el contenido del archivo `supabase/schema.sql`
3. Pega el contenido en el editor SQL y ejecuta el script
4. Esto creará:
   - Las tablas: `profiles`, `posts`, `transactions`
   - Las políticas de seguridad (RLS)
   - Los triggers y funciones necesarias

### 2.3 Obtener las Claves

En Supabase, ve a **Settings > API** y copia:
- **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
- **anon public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **service_role key** → `SUPABASE_SERVICE_ROLE_KEY` (¡Mantén esto secreto!)

## Paso 3: Configurar Stripe

### 3.1 Crear Cuenta en Stripe

1. Ve a [https://stripe.com](https://stripe.com) y crea una cuenta
2. Asegúrate de estar en **modo test** (verás "Test mode" en la parte superior)

### 3.2 Crear Producto y Precio

1. Ve a **Products** en el panel de Stripe
2. Haz clic en **"Add product"**
3. Configura:
   - **Name**: "Econoky Pro"
   - **Description**: "Suscripción mensual a Econoky Pro"
   - **Pricing model**: Recurring
   - **Price**: €4.99
   - **Billing period**: Monthly
4. Guarda y copia el **Price ID** (empieza con `price_`)

### 3.3 Obtener las Claves de API

1. Ve a **Developers > API keys** en Stripe
2. Copia:
   - **Publishable key** (empieza con `pk_test_`) → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - **Secret key** (empieza con `sk_test_`) → `STRIPE_SECRET_KEY`

### 3.4 Configurar Webhook (Para Producción)

Cuando despliegues en Vercel:

1. Ve a **Developers > Webhooks** en Stripe
2. Haz clic en **"Add endpoint"**
3. URL: `https://tu-dominio.vercel.app/api/stripe/webhook`
4. Selecciona estos eventos:
   - `customer.subscription.deleted`
   - `customer.subscription.updated`
   - `invoice.payment_succeeded`
5. Copia el **Signing secret** → `STRIPE_WEBHOOK_SECRET`

**Nota**: Para desarrollo local, puedes usar Stripe CLI (opcional)

## Paso 4: Crear Archivo .env.local

Crea un archivo `.env.local` en la raíz del proyecto con este contenido:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key_aqui
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key_aqui

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_tu_clave_aqui
STRIPE_SECRET_KEY=sk_test_tu_clave_aqui
NEXT_PUBLIC_STRIPE_PRICE_ID=price_tu_price_id_aqui
STRIPE_WEBHOOK_SECRET=whsec_tu_webhook_secret_aqui

# Next.js
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Reemplaza todos los valores con tus claves reales.

## Paso 5: Ejecutar el Proyecto

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Paso 6: Probar la Aplicación

1. **Registro**: Ve a `/auth/register` y crea una cuenta
2. **Login**: Inicia sesión en `/auth/login`
3. **Dashboard**: Verás tu dashboard en `/dashboard`
4. **Comunidad**: Crea publicaciones en `/community`
5. **Planes**: Prueba el checkout en `/plans` (usa tarjetas de prueba de Stripe)

### Tarjetas de Prueba de Stripe

- **Éxito**: `4242 4242 4242 4242`
- **Rechazada**: `4000 0000 0000 0002`
- **Cualquier fecha futura y CVC**

## Paso 7: Desplegar en Vercel

1. Sube tu código a GitHub
2. Ve a [https://vercel.com](https://vercel.com) y conecta tu repositorio
3. En la configuración, añade todas las variables de entorno
4. Configura el webhook de Stripe con la URL de producción
5. ¡Despliega!

## Solución de Problemas

### Error: "Missing Supabase URL"
- Verifica que `.env.local` existe y tiene todas las variables
- Reinicia el servidor de desarrollo

### Error: "Table doesn't exist"
- Asegúrate de haber ejecutado el script SQL en Supabase
- Verifica que las tablas se crearon correctamente

### Error: "Stripe checkout failed"
- Verifica que el Price ID es correcto
- Asegúrate de estar usando claves de test
- Revisa la consola del navegador para más detalles

### Error: "Unauthorized" en las páginas
- Verifica que estás autenticado
- Revisa las políticas RLS en Supabase

## Recursos Adicionales

- [Documentación de Next.js](https://nextjs.org/docs)
- [Documentación de Supabase](https://supabase.com/docs)
- [Documentación de Stripe](https://stripe.com/docs)
- [Documentación de Tailwind CSS](https://tailwindcss.com/docs)

