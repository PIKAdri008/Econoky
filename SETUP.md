# Guía de Configuración Paso a Paso

Esta guía te ayudará a configurar Econoky desde cero usando MySQL para la base de datos.

## Arquitectura del Proyecto

- **Supabase**: Solo para autenticación (login, registro)
- **MySQL**: Para todos los datos de la aplicación (perfiles, publicaciones, transacciones)
- **Stripe**: Para pagos y suscripciones

## Paso 1: Instalar Dependencias

```bash
npm install
```

## Paso 2: Configurar MySQL

### 2.1 Instalar MySQL

Si no tienes MySQL instalado:

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install mysql-server
sudo mysql_secure_installation
```

**macOS:**
```bash
brew install mysql
brew services start mysql
```

**Windows:**
Descarga MySQL desde [mysql.com](https://dev.mysql.com/downloads/mysql/)

### 2.2 Crear Base de Datos

1. Accede a MySQL:
```bash
mysql -u root -p
```

2. Ejecuta el script SQL:
```bash
mysql -u root -p < mysql/schema.sql
```

O copia y pega el contenido de `mysql/schema.sql` en tu cliente MySQL (phpMyAdmin, MySQL Workbench, etc.)

Esto creará:
- La base de datos `econoky`
- Las tablas: `profiles`, `posts`, `transactions`
- Los índices necesarios para mejorar el rendimiento

### 2.3 Crear Usuario (Opcional pero Recomendado)

Para mayor seguridad, crea un usuario específico para la aplicación:

```sql
CREATE USER 'econoky_user'@'localhost' IDENTIFIED BY 'tu_contraseña_segura';
GRANT ALL PRIVILEGES ON econoky.* TO 'econoky_user'@'localhost';
FLUSH PRIVILEGES;
```

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

# MySQL
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=tu_contraseña_mysql
MYSQL_DATABASE=econoky

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_tu_clave_aqui
STRIPE_SECRET_KEY=sk_test_tu_clave_aqui
NEXT_PUBLIC_STRIPE_PRICE_ID=price_tu_price_id_aqui
STRIPE_WEBHOOK_SECRET=whsec_tu_webhook_secret_aqui

# Next.js
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Importante**: 
- Si creaste un usuario específico para MySQL, usa ese usuario y contraseña en lugar de `root`
- Reemplaza todos los valores con tus claves reales
- Nunca subas este archivo a Git (ya está en `.gitignore`)

## Paso 6: Ejecutar el Proyecto

**Antes de ejecutar**, asegúrate de que MySQL está corriendo:

**Linux:**
```bash
sudo systemctl status mysql
# Si no está corriendo:
sudo systemctl start mysql
```

**macOS:**
```bash
brew services list
# Si no está corriendo:
brew services start mysql
```

**Windows:**
Verifica que el servicio MySQL está corriendo en el Administrador de tareas o servicios.

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Paso 7: Probar la Aplicación

1. **Registro**: Ve a `/auth/register` y crea una cuenta
   - Esto creará el usuario en Supabase (autenticación)
   - Y automáticamente creará el perfil en MySQL
2. **Login**: Inicia sesión en `/auth/login`
3. **Dashboard**: Verás tu dashboard en `/dashboard` con datos desde MySQL
4. **Comunidad**: Crea publicaciones en `/community` (se guardan en MySQL)
5. **Planes**: Prueba el checkout en `/plans` (usa tarjetas de prueba de Stripe)

### Tarjetas de Prueba de Stripe

- **Éxito**: `4242 4242 4242 4242`
- **Rechazada**: `4000 0000 0000 0002`
- **Cualquier fecha futura y CVC**

## Paso 8: Desplegar en Vercel

### 8.1 Preparar Base de Datos en Producción

Para producción, necesitas una base de datos MySQL remota. Opciones recomendadas:

- [PlanetScale](https://planetscale.com) - MySQL serverless
- [AWS RDS](https://aws.amazon.com/rds/) - MySQL gestionado
- [Google Cloud SQL](https://cloud.google.com/sql) - MySQL gestionado
- [DigitalOcean Managed Databases](https://www.digitalocean.com/products/managed-databases) - MySQL gestionado

1. Crea una base de datos MySQL en el servicio elegido
2. Ejecuta el script `mysql/schema.sql` en tu base de datos remota
3. Anota las credenciales de conexión

### 8.2 Desplegar en Vercel

1. Sube tu código a GitHub
2. Ve a [https://vercel.com](https://vercel.com) y conecta tu repositorio
3. En la configuración, añade todas las variables de entorno:
   - Variables de Supabase (autenticación)
   - Variables de MySQL (con las credenciales de tu base de datos remota)
   - Variables de Stripe
   - `NEXT_PUBLIC_APP_URL` con tu dominio de Vercel
4. Configura el webhook de Stripe con la URL de producción: `https://tu-dominio.vercel.app/api/stripe/webhook`
5. ¡Despliega!

