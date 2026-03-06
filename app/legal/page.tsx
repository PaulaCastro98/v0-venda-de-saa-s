import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export const metadata = {
  title: 'Legal - SimpleWork',
  description: 'Políticas e regras da SimpleWork',
};

export default function LegalPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-background px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <h1 
            className="text-4xl font-bold text-foreground mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Centro Legal
          </h1>
          <p className="text-lg text-muted-foreground mb-12">
            Conheça nossas políticas, termos e regras
          </p>

          <div className="grid gap-6">
            <a 
              href="/legal/regras-afiliados"
              className="p-6 rounded-2xl border border-border bg-card hover:border-accent/50 transition-colors"
            >
              <h2 className="text-2xl font-bold text-foreground mb-2">Regras do Programa de Afiliados</h2>
              <p className="text-muted-foreground">
                Conheça todas as regras, comissões, termos e condições para ser um afiliado SimpleWork
              </p>
            </a>

            <a 
              href="#"
              className="p-6 rounded-2xl border border-border bg-card opacity-50 cursor-not-allowed"
            >
              <h2 className="text-2xl font-bold text-foreground mb-2">Termos de Uso</h2>
              <p className="text-muted-foreground">
                Termos e condições de uso da plataforma SimpleWork
              </p>
            </a>

            <a 
              href="#"
              className="p-6 rounded-2xl border border-border bg-card opacity-50 cursor-not-allowed"
            >
              <h2 className="text-2xl font-bold text-foreground mb-2">Política de Privacidade</h2>
              <p className="text-muted-foreground">
                Como protegemos seus dados e informações pessoais
              </p>
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
