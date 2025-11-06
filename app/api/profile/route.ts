import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { updateProfile, createProfile } from '@/lib/db/profiles'

export async function PUT(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      )
    }

    const { full_name } = await request.json()

    await updateProfile(user.id, { full_name })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error actualizando perfil:', error)
    return NextResponse.json(
      { error: error.message || 'Error al actualizar el perfil' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { id, email, full_name } = await request.json()

    if (!id || !email) {
      return NextResponse.json(
        { error: 'ID y email son requeridos' },
        { status: 400 }
      )
    }

    await createProfile({
      id,
      email,
      full_name,
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error creando perfil:', error)
    return NextResponse.json(
      { error: error.message || 'Error al crear el perfil' },
      { status: 500 }
    )
  }
}
