'use client'

import { Heart, MessageCircle } from 'lucide-react'
import { useState } from 'react'

interface PostCardProps {
  post: {
    id: string
    title: string
    content: string
    created_at: string
    profile?: {
      id: string
      full_name: string | null
      email: string | null
      avatar_url?: string | null
    }
  }
}

export function PostCard({ post }: PostCardProps) {
  const [likes, setLikes] = useState(0)

  const handleLike = async () => {
    // Aquí podrías implementar un sistema de likes más completo usando la API
    // Por ahora solo actualizamos el estado local
    setLikes(likes + 1)
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h3>
          <p className="text-sm text-gray-600">
            Por {post.profile?.full_name || post.profile?.email || 'Usuario'}
          </p>
        </div>
        <span className="text-xs text-gray-400">
          {new Date(post.created_at).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
      </div>
      
      <p className="text-gray-700 mb-4 whitespace-pre-wrap">{post.content}</p>
      
      <div className="flex items-center gap-4 pt-4 border-t">
        <button
          onClick={handleLike}
          className="flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors"
        >
          <Heart className="w-5 h-5" />
          <span>{likes}</span>
        </button>
        <button className="flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors">
          <MessageCircle className="w-5 h-5" />
          <span>Comentar</span>
        </button>
      </div>
    </div>
  )
}
