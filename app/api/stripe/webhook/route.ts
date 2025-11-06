import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createClient } from '@/lib/supabase/server'
import Stripe from 'stripe'

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json(
      { error: 'Falta la firma de Stripe' },
      { status: 400 }
    )
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (error: any) {
    console.error('Error verificando webhook:', error.message)
    return NextResponse.json(
      { error: `Webhook Error: ${error.message}` },
      { status: 400 }
    )
  }

  try {
    const supabase = await createClient()

    // Manejar diferentes tipos de eventos
    switch (event.type) {
      case 'customer.subscription.deleted':
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        const customerId = subscription.customer as string

        // Buscar usuario por customer_id
        const { data: profiles } = await supabase
          .from('profiles')
          .select('id')
          .eq('stripe_customer_id', customerId)
          .single()

        if (profiles) {
          const subscriptionStatus = subscription.status === 'active' ? 'pro' : 'free'

          await supabase
            .from('profiles')
            .update({
              subscription_status: subscriptionStatus,
              stripe_subscription_id: subscription.id,
            })
            .eq('id', profiles.id)
        }
        break
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice
        const customerId = invoice.customer as string

        // Aquí podrías actualizar el saldo del usuario o hacer otras acciones
        // Por ahora solo registramos el evento
        console.log('Pago exitoso para cliente:', customerId)
        break
      }

      default:
        console.log(`Evento no manejado: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error: any) {
    console.error('Error procesando webhook:', error)
    return NextResponse.json(
      { error: 'Error procesando webhook' },
      { status: 500 }
    )
  }
}

