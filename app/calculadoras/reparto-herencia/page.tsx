'use client'

import { useState } from 'react'

export default function RepartoHerenciaPage() {
  const [activoNeto, setActivoNeto] = useState(1)
  const [edadConyuge, setEdadConyuge] = useState(14)
  const [numeroHijos, setNumeroHijos] = useState(2)
  const [resultados, setResultados] = useState<any>(null)

  const calcular = () => {
    // El cónyuge recibe el 50% en concepto de gananciales
    const gananciales = activoNeto * 0.5
    const masaHereditaria = activoNeto * 0.5

    // Opción A: Tercio de libre disposición de un cónyuge a otro e hijos a partes iguales
    const tercioLibre = masaHereditaria / 3
    const tercioLegitima = masaHereditaria / 3
    const tercioMejora = masaHereditaria / 3

    const opcionA = {
      conyuge: gananciales + tercioLibre + tercioMejora,
      hijos: Array(numeroHijos).fill(0).map(() => tercioLegitima / numeroHijos),
    }

    // Opción B: Tercio de libre disposición y el de mejora a los hijos a partes iguales
    const opcionB = {
      conyuge: gananciales + tercioLibre,
      hijos: Array(numeroHijos).fill(0).map(() => (tercioLegitima + tercioMejora) / numeroHijos),
    }

    // Opción C: Tercio de libre disposición y el de mejora al hijo 1
    const opcionC = {
      conyuge: gananciales + tercioLibre,
      hijos: Array(numeroHijos).fill(0).map((_, i) => 
        i === 0 
          ? tercioLegitima / numeroHijos + tercioMejora
          : tercioLegitima / numeroHijos
      ),
    }

    setResultados({
      gananciales: gananciales.toFixed(2),
      masaHereditaria: masaHereditaria.toFixed(2),
      opcionA,
      opcionB,
      opcionC,
    })
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">Calculadora de Reparto de Herencia</h1>
        <p className="text-gray-600 mb-8">
          Esta calculadora te permite simular el reparto testamental de tu patrimonio según la legislación vigente.
        </p>

        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Datos de tu patrimonio y situación familiar</h2>
          <p className="text-sm text-gray-600 mb-4">
            Por favor, introduce los siguientes datos para mostrarte una simulación de tu reparto testamental:
          </p>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Activo neto</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={activoNeto}
                  onChange={(e) => setActivoNeto(Number(e.target.value))}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-black"
                />
                <span className="text-gray-600">€</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Edad del cónyuge</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={edadConyuge}
                  onChange={(e) => setEdadConyuge(Number(e.target.value))}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-black"
                />
                <span className="text-gray-600">años</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Número de hijos</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="1"
                  value={numeroHijos}
                  onChange={(e) => setNumeroHijos(Math.max(1, Number(e.target.value)))}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-black"
                />
                <span className="text-gray-600">hijos</span>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={calcular}
              className="bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition-colors font-semibold"
            >
              Calcular
            </button>
          </div>
        </div>

        {resultados && (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-gray-700">
                El cónyuge recibe el 50% ({resultados.gananciales}€) del activo neto en concepto de gananciales en todas las opciones.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Opciones de reparto para una masa hereditaria de {resultados.masaHereditaria}€
              </h3>

              {/* Opción A */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 mb-4">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  OPCIÓN A: Tercio de libre disposición de un cónyuge a otro e hijos a partes iguales.
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Cónyuge</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-4 bg-blue-500 rounded"></div>
                      <span className="font-semibold text-black">{resultados.opcionA.conyuge.toFixed(2)} €</span>
                      <span className="text-sm text-black">
                        ({((resultados.opcionA.conyuge / activoNeto) * 100).toFixed(2)}%)
                      </span>
                    </div>
                  </div>
                  {resultados.opcionA.hijos.map((hijo: number, index: number) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-gray-700">Hijo {index + 1}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-4 bg-purple-500 rounded"></div>
                        <span className="font-semibold text-black">{hijo.toFixed(2)} €</span>
                        <span className="text-sm text-gray-500">
                          ({((hijo / activoNeto) * 100).toFixed(2)}%)
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Opción B */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 mb-4">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  OPCIÓN B: Tercio de libre disposición y el de mejora a los hijos a partes iguales.
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Cónyuge</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-4 bg-blue-500 rounded"></div>
                      <span className="font-semibold text-black">{resultados.opcionB.conyuge.toFixed(2)} €</span>
                      <span className="text-sm text-gray-500">
                        ({((resultados.opcionB.conyuge / activoNeto) * 100).toFixed(2)}%)
                      </span>
                    </div>
                  </div>
                  {resultados.opcionB.hijos.map((hijo: number, index: number) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-gray-700">Hijo {index + 1}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-4 bg-purple-500 rounded"></div>
                        <span className="font-semibold text-black">{hijo.toFixed(2)} €</span>
                        <span className="text-sm text-gray-500">
                          ({((hijo / activoNeto) * 100).toFixed(2)}%)
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Opción C */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  OPCIÓN C: Tercio de libre disposición y el de mejora al hijo 1.
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Cónyuge</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-4 bg-blue-500 rounded"></div>
                      <span className="font-semibold text-black">{resultados.opcionC.conyuge.toFixed(2)} €</span>
                      <span className="text-sm text-gray-500">
                        ({((resultados.opcionC.conyuge / activoNeto) * 100).toFixed(2)}%)
                      </span>
                    </div>
                  </div>
                  {resultados.opcionC.hijos.map((hijo: number, index: number) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-gray-700">Hijo {index + 1}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-4 bg-purple-500 rounded"></div>
                        <span className="font-semibold text-black">{hijo.toFixed(2)} €</span>
                        <span className="text-sm text-gray-500">
                          ({((hijo / activoNeto) * 100).toFixed(2)}%)
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
