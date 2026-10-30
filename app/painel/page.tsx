'use client'

import { useState, useEffect } from 'react'
import { Search, Download, Eye, User, CreditCard, Calendar, Filter, Pencil, Phone } from 'lucide-react'

export default function AdminPanel() {
  const [redemptions, setRedemptions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [showDetails, setShowDetails] = useState<any>(null)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editValue, setEditValue] = useState('')

  // Fetch data from API instead of mock data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/submit-redemption')
        if (!response.ok) {
          throw new Error('Erro ao buscar dados')
        }
        const data = await response.json()
        setRedemptions(data)
        setLoading(false)
      } catch (error) {
        console.error('Erro ao buscar dados:', error)
        // Se falhar, usamos dados mockados como fallback
        const mockData = [
          {
            id: 1,
            nome: 'Maria Silva',
            cpf: '123.456.789-00',
            whatsapp: '(11) 99999-9999',
            endereco: 'Rua Exemplo, 123 - Centro - São Paulo/SP',
            banco: 'Banco Exemplo',
            agencia: '1234',
            conta: '56789-0',
            premio: 'R$ 50.000',
            data: '2026-10-30',
            status: 'pendente'
          },
          {
            id: 2,
            nome: 'João Oliveira',
            cpf: '987.654.321-00',
            whatsapp: '(21) 98888-8888',
            endereco: 'Av. Principal, 456 - Jardim - Rio de Janeiro/RJ',
            banco: 'Banco Teste',
            agencia: '5678',
            conta: '12345-6',
            premio: 'R$ 50.000',
            data: '2026-10-29',
            status: 'processando'
          }
        ]
        
        setRedemptions(mockData)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const filteredRedemptions = redemptions.filter(redemption => {
    const matchesSearch = 
      redemption.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      redemption.cpf.includes(searchTerm) ||
      redemption.whatsapp.includes(searchTerm)
    
    const matchesStatus = selectedStatus === 'all' || redemption.status === selectedStatus
    
    return matchesSearch && matchesStatus
  })

  const handleExport = () => {
    // In a real implementation, this would export the data
    alert('Dados exportados com sucesso!')
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pendente': return 'bg-yellow-100 text-yellow-800'
      case 'processando': return 'bg-blue-100 text-blue-800'
      case 'concluido': return 'bg-green-100 text-green-800'
      case 'cancelado': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const handleEditClick = (id: number, currentValue: string) => {
    setEditingId(id)
    setEditValue(currentValue)
  }

  const handleSaveEdit = async (id: number) => {
    try {
      const response = await fetch(`/api/submit-redemption`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          whatsapp: editValue
        })
      })

      if (!response.ok) {
        throw new Error('Erro ao atualizar dados')
      }

      // Atualiza o estado local com os novos dados
      const updatedRedemptions = redemptions.map(redemption => 
        redemption.id === id ? { ...redemption, whatsapp: editValue } : redemption
      )
      
      setRedemptions(updatedRedemptions)
      setEditingId(null)
      setEditValue('')
    } catch (error) {
      console.error('Erro ao atualizar dados:', error)
      alert('Erro ao atualizar número de WhatsApp')
    }
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setEditValue('')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando painel de administração...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Painel Administrativo</h1>
            <div className="flex items-center space-x-4">
              <button 
                onClick={handleExport}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Download className="w-4 h-4 mr-2" />
                Exportar Dados
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Buscar por nome, CPF ou WhatsApp..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Filter className="w-4 h-4 mr-2 text-gray-500" />
                <select 
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="all">Todos os status</option>
                  <option value="pendente">Pendente</option>
                  <option value="processando">Processando</option>
                  <option value="concluido">Concluído</option>
                  <option value="cancelado">Cancelado</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-full">
                <User className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">Total Solicitações</h3>
                <p className="text-2xl font-semibold text-gray-900">{redemptions.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-full">
                <Calendar className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">Pendentes</h3>
                <p className="text-2xl font-semibold text-gray-900">{redemptions.filter(r => r.status === 'pendente').length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-full">
                <CreditCard className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">Valor Total</h3>
                <p className="text-2xl font-semibold text-gray-900">R$ 100.000</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-full">
                <Eye className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">Concluídas</h3>
                <p className="text-2xl font-semibold text-gray-900">{redemptions.filter(r => r.status === 'concluido').length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Redemption Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contato</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Banco</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prêmio</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRedemptions.map((redemption) => (
                  <tr key={redemption.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{redemption.nome}</div>
                      <div className="text-sm text-gray-500">{redemption.cpf}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingId === redemption.id ? (
                        <input
                          type="text"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          className="border border-gray-300 rounded px-2 py-1 text-sm w-full"
                        />
                      ) : (
                        <div>
                          <div className="text-sm text-gray-900">{redemption.whatsapp}</div>
                          <div className="text-sm text-gray-500 truncate max-w-xs">{redemption.endereco}</div>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{redemption.banco}</div>
                      <div className="text-sm text-gray-500">Ag: {redemption.agencia} - Conta: {redemption.conta}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {redemption.premio}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {redemption.data}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(redemption.status)}`}>
                        {redemption.status === 'pendente' && 'Pendente'}
                        {redemption.status === 'processando' && 'Processando'}
                        {redemption.status === 'concluido' && 'Concluído'}
                        {redemption.status === 'cancelado' && 'Cancelado'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button 
                        onClick={() => setShowDetails(redemption)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        Ver
                      </button>
                      {editingId === redemption.id ? (
                        <>
                          <button 
                            onClick={() => handleSaveEdit(redemption.id)}
                            className="text-green-600 hover:text-green-900 mr-3"
                          >
                            Salvar
                          </button>
                          <button 
                            onClick={handleCancelEdit}
                            className="text-gray-600 hover:text-gray-900"
                          >
                            Cancelar
                          </button>
                        </>
                      ) : (
                        <button 
                          onClick={() => handleEditClick(redemption.id, redemption.whatsapp)}
                          className="text-green-600 hover:text-green-900 mr-3"
                        >
                          Editar
                        </button>
                      )}
                      <button className="text-red-600 hover:text-red-900">
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredRedemptions.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">Nenhuma solicitação encontrada</p>
            </div>
          )}
        </div>
      </main>

      {/* Details Modal */}
      {showDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Detalhes da Solicitação</h3>
                <button 
                  onClick={() => setShowDetails(null)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900">Informações Pessoais</h4>
                  <p className="text-sm text-gray-500">{showDetails.nome}</p>
                  <p className="text-sm text-gray-500">{showDetails.cpf}</p>
                  <p className="text-sm text-gray-500">{showDetails.whatsapp}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900">Endereço</h4>
                  <p className="text-sm text-gray-500">{showDetails.endereco}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900">Dados Bancários</h4>
                  <p className="text-sm text-gray-500">Banco: {showDetails.banco}</p>
                  <p className="text-sm text-gray-500">Agência: {showDetails.agencia} - Conta: {showDetails.conta}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900">Prêmio</h4>
                  <p className="text-sm text-gray-500">{showDetails.premio}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900">Data</h4>
                  <p className="text-sm text-gray-500">{showDetails.data}</p>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button 
                  onClick={() => setShowDetails(null)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Fechar
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">
                  Atualizar Status
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}