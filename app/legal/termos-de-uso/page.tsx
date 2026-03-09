import type { Metadata } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Termos de Uso - SimpleWork',
  description: 'Termos de Uso da plataforma SimpleWork. Leia atentamente antes de utilizar nossos servicos.',
};

export default function TermosDeUsoPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-16 px-6">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/legal"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para Centro Legal
          </Link>

          <h1 className="text-3xl font-bold text-foreground mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
            Termos de Uso
          </h1>
          <p className="text-muted-foreground mb-8">Ultima atualizacao: Marco de 2026</p>

          <div className="prose prose-neutral max-w-none">
            <div className="bg-card border border-border rounded-2xl p-8 space-y-8">
              
              <p className="text-foreground leading-relaxed">
                Bem-vindo a SimpleWork. Estes Termos de Uso regulam a utilizacao do nosso site e da nossa plataforma de software como servico (SaaS) por usuarios, clientes e afiliados.
              </p>
              <p className="text-foreground leading-relaxed">
                Ao acessar o site, criar uma conta ou utilizar qualquer servico da SimpleWork, voce declara que leu, entendeu e concorda integralmente com estes Termos.
              </p>
              <p className="text-foreground leading-relaxed font-semibold">
                Se voce nao concorda com qualquer condicao aqui descrita, nao deve utilizar nossos servicos.
              </p>

              <section>
                <h2 className="text-xl font-bold text-foreground mb-4">1. Definicoes</h2>
                <p className="text-muted-foreground mb-3">Para fins destes Termos:</p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li><strong className="text-foreground">SimpleWork:</strong> plataforma de software como servico (SaaS) oferecida pela empresa.</li>
                  <li><strong className="text-foreground">Usuario:</strong> qualquer pessoa que acesse o site, crie conta ou utilize a plataforma.</li>
                  <li><strong className="text-foreground">Cliente:</strong> usuario que contrata um dos planos da SimpleWork para utilizacao em seu negocio (salao, clinica, pet shop, etc.).</li>
                  <li><strong className="text-foreground">Afiliado:</strong> pessoa fisica cadastrada e aprovada no Programa de Afiliados SimpleWork, que indica clientes em troca de comissoes.</li>
                  <li><strong className="text-foreground">Plataforma:</strong> conjunto de sistemas, sites, paineis e funcionalidades da SimpleWork.</li>
                  <li><strong className="text-foreground">Servicos:</strong> funcionalidades disponibilizadas pela SimpleWork, incluindo sistemas de gestao por nicho, paginas/sites para o negocio do cliente, e programa de afiliados.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-foreground mb-4">2. Aceite dos Termos</h2>
                <p className="text-muted-foreground mb-3">2.1. O uso da SimpleWork esta condicionado ao aceite destes Termos de Uso e da Politica de Privacidade.</p>
                <p className="text-muted-foreground mb-3">2.2. Ao se cadastrar, acessar ou utilizar a plataforma, voce declara:</p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-3">
                  <li>ser maior de 18 anos ou legalmente capaz;</li>
                  <li>fornecer informacoes verdadeiras, completas e atualizadas;</li>
                  <li>estar de acordo com estes Termos e com a Politica de Privacidade.</li>
                </ul>
                <p className="text-muted-foreground">2.3. Se voce usar a SimpleWork em nome de uma empresa, declara ter poderes para representa-la e vincula-la a estes Termos.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-foreground mb-4">3. Objeto da Plataforma SimpleWork</h2>
                <p className="text-muted-foreground mb-3">3.1. A SimpleWork oferece sistemas de gestao e paginas/sites prontos para diferentes nichos de negocio, como:</p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-3">
                  <li>Salao de beleza e estetica</li>
                  <li>Manicure</li>
                  <li>Clinica de estetica</li>
                  <li>Clinica odontologica</li>
                  <li>Pet shop</li>
                  <li>Outros que venham a ser adicionados</li>
                </ul>
                <p className="text-muted-foreground mb-3">3.2. Entre as funcionalidades possiveis (que podem variar conforme o produto e o plano), estao:</p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-3">
                  <li>Painel de gestao de agenda, clientes/pacientes, servicos e procedimentos</li>
                  <li>Cadastro de profissionais</li>
                  <li>Pagina/site publico do negocio do Cliente (landing page)</li>
                  <li>Integracoes basicas com WhatsApp (links, botoes)</li>
                  <li>Relatorios simples de atendimentos e servicos</li>
                  <li>Programa de Afiliados (para indicacao de novos clientes)</li>
                </ul>
                <p className="text-muted-foreground">3.3. A SimpleWork podera alterar, incluir ou remover funcionalidades, planos e produtos a qualquer tempo, mediante aviso previo razoavel quando a mudanca for relevante.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-foreground mb-4">4. Cadastro e Conta de Usuario</h2>
                <p className="text-muted-foreground mb-3">4.1. Para utilizar os servicos, e necessario criar uma conta de usuario na plataforma, fornecendo: Nome, E-mail, Senha e demais dados solicitados, a depender do tipo de conta (cliente ou afiliado).</p>
                <p className="text-muted-foreground mb-3">4.2. O usuario e responsavel por:</p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-3">
                  <li>manter a confidencialidade de seu login e senha;</li>
                  <li>nao compartilha-los com terceiros;</li>
                  <li>informar imediatamente a SimpleWork sobre qualquer uso nao autorizado.</li>
                </ul>
                <p className="text-muted-foreground">4.3. A SimpleWork pode recusar ou cancelar cadastros que contenham informacoes falsas, incompletas ou desatualizadas; violem estes Termos ou a legislacao aplicavel; indiquem uso inadequado, fraudulento ou suspeito.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-foreground mb-4">5. Planos, Assinaturas e Pagamentos</h2>
                <p className="text-muted-foreground mb-3">5.1. A SimpleWork oferece planos de assinatura periodica (mensal ou outra modalidade definida), com valores, recursos e limites especificos.</p>
                <p className="text-muted-foreground mb-3">5.2. Os valores, condicoes e prazos de pagamento serao informados no momento da contratacao ou em pagina especifica de planos.</p>
                <p className="text-muted-foreground mb-3">5.3. A cobranca podera ser feita por meio de: cartao de credito, debito automatico, boleto, meios de pagamento integrados (ex.: Mercado Pago), ou outras formas disponibilizadas pela SimpleWork.</p>
                <p className="text-muted-foreground mb-3">5.4. A falta de pagamento nas datas de vencimento podera resultar em: suspensao de acesso a plataforma, limitacao de funcionalidades, ou cancelamento da conta, conforme a politica de cobranca.</p>
                <p className="text-muted-foreground">5.5. A SimpleWork podera reajustar os valores de planos, mediante aviso previo, respeitando os contratos em vigor e a legislacao aplicavel.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-foreground mb-4">6. Cancelamento e Rescisao</h2>
                <p className="text-muted-foreground mb-3">6.1. O Cliente pode solicitar o cancelamento da assinatura diretamente pela plataforma, quando disponivel, ou por meio dos canais de contato indicados pela SimpleWork.</p>
                <p className="text-muted-foreground mb-3">6.2. Caso o cancelamento seja solicitado durante um periodo ja pago: o acesso podera permanecer ate o final do ciclo de cobranca; nao havera devolucao proporcional de valores, salvo se expressamente previsto em politica especifica ou exigido por lei.</p>
                <p className="text-muted-foreground">6.3. A SimpleWork podera suspender ou encerrar a conta de um usuario ou cliente, com ou sem aviso previo, em caso de: descumprimento destes Termos; fraude, tentativa de fraude ou uso indevido da plataforma; uso que viole a lei ou direitos de terceiros; ordem judicial ou determinacao de autoridade competente.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-foreground mb-4">7. Conteudos e Dados Inseridos pelo Cliente</h2>
                <p className="text-muted-foreground mb-3">7.1. O Cliente e o unico responsavel: pelos dados de seus proprios clientes/pacientes inseridos na plataforma; pelos conteudos publicados nas paginas/sites gerados pela SimpleWork (textos, imagens, logotipos, descricoes de servicos, precos, etc.); por qualquer informacao ou material que cadastrar, subir ou compartilhar dentro do sistema.</p>
                <p className="text-muted-foreground mb-3">7.2. O Cliente declara que: possui todos os direitos e autorizacoes necessarios para o uso dos conteudos inseridos; nao ira utilizar a plataforma para armazenar, divulgar ou transmitir conteudos ilegais, ofensivos, discriminatorios, abusivos, difamatorios ou que violem direitos de terceiros.</p>
                <p className="text-muted-foreground">7.3. A SimpleWork atua como provedora de ferramenta (SaaS), nao sendo responsavel por: teor, exatidao ou legalidade dos dados e conteudos inseridos pelo Cliente; mensagens enviadas pelo Cliente a seus consumidores, pacientes ou contatos; qualquer dano decorrente da relacao entre o Cliente e seus clientes finais.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-foreground mb-4">8. Programa de Afiliados SimpleWork</h2>
                <p className="text-muted-foreground mb-3">8.1. A SimpleWork podera disponibilizar um Programa de Afiliados, regido por regras proprias e especificas, que complementam estes Termos.</p>
                <p className="text-muted-foreground mb-3">8.2. Apenas pessoas fisicas (CPF) podem se cadastrar como afiliados, sujeitas a aprovacao da SimpleWork.</p>
                <p className="text-muted-foreground mb-3">8.3. O afiliado: podera indicar clientes, conforme o fluxo definido pela SimpleWork e no painel de afiliados; recebera comissoes conforme regras de planos, valores e periodos estabelecidos em documento especifico do Programa de Afiliados; declara estar ciente de que nao e funcionario da SimpleWork, atuando apenas como parceiro comercial independente.</p>
                <p className="text-muted-foreground mb-3">8.4. A SimpleWork podera bloquear, suspender ou encerrar a participacao de um afiliado em caso de: fraude ou suspeita de fraude; uso de dados falsos ou nao autorizados; promessas enganosas ou praticas comerciais abusivas em nome da SimpleWork; violacao destes Termos ou das regras do Programa de Afiliados.</p>
                <p className="text-muted-foreground">8.5. As regras detalhadas do Programa de Afiliados (comissoes, prazos, formas de pagamento, desconto promocional para clientes indicados etc.) serao disponibilizadas em documento especifico, que integra estes Termos.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-foreground mb-4">9. Propriedade Intelectual</h2>
                <p className="text-muted-foreground mb-3">9.1. Todos os direitos de propriedade intelectual relacionados a SimpleWork, incluindo: marca, nome comercial, logotipos; codigo-fonte, arquitetura e design da plataforma; layout, templates, fluxos de sistema; textos institucionais e materiais de marketing, sao de titularidade exclusiva da SimpleWork ou licenciados a ela, sendo protegidos por leis de propriedade intelectual.</p>
                <p className="text-muted-foreground">9.2. E proibido ao usuario: copiar, reproduzir, distribuir, modificar, traduzir, adaptar ou criar obras derivadas da plataforma ou de parte dela; fazer engenharia reversa, descompilacao ou tentativa de extracao de codigo-fonte; utilizar qualquer elemento da SimpleWork de forma nao autorizada.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-foreground mb-4">10. Limitacao de Responsabilidade</h2>
                <p className="text-muted-foreground mb-3">10.1. A SimpleWork se compromete a envidar esforcos razoaveis para manter a plataforma disponivel e funcionando adequadamente, mas nao garante: disponibilidade ininterrupta; ausencia total de erros, falhas ou interrupcoes; compatibilidade com todos os dispositivos, navegadores ou sistemas.</p>
                <p className="text-muted-foreground mb-3">10.2. Em nenhuma hipotese a SimpleWork sera responsavel por: lucros cessantes, prejuizos comerciais, perda de dados ou outros danos indiretos decorrentes do uso ou impossibilidade de uso da plataforma; decisoes de negocio tomadas pelo Cliente com base em relatorios, dados ou informacoes extraidas do sistema; falhas em servicos de terceiros (provedores de hospedagem, gateways de pagamento, provedores de internet, etc.).</p>
                <p className="text-muted-foreground">10.3. A responsabilidade da SimpleWork, se houver, sera limitada, na maxima extensao permitida pela legislacao, ao valor pago pelo Cliente nos ultimos 6 meses anteriores ao evento que der causa ao pedido de reparacao.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-foreground mb-4">11. Privacidade e Protecao de Dados</h2>
                <p className="text-muted-foreground mb-3">11.1. O tratamento de dados pessoais pela SimpleWork e regido pela <Link href="/legal/privacidade" className="text-accent hover:underline">Politica de Privacidade</Link>, que integra estes Termos.</p>
                <p className="text-muted-foreground">11.2. Ao utilizar a plataforma, voce declara ter lido e concordado com a Politica de Privacidade, especialmente quanto: a coleta e uso de dados pessoais; ao compartilhamento com terceiros necessarios a prestacao do servico; aos direitos dos titulares de dados.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-foreground mb-4">12. Alteracoes nestes Termos</h2>
                <p className="text-muted-foreground mb-3">12.1. A SimpleWork podera alterar estes Termos de Uso a qualquer tempo, para: refletir mudancas em seus servicos; adequar-se a alteracoes legais ou regulatorias; aprimorar a experiencia do usuario.</p>
                <p className="text-muted-foreground mb-3">12.2. Quando houver alteracoes relevantes, a SimpleWork podera: publicar uma nova versao dos Termos no site, com data de atualizacao; enviar aviso por e-mail ou na propria plataforma.</p>
                <p className="text-muted-foreground">12.3. A continuidade de uso da plataforma apos a publicacao de novos Termos sera considerada como aceite das mudancas.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-foreground mb-4">13. Disposicoes Gerais</h2>
                <p className="text-muted-foreground mb-3">13.1. Se qualquer disposicao destes Termos for considerada invalida ou inexequivel, as demais permanecerao validas e em pleno vigor.</p>
                <p className="text-muted-foreground mb-3">13.2. A tolerancia de eventual descumprimento de qualquer condicao nao implicara renuncia ou novacao, podendo a parte prejudicada exigir o cumprimento a qualquer tempo.</p>
                <p className="text-muted-foreground">13.3. Estes Termos nao criam qualquer sociedade, associacao, representacao, agencia, parceria ou vinculo trabalhista entre o usuario/afiliado e a SimpleWork.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-foreground mb-4">14. Lei Aplicavel e Foro</h2>
                <p className="text-muted-foreground mb-3">14.1. Estes Termos sao regidos pelas leis da Republica Federativa do Brasil.</p>
                <p className="text-muted-foreground">14.2. Fica eleito o foro da comarca da sede da empresa, com renuncia a qualquer outro, por mais privilegiado que seja, para resolver quaisquer controversias relacionadas a estes Termos ou ao uso da plataforma, salvo disposicao legal especifica em contrario.</p>
              </section>

            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
