import { NextRequest, NextResponse } from 'next/server'
import Profile from '@/lib/models/Profile'
import connectDB from '@/lib/mongodb'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get('token')

    if (!token) {
      return NextResponse.json(
        { error: 'Token de verificación no proporcionado' },
        { status: 400 }
      )
    }

    await connectDB()

    const profile = await Profile.findOne({ verification_token: token })

    if (!profile) {
      return NextResponse.json(
        { error: 'Token de verificación no válido o ya utilizado' },
        { status: 400 }
      )
    }

    profile.is_verified = true
    profile.verification_token = null
    await profile.save()

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error verificando cuenta:', error)
    return NextResponse.json(
      { error: error.message || 'Error al verificar la cuenta' },
      { status: 500 }
    )
  }
}


