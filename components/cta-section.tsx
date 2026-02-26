"use client"

import { MessageCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getWhatsAppLink } from "@/lib/whatsapp"
import Link from "next/link"

export function CtaSection() {
  return (
    <section id="contato" className="bg-primary px-6 py-24">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-balance text-3xl font-bold text-primary-foreground md:text-4xl" style={{ fontFamily: 'var(--font-heading)' }}>
          Pronto para simplificar o seu negocio?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-pretty leading-relaxed text-primary-foreground/70">
          Junte-se a mais de 1.000 empreendedores que ja transformaram a gestao dos seus negocios com a SimpleWork. Comece hoje mesmo.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/cadastro">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              Comecar agora
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <a
            href={getWhatsAppLink("Ola! Gostaria de saber mais sobre os sistemas da SimpleWork.")}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="lg" variant="outline" className="border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground/10">
              <MessageCircle className="mr-2 h-4 w-4" />
              Falar no WhatsApp
            </Button>
          </a>
        </div>
      </div>
    </section>
  )
}
