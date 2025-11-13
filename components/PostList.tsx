import { PostCard } from './PostCard'
import { getPosts } from '@/lib/db/posts'
import { getCurrentUser } from '@/lib/auth'

export async function PostList() {
  try {
    const user = await getCurrentUser()
    // Obtener todas las publicaciones con información del usuario desde MongoDB
    const posts = await getPosts(50, user?.id)

    if (!posts || posts.length === 0) {
      return (
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <p className="text-gray-600">Aún no hay publicaciones. ¡Sé el primero en publicar!</p>
        </div>
      )
    }

    return (
      <div className="space-y-6">
        {posts.map((post) => (
          <PostCard 
            key={post.id} 
            post={{ 
              ...post, 
              created_at: post.created_at instanceof Date 
                ? post.created_at.toISOString() 
                : post.created_at 
            }} 
          />
        ))}
      </div>
    )
  } catch (error: any) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        Error al cargar las publicaciones: {error.message}
      </div>
    )
  }
}
