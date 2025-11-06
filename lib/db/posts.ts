import Post, { IPost } from '@/lib/models/Post'
import Profile from '@/lib/models/Profile'
import connectDB from '@/lib/mongodb'

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
  await connectDB()
  
  // Usar agregación para obtener posts con información del perfil
  const posts = await Post.aggregate([
    {
      $sort: { created_at: -1 }
    },
    {
      $limit: limit
    },
    {
      $lookup: {
        from: 'profiles',
        localField: 'user_id',
        foreignField: 'id',
        as: 'profile'
      }
    },
    {
      $unwind: {
        path: '$profile',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $project: {
        _id: 0,
        id: { $toString: '$_id' },
        user_id: 1,
        title: 1,
        content: 1,
        created_at: 1,
        updated_at: 1,
        profile: {
          id: '$profile.id',
          full_name: '$profile.full_name',
          email: '$profile.email'
        }
      }
    }
  ])

  return posts.map((post: any) => ({
    id: post.id,
    user_id: post.user_id,
    title: post.title,
    content: post.content,
    created_at: post.created_at,
    updated_at: post.updated_at,
    profile: post.profile || undefined,
  }))
}

export async function getPostById(postId: string): Promise<Post | null> {
  await connectDB()
  const post = await Post.findById(postId).lean()
  
  if (!post) return null

  return {
    id: post._id.toString(),
    user_id: post.user_id,
    title: post.title,
    content: post.content,
    created_at: post.created_at,
    updated_at: post.updated_at,
  }
}

export async function getPostsByUserId(userId: string, limit: number = 10): Promise<Post[]> {
  await connectDB()
  const posts = await Post.find({ user_id: userId })
    .sort({ created_at: -1 })
    .limit(limit)
    .lean()

  return posts.map((post: any) => ({
    id: post._id.toString(),
    user_id: post.user_id,
    title: post.title,
    content: post.content,
    created_at: post.created_at,
    updated_at: post.updated_at,
  }))
}

export async function likePost(postId: string): Promise<void> {
  await connectDB()
  await Post.updateOne(
    { _id: postId },
    { $inc: { likes: 1 } }
  )
}

export async function createPost(data: {
  user_id: string
  title: string
  content: string
}): Promise<string> {
  await connectDB()
  const post = await Post.create({
    user_id: data.user_id,
    title: data.title,
    content: data.content,
  })
  
  return post._id.toString()
}

export async function updatePost(
  postId: string,
  userId: string,
  data: { title?: string; content?: string }
): Promise<void> {
  await connectDB()
  await Post.updateOne(
    { _id: postId, user_id: userId },
    { $set: data }
  )
}

export async function deletePost(postId: string, userId: string): Promise<void> {
  await connectDB()
  await Post.deleteOne({ _id: postId, user_id: userId })
}
