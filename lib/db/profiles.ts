import Profile, { IProfile } from '@/lib/models/Profile'
import connectDB from '@/lib/mongodb'

export interface Profile {
  id: string
  email: string | null
  full_name: string | null
  avatar_url?: string | null
  bio?: string | null
  balance: number
  subscription_status: 'free' | 'pro'
  stripe_customer_id: string | null
  stripe_subscription_id: string | null
  role?: 'user' | 'admin'
  stats?: {
    posts_count: number
    followers_count: number
    following_count: number
  }
  created_at: Date
  updated_at: Date
}

export async function getProfile(userId: string): Promise<Profile | null> {
  await connectDB()
  const profile = await Profile.findById(userId).select('-password').lean()
  
  if (!profile) return null

  return {
    id: profile._id!.toString(),
    email: profile.email,
    full_name: profile.full_name || null,
    avatar_url: profile.avatar_url || null,
    bio: profile.bio || null,
    balance: profile.balance,
    subscription_status: profile.subscription_status,
    stripe_customer_id: profile.stripe_customer_id || null,
    stripe_subscription_id: profile.stripe_subscription_id || null,
    role: profile.role || 'user',
    stats: profile.stats || {
      posts_count: 0,
      followers_count: 0,
      following_count: 0,
    },
    created_at: profile.created_at,
    updated_at: profile.updated_at,
  }
}

export async function createProfile(data: {
  email: string
  password: string
  full_name?: string
}): Promise<string> {
  await connectDB()
  const { hashPassword } = await import('@/lib/auth')
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
  
  return profile._id.toString()
}

export async function updateProfile(
  userId: string,
  data: Partial<{
    full_name: string
    avatar_url: string
    bio: string
    balance: number
    subscription_status: 'free' | 'pro'
    stripe_customer_id: string
    stripe_subscription_id: string
    role: 'user' | 'admin'
    stats: {
      posts_count: number
      followers_count: number
      following_count: number
    }
  }>
): Promise<void> {
  await connectDB()
  await Profile.findByIdAndUpdate(userId, { $set: data })
}

export async function getAllUsers(): Promise<Profile[]> {
  await connectDB()
  const profiles = await Profile.find().select('-password').lean()
  
  return profiles.map((profile: any) => ({
    id: profile._id.toString(),
    email: profile.email,
    full_name: profile.full_name || null,
    avatar_url: profile.avatar_url || null,
    bio: profile.bio || null,
    balance: profile.balance,
    subscription_status: profile.subscription_status,
    stripe_customer_id: profile.stripe_customer_id || null,
    stripe_subscription_id: profile.stripe_subscription_id || null,
    role: profile.role || 'user',
    stats: profile.stats || {
      posts_count: 0,
      followers_count: 0,
      following_count: 0,
    },
    created_at: profile.created_at,
    updated_at: profile.updated_at,
  }))
}

export async function deleteUser(userId: string): Promise<void> {
  await connectDB()
  await Profile.deleteOne({ _id: userId })
}
