'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { setCookie } from 'nookies'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (password === 'Rajada01') {
      // Store login state with cookie
      setCookie(null, 'adminLoggedIn', 'true', {
        maxAge: 30 * 24 * 60 * 60, // 30 days
        sameSite: true,
        path: '/',
      })
      router.push('/painel')
    } else {
      setError('Senha incorreta!')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-sm p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Painel Administrativo</h1>
          <p className="mt-2 text-gray-600">Entre com sua senha para acessar</p>
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Senha de Acesso
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Digite a senha de acesso"
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Acessar Painel
          </button>
        </form>
        
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Senha padrão: Rajada01</p>
        </div>
      </div>
    </div>
  )
}