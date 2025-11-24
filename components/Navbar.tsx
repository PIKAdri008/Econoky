'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import logo from "../src/assets/ECONOKY_Imagotipo_04_1350x350px.jpg"

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [calculadorasOpen, setCalculadorasOpen] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          setUser(data.user)
          setIsAdmin(data.user.role === 'admin')
        } else {
          setUser(null)
          setIsAdmin(false)
        }
      })
      .finally(() => setLoading(false))
  }, [pathname])

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    setUser(null)
    router.push('/')
    router.refresh()
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-white/40 shadow-glow-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link
              href={user ? '/dashboard' : '/'}
              className="flex items-center"
            >
              <Image
                src={logo}
                alt="Econoky Logo"
                className="h-8 w-28 object-contain"
              />
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8 text-gray-700">
            {!loading && (
              user ? (
                <>
                  <Link 
                    href="/dashboard" 
                    className={`${pathname === '/dashboard' ? 'text-primary-600 font-semibold' : 'hover:text-primary-600 transition-colors'}`}
                  >
                    Dashboard
                  </Link>
                  <Link 
                    href="/dashboard-financiero" 
                    className={`${pathname === '/dashboard-financiero' ? 'text-primary-600 font-semibold' : 'hover:text-primary-600 transition-colors'}`}
                  >
                    Panel financiero
                  </Link>
                  <Link 
                    href="/calendario-financiero" 
                    className={`${pathname === '/calendario-financiero' ? 'text-primary-600 font-semibold' : 'hover:text-primary-600 transition-colors'}`}
                  >
                    Calendario
                  </Link>
                  <div 
                    className="relative"
                    onMouseEnter={() => setCalculadorasOpen(true)}
                    onMouseLeave={() => setCalculadorasOpen(false)}
                  >
                    <Link 
                      href="/calculadoras" 
                      className={`${pathname?.startsWith('/calculadoras') ? 'text-primary-600 font-semibold' : 'hover:text-primary-600 transition-colors'} flex items-center gap-1`}
                    >
                      Calculadoras
                      <ChevronDown className="w-4 h-4" />
                    </Link>
                    {calculadorasOpen && (
                      <div className="absolute top-full left-0 mt-2 w-64 bg-white/95 backdrop-blur border border-white/80 rounded-2xl shadow-glow-violet py-3 z-50">
                        <Link 
                          href="/calculadoras/hipotecas" 
                          className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors rounded-xl"
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
                        <Link 
                          href="/calculadoras/jubilacion-pension" 
                          className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                        >
                          Jubilación y Pensión
                        </Link>
                        <Link 
                          href="/calculadoras/ipci" 
                          className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                        >
                          IPCI
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
                  <Link 
                    href="/test" 
                    className={`${pathname === '/test' ? 'text-primary-600 font-semibold' : 'text-gray-700'} hover:text-primary-600 transition-colors`}
                  >
                    Test
                  </Link>
                  <Link 
                    href="/community" 
                    className={`${pathname === '/community' ? 'text-primary-600 font-semibold' : 'text-gray-700'} hover:text-primary-600 transition-colors`}
                  >
                    Comunidad
                  </Link>
                  <Link 
                    href="/mensajes" 
                    className={`${pathname === '/mensajes' ? 'text-primary-600 font-semibold' : 'text-gray-700'} hover:text-primary-600 transition-colors`}
                  >
                    Mensajes
                  </Link>
                  {isAdmin && (
                    <Link 
                      href="/admin" 
                      className={`${pathname === '/admin' ? 'text-primary-600 font-semibold' : 'text-gray-700'} hover:text-primary-600 transition-colors`}
                    >
                      Admin
                    </Link>
                  )}
                  <Link 
                    href="/profile" 
                    className={`${pathname === '/profile' ? 'text-primary-600 font-semibold' : 'text-gray-700'} hover:text-primary-600 transition-colors`}
                  >
                    Perfil
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="px-3 sm:px-4 py-2 rounded-xl text-gray-700 border border-transparent transition-colors duration-300 hover:bg-red-500 hover:text-white text-sm sm:text-base"
                  >
                    Cerrar sesión
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    href="/" 
                    className={`${pathname === '/' ? 'text-primary-600 font-semibold' : 'hover:text-primary-600 transition-colors'}`}
                  >
                    Inicio
                  </Link>
                  <Link 
                    href="/auth/login" 
                    className="text-gray-700 hover:text-primary-600 transition-colors"
                  >
                    Iniciar sesión
                  </Link>
                  <Link 
                    href="/auth/register" 
                    className="cta-button text-sm px-6 py-2 rounded-full"
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

