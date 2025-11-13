'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ChevronDown } from 'lucide-react'

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [calculadorasOpen, setCalculadorasOpen] = useState(false)

  useEffect(() => {
    // Verificar si hay un usuario autenticado
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          setUser(data.user)
        }
      })
      .finally(() => setLoading(false))
  }, [])

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    setUser(null)
    router.push('/')
    router.refresh()
  }

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-primary-600">
              Econoky
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className={`${pathname === '/' ? 'text-primary-600 font-semibold' : 'text-gray-700'} hover:text-primary-600 transition-colors`}
            >
              Inicio
            </Link>
            <div 
              className="relative"
              onMouseEnter={() => setCalculadorasOpen(true)}
              onMouseLeave={() => setCalculadorasOpen(false)}
            >
              <Link 
                href="/calculadoras" 
                className={`${pathname?.startsWith('/calculadoras') ? 'text-primary-600 font-semibold' : 'text-gray-700'} hover:text-primary-600 transition-colors flex items-center gap-1`}
              >
                Calculadoras
                <ChevronDown className="w-4 h-4" />
              </Link>
              {calculadorasOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <Link 
                    href="/calculadoras/hipotecas" 
                    className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                  >
                    Hipotecas
                  </Link>
                  <Link 
                    href="/calculadoras/rentabilidad" 
                    className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                  >
                    Rentabilidad
                  </Link>
                  <Link 
                    href="/calculadoras/libertad-financiera" 
                    className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                  >
                    Libertad Financiera
                  </Link>
                  <Link 
                    href="/calculadoras/interes-compuesto" 
                    className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                  >
                    Interés Compuesto
                  </Link>
                  <Link 
                    href="/calculadoras/ratio-productividad" 
                    className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                  >
                    Ratio de Productividad
                  </Link>
                  <Link 
                    href="/calculadoras/inversion-inmobiliaria" 
                    className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                  >
                    Inversión Inmobiliaria
                  </Link>
                  <Link 
                    href="/calculadoras/reparto-herencia" 
                    className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                  >
                    Reparto de Herencia
                  </Link>
                </div>
              )}
            </div>
            <Link 
              href="/plans" 
              className={`${pathname === '/plans' ? 'text-primary-600 font-semibold' : 'text-gray-700'} hover:text-primary-600 transition-colors`}
            >
              Planes
            </Link>
            <Link 
              href="/blog" 
              className={`${pathname === '/blog' ? 'text-primary-600 font-semibold' : 'text-gray-700'} hover:text-primary-600 transition-colors`}
            >
              Blog
            </Link>
            {!loading && (
              user ? (
                <>
                  <Link 
                    href="/dashboard" 
                    className={`${pathname === '/dashboard' ? 'text-primary-600 font-semibold' : 'text-gray-700'} hover:text-primary-600 transition-colors`}
                  >
                    Dashboard
                  </Link>
                  <Link 
                    href="/profile" 
                    className={`${pathname === '/profile' ? 'text-primary-600 font-semibold' : 'text-gray-700'} hover:text-primary-600 transition-colors`}
                  >
                    Perfil
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-gray-700 hover:text-primary-600 transition-colors"
                  >
                    Cerrar sesión
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    href="/auth/login" 
                    className="text-gray-700 hover:text-primary-600 transition-colors"
                  >
                    Iniciar sesión
                  </Link>
                  <Link 
                    href="/auth/register" 
                    className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    Registrarse
                  </Link>
                </>
              )
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
