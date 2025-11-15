import Link from 'next/link'
import { 
  Home, 
  TrendingUp, 
  Bird, 
  Calculator, 
  Building2, 
  Briefcase,
  Scale,
  Clock
} from 'lucide-react'

const calculadoras = [
  {
    id: 'hipotecas',
    title: 'Calculadora de Hipotecas',
    description: 'Calcula el ahorro de amortizar cuota o plazo en una hipoteca.',
    icon: Home,
    color: 'text-teal-500',
    bgColor: 'bg-teal-50',
    href: '/calculadoras/hipotecas'
  },
  {
    id: 'rentabilidad',
    title: 'Calculadora de Rentabilidad',
    description: 'Calcula la rentabilidad de una inversión.',
    icon: TrendingUp,
    color: 'text-purple-500',
    bgColor: 'bg-purple-50',
    href: '/calculadoras/rentabilidad'
  },
  {
    id: 'libertad-financiera',
    title: 'Calculadora de Libertad Financiera',
    description: 'Calcula la capacidad de vivir sin ingresos activos.',
    icon: Bird,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    href: '/calculadoras/libertad-financiera'
  },
  {
    id: 'interes-compuesto',
    title: 'Calculadora de Interés Compuesto',
    description: 'Calcula la capitalización y actualización.',
    icon: Calculator,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
    href: '/calculadoras/interes-compuesto'
  },
  {
    id: 'inversion-inmobiliaria',
    title: 'Calculadora Inversión Inmobiliaria',
    description: 'Calcula la rentabilidad de alquilar una vivienda.',
    icon: Building2,
    color: 'text-teal-500',
    bgColor: 'bg-teal-50',
    href: '/calculadoras/inversion-inmobiliaria'
  },
  {
    id: 'ratio-productividad',
    title: 'Calculadora Ratio de Productividad',
    description: 'Mide la cantidad económica producida en una unidad de tiempo.',
    icon: Briefcase,
    color: 'text-purple-500',
    bgColor: 'bg-purple-50',
    href: '/calculadoras/ratio-productividad'
  },
  {
    id: 'reparto-herencia',
    title: 'Calculadora de Reparto de Herencia',
    description: 'Calcula el reparto testamental según la legislación vigente.',
    icon: Scale,
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-50',
    href: '/calculadoras/reparto-herencia'
  },
  {
    id: 'jubilacion-pension',
    title: 'Calculadora de Jubilación y Pensión',
    description: 'Calcula tu pensión de jubilación y planifica tu futuro financiero.',
    icon: Clock,
    color: 'text-orange-500',
    bgColor: 'bg-orange-50',
    href: '/calculadoras/jubilacion-pension'
  }
]

export default function CalculadorasPage() {
  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900">
          Calculadoras
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {calculadoras.map((calc) => {
            const Icon = calc.icon
            return (
              <Link
                key={calc.id}
                href={calc.href}
                className="group"
              >
                <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:border-primary-600 h-full flex flex-col">
                  <div className={`${calc.bgColor} w-16 h-16 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className={`${calc.color} w-8 h-8`} />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {calc.title}
                  </h2>
                  <p className="text-gray-600 text-sm flex-grow">
                    {calc.description}
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
