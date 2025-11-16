'use client'

import { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { User } from '@/core/domain/entities/User'
import { makeUserUseCases } from '@/core/factories/makeUserUseCases'
import { LoginUser } from '@/core/domain/use-cases/LoginUser'
import { RegisterUser } from '@/core/domain/use-cases/RegisterUser'

type AuthContextType = {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  signIn: (params: LoginUser.Params) => Promise<void>
  signUp: (params: RegisterUser.Params) => Promise<void>
  signOut: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  const { loginUser, registerUser } = makeUserUseCases()

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('buildmart:user')
      if (storedUser) {
        // Recria a entidade User a partir dos dados do localStorage
        const userData = JSON.parse(storedUser)
        const userInstance = User.create(
          userData.id,
          userData.name,
          userData.email,
          userData.password,
        )
        setUser(userInstance)
      }
    } catch (error) {
      console.error('Falha ao carregar usuário do localStorage', error)
      localStorage.removeItem('buildmart:user')
    }
    setIsLoading(false)
  }, [])

  const signIn = async (params: LoginUser.Params) => {
    try {
      const loggedUser = await loginUser.execute(params)
      setUser(loggedUser)
      localStorage.setItem('buildmart:user', JSON.stringify(loggedUser))
      router.push('/admin/produtos') 
    } catch (error: any) {
      alert(`Falha no login: ${error.message}`) 
    }
  }

  const signUp = async (params: RegisterUser.Params) => {
    try {
      await registerUser.execute(params)
      await signIn({ email: params.email, password: params.password })
    } catch (error: any) {
      alert(`Falha no cadastro: ${error.message}`)
    }
  }

  const signOut = () => {
    setUser(null)
    localStorage.removeItem('buildmart:user')
    router.push('/login')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }
  return context
}