import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const sessionId = searchParams.get('session_id')

  if (!sessionId) {
    redirect('/plans?error=missing_session')
  }

  try {
    // Obtener la sesión de Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    if (!session || !session.client_reference_id) {
      redirect('/plans?error=invalid_session')
    }

    const userId = session.client_reference_id
    const supabase = await createClient()

    // Actualizar el perfil del usuario a suscripción Pro
    const { error } = await supabase
      .from('profiles')
      .update({
        subscription_status: 'pro',
        stripe_customer_id: session.customer as string,
        stripe_subscription_id: session.subscription as string,
      })
      .eq('id', userId)

    if (error) {
      console.error('Error actualizando perfil:', error)
      redirect('/plans?error=update_failed')
    }

    redirect('/dashboard?success=subscription_active')
  } catch (error: any) {
    console.error('Error procesando éxito de pago:', error)
    redirect('/plans?error=processing_failed')
  }
}

