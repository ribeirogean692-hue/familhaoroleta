'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-background border-b border-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="font-bold text-xl">Famílhao</Link>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <Link href="/#como-jogar" className="text-primary/60 hover:text-primary transition-colors">Como Jogar</Link>
            <Link href="/#premios" className="text-primary/60 hover:text-primary transition-colors">Prêmios</Link>
            <Link href="/#faq" className="text-primary/60 hover:text-primary transition-colors">FAQ</Link>
            <Link href="/painel" className="text-primary/60 hover:text-primary transition-colors">Painel Admin</Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <Button asChild variant="ghost" size="sm" className="hidden md:block">
              <Link href="/painel">Painel Admin</Link>
            </Button>
            
            <button 
              className="md:hidden text-primary/60 hover:text-primary"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-primary/10 py-4">
            <div className="flex flex-col space-y-3">
              <Link href="/#como-jogar" className="text-primary/60 hover:text-primary transition-colors">Como Jogar</Link>
              <Link href="/#premios" className="text-primary/60 hover:text-primary transition-colors">Prêmios</Link>
              <Link href="/#faq" className="text-primary/60 hover:text-primary transition-colors">FAQ</Link>
              <Link href="/painel" className="text-primary/60 hover:text-primary transition-colors">Painel Admin</Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}