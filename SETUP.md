# Guía de Configuración Paso a Paso

Esta guía te ayudará a configurar Econoky desde cero usando MongoDB como base de datos NoSQL.

## Arquitectura del Proyecto

- **Supabase**: Solo para autenticación (login, registro)
- **MongoDB**: Base de datos NoSQL para todos los datos (perfiles, publicaciones, transacciones)
- **Stripe**: Para pagos y suscripciones

**Nota**: MongoDB es NoSQL y no relacional, perfecto para redes sociales donde los datos pueden ser más flexibles y escalables.

## Paso 1: Instalar Dependencias

```bash
npm install
```

## Paso 2: Configurar MongoDB

### 2.1 Instalar MongoDB

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install -y mongodb
sudo systemctl start mongodb
sudo systemctl enable mongodb
```

**macOS:**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Windows:**
Descarga MongoDB desde [mongodb.com](https://www.mongodb.com/try/download/community)

**Alternativa - MongoDB Atlas (Recomendado para producción):**
1. Ve a [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Crea una cuenta gratuita
3. Crea un cluster gratuito
4. Obtén la cadena de conexión (connection string)

### 2.2 Verificar que MongoDB está corriendo

**Linux:**
```bash
sudo systemctl status mongodb
```

**macOS:**
```bash
brew services list
```

**Windows:**
Verifica en el Administrador de servicios

### 2.3 Crear Base de Datos

MongoDB crea la base de datos automáticamente cuando insertas el primer documento. No necesitas crear nada manualmente.

La base de datos se llamará `econoky` (o el nombre que especifiques en la URI de conexión).

## Paso 3: Configurar Supabase (Solo Autenticación)

### 3.1 Crear Proyecto en Supabase

1. Ve a [https://supabase.com](https://supabase.com) y crea una cuenta (si no tienes una)
2. Crea un nuevo proyecto
3. **Importante**: Solo necesitas la autenticación, NO necesitas crear tablas en Supabase

### 3.2 Obtener las Claves

En Supabase, ve a **Settings > API** y copia:
- **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
- **anon public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

**Nota**: No necesitas la `SUPABASE_SERVICE_ROLE_KEY` ya que no usamos Supabase para datos.

## Paso 4: Configurar Stripe

### 4.1 Crear Cuenta en Stripe

1. Ve a [https://stripe.com](https://stripe.com) y crea una cuenta
2. Asegúrate de estar en **modo test** (verás "Test mode" en la parte superior)

### 4.2 Crear Producto y Precio

1. Ve a **Products** en el panel de Stripe
2. Haz clic en **"Add product"**
3. Configura:
   - **Name**: "Econoky Pro"
   - **Description**: "Suscripción mensual a Econoky Pro"
   - **Pricing model**: Recurring
   - **Price**: €4.99
   - **Billing period**: Monthly
4. Guarda y copia el **Price ID** (empieza con `price_`)

### 4.3 Obtener las Claves de API

1. Ve a **Developers > API keys** en Stripe
2. Copia:
   - **Publishable key** (empieza con `pk_test_`) → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - **Secret key** (empieza con `sk_test_`) → `STRIPE_SECRET_KEY`

### 4.4 Configurar Webhook (Para Producción)

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

## Paso 5: Crear Archivo .env.local

Crea un archivo `.env.local` en la raíz del proyecto con este contenido:

```env
# Supabase (solo para autenticación)
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key_aqui

# MongoDB
# Para MongoDB local:
MONGODB_URI=mongodb://localhost:27017/econoky

# Para MongoDB Atlas (recomendado para producción):
# MONGODB_URI=mongodb+srv://usuario:contraseña@cluster.mongodb.net/econoky?retryWrites=true&w=majority

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_tu_clave_aqui
STRIPE_SECRET_KEY=sk_test_tu_clave_aqui
NEXT_PUBLIC_STRIPE_PRICE_ID=price_tu_price_id_aqui
STRIPE_WEBHOOK_SECRET=whsec_tu_webhook_secret_aqui

# Next.js
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Importante**: 
- Si usas MongoDB Atlas, reemplaza la URI con tu connection string
- Reemplaza todos los valores con tus claves reales
- Nunca subas este archivo a Git (ya está en `.gitignore`)

## Paso 6: Ejecutar el Proyecto

**Antes de ejecutar**, asegúrate de que MongoDB está corriendo:

**Linux:**
```bash
sudo systemctl status mongodb
# Si no está corriendo:
sudo systemctl start mongodb
```

**macOS:**
```bash
brew services list
# Si no está corriendo:
brew services start mongodb-community
```

**Windows:**
Verifica que el servicio MongoDB está corriendo en el Administrador de servicios.

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Paso 7: Probar la Aplicación

1. **Registro**: Ve a `/auth/register` y crea una cuenta
   - Esto creará el usuario en Supabase (autenticación)
   - Y automáticamente creará el perfil en MongoDB
2. **Login**: Inicia sesión en `/auth/login`
3. **Dashboard**: Verás tu dashboard en `/dashboard` con datos desde MongoDB
4. **Comunidad**: Crea publicaciones en `/community` (se guardan en MongoDB)
5. **Planes**: Prueba el checkout en `/plans` (usa tarjetas de prueba de Stripe)

### Tarjetas de Prueba de Stripe

- **Éxito**: `4242 4242 4242 4242`
- **Rechazada**: `4000 0000 0000 0002`
- **Cualquier fecha futura y CVC**

## Paso 8: Desplegar en Vercel

