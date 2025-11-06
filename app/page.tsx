import Link from 'next/link'
import { Calculator, Users, TrendingUp, Shield, Sparkles, Heart } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">
            Tu nueva comunidad para hablar de dinero
          </h1>
          <p className="text-xl mb-8 text-primary-100">
            La nueva plataforma online para gestionar tu dinero de manera sencilla y efectiva.
          </p>
          <Link
            href="/auth/register"
            className="inline-block bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
          >
            ¡Empieza hoy mismo!
          </Link>
        </div>
      </section>

      {/* ¿Qué es Econoky? */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">¿Qué es Econoky?</h2>
          <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto mb-8">
            Econoky es una plataforma global que transforma la forma en que interactúas con tu dinero. 
            Ofrecemos herramientas gratuitas, una red social para compartir experiencias relacionadas 
            con las finanzas y un diagnóstico personalizado de tu salud financiera.
          </p>
          <div className="text-center">
            <Link
              href="/services"
              className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              Ver servicios
            </Link>
          </div>
        </div>
      </section>

      {/* Nuestros servicios */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Nuestros servicios</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <Calculator className="w-12 h-12 text-primary-600 mb-4" />
              <h3 className="text-2xl font-bold mb-4">Calculadoras Financieras</h3>
              <p className="text-gray-700">
                Toma decisiones informadas con nuestras calculadoras financieras gratuitas. 
                Desde el cálculo de préstamos hasta la planificación de ahorros, te ayudamos 
                a manejar tus finanzas con confianza.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <Users className="w-12 h-12 text-primary-600 mb-4" />
              <h3 className="text-2xl font-bold mb-4">Conecta y aprende</h3>
              <p className="text-gray-700">
                Únete a nuestra red social y comparte tus éxitos y desafíos en un espacio 
                seguro y estimulante. Aprende de la comunidad y encuentra apoyo en tu 
                camino hacia la salud financiera.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md border-2 border-primary-500">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-12 h-12 text-primary-600" />
                <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Pro
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Diagnóstico Personalizado</h3>
              <p className="text-gray-700 mb-4">
                Descubre cómo están tus finanzas con nuestra herramienta de análisis por suscripción. 
                Por solo 4.99 euros al mes, recibirás un diagnóstico detallado e información real 
                para mejorar tus finanzas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ¿Por qué Econoky? */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">¿Por qué Econoky?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <Shield className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Accesibilidad</h3>
              <p className="text-gray-700">
                Herramientas financieras gratuitas y una red social inclusiva.
              </p>
            </div>
            <div className="text-center">
              <Sparkles className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Personalización</h3>
              <p className="text-gray-700">
                Diagnósticos y seguimiento personalizados.
              </p>
            </div>
            <div className="text-center">
              <Users className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Comunidad</h3>
              <p className="text-gray-700">
                Un entorno de apoyo y aprendizaje continuo.
              </p>
            </div>
            <div className="text-center">
              <Heart className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Innovación</h3>
              <p className="text-gray-700">
                Soluciones creativas y disruptivas para tus finanzas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cómo funciona */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">¿Cómo funciona?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-2xl font-bold mb-4">Regístrate Gratis</h3>
              <p className="text-gray-700">
                Crea tu cuenta en pocos pasos.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-2xl font-bold mb-4">Usa las herramientas</h3>
              <p className="text-gray-700">
                Prueba nuestras calculadoras financieras y conéctate con otros usuarios.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-2xl font-bold mb-4">Mejora tus finanzas</h3>
              <p className="text-gray-700">
                Obtén un diagnóstico personalizado y mejora tu salud financiera.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Transformando tu Salud Financiera</h2>
          <p className="text-xl mb-8 text-primary-100">
            Regístrate ahora y da el primer paso hacia una mejor salud financiera. 
            Con Econoky, tienes todas las herramientas para gestionar tu dinero de manera 
            efectiva y sin complicaciones.
          </p>
          <Link
            href="/auth/register"
            className="inline-block bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
          >
            ¡Empieza hoy mismo!
          </Link>
        </div>
      </section>
    </div>
  )
}

