import Profile from '@/lib/models/Profile'
import connectDB from '@/lib/mongodb'
import { hashPassword, verifyPassword, generateToken } from '@/lib/auth'

export async function registerUser(data: {
  email: string
  password: string
  full_name?: string
}): Promise<{ user: any; token: string }> {
  await connectDB()

  // Verificar si el usuario ya existe
  const existingUser = await Profile.findOne({ email: data.email.toLowerCase() })
  if (existingUser) {
    throw new Error('El email ya está registrado')
  }

  // Crear nuevo usuario
  const hashedPassword = await hashPassword(data.password)
  const profile = await Profile.create({
    email: data.email.toLowerCase(),
    password: hashedPassword,
    full_name: data.full_name,
    balance: 0.0,
    subscription_status: 'free',
    stats: {
      posts_count: 0,
      followers_count: 0,
      following_count: 0,
    },
  })

  const token = generateToken(profile._id.toString(), profile.email)

  return {
    user: {
      id: profile._id.toString(),
      email: profile.email,
      full_name: profile.full_name,
    },
    token,
  }
}

export async function loginUser(email: string, password: string): Promise<{ user: any; token: string }> {
  await connectDB()

  const profile = await Profile.findOne({ email: email.toLowerCase() }).select('+password')
  if (!profile) {
    throw new Error('Email o contraseña incorrectos')
  }

  const isValid = await verifyPassword(password, profile.password)
  if (!isValid) {
    throw new Error('Email o contraseña incorrectos')
  }

  const token = generateToken(profile._id.toString(), profile.email)

  return {
    user: {
      id: profile._id.toString(),
      email: profile.email,
      full_name: profile.full_name,
    },
    token,
  }
}

