import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">Econoky</h3>
            <p className="text-sm">
              Tu nueva comunidad para hablar de dinero. 
              Gestiona tus finanzas de manera sencilla y efectiva.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Enlaces</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/plans" className="hover:text-white transition-colors">
                  Planes
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/legal" className="hover:text-white transition-colors">
                  Aviso Legal
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Política de privacidad
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-white transition-colors">
                  Política de Cookies
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Contacto</h4>
            <p className="text-sm">
              ¿Tienes preguntas? Contáctanos.
            </p>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-sm">
          <p>© 2025 - Econoky S.L. Todos los derechos reservados.</p>
          <p className="mt-2 text-xs text-gray-500">
            Desarrollado por Impulsa3
          </p>
        </div>
      </div>
    </footer>
  )
}

