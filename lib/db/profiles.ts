import { query, queryOne, execute } from '@/lib/mysql'
import { v4 as uuidv4 } from 'uuid'

export interface Profile {
  id: string
  email: string | null
  full_name: string | null
  balance: number
  subscription_status: 'free' | 'pro'
  stripe_customer_id: string | null
  stripe_subscription_id: string | null
  created_at: Date
  updated_at: Date
}

export async function getProfile(userId: string): Promise<Profile | null> {
  return queryOne<Profile>(
    'SELECT * FROM profiles WHERE id = ?',
    [userId]
  )
}

export async function createProfile(data: {
  id: string
  email: string
  full_name?: string
}): Promise<void> {
  await execute(
    `INSERT INTO profiles (id, email, full_name, balance, subscription_status)
     VALUES (?, ?, ?, 0.00, 'free')`,
    [data.id, data.email, data.full_name || null]
  )
}

export async function updateProfile(
  userId: string,
  data: Partial<{
    full_name: string
    balance: number
    subscription_status: 'free' | 'pro'
    stripe_customer_id: string
    stripe_subscription_id: string
  }>
): Promise<void> {
  const fields: string[] = []
  const values: any[] = []

  if (data.full_name !== undefined) {
    fields.push('full_name = ?')
    values.push(data.full_name)
  }
  if (data.balance !== undefined) {
    fields.push('balance = ?')
    values.push(data.balance)
  }
  if (data.subscription_status !== undefined) {
    fields.push('subscription_status = ?')
    values.push(data.subscription_status)
  }
  if (data.stripe_customer_id !== undefined) {
    fields.push('stripe_customer_id = ?')
    values.push(data.stripe_customer_id)
  }
  if (data.stripe_subscription_id !== undefined) {
    fields.push('stripe_subscription_id = ?')
    values.push(data.stripe_subscription_id)
  }

  if (fields.length === 0) return

  values.push(userId)
  await execute(
    `UPDATE profiles SET ${fields.join(', ')} WHERE id = ?`,
    values
  )
}

