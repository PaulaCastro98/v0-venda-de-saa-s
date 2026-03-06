"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <span className="text-sm font-bold text-primary-foreground">S</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground" style={{ fontFamily: 'var(--font-heading)' }}>
            SimpleWork
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link href="/#sistemas" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Sistemas
          </Link>
          <Link href="/#planos" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Planos
          </Link>
          <Link href="/#sobre" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Sobre
          </Link>
          <Link href="/#contato" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Contato
          </Link>
          <Link href="/seja-afiliado" className="text-sm font-medium text-accent transition-colors hover:text-accent/80">
            Programa de Afiliados
          </Link>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link href="/seja-afiliado">
            <Button variant="outline" size="sm">
              Seja Afiliado
            </Button>
          </Link>
          <Link href="/cadastro">
            <Button variant="default" size="sm">
              Comecar agora
            </Button>
          </Link>
        </div>

        <button
          className="flex items-center justify-center md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-card px-6 pb-6 pt-4 md:hidden">
          <nav className="flex flex-col gap-4">
            <Link href="/#sistemas" className="text-sm font-medium text-muted-foreground" onClick={() => setMobileOpen(false)}>
              Sistemas
            </Link>
            <Link href="/#planos" className="text-sm font-medium text-muted-foreground" onClick={() => setMobileOpen(false)}>
              Planos
            </Link>
            <Link href="/#sobre" className="text-sm font-medium text-muted-foreground" onClick={() => setMobileOpen(false)}>
              Sobre
            </Link>
            <Link href="/#contato" className="text-sm font-medium text-muted-foreground" onClick={() => setMobileOpen(false)}>
              Contato
            </Link>
            <Link href="/seja-afiliado" className="text-sm font-medium text-accent" onClick={() => setMobileOpen(false)}>
              Programa de Afiliados
            </Link>
            <div className="flex flex-col gap-2 pt-2">
              <Link href="/seja-afiliado" onClick={() => setMobileOpen(false)}>
                <Button variant="outline" size="sm" className="w-full">
                  Seja Afiliado
                </Button>
              </Link>
              <Link href="/cadastro" onClick={() => setMobileOpen(false)}>
                <Button variant="default" size="sm" className="w-full">
                  Comecar agora
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
