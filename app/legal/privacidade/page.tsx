import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export const metadata = {
  title: 'Política de Privacidade - SimpleWork',
  description: 'Conheça como a SimpleWork coleta, utiliza e protege seus dados pessoais.',
}

export default function PrivacidadePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="bg-background px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              Política de Privacidade
            </h1>
            <p className="text-muted-foreground">Última atualização: março de 2026</p>
          </div>

          <div className="space-y-8 text-foreground">
            <p className="text-muted-foreground">
              Esta Política de Privacidade descreve como a SimpleWork coleta, utiliza, armazena e protege os dados pessoais de usuários, clientes e afiliados que utilizam nosso site e nossa plataforma.
            </p>
            <p className="text-muted-foreground">
              Ao acessar o site ou utilizar os serviços da SimpleWork, você declara estar ciente e concorda com os termos desta Política.
            </p>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">1. Quem Somos</h2>
              <p className="text-muted-foreground">
                SimpleWork é uma plataforma de software como serviço (SaaS) voltada para pequenos negócios (salões de beleza, clínicas de estética, clínicas odontológicas, pet shops, manicures e outros), oferecendo sistemas de gestão e sites prontos por nicho.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">2. Quais Dados Coletamos</h2>
              
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">2.1. Dados fornecidos diretamente por você</h3>
                <p className="text-muted-foreground mb-3">Ao navegar no site, criar uma conta ou utilizar nossos serviços, podemos coletar:</p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Nome completo</li>
                  <li>E-mail</li>
                  <li>Telefone e/ou WhatsApp</li>
                  <li>CPF (para afiliados e, se necessário, para emissão de nota fiscal)</li>
                  <li>CNPJ e razão social (para clientes da plataforma)</li>
                  <li>Endereço da empresa</li>
                  <li>Informações de acesso (login, senha – armazenada de forma criptografada)</li>
                  <li>Informações de pagamento (não armazenamos dados completos de cartão)</li>
                  <li>Dados cadastrais de clientes finais da sua empresa</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">2.2. Dados coletados automaticamente</h3>
                <p className="text-muted-foreground mb-3">Ao acessar o site ou a plataforma, podemos coletar automaticamente:</p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Endereço IP</li>
                  <li>Tipo de navegador</li>
                  <li>Páginas acessadas</li>
                  <li>Data e horário de acesso</li>
                  <li>Cookies e identificadores de sessão</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">2.3. Dados de afiliados</h3>
                <p className="text-muted-foreground mb-3">Para o programa de afiliados, coletamos:</p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Nome completo</li>
                  <li>CPF</li>
                  <li>E-mail</li>
                  <li>Telefone/WhatsApp</li>
                  <li>Chave PIX</li>
                  <li>Dados necessários para controle de indicações e comissões</li>
                </ul>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">3. Como Utilizamos os Dados</h2>
              <p className="text-muted-foreground mb-3">Utilizamos seus dados para:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Criar e gerenciar sua conta na SimpleWork</li>
                <li>Prestar os serviços contratados</li>
                <li>Processar pagamentos e emitir comprovantes</li>
                <li>Permitir o funcionamento do programa de afiliados</li>
                <li>Enviar comunicações relacionadas ao serviço</li>
                <li>Melhorar nosso site, sistemas e experiência do usuário</li>
                <li>Cumprir obrigações legais e regulatórias</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">4. Compartilhamento de Dados</h2>
              <p className="text-muted-foreground mb-3">Podemos compartilhar seus dados pessoais com fornecedores e parceiros que nos ajudam a prestar o serviço, com autoridades públicas quando exigido por lei. Nunca vendemos seus dados pessoais.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">5. Cookies e Tecnologias Semelhantes</h2>
              <p className="text-muted-foreground">Utilizamos cookies para lembrar suas preferências de navegação, manter sua sessão logada e acompanhar métricas de acesso. Você pode configurar seu navegador para bloquear cookies.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">6. Armazenamento e Segurança dos Dados</h2>
              <p className="text-muted-foreground">Seus dados são armazenados em servidores de terceiros confiáveis com medidas de segurança técnica. Senhas são criptografadas e acessos são protegidos por login e senha pessoal. Apesar dos esforços, nenhum sistema é 100% seguro.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">7. Por Quanto Tempo Guardamos os Dados</h2>
              <p className="text-muted-foreground">Manteremos seus dados pessoais pelo tempo necessário para cumprir a finalidade para a qual foram coletados e cumprimento de obrigações legais, fiscais e contábeis.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">8. Direitos do Titular de Dados</h2>
              <p className="text-muted-foreground mb-3">Você pode solicitar confirmação de tratamento de dados, acesso aos dados, correção, anonimização, eliminação, portabilidade e revogar consentimentos. Entre em contato pelos canais de atendimento do site.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">9. Bases Legais para o Tratamento</h2>
              <p className="text-muted-foreground">Tratamos seus dados com base em: execução de contrato, cumprimento de obrigação legal, legítimo interesse e consentimento quando exigido.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">10. Dados de Terceiros Cadastrados na Plataforma</h2>
              <p className="text-muted-foreground">Se você utiliza a SimpleWork para cadastrar dados de seus clientes, você é considerado controlador desses dados. A SimpleWork atua como operadora, processando-os apenas para prestar o serviço.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">11. Links para Sites de Terceiros</h2>
              <p className="text-muted-foreground">Nosso site pode conter links para sites de terceiros. Não somos responsáveis pelas práticas de privacidade desses sites.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">12. Atualizações desta Política</h2>
              <p className="text-muted-foreground">Podemos atualizar esta Política periodicamente. Alterações relevantes serão publicadas em nosso site com data de atualização.</p>
            </section>

            <div className="bg-muted/50 rounded-lg p-6 mt-12">
              <p className="text-muted-foreground">
                Dúvidas sobre esta Política de Privacidade? Entre em contato conosco através dos canais de atendimento disponíveis no site.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
