import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <span className="text-xs font-bold text-primary-foreground">S</span>
              </div>
              <span className="text-lg font-bold text-foreground" style={{ fontFamily: 'var(--font-heading)' }}>SimpleWork</span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Simplificando a gestao de negocios com tecnologia acessivel e eficiente.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground">Produto</h4>
            <ul className="mt-3 flex flex-col gap-2">
              <li><Link href="/#sistemas" className="text-sm text-muted-foreground hover:text-foreground">Sistemas</Link></li>
              <li><Link href="/#planos" className="text-sm text-muted-foreground hover:text-foreground">Planos</Link></li>
              <li><Link href="/#sobre" className="text-sm text-muted-foreground hover:text-foreground">Recursos</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground">Empresa</h4>
            <ul className="mt-3 flex flex-col gap-2">
              <li><Link href="/#sobre" className="text-sm text-muted-foreground hover:text-foreground">Sobre</Link></li>
              <li><Link href="/#contato" className="text-sm text-muted-foreground hover:text-foreground">Contato</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground">Legal</h4>
            <ul className="mt-3 flex flex-col gap-2">
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Termos de uso</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Privacidade</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            {'© 2026 SimpleWork. Todos os direitos reservados.'}
          </p>
        </div>
      </div>
    </footer>
  )
}
