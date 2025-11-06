import { query, execute } from '@/lib/mysql'
import { v4 as uuidv4 } from 'uuid'

export interface Transaction {
  id: string
  user_id: string
  amount: number
  type: 'income' | 'expense' | 'subscription' | 'refund'
  description: string | null
  created_at: Date
}

export async function getTransactionsByUserId(
  userId: string,
  limit: number = 50
): Promise<Transaction[]> {
  return query<Transaction>(
    `SELECT * FROM transactions 
     WHERE user_id = ? 
     ORDER BY created_at DESC 
     LIMIT ?`,
    [userId, limit]
  )
}

export async function createTransaction(data: {
  user_id: string
  amount: number
  type: 'income' | 'expense' | 'subscription' | 'refund'
  description?: string
}): Promise<string> {
  const id = uuidv4()
  await execute(
    `INSERT INTO transactions (id, user_id, amount, type, description)
     VALUES (?, ?, ?, ?, ?)`,
    [id, data.user_id, data.amount, data.type, data.description || null]
  )
  return id
}