### 8.1 Preparar Base de Datos en Producción

Para producción, usa **MongoDB Atlas** (recomendado):

1. Ve a [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Crea un cluster (el plan gratuito es suficiente para empezar)
3. Configura el acceso:
   - Añade tu IP a la whitelist (o usa 0.0.0.0/0 para permitir todas)
   - Crea un usuario de base de datos
4. Obtén la connection string
5. Reemplaza `<password>` y `<dbname>` en la URI

### 8.2 Desplegar en Vercel

1. Sube tu código a GitHub
2. Ve a [https://vercel.com](https://vercel.com) y conecta tu repositorio
3. En la configuración, añade todas las variables de entorno:
   - Variables de Supabase (autenticación)
   - `MONGODB_URI` con tu connection string de MongoDB Atlas
   - Variables de Stripe
   - `NEXT_PUBLIC_APP_URL` con tu dominio de Vercel
4. Configura el webhook de Stripe con la URL de producción: `https://tu-dominio.vercel.app/api/stripe/webhook`
5. ¡Despliega!

## Solución de Problemas

### Error: "Missing Supabase URL"
- Verifica que `.env.local` existe y tiene todas las variables
- Reinicia el servidor de desarrollo

### Error: "MongoNetworkError" o "Connection refused"
- Verifica que MongoDB está corriendo:
  ```bash
  sudo systemctl status mongodb  # Linux
  brew services list             # macOS
  ```
- Verifica la URI de conexión en `.env.local`
- Si usas MongoDB Atlas, verifica que tu IP está en la whitelist

### Error: "MongoServerError: Authentication failed"
- Verifica las credenciales en la URI de MongoDB
- Si usas MongoDB Atlas, asegúrate de que el usuario y contraseña son correctos

### Error: "Collection doesn't exist"
- MongoDB crea las colecciones automáticamente cuando insertas el primer documento
- Esto es normal, no necesitas crear nada manualmente

### Error: "Stripe checkout failed"
- Verifica que el Price ID es correcto
- Asegúrate de estar usando claves de test
- Revisa la consola del navegador para más detalles

### Error: "Unauthorized" en las páginas
- Verifica que estás autenticado (Supabase maneja la autenticación)
- Asegúrate de haber iniciado sesión correctamente

### Error al crear perfil después del registro
- Verifica que MongoDB está accesible
- Revisa los logs del servidor para ver el error específico
- Verifica la URI de conexión

## Estructura de la Base de Datos MongoDB (NoSQL)

### Colección: profiles
Documentos que almacenan información de usuarios. No hay relaciones, solo referencias por ID.

```javascript
{
  _id: ObjectId,
  id: "uuid-de-supabase", // Clave única
  email: "usuario@example.com",
  full_name: "Nombre Usuario",
  avatar_url: "https://...",
  bio: "Biografía del usuario",
  balance: 0.00,
  subscription_status: "free" | "pro",
  stripe_customer_id: "...",
  stripe_subscription_id: "...",
  stats: {
    posts_count: 0,
    followers_count: 0,
    following_count: 0
  },
  created_at: ISODate,
  updated_at: ISODate
}
```

### Colección: posts
Documentos que almacenan publicaciones. Usa `user_id` como referencia (no foreign key).

```javascript
{
  _id: ObjectId,
  user_id: "uuid-de-supabase", // Referencia (no relacional)
  title: "Título del post",
  content: "Contenido del post",
  likes: 0, // Contador embebido (no relacional)
  created_at: ISODate,
  updated_at: ISODate
}
```

### Colección: transactions
Documentos que almacenan transacciones financieras.

```javascript
{
  _id: ObjectId,
  user_id: "uuid-de-supabase", // Referencia (no relacional)
  amount: 10.50,
  type: "income" | "expense" | "subscription" | "refund",
  description: "Descripción opcional",
  created_at: ISODate
}
```

## Características del Diseño NoSQL

- **No Relacional**: No hay foreign keys ni relaciones estrictas
- **Referencias por ID**: Se usan IDs de Supabase como referencias simples
- **Agregaciones**: Se usan agregaciones de MongoDB para unir datos cuando es necesario
- **Embedding**: Los datos relacionados se pueden embebir (como `stats` en `profiles`)
- **Escalabilidad**: Diseñado para escalar horizontalmente
- **Flexibilidad**: Esquema flexible que se adapta a las necesidades de una red social

## Recursos Adicionales

- [Documentación de Next.js](https://nextjs.org/docs)
- [Documentación de MongoDB](https://docs.mongodb.com/)
- [Documentación de Mongoose](https://mongoosejs.com/docs/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Documentación de Supabase Auth](https://supabase.com/docs/guides/auth)
- [Documentación de Stripe](https://stripe.com/docs)
- [Documentación de Tailwind CSS](https://tailwindcss.com/docs)

## Notas Importantes

- **Seguridad**: Nunca expongas tus credenciales de MongoDB en el código o en repositorios públicos
- **Backups**: Configura backups regulares de tu base de datos MongoDB (MongoDB Atlas lo hace automáticamente)
- **Conexiones**: La conexión se cachea para evitar múltiples conexiones en desarrollo
- **NoSQL**: Recuerda que MongoDB es NoSQL - no hay relaciones estrictas, solo referencias
- **Autenticación vs Datos**: Supabase solo maneja la autenticación, todos los datos están en MongoDB
- **Escalabilidad**: MongoDB es ideal para redes sociales porque escala horizontalmente fácilmente
