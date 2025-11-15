'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { TrendingUp, TrendingDown, DollarSign, Target, Shield, AlertCircle, CheckCircle } from 'lucide-react'

interface Respuesta {
  pregunta: number
  valor: number
}

export default function TestPage() {
  const router = useRouter()
  const [pasoActual, setPasoActual] = useState(0)
  const [respuestas, setRespuestas] = useState<Respuesta[]>([])
  const [resultado, setResultado] = useState<any>(null)

  const preguntas = [
    {
      categoria: 'Gestión de Deudas',
      pregunta: '¿Cuál es tu situación actual con las deudas?',
      opciones: [
        { texto: 'No tengo deudas', valor: 10 },
        { texto: 'Tengo deudas pero las gestiono bien y las estoy pagando', valor: 7 },
        { texto: 'Tengo algunas deudas que me preocupan', valor: 4 },
        { texto: 'Tengo muchas deudas y me cuesta pagarlas', valor: 1 }
      ]
    },
    {
      categoria: 'Ahorro',
      pregunta: '¿Qué porcentaje de tus ingresos ahorras mensualmente?',
      opciones: [
        { texto: 'Más del 20%', valor: 10 },
        { texto: 'Entre 10% y 20%', valor: 8 },
        { texto: 'Entre 5% y 10%', valor: 5 },
        { texto: 'Menos del 5% o nada', valor: 2 }
      ]
    },
    {
      categoria: 'Fondo de Emergencia',
      pregunta: '¿Tienes un fondo de emergencia?',
      opciones: [
        { texto: 'Sí, tengo más de 6 meses de gastos ahorrados', valor: 10 },
        { texto: 'Sí, tengo entre 3 y 6 meses de gastos', valor: 7 },
        { texto: 'Sí, pero menos de 3 meses', valor: 4 },
        { texto: 'No tengo fondo de emergencia', valor: 1 }
      ]
    },
    {
      categoria: 'Planificación Financiera',
      pregunta: '¿Con qué frecuencia revisas y planificas tus finanzas?',
      opciones: [
        { texto: 'Mensualmente o más frecuente', valor: 10 },
        { texto: 'Trimestralmente', valor: 7 },
        { texto: 'Anualmente', valor: 4 },
        { texto: 'Nunca o casi nunca', valor: 1 }
      ]
    },
    {
      categoria: 'Conocimientos Financieros',
      pregunta: '¿Cómo calificarías tus conocimientos sobre finanzas personales?',
      opciones: [
        { texto: 'Muy buenos, me informo regularmente', valor: 10 },
        { texto: 'Buenos, tengo conocimientos básicos', valor: 7 },
        { texto: 'Regulares, sé lo básico', valor: 4 },
        { texto: 'Bajos, necesito aprender más', valor: 2 }
      ]
    },
    {
      categoria: 'Control de Gastos',
      pregunta: '¿Llevas un control de tus gastos?',
      opciones: [
        { texto: 'Sí, registro todos mis gastos detalladamente', valor: 10 },
        { texto: 'Sí, llevo un control general', valor: 7 },
        { texto: 'A veces, pero no de forma constante', valor: 4 },
        { texto: 'No, no controlo mis gastos', valor: 1 }
      ]
    },
    {
      categoria: 'Objetivos Financieros',
      pregunta: '¿Tienes objetivos financieros claros y definidos?',
      opciones: [
        { texto: 'Sí, tengo objetivos claros y un plan para alcanzarlos', valor: 10 },
        { texto: 'Sí, tengo algunos objetivos pero sin plan definido', valor: 6 },
        { texto: 'Tengo ideas vagas sobre mis objetivos', valor: 3 },
        { texto: 'No tengo objetivos financieros claros', valor: 1 }
      ]
    },
    {
      categoria: 'Inversiones',
      pregunta: '¿Inviertes parte de tus ahorros?',
      opciones: [
        { texto: 'Sí, invierto regularmente y diversifico', valor: 10 },
        { texto: 'Sí, tengo algunas inversiones', valor: 7 },
        { texto: 'He pensado en invertir pero no lo he hecho', valor: 3 },
        { texto: 'No invierto, solo ahorro', valor: 2 }
      ]
    },
    {
      categoria: 'Seguros y Protección',
      pregunta: '¿Tienes seguros adecuados (vida, salud, hogar)?',
      opciones: [
        { texto: 'Sí, tengo todos los seguros necesarios', valor: 10 },
        { texto: 'Tengo algunos seguros importantes', valor: 6 },
        { texto: 'Tengo seguros básicos', valor: 3 },
        { texto: 'No tengo seguros o son insuficientes', valor: 1 }
      ]
    },
    {
      categoria: 'Jubilación',
      pregunta: '¿Estás ahorrando o planificando para tu jubilación?',
      opciones: [
        { texto: 'Sí, tengo un plan de jubilación activo', valor: 10 },
        { texto: 'Sí, ahorro algo para la jubilación', valor: 6 },
        { texto: 'He pensado en ello pero no he empezado', valor: 3 },
        { texto: 'No he pensado en la jubilación', valor: 1 }
      ]
    }
  ]

  const seleccionarRespuesta = (valor: number) => {
    const nuevaRespuesta: Respuesta = {
      pregunta: pasoActual,
      valor
    }
    
    const nuevasRespuestas = [...respuestas]
    nuevasRespuestas[pasoActual] = nuevaRespuesta
    setRespuestas(nuevasRespuestas)

    if (pasoActual < preguntas.length - 1) {
      setPasoActual(pasoActual + 1)
    } else {
      calcularResultado(nuevasRespuestas)
    }
  }

  const calcularResultado = (respuestasCompletas: Respuesta[]) => {
    const puntuacionTotal = respuestasCompletas.reduce((sum, r) => sum + r.valor, 0)
    const puntuacionMaxima = preguntas.length * 10
    const porcentaje = (puntuacionTotal / puntuacionMaxima) * 100

    let nivel = ''
    let color = ''
    let icono = null
    let descripcion = ''
    let recomendaciones: string[] = []

    if (porcentaje >= 80) {
      nivel = 'Excelente'
      color = 'text-green-600'
      icono = <CheckCircle className="w-12 h-12 text-green-600" />
      descripcion = 'Tienes una salud financiera excelente. Mantén tus buenos hábitos y continúa mejorando.'
      recomendaciones = [
        'Continúa diversificando tus inversiones',
        'Mantén tu fondo de emergencia actualizado',
        'Considera asesoramiento profesional para optimizar aún más',
        'Ayuda a otros a mejorar su salud financiera'
      ]
    } else if (porcentaje >= 65) {
      nivel = 'Buena'
      color = 'text-blue-600'
      icono = <TrendingUp className="w-12 h-12 text-blue-600" />
      descripcion = 'Tienes una buena base financiera. Hay áreas de mejora que pueden llevarte al siguiente nivel.'
      recomendaciones = [
        'Aumenta tu porcentaje de ahorro mensual',
        'Crea o mejora tu fondo de emergencia',
        'Diversifica tus inversiones si aún no lo has hecho',
        'Establece objetivos financieros más específicos'
      ]
    } else if (porcentaje >= 50) {
      nivel = 'Regular'
      color = 'text-yellow-600'
      icono = <AlertCircle className="w-12 h-12 text-yellow-600" />
      descripcion = 'Tu salud financiera es regular. Hay varias áreas que necesitan atención para mejorar tu situación.'
      recomendaciones = [
        'Crea un presupuesto mensual y cúmplelo',
        'Comienza a construir un fondo de emergencia',
        'Reduce tus deudas de alta prioridad',
        'Educa sobre finanzas personales',
        'Establece objetivos financieros claros'
      ]
    } else {
      nivel = 'Necesita Mejora'
      color = 'text-red-600'
      icono = <TrendingDown className="w-12 h-12 text-red-600" />
      descripcion = 'Tu salud financiera necesita atención inmediata. Con pequeños cambios puedes mejorar significativamente.'
      recomendaciones = [
        'Prioriza el pago de deudas de alto interés',
        'Crea un presupuesto básico y controla tus gastos',
        'Comienza a ahorrar aunque sea una pequeña cantidad',
        'Busca educación financiera gratuita',
        'Considera asesoramiento profesional',
        'Establece un fondo de emergencia como prioridad'
      ]
    }

    // Calcular puntuaciones por categoría
    const categorias = preguntas.map((p, i) => ({
      nombre: p.categoria,
      puntuacion: respuestasCompletas[i]?.valor || 0,
      maximo: 10
    }))

    setResultado({
      puntuacionTotal,
      puntuacionMaxima,
      porcentaje: porcentaje.toFixed(1),
      nivel,
      color,
      icono,
      descripcion,
      recomendaciones,
      categorias
    })
  }

  const reiniciarTest = () => {
    setPasoActual(0)
    setRespuestas([])
    setResultado(null)
  }

  if (resultado) {
    return (
      <div className="min-h-screen bg-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900">
            Resultados del Test
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Tu salud financiera ha sido evaluada
          </p>

          {/* Resultado Principal */}
          <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg p-8 mb-8 text-center">
            <div className="flex justify-center mb-4">
              {resultado.icono}
            </div>
            <h2 className={`text-3xl font-bold mb-2 ${resultado.color}`}>
              {resultado.nivel}
            </h2>
            <div className="text-5xl font-bold text-gray-900 mb-2">
              {resultado.porcentaje}%
            </div>
            <p className="text-lg text-gray-700 mb-4">
              {resultado.descripcion}
            </p>
            <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
              <div
                className={`h-4 rounded-full transition-all ${
                  resultado.porcentaje >= 80 ? 'bg-green-600' :
                  resultado.porcentaje >= 65 ? 'bg-blue-600' :
                  resultado.porcentaje >= 50 ? 'bg-yellow-600' : 'bg-red-600'
                }`}
                style={{ width: `${resultado.porcentaje}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600">
              Puntuación: {resultado.puntuacionTotal} / {resultado.puntuacionMaxima}
            </p>
          </div>

          {/* Puntuaciones por Categoría */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Puntuación por Categoría</h3>
            <div className="space-y-4">
              {resultado.categorias.map((cat: any, index: number) => {
                const porcentajeCat = (cat.puntuacion / cat.maximo) * 100
                return (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">{cat.nombre}</span>
                      <span className="text-sm font-semibold text-gray-900">
                        {cat.puntuacion} / {cat.maximo}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${
                          porcentajeCat >= 80 ? 'bg-green-500' :
                          porcentajeCat >= 60 ? 'bg-blue-500' :
                          porcentajeCat >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${porcentajeCat}%` }}
                      ></div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Recomendaciones */}
          <div className="bg-primary-50 border border-primary-200 rounded-lg p-6 mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Target className="w-6 h-6 text-primary-600" />
              Recomendaciones para Mejorar
            </h3>
            <ul className="space-y-3">
              {resultado.recomendaciones.map((rec: string, index: number) => (
                <li key={index} className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{rec}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Botones */}
          <div className="flex gap-4 justify-center">
            <button
              onClick={reiniciarTest}
              className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors font-semibold"
            >
              Realizar Test Nuevamente
            </button>
            <button
              onClick={() => router.push('/dashboard')}
              className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors font-semibold"
            >
              Ir al Dashboard
            </button>
          </div>
        </div>
      </div>
    )
  }

  const preguntaActual = preguntas[pasoActual]

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900">
          Test de Personalidad Financiera
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Descubre tu salud financiera respondiendo a estas preguntas
        </p>

        {/* Barra de Progreso */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Pregunta {pasoActual + 1} de {preguntas.length}</span>
            <span>{Math.round(((pasoActual + 1) / preguntas.length) * 100)}% completado</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-primary-600 h-3 rounded-full transition-all"
              style={{ width: `${((pasoActual + 1) / preguntas.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Pregunta Actual */}
        <div className="bg-gray-50 rounded-lg p-8 mb-6">
          <div className="mb-4">
            <span className="text-sm font-semibold text-primary-600 uppercase tracking-wide">
              {preguntaActual.categoria}
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {preguntaActual.pregunta}
          </h2>

          <div className="space-y-3">
            {preguntaActual.opciones.map((opcion, index) => (
              <button
                key={index}
                onClick={() => seleccionarRespuesta(opcion.valor)}
                className="w-full text-left p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-primary-600 hover:bg-primary-50 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-gray-900 font-medium">{opcion.texto}</span>
                  <DollarSign className="w-5 h-5 text-primary-600" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Navegación */}
        {pasoActual > 0 && (
          <div className="text-center">
            <button
              onClick={() => setPasoActual(pasoActual - 1)}
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              ← Anterior
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
