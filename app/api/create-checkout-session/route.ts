import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const { priceId, userId } = await request.json()

    if (!priceId || !userId) {
      return NextResponse.json(
        { error: 'Faltan parámetros requeridos' },
        { status: 400 }
      )
    }

    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user || user.id !== userId) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      )
    }

    // Crear sesión de checkout en Stripe
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/stripe/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/plans?canceled=true`,
      client_reference_id: userId,
      metadata: {
        userId,
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error: any) {
    console.error('Error creando sesión de checkout:', error)
    return NextResponse.json(
      { error: error.message || 'Error al crear la sesión de checkout' },
      { status: 500 }
    )
  }
}

