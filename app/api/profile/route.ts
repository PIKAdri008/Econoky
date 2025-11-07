import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { updateProfile } from '@/lib/db/profiles'

export async function PUT(request: NextRequest) {
  try {
    const user = await getCurrentUser()

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

