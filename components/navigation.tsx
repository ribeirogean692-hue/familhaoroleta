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
          </nav>
          
          <div className="flex items-center space-x-4">
            <Button asChild variant="ghost" size="sm" className="hidden md:block">
              <Link href="/painel">Painel Admin</Link>
            </Button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-primary/10 py-4">
            <div className="flex flex-col space-y-3">
              <Link href="/#como-jogar" className="text-primary/60 hover:text-primary transition-colors">Como Jogar</Link>
              <Link href="/#premios" className="text-primary/60 hover:text-primary transition-colors">Prêmios</Link>
              <Link href="/#faq" className="text-primary/60 hover:text-primary transition-colors">FAQ</Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}