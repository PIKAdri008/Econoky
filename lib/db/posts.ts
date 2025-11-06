import { query, queryOne, execute } from '@/lib/mysql'
import { v4 as uuidv4 } from 'uuid'

export interface Post {
  id: string
  user_id: string
  title: string
  content: string
  created_at: Date
  updated_at: Date
}

export interface PostWithProfile {
  id: string
  user_id: string
  title: string
  content: string
  created_at: Date
  updated_at: Date
  profile?: {
    id: string
    full_name: string | null
    email: string | null
  }
}

export async function getPosts(limit: number = 50): Promise<PostWithProfile[]> {
  const posts = await query<Post & { full_name: string | null; email: string | null }>(
    `SELECT p.*, pr.full_name, pr.email
     FROM posts p
     LEFT JOIN profiles pr ON p.user_id = pr.id
     ORDER BY p.created_at DESC
     LIMIT ?`,
    [limit]
  )

  return posts.map(post => ({
    id: post.id,
    user_id: post.user_id,
    title: post.title,
    content: post.content,
    created_at: post.created_at,
    updated_at: post.updated_at,
    profile: {
      id: post.user_id,
      full_name: post.full_name,
      email: post.email,
    },
  }))
}

export async function getPostById(postId: string): Promise<Post | null> {
  return queryOne<Post>(
    'SELECT * FROM posts WHERE id = ?',
    [postId]
  )
}

export async function getPostsByUserId(userId: string, limit: number = 10): Promise<Post[]> {
  return query<Post>(
    `SELECT * FROM posts 
     WHERE user_id = ? 
     ORDER BY created_at DESC 
     LIMIT ?`,
    [userId, limit]
  )
}

export async function createPost(data: {
  user_id: string
  title: string
  content: string
}): Promise<string> {
  const id = uuidv4()
  await execute(
    `INSERT INTO posts (id, user_id, title, content)
     VALUES (?, ?, ?, ?)`,
    [id, data.user_id, data.title, data.content]
  )
  return id
}

export async function updatePost(
  postId: string,
  userId: string,
  data: { title?: string; content?: string }
): Promise<void> {
  const fields: string[] = []
  const values: any[] = []

  if (data.title !== undefined) {
    fields.push('title = ?')
    values.push(data.title)
  }
  if (data.content !== undefined) {
    fields.push('content = ?')
    values.push(data.content)
  }

  if (fields.length === 0) return

  values.push(postId, userId)
  await execute(
    `UPDATE posts SET ${fields.join(', ')} WHERE id = ? AND user_id = ?`,
    values
  )
}

export async function deletePost(postId: string, userId: string): Promise<void> {
  await execute(
    'DELETE FROM posts WHERE id = ? AND user_id = ?',
    [postId, userId]
  )
}