## Solución de Problemas

### Error: "Missing Supabase URL"
- Verifica que `.env.local` existe y tiene todas las variables
- Reinicia el servidor de desarrollo

### Error: "Access denied for user" (MySQL)
- Verifica las credenciales de MySQL en `.env.local`
- Asegúrate de que el usuario tiene permisos en la base de datos `econoky`
- Si usas un usuario específico, verifica que tiene los privilegios necesarios

### Error: "Table doesn't exist"
- Asegúrate de haber ejecutado el script `mysql/schema.sql`
- Verifica que estás conectado a la base de datos correcta:
  ```sql
  USE econoky;
  SHOW TABLES;
  ```
- Deberías ver: `profiles`, `posts`, `transactions`

### Error: "Connection refused" o "Can't connect to MySQL server"
- Verifica que MySQL está corriendo:
  ```bash
  sudo systemctl status mysql  # Linux
  brew services list           # macOS
  ```
- Verifica el puerto (por defecto 3306)
- Si MySQL está en otro servidor, verifica la conectividad de red
- Verifica `MYSQL_HOST` en `.env.local`

### Error: "Stripe checkout failed"
- Verifica que el Price ID es correcto
- Asegúrate de estar usando claves de test
- Revisa la consola del navegador para más detalles

### Error: "Unauthorized" en las páginas
- Verifica que estás autenticado (Supabase maneja la autenticación)
- Asegúrate de haber iniciado sesión correctamente

### Error al crear perfil después del registro
- Verifica que MySQL está accesible
- Revisa los logs del servidor para ver el error específico
- Asegúrate de que la tabla `profiles` existe en MySQL

## Estructura de la Base de Datos MySQL

### Tabla: profiles
- `id` (VARCHAR(36)): UUID del usuario de Supabase (clave primaria)
- `email`: Email del usuario
- `full_name`: Nombre completo
- `balance` (DECIMAL): Saldo actual del usuario
- `subscription_status` (ENUM): Estado de suscripción ('free' o 'pro')
- `stripe_customer_id`: ID de cliente en Stripe
- `stripe_subscription_id`: ID de suscripción en Stripe
- `created_at`, `updated_at`: Timestamps automáticos

### Tabla: posts
- `id` (VARCHAR(36)): UUID de la publicación (clave primaria)
- `user_id` (VARCHAR(36)): ID del usuario (clave foránea a profiles)
- `title`: Título de la publicación
- `content` (TEXT): Contenido de la publicación
- `created_at`, `updated_at`: Timestamps automáticos

### Tabla: transactions
- `id` (VARCHAR(36)): UUID de la transacción (clave primaria)
- `user_id` (VARCHAR(36)): ID del usuario (clave foránea a profiles)
- `amount` (DECIMAL): Monto de la transacción
- `type` (ENUM): Tipo ('income', 'expense', 'subscription', 'refund')
- `description` (TEXT): Descripción opcional
- `created_at`: Timestamp automático

## Recursos Adicionales

- [Documentación de Next.js](https://nextjs.org/docs)
- [Documentación de MySQL](https://dev.mysql.com/doc/)
- [Documentación de mysql2](https://github.com/sidorares/node-mysql2)
- [Documentación de Supabase Auth](https://supabase.com/docs/guides/auth)
- [Documentación de Stripe](https://stripe.com/docs)
- [Documentación de Tailwind CSS](https://tailwindcss.com/docs)

## Notas Importantes

- **Seguridad**: Nunca expongas tus credenciales de MySQL en el código o en repositorios públicos
- **Backups**: Configura backups regulares de tu base de datos MySQL
- **Conexiones**: El pool de conexiones está configurado para 10 conexiones simultáneas
- **UUIDs**: Los IDs se generan usando UUID v4 (paquete `uuid`)
- **Autenticación vs Datos**: Recuerda que Supabase solo maneja la autenticación, todos los datos están en MySQL

