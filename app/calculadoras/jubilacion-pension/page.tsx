'use client'

import { useState } from 'react'

export default function JubilacionPensionPage() {
  const [edadActual, setEdadActual] = useState(30)
  const [edadJubilacion, setEdadJubilacion] = useState(67)
  const [salarioAnual, setSalarioAnual] = useState(30000)
  const [aportacionMensual, setAportacionMensual] = useState(200)
  const [rentabilidadEsperada, setRentabilidadEsperada] = useState(5)
  const [capitalActual, setCapitalActual] = useState(0)
  const [resultados, setResultados] = useState<any>(null)

  const calcular = () => {
    const añosRestantes = edadJubilacion - edadActual
    const mesesRestantes = añosRestantes * 12
    const tasaMensual = rentabilidadEsperada / 100 / 12

    // Calcular capital acumulado al jubilarse
    let capital = capitalActual
    let totalAportado = capitalActual

    for (let mes = 1; mes <= mesesRestantes; mes++) {
      capital = capital * (1 + tasaMensual) + aportacionMensual
      totalAportado += aportacionMensual
    }

    const interesesGenerados = capital - totalAportado

    // Calcular pensión mensual estimada (usando regla del 4% - retiro seguro)
    const tasaRetiroSeguro = 0.04 / 12 // 4% anual dividido entre 12 meses
    const pensionMensualEstimada = capital * tasaRetiroSeguro

    // Calcular pensión del sistema público (estimación simplificada)
    // Basado en el 80% del salario promedio de los últimos años
    const pensionPublicaEstimada = salarioAnual * 0.8 / 12

    // Calcular pensión total
    const pensionTotalMensual = pensionMensualEstimada + pensionPublicaEstimada

    // Calcular años que durará el capital privado (asumiendo retiro del 4% anual)
    const añosDuracionCapital = capital > 0 ? capital / (pensionMensualEstimada * 12) : 0

    // Calcular cuánto necesitas ahorrar para una pensión objetivo
    const pensionObjetivoMensual = salarioAnual * 0.7 / 12 // 70% del salario actual
    const pensionObjetivoPrivada = pensionObjetivoMensual - pensionPublicaEstimada
    const capitalNecesario = pensionObjetivoPrivada > 0 
      ? pensionObjetivoPrivada * 12 / 0.04 
      : 0

    setResultados({
      capitalAcumulado: capital.toFixed(2),
      totalAportado: totalAportado.toFixed(2),
      interesesGenerados: interesesGenerados.toFixed(2),
      pensionMensualPrivada: pensionMensualEstimada.toFixed(2),
      pensionMensualPublica: pensionPublicaEstimada.toFixed(2),
      pensionTotalMensual: pensionTotalMensual.toFixed(2),
      añosDuracionCapital: añosDuracionCapital.toFixed(1),
      pensionObjetivoMensual: pensionObjetivoMensual.toFixed(2),
      capitalNecesario: capitalNecesario.toFixed(2),
      añosRestantes: añosRestantes,
      datosAnuales: calcularEvolucionAnual(capitalActual, aportacionMensual, tasaMensual, añosRestantes)
    })
  }

  const calcularEvolucionAnual = (capitalInicial: number, aportacionMensual: number, tasaMensual: number, años: number) => {
    const datos: any[] = []
    let capital = capitalInicial
    let totalAportado = capitalInicial

    for (let año = 1; año <= Math.min(años, 30); año++) {
      for (let mes = 1; mes <= 12; mes++) {
        capital = capital * (1 + tasaMensual) + aportacionMensual
        totalAportado += aportacionMensual
      }
      datos.push({
        año,
        capital: capital,
        aportado: totalAportado,
        intereses: capital - totalAportado
      })
    }

    return datos
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">Calculadora de Jubilación y Pensión</h1>
        <p className="text-gray-600 mb-8">
          Esta calculadora te permite estimar tu pensión de jubilación considerando tus ahorros privados y la pensión pública estimada. 
          Te ayuda a planificar cuánto necesitas ahorrar para alcanzar tus objetivos de jubilación.
        </p>

        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Datos Personales</h2>
          <p className="text-sm text-gray-600 mb-4">Completa los datos asociados a tu situación actual y objetivos de jubilación.</p>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Edad actual</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="18"
                  max="100"
                  value={edadActual}
                  onChange={(e) => setEdadActual(Number(e.target.value))}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-black"
                />
                <span className="text-gray-600">años</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Edad de jubilación deseada</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="60"
                  max="75"
                  value={edadJubilacion}
                  onChange={(e) => setEdadJubilacion(Number(e.target.value))}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-black"
                />
                <span className="text-gray-600">años</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Salario anual bruto</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={salarioAnual}
                  onChange={(e) => setSalarioAnual(Number(e.target.value))}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-black"
                />
                <span className="text-gray-600">€</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Aportación mensual a la jubilación</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={aportacionMensual}
                  onChange={(e) => setAportacionMensual(Number(e.target.value))}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-black"
                />
                <span className="text-gray-600">€</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Capital actual ahorrado</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={capitalActual}
                  onChange={(e) => setCapitalActual(Number(e.target.value))}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-black"
                />
                <span className="text-gray-600">€</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rentabilidad anual esperada</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  step="0.1"
                  value={rentabilidadEsperada}
                  onChange={(e) => setRentabilidadEsperada(Number(e.target.value))}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-black"
                />
                <span className="text-gray-600">%</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Rentabilidad neta esperada de tus inversiones</p>
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
            {/* Resultados Principales */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Capital Acumulado</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-gray-600">Capital al jubilarse</p>
                    <p className="text-3xl font-bold text-primary-600">{resultados.capitalAcumulado} €</p>
                  </div>
                  <div className="pt-3 border-t border-blue-200">
                    <p className="text-sm text-gray-600">Total aportado</p>
                    <p className="text-lg font-semibold text-gray-900">{resultados.totalAportado} €</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Intereses generados</p>
                    <p className="text-lg font-semibold text-green-600">{resultados.interesesGenerados} €</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Pensión Estimada</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-gray-600">Pensión mensual total</p>
                    <p className="text-3xl font-bold text-green-600">{resultados.pensionTotalMensual} €</p>
                  </div>
                  <div className="pt-3 border-t border-green-200">
                    <p className="text-sm text-gray-600">Pensión privada (de tus ahorros)</p>
                    <p className="text-lg font-semibold text-gray-900">{resultados.pensionMensualPrivada} €</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Pensión pública estimada</p>
                    <p className="text-lg font-semibold text-gray-900">{resultados.pensionMensualPublica} €</p>
                    <p className="text-xs text-gray-500 mt-1">Estimación basada en el 80% del salario</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Información Adicional */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Duración del Capital</h3>
                <p className="text-gray-600 mb-2">
                  Con una retirada del 4% anual, tu capital privado durará aproximadamente:
                </p>
                <p className="text-2xl font-bold text-yellow-600">{resultados.añosDuracionCapital} años</p>
                <p className="text-xs text-gray-500 mt-2">
                  Esto es una estimación. La duración real dependerá de la rentabilidad de tus inversiones durante la jubilación.
                </p>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Objetivo de Pensión</h3>
                <p className="text-gray-600 mb-2">
                  Para obtener una pensión del 70% de tu salario actual ({resultados.pensionObjetivoMensual} €/mes):
                </p>
                <p className="text-2xl font-bold text-purple-600">{resultados.capitalNecesario} €</p>
                <p className="text-xs text-gray-500 mt-2">
                  Capital adicional necesario en tu cuenta de jubilación (además de la pensión pública).
                </p>
              </div>
            </div>

            {/* Evolución Anual */}
            {resultados.datosAnuales && resultados.datosAnuales.length > 0 && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Evolución del Capital</h3>
                <div className="space-y-2">
                  {resultados.datosAnuales.map((dato: any, index: number) => {
                    const maxValor = Math.max(
                      ...resultados.datosAnuales.map((d: any) => d.capital)
                    )
                    const alturaCapital = (dato.capital / maxValor) * 100
                    const alturaAportado = (dato.aportado / maxValor) * 100
                    const alturaIntereses = (dato.intereses / maxValor) * 100

                    return (
                      <div key={index} className="flex items-end gap-1 h-16">
                        <div className="flex-1 flex flex-col justify-end">
                          <div className="flex gap-0.5 items-end h-full">
                            <div
                              className="bg-blue-500 flex-1"
                              style={{ height: `${alturaCapital}%` }}
                              title={`Capital: ${dato.capital.toFixed(0)}€`}
                            ></div>
                            <div
                              className="bg-green-500 flex-1"
                              style={{ height: `${alturaAportado}%` }}
                              title={`Aportado: ${dato.aportado.toFixed(0)}€`}
                            ></div>
                            <div
                              className="bg-purple-300 flex-1"
                              style={{ height: `${alturaIntereses}%` }}
                              title={`Intereses: ${dato.intereses.toFixed(0)}€`}
                            ></div>
                          </div>
                          <p className="text-xs text-center mt-1 font-bold text-primary-600">
                            Año {dato.año}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
                <div className="flex gap-4 mt-4 text-sm">
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-4 bg-blue-500"></div>
                    <span className="text-gray-700">Capital total</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-4 bg-green-500"></div>
                    <span className="text-gray-700">Total aportado</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-4 bg-purple-300"></div>
                    <span className="text-gray-700">Intereses generados</span>
                  </div>
                </div>
              </div>
            )}

            {/* Nota Importante */}
            <div className="bg-primary-50 border border-primary-200 rounded-lg p-6">
              <h4 className="font-bold text-gray-900 mb-2">⚠️ Nota Importante</h4>
              <p className="text-sm text-gray-700">
                Esta calculadora proporciona estimaciones basadas en los datos proporcionados. Los resultados reales pueden variar 
                debido a cambios en las rentabilidades, inflación, cambios en la legislación de pensiones públicas, y otros factores. 
                Se recomienda consultar con un asesor financiero para una planificación más precisa de tu jubilación.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
