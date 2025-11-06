import { createClient } from '@/lib/supabase/server'
import { PostCard } from './PostCard'

export async function PostList() {
  const supabase = await createClient()

  // Obtener todas las publicaciones con información del usuario
  const { data: posts, error } = await supabase
    .from('posts')
    .select(`
      *,
      profiles:user_id (
        id,
        full_name,
        email
      )
    `)
    .order('created_at', { ascending: false })
    .limit(50)

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        Error al cargar las publicaciones: {error.message}
      </div>
    )
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <p className="text-gray-600">Aún no hay publicaciones. ¡Sé el primero en publicar!</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {posts.map((post: any) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}

