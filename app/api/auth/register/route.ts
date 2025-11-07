import { NextRequest, NextResponse } from 'next/server'
import { registerUser } from '@/lib/db/auth'

export async function POST(request: NextRequest) {
  try {
    const { email, password, full_name } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email y contraseña son requeridos' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'La contraseña debe tener al menos 6 caracteres' },
        { status: 400 }
      )
    }

    const { user } = await registerUser({
      email,
      password,
      full_name,
    })

    return NextResponse.json({ user, success: true })
  } catch (error: any) {
    console.error('Error en registro:', error)
    return NextResponse.json(
      { error: error.message || 'Error al registrarse' },
      { status: 400 }
    )
  }
}

