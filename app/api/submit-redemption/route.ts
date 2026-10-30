import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import fs from 'fs/promises'
import path from 'path'

// Caminho para o arquivo de dados
const dataFilePath = path.join(process.cwd(), 'data', 'redemptions.json')

// Função para ler os dados do arquivo
async function readData() {
  try {
    const data = await fs.readFile(dataFilePath, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    // Se o arquivo não existir, retorna array vazio
    return []
  }
}

// Função para escrever os dados no arquivo
async function writeData(data: any[]) {
  // Garantir que o diretório exista
  await fs.mkdir(path.dirname(dataFilePath), { recursive: true })
  await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2))
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    
    // Extrair todos os campos do formulário
    const values: any = {}
    for (const [key, value] of formData.entries()) {
      values[key] = value
    }
    
    // Adicionar timestamp
    values.timestamp = new Date().toISOString()
    
    // Ler dados existentes
    let submissions = await readData()
    
    // Salvar no arquivo de dados
    submissions.push(values)
    
    // Escrever os dados atualizados
    await writeData(submissions)
    
    console.log('Nova submissão recebida:', values)
    
    return NextResponse.json({ success: true, protocolo: values.protocolo })
  } catch (error) {
    console.error('Erro ao processar submissão:', error)
    return NextResponse.json({ success: false, error: 'Erro ao processar a solicitação' }, { status: 500 })
  }
}

// Endpoint para obter todas as submissões
export async function GET() {
  try {
    const submissions = await readData()
    return NextResponse.json(submissions)
  } catch (error) {
    console.error('Erro ao buscar submissões:', error)
    return NextResponse.json({ error: 'Erro ao buscar as solicitações' }, { status: 500 })
  }
}

// Endpoint para atualizar uma submissão
export async function PUT(request: NextRequest) {
  try {
    const { id, ...updateData } = await request.json()
    
    // Ler dados existentes
    let submissions = await readData()
    
    // Encontrar e atualizar a submissão específica
    const submissionIndex = submissions.findIndex((sub: any) => sub.id === id)
    
    if (submissionIndex !== -1) {
      // Atualizar os dados da submissão
      submissions[submissionIndex] = { ...submissions[submissionIndex], ...updateData }
      
      // Escrever os dados atualizados
      await writeData(submissions)
      
      return NextResponse.json({ success: true, submission: submissions[submissionIndex] })
    }
    
    return NextResponse.json({ success: false, error: 'Submissão não encontrada' }, { status: 404 })
  } catch (error) {
    console.error('Erro ao atualizar submissão:', error)
    return NextResponse.json({ success: false, error: 'Erro ao atualizar a solicitação' }, { status: 500 })
  }
}