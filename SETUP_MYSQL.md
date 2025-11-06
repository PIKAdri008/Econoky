# Guía de Configuración con MySQL

Esta guía te ayudará a configurar Econoky usando MySQL en lugar de Supabase para la base de datos.

## Arquitectura

- **Supabase**: Solo para autenticación (login, registro)
- **MySQL**: Para todos los datos (perfiles, publicaciones, transacciones)
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

O copia y pega el contenido de `mysql/schema.sql` en tu cliente MySQL.

### 2.3 Crear Usuario (Opcional pero Recomendado)

```sql
CREATE USER 'econoky_user'@'localhost' IDENTIFIED BY 'tu_contraseña_segura';
GRANT ALL PRIVILEGES ON econoky.* TO 'econoky_user'@'localhost';
FLUSH PRIVILEGES;
```

## Paso 3: Configurar Supabase (Solo Autenticación)

1. Ve a [https://supabase.com](https://supabase.com) y crea un proyecto
2. Solo necesitas la autenticación, no necesitas crear tablas en Supabase
3. Obtén tus claves de API:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Paso 4: Configurar Stripe

1. Ve a [https://stripe.com](https://stripe.com) y crea una cuenta
2. Asegúrate de estar en **modo test**
3. Crea un producto y precio:
   - Ve a **Products** > **Add product**
   - Name: "Econoky Pro"
   - Price: €4.99 mensual
   - Copia el **Price ID** (empieza con `price_`)
4. Obtén las claves de API:
   - **Publishable key** → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - **Secret key** → `STRIPE_SECRET_KEY`
5. Configura webhook (para producción):
   - URL: `https://tu-dominio.com/api/stripe/webhook`
   - Eventos: `customer.subscription.deleted`, `customer.subscription.updated`, `invoice.payment_succeeded`
   - Copia el **Webhook secret** → `STRIPE_WEBHOOK_SECRET`

## Paso 5: Crear Archivo .env.local

Crea un archivo `.env.local` en la raíz del proyecto:

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

## Paso 6: Ejecutar el Proyecto

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Paso 7: Probar la Aplicación

1. **Registro**: Ve a `/auth/register` y crea una cuenta
   - Esto creará el usuario en Supabase (auth)
   - Y el perfil en MySQL automáticamente

2. **Login**: Inicia sesión en `/auth/login`

3. **Dashboard**: Verás tu dashboard en `/dashboard`

4. **Comunidad**: Crea publicaciones en `/community`

5. **Planes**: Prueba el checkout en `/plans`
   - Usa tarjetas de prueba de Stripe:
     - Éxito: `4242 4242 4242 4242`
     - Rechazada: `4000 0000 0000 0002`
     - Cualquier fecha futura y CVC

## Estructura de la Base de Datos MySQL

### Tabla: profiles
- `id` (VARCHAR(36)): UUID del usuario de Supabase
- `email`: Email del usuario
- `full_name`: Nombre completo
- `balance`: Saldo actual
- `subscription_status`: Estado de suscripción ('free' o 'pro')
- `stripe_customer_id`: ID de cliente en Stripe
- `stripe_subscription_id`: ID de suscripción en Stripe

### Tabla: posts
- `id` (VARCHAR(36)): UUID de la publicación
- `user_id`: ID del usuario (FK a profiles)
- `title`: Título de la publicación
- `content`: Contenido de la publicación

### Tabla: transactions
- `id` (VARCHAR(36)): UUID de la transacción
- `user_id`: ID del usuario (FK a profiles)
- `amount`: Monto de la transacción
- `type`: Tipo ('income', 'expense', 'subscription', 'refund')
- `description`: Descripción opcional

## Solución de Problemas

### Error: "Access denied for user"
- Verifica las credenciales de MySQL en `.env.local`
- Asegúrate de que el usuario tiene permisos en la base de datos

### Error: "Table doesn't exist"
- Ejecuta el script `mysql/schema.sql`
- Verifica que la base de datos se llama `econoky`

### Error: "Connection refused"
- Verifica que MySQL está corriendo:
  ```bash
  sudo systemctl status mysql  # Linux
  brew services list            # macOS
  ```
- Verifica el puerto (por defecto 3306)

### Error: "Can't connect to MySQL server"
- Verifica `MYSQL_HOST` en `.env.local`
- Si MySQL está en otro servidor, verifica la conectividad de red

## Despliegue en Producción

### Vercel + Base de Datos MySQL Remota

1. Usa un servicio de MySQL en la nube:
   - [PlanetScale](https://planetscale.com)
   - [AWS RDS](https://aws.amazon.com/rds/)
   - [Google Cloud SQL](https://cloud.google.com/sql)
   - [DigitalOcean Managed Databases](https://www.digitalocean.com/products/managed-databases)

2. Actualiza las variables de entorno en Vercel:
   - `MYSQL_HOST`: Host de tu base de datos remota
   - `MYSQL_PORT`: Puerto (generalmente 3306)
   - `MYSQL_USER`: Usuario de la base de datos
   - `MYSQL_PASSWORD`: Contraseña
   - `MYSQL_DATABASE`: Nombre de la base de datos

3. Ejecuta el script SQL en tu base de datos remota

4. Configura el webhook de Stripe con la URL de producción

## Notas Importantes

- **Seguridad**: Nunca expongas tus credenciales de MySQL
- **Backups**: Configura backups regulares de tu base de datos MySQL
- **Conexiones**: El pool de conexiones está configurado para 10 conexiones simultáneas
- **UUIDs**: Los IDs se generan usando UUID v4 (necesitas el paquete `uuid`)

## Recursos Adicionales

- [Documentación de MySQL](https://dev.mysql.com/doc/)
- [Documentación de mysql2](https://github.com/sidorares/node-mysql2)
- [Documentación de Supabase Auth](https://supabase.com/docs/guides/auth)
- [Documentación de Stripe](https://stripe.com/docs)

