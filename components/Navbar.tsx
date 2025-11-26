'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ChevronDown, Menu, X } from 'lucide-react'
import logo from "../src/assets/ECONOKY_Imagotipo_04_1350x350px.jpg"

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [calculadorasOpen, setCalculadorasOpen] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

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

          {/* Navegación escritorio */}
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

          {/* Botón hamburguesa (móvil) */}
          {!loading && user && (
            <button
              type="button"
              onClick={() => setMobileOpen(prev => !prev)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            >
              <span className="sr-only">Abrir menú principal</span>
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          )}

          {!loading && !user && (
            <div className="md:hidden flex items-center gap-3">
              <Link 
                href="/auth/login" 
                className="text-gray-700 text-sm hover:text-primary-600 transition-colors"
              >
                Iniciar sesión
              </Link>
              <Link 
                href="/auth/register" 
                className="cta-button text-xs px-4 py-2 rounded-full"
              >
                Registrarse
              </Link>
            </div>
          )}
        </div>

        {/* Menú móvil autenticado */}
        {!loading && user && mobileOpen && (
          <div className="md:hidden mt-2 bg-white/95 backdrop-blur border border-gray-100 rounded-2xl shadow-lg p-4 space-y-2">
            <Link 
              href="/dashboard" 
              className="block px-2 py-2 rounded-lg text-gray-700 hover:bg-primary-50 hover:text-primary-600"
              onClick={() => setMobileOpen(false)}
            >
              Dashboard
            </Link>
            <Link 
              href="/dashboard-financiero" 
              className="block px-2 py-2 rounded-lg text-gray-700 hover:bg-primary-50 hover:text-primary-600"
              onClick={() => setMobileOpen(false)}
            >
              Panel financiero
            </Link>
            <Link 
              href="/calendario-financiero" 
              className="block px-2 py-2 rounded-lg text-gray-700 hover:bg-primary-50 hover:text-primary-600"
              onClick={() => setMobileOpen(false)}
            >
              Calendario
            </Link>
            <div className="border-t border-gray-100 my-2" />
            <p className="text-xs font-semibold text-gray-500 px-2 uppercase tracking-wide">Calculadoras</p>
            <div className="grid grid-cols-1 gap-1">
              <Link href="/calculadoras/hipotecas" onClick={() => setMobileOpen(false)} className="block px-2 py-1.5 rounded-lg text-gray-700 hover:bg-primary-50 hover:text-primary-600 text-sm">Hipotecas</Link>
              <Link href="/calculadoras/rentabilidad" onClick={() => setMobileOpen(false)} className="block px-2 py-1.5 rounded-lg text-gray-700 hover:bg-primary-50 hover:text-primary-600 text-sm">Rentabilidad</Link>
              <Link href="/calculadoras/libertad-financiera" onClick={() => setMobileOpen(false)} className="block px-2 py-1.5 rounded-lg text-gray-700 hover:bg-primary-50 hover:text-primary-600 text-sm">Libertad Financiera</Link>
              <Link href="/calculadoras/interes-compuesto" onClick={() => setMobileOpen(false)} className="block px-2 py-1.5 rounded-lg text-gray-700 hover:bg-primary-50 hover:text-primary-600 text-sm">Interés Compuesto</Link>
              <Link href="/calculadoras/ratio-productividad" onClick={() => setMobileOpen(false)} className="block px-2 py-1.5 rounded-lg text-gray-700 hover:bg-primary-50 hover:text-primary-600 text-sm">Ratio de Productividad</Link>
              <Link href="/calculadoras/inversion-inmobiliaria" onClick={() => setMobileOpen(false)} className="block px-2 py-1.5 rounded-lg text-gray-700 hover:bg-primary-50 hover:text-primary-600 text-sm">Inversión Inmobiliaria</Link>
              <Link href="/calculadoras/reparto-herencia" onClick={() => setMobileOpen(false)} className="block px-2 py-1.5 rounded-lg text-gray-700 hover:bg-primary-50 hover:text-primary-600 text-sm">Reparto de Herencia</Link>
              <Link href="/calculadoras/jubilacion-pension" onClick={() => setMobileOpen(false)} className="block px-2 py-1.5 rounded-lg text-gray-700 hover:bg-primary-50 hover:text-primary-600 text-sm">Jubilación y Pensión</Link>
              <Link href="/calculadoras/ipci" onClick={() => setMobileOpen(false)} className="block px-2 py-1.5 rounded-lg text-gray-700 hover:bg-primary-50 hover:text-primary-600 text-sm">IPCI</Link>
            </div>
            <div className="border-t border-gray-100 my-2" />
            <Link href="/plans" onClick={() => setMobileOpen(false)} className="block px-2 py-2 rounded-lg text-gray-700 hover:bg-primary-50 hover:text-primary-600">Planes</Link>
            <Link href="/blog" onClick={() => setMobileOpen(false)} className="block px-2 py-2 rounded-lg text-gray-700 hover:bg-primary-50 hover:text-primary-600">Blog</Link>
            <Link href="/test" onClick={() => setMobileOpen(false)} className="block px-2 py-2 rounded-lg text-gray-700 hover:bg-primary-50 hover:text-primary-600">Test</Link>
            <Link href="/community" onClick={() => setMobileOpen(false)} className="block px-2 py-2 rounded-lg text-gray-700 hover:bg-primary-50 hover:text-primary-600">Comunidad</Link>
            <Link href="/mensajes" onClick={() => setMobileOpen(false)} className="block px-2 py-2 rounded-lg text-gray-700 hover:bg-primary-50 hover:text-primary-600">Mensajes</Link>
            {isAdmin && (
              <Link href="/admin" onClick={() => setMobileOpen(false)} className="block px-2 py-2 rounded-lg text-gray-700 hover:bg-primary-50 hover:text-primary-600">Admin</Link>
            )}
            <Link href="/profile" onClick={() => setMobileOpen(false)} className="block px-2 py-2 rounded-lg text-gray-700 hover:bg-primary-50 hover:text-primary-600">Perfil</Link>
            <button
              onClick={() => { setMobileOpen(false); handleLogout() }}
              className="w-full mt-2 px-3 py-2 rounded-xl text-red-600 border border-red-200 hover:bg-red-50 text-sm font-semibold"
            >
              Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}

