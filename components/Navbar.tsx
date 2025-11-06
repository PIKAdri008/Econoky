'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'

export function Navbar() {
  const pathname = usePathname()
  const [user, setUser] = useState<any>(null)
  const supabase = createClient()

  useEffect(() => {
    // Verificar si hay un usuario autenticado
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
    })

    // Escuchar cambios en la autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [supabase])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
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
            {user ? (
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
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

