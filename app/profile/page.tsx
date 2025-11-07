import { redirect } from 'next/navigation'
import { ProfileForm } from '@/components/ProfileForm'
import { getCurrentUser } from '@/lib/auth'
import { getProfile } from '@/lib/db/profiles'

export default async function ProfilePage() {
  const user = await getCurrentUser()
  
  if (!user) {
    redirect('/auth/login')
  }

  // Obtener perfil del usuario desde MongoDB
  const profile = await getProfile(user.id)

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Mi Perfil</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-bold mb-4">Información de la cuenta</h2>
        <div className="space-y-2">
          <p><span className="font-semibold">Email:</span> {user.email}</p>
          <p><span className="font-semibold">Saldo:</span> €{profile?.balance?.toFixed(2) || '0.00'}</p>
          <p><span className="font-semibold">Suscripción:</span> {profile?.subscription_status || 'Free'}</p>
        </div>
      </div>

      <ProfileForm profile={profile} />
    </div>
  )
}

