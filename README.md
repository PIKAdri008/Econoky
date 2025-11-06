# Econoky

Plataforma web para gestionar tu dinero de manera sencilla y efectiva. Construida con Next.js, Tailwind CSS, Supabase y Stripe.

## 🚀 Características

- **Sistema de usuarios**: Registro, login y gestión de perfiles
- **Red social**: Publicaciones y comunidad
- **Sistema de saldos**: Gestión de transacciones y balance
- **Suscripciones**: Integración con Stripe para planes Pro
- **Dashboard**: Panel de control personalizado

## 📋 Requisitos Previos

- Node.js 18+ instalado
- Cuenta en [Supabase](https://supabase.com)
- Cuenta en [Stripe](https://stripe.com) (modo test)

## 🛠️ Instalación

1. **Clonar e instalar dependencias**:
```bash
npm install
```

2. **Configurar variables de entorno**:
Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

```env
# Supabase (solo para autenticación)
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anonima_de_supabase

# MySQL
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=tu_contraseña_mysql
MYSQL_DATABASE=econoky

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=tu_clave_publica_de_stripe
STRIPE_SECRET_KEY=tu_clave_secreta_de_stripe
NEXT_PUBLIC_STRIPE_PRICE_ID=tu_price_id_de_stripe
STRIPE_WEBHOOK_SECRET=tu_webhook_secret_de_stripe

# Next.js
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

3. **Configurar MySQL**:
   - Instala MySQL en tu sistema
   - Ejecuta el script `mysql/schema.sql` para crear las tablas
   - Ver `SETUP_MYSQL.md` para instrucciones detalladas

4. **Configurar Supabase (Solo Autenticación)**:
   - Crea un nuevo proyecto en Supabase
   - Solo necesitas las claves de API para autenticación
   - No necesitas crear tablas en Supabase

5. **Configurar Stripe**:
   - Crea un producto y precio en Stripe (modo test)
   - Copia el Price ID y añádelo a `NEXT_PUBLIC_STRIPE_PRICE_ID`
   - Configura un webhook en Stripe apuntando a: `https://tu-dominio.com/api/stripe/webhook`
   - Añade los eventos: `customer.subscription.deleted`, `customer.subscription.updated`, `invoice.payment_succeeded`

6. **Ejecutar el proyecto**:
```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📁 Estructura del Proyecto

```
Econoky/
├── app/                    # Páginas y rutas (App Router)
│   ├── api/               # API routes
│   ├── auth/              # Páginas de autenticación
│   ├── dashboard/         # Dashboard del usuario
│   ├── community/         # Red social
│   ├── profile/           # Perfil del usuario
│   └── plans/             # Página de planes
├── components/            # Componentes reutilizables
├── lib/                   # Utilidades y configuraciones
│   ├── supabase/          # Clientes de Supabase
│   └── stripe.ts          # Cliente de Stripe
├── supabase/              # Esquema de base de datos
└── public/                # Archivos estáticos
```

## 🗄️ Base de Datos

El proyecto usa una arquitectura híbrida:

- **Supabase**: Solo para autenticación (login, registro)
- **MySQL**: Para todos los datos de la aplicación:
  - **profiles**: Información de los usuarios
  - **posts**: Publicaciones de la red social
  - **transactions**: Transacciones y movimientos de saldo

Ver `SETUP_MYSQL.md` para instrucciones detalladas de configuración con MySQL.

## 💳 Stripe

El proyecto está configurado para usar Stripe en modo test. Asegúrate de:
- Usar las claves de test (empiezan con `pk_test_` y `sk_test_`)
- Configurar el webhook correctamente
- Usar tarjetas de prueba de Stripe

## 🚢 Despliegue en Vercel

1. Conecta tu repositorio a Vercel
2. Añade todas las variables de entorno en la configuración de Vercel
3. Configura el webhook de Stripe con la URL de producción
4. Despliega

## 📝 Notas

- Este es un proyecto de aprendizaje, adapta la seguridad según tus necesidades
- Supabase solo se usa para autenticación, todos los datos están en MySQL
- Recuerda configurar correctamente los webhooks de Stripe
- Asegúrate de tener MySQL corriendo antes de iniciar la aplicación

## 📄 Licencia

Este proyecto es para fines educativos.
