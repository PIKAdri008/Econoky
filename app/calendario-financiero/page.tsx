'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { Calendar as CalendarIcon, Loader2, RefreshCcw } from 'lucide-react'

const API_BASE = 'https://fincalapi.com'

const CALENDARS = {
  impuestos: {
    label: 'Pago impuestos',
    description: 'Declaración de la renta y recordatorios fiscales clave.',
    apiCalendar: 'SIFMA-US',
  },
  autonomos: {
    label: 'Autónomos',
    description: 'Pagos periódicos a la seguridad social y obligaciones trimestrales.',
    apiCalendar: 'NYSE',
  },
  familias: {
    label: 'Familias',
    description: 'Festivos y días no laborables para planificar finanzas del hogar.',
    apiCalendar: 'NASDAQ',
  },
} as const

type CalendarType = keyof typeof CALENDARS

type Holiday = {
  name: string
  date: string
  status?: string
  closing_time?: string | null
  description?: string
}

const formatCurrencyDate = (date: Date) =>
  date.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })

const formatISODate = (date: Date) => date.toISOString().split('T')[0]

export default function CalendarioFinancieroPage() {
  const [calendarType, setCalendarType] = useState<CalendarType>('impuestos')
  const [currentDate, setCurrentDate] = useState(() => new Date())
  const [events, setEvents] = useState<Holiday[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const monthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
  const monthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)

  const fetchEvents = useCallback(async () => {
    const { apiCalendar } = CALENDARS[calendarType]
    const start = formatISODate(monthStart)
    const end = formatISODate(monthEnd)

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(
        `${API_BASE}/holidays/range?calendar=${apiCalendar}&start=${start}&end=${end}`
      )

      if (!response.ok) {
        throw new Error('Error al conectar con la API de calendario')
      }

      const data = await response.json()
      setEvents(Array.isArray(data?.holidays) ? data.holidays : [])
    } catch (err) {
      console.error(err)
      setError('No pudimos actualizar el calendario financiero. Inténtalo nuevamente.')
    } finally {
      setLoading(false)
    }
  }, [calendarType, monthStart, monthEnd])

  useEffect(() => {
    fetchEvents()
  }, [fetchEvents])

  const daysMatrix = useMemo(() => {
    const days: Array<{ date: Date; inMonth: boolean }> = []
    const firstWeekDay = (monthStart.getDay() + 6) % 7 // Lunes = 0

    for (let i = firstWeekDay - 1; i >= 0; i--) {
      const date = new Date(monthStart)
      date.setDate(date.getDate() - (i + 1))
      days.push({ date, inMonth: false })
    }

    for (let i = 0; i < monthEnd.getDate(); i++) {
      const date = new Date(monthStart)
      date.setDate(date.getDate() + i)
      days.push({ date, inMonth: true })
    }

    while (days.length % 7 !== 0) {
      const date = new Date(monthEnd)
      date.setDate(date.getDate() + (days.length % 7))
      days.push({ date, inMonth: false })
    }

    return days
  }, [monthStart, monthEnd])

  const eventsByDate = useMemo(() => {
    const map = new Map<string, Holiday[]>()
    events.forEach(event => {
      const list = map.get(event.date) || []
      list.push(event)
      map.set(event.date, list)
    })
    return map
  }, [events])

  const handleMonthChange = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev)
      newDate.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1))
      return newDate
    })
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#eef4ff] to-white py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-10">
        <header className="bg-white/80 backdrop-blur rounded-3xl border border-white/60 shadow-glow-primary p-8 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-primary-500 font-semibold">
                Herramienta inteligente
              </p>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Calendario financiero</h1>
              <p className="text-gray-600 max-w-2xl">
                Organiza tus obligaciones fiscales y personales con un calendario conectado a la API
                de{' '}
                <a
                  href="https://fincalapi.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary-600 underline decoration-dotted"
                >
                  fincalapi.com
                </a>
                . Cambia entre modos para impuestos, autónomos o familias.
              </p>
            </div>
            <div className="flex items-center gap-3 bg-primary-50 text-primary-700 rounded-2xl px-5 py-4">
              <CalendarIcon className="w-10 h-10" />
              <div>
                <p className="font-semibold text-lg">{formatCurrencyDate(currentDate)}</p>
                <p className="text-sm text-primary-500">Eventos sincronizados</p>
              </div>
            </div>
          </div>
        </header>

        <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
          <div className="space-y-6">
            <div className="flex flex-wrap gap-3">
              {(Object.keys(CALENDARS) as CalendarType[]).map(type => (
                <button
                  key={type}
                  onClick={() => setCalendarType(type)}
                  className={`rounded-2xl px-5 py-3 text-sm font-semibold transition-all border ${
                    calendarType === type
                      ? 'bg-primary-600 text-white shadow-glow-primary border-primary-600'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-primary-300'
                  }`}
                >
                  {CALENDARS[type].label}
                </button>
              ))}
            </div>
            <p className="text-gray-600">{CALENDARS[calendarType].description}</p>

            <div className="bg-white rounded-3xl border border-white/60 shadow-glow-primary overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleMonthChange('prev')}
                    className="text-gray-500 hover:text-primary-600 transition-colors"
                  >
                    ←
                  </button>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {formatCurrencyDate(currentDate)}
                  </h2>
                  <button
                    onClick={() => handleMonthChange('next')}
                    className="text-gray-500 hover:text-primary-600 transition-colors"
                  >
                    →
                  </button>
                </div>
                <button
                  onClick={() => fetchEvents()}
                  className="flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700"
                >
                  <RefreshCcw className="w-4 h-4" />
                  Actualizar
                </button>
              </div>

              <div className="grid grid-cols-7 text-center text-xs font-semibold text-gray-500 uppercase tracking-wide py-3 border-b border-gray-100">
                {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map(day => (
                  <span key={day}>{day}</span>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-px bg-gray-100">
                {daysMatrix.map(({ date, inMonth }) => {
                  const isoDate = formatISODate(date)
                  const dateEvents = eventsByDate.get(isoDate) || []

                  return (
                    <div
                      key={isoDate + inMonth}
                      className={`min-h-[110px] bg-white p-3 flex flex-col rounded-none ${
                        inMonth ? 'text-gray-900' : 'text-gray-400'
                      }`}
                    >
                      <span className="text-sm font-semibold">{date.getDate()}</span>

                      <div className="mt-2 space-y-2">
                        {dateEvents.slice(0, 2).map((event, index) => (
                          <div
                            key={event.name + index}
                            className="text-xs bg-primary-50 text-primary-700 px-2 py-1 rounded-xl"
                          >
                            {event.name}
                          </div>
                        ))}
                        {dateEvents.length > 2 && (
                          <p className="text-[11px] text-primary-500">
                            +{dateEvents.length - 2} eventos
                          </p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="px-6 py-4 text-sm text-gray-500 border-t border-gray-100 flex items-center gap-2">
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sincronizando con fincalapi.com...
                  </>
                ) : error ? (
                  <span className="text-red-500">{error}</span>
                ) : (
                  <>Eventos actualizados automáticamente cada vez que cambias de mes o modo.</>
                )}
              </div>
            </div>
          </div>

          <aside className="space-y-4">
            <div className="bg-gradient-to-br from-primary-600 to-primary-500 text-white rounded-3xl p-6 shadow-xl">
              <p className="text-sm uppercase tracking-[0.3em] mb-2">Resumen</p>
              <h3 className="text-2xl font-bold mb-1">Eventos destacados</h3>
              <p className="text-primary-100 text-sm">
                Cada tarjeta incluye el nombre y el estado reportado por fincalapi.
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-white/60 shadow-glow-primary max-h-[600px] overflow-y-auto divide-y divide-gray-100">
              {events.length === 0 && !loading ? (
                <div className="p-6 text-gray-500">
                  No hay eventos registrados para este mes en el calendario seleccionado.
                </div>
              ) : (
                events.map(event => (
                  <div key={event.date + event.name} className="p-5">
                    <p className="text-sm text-gray-500">
                      {new Date(event.date).toLocaleDateString('es-ES', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long',
                      })}
                    </p>
                    <p className="text-lg font-semibold text-gray-900">{event.name}</p>
                    <p className="text-sm text-gray-500 capitalize">
                      {event.status?.replace(/_/g, ' ') || 'Evento financiero'}
                    </p>
                    {event.description && (
                      <p className="mt-2 text-sm text-gray-600">{event.description}</p>
                    )}
                  </div>
                ))
              )}
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}


