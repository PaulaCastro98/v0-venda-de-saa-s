import type { Metadata } from 'next'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Regras do Programa de Afiliados - SimpleWork',
  description: 'Conheça as regras e termos do Programa de Afiliados SimpleWork',
}

export default function RegrasAfiliados() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="bg-background px-6 py-12">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12">
            <Link href="/" className="text-sm text-accent hover:text-accent/80 mb-4 inline-block">
              ← Voltar
            </Link>
            <h1 className="text-4xl font-bold text-foreground mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
              Regras do Programa de Afiliados SimpleWork
            </h1>
            <p className="text-muted-foreground">
              Última atualização: {new Date().toLocaleDateString('pt-BR')}
            </p>
          </div>

          <article className="prose prose-invert max-w-none space-y-8 text-foreground">
            {/* Objeto */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3" style={{ fontFamily: 'var(--font-heading)' }}>Objeto</h2>
              <p className="text-muted-foreground leading-relaxed">
                Estas Regras disciplinam a participação de Pessoas Físicas (Afiliados) no Programa de Afiliados SimpleWork, regulando adesão, indicação, comissionamento, pagamento, condutas, suspensão e outras condições aplicáveis.
              </p>
            </section>

            {/* Quem pode ser Afiliado */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3" style={{ fontFamily: 'var(--font-heading)' }}>Quem pode ser Afiliado</h2>
              <ul className="space-y-3 text-muted-foreground leading-relaxed list-disc list-inside">
                <li>Podem participar do Programa apenas Pessoas Físicas residentes no Brasil, identificadas por CPF. Pessoas jurídicas (CNPJ) não são elegíveis como Afiliadas.</li>
                <li>O Afiliado declara ser maior de 18 anos, possuir capacidade civil para contratar e que os dados cadastrados são verídicos.</li>
              </ul>
            </section>

            {/* Adesão e ativação */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3" style={{ fontFamily: 'var(--font-heading)' }}>Adesão e Ativação</h2>
              <ul className="space-y-3 text-muted-foreground leading-relaxed list-disc list-inside">
                <li>O interessado deve efetuar o cadastro no site da SimpleWork, selecionar a opção "Afiliado" e aceitar estas Regras.</li>
                <li>Após cadastro e login, o Afiliado terá acesso, em área logada, à descrição dos produtos, links rastreáveis e demais materiais promocionais disponibilizados pela SimpleWork.</li>
                <li>O fornecimento de materiais e links não importa em vínculo empregatício ou societário entre as partes.</li>
              </ul>
            </section>

            {/* Fluxo de indicação e vendas */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3" style={{ fontFamily: 'var(--font-heading)' }}>Fluxo de Indicação e Vendas</h2>
              <ul className="space-y-3 text-muted-foreground leading-relaxed list-disc list-inside">
                <li>O Afiliado divulga os produtos/planos da SimpleWork por meio dos links e/ou cupons gerados em sua área logada.</li>
                <li>Quando o Afiliado realiza uma venda a um cliente pessoa jurídica (CNPJ/empresa), deverá registrar os dados do cliente no Portal do Afiliado, na área logada, conforme campos e procedimentos estabelecidos pela SimpleWork.</li>
                <li>Após o registro, o cliente receberá, no e-mail informado, um link para pagamento via cartão de crédito ou boleto, já com eventual desconto aplicável.</li>
                <li>Após a confirmação do pagamento pelo cliente, o plano/serviço será ativado e o Afiliado passará a ter direito à comissão correspondente pelos meses pagantes e subsequentes enquanto o cliente mantiver o pagamento.</li>
                <li>Se o cliente não efetuar o pagamento, não haverá ativação do plano e o Afiliado não fará jus à comissão.</li>
                <li>O Afiliado poderá acessar, em sua área logada, o histórico e status de seus clientes (ativos, inativos ou devedores).</li>
              </ul>
            </section>

            {/* Planos, descontos e tabela de comissões */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3" style={{ fontFamily: 'var(--font-heading)' }}>Planos, Descontos e Tabela de Comissões</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">Os planos e as comissões vigentes são os seguintes:</p>
              <ul className="space-y-3 text-muted-foreground leading-relaxed list-disc list-inside">
                <li><strong>Plano Essencial:</strong> comissão fixa de R$ 10,00 (dez reais) por venda confirmada.</li>
                <li><strong>Plano Profissional:</strong> comissão fixa de R$ 15,00 (quinze reais) por venda confirmada.</li>
                <li><strong>Desconto promocional:</strong> os clientes indicados pelo Afiliado têm direito a 50% (cinquenta por cento) de desconto no 1º mês do plano contratado. Esse desconto será aplicado automaticamente no boleto ou cobrança do primeiro mês, conforme o meio de pagamento escolhido pelo cliente.</li>
                <li>As comissões são calculadas sobre vendas efetivamente pagas (já com aplicação do desconto, quando houver) e não incidem sobre valores cancelados, estornados ou não pagos.</li>
              </ul>
            </section>

            {/* Geração e confirmação da comissão */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3" style={{ fontFamily: 'var(--font-heading)' }}>Geração e Confirmação da Comissão</h2>
              <ul className="space-y-3 text-muted-foreground leading-relaxed list-disc list-inside">
                <li>A comissão é gerada quando o pagamento do cliente é confirmado pela SimpleWork.</li>
                <li>A atualização do status de comissão e a contabilização no painel do Afiliado poderá ocorrer em até 48 (quarenta e oito) horas úteis após a confirmação do pagamento.</li>
                <li>Comissões relativas a vendas sujeitas a análise por suspeita de fraude ou contestação poderão ficar retidas até conclusão da verificação.</li>
              </ul>
            </section>

            {/* Pagamento das comissões */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3" style={{ fontFamily: 'var(--font-heading)' }}>Pagamento das Comissões</h2>
              <ul className="space-y-3 text-muted-foreground leading-relaxed list-disc list-inside">
                <li><strong>Forma de pagamento:</strong> PIX ou transferência para conta bancária informada pelo Afiliado no cadastro.</li>
                <li><strong>Valor mínimo para saque:</strong> R$ 100,00 (cem reais). Valores inferiores serão acumulados automaticamente para pagamento futuro até atingir o mínimo.</li>
                <li><strong>Período de fechamento e pagamento:</strong> apuração do período de comissões ocorre do dia 1 ao dia 5 (fechamento) do mês vigente; os valores elegíveis serão pagos após a conferência, segundo o cronograma interno da SimpleWork.</li>
                <li>O Afiliado deve manter seus dados cadastrais e bancários atualizados. A SimpleWork não se responsabiliza por pagamentos indevidos ou atrasados decorrentes de informações incorretas fornecidas pelo Afiliado.</li>
                <li>Eventuais tributações e encargos incidentes sobre o valor pago são de responsabilidade do Afiliado.</li>
              </ul>
            </section>

            {/* Suspensão, cancelamento e estornos */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3" style={{ fontFamily: 'var(--font-heading)' }}>Suspensão, Cancelamento e Estornos</h2>
              <ul className="space-y-3 text-muted-foreground leading-relaxed list-disc list-inside">
                <li>Caso o cliente denuncie irregularidade, cancele a assinatura, suspenda pagamentos ou haja estorno/chargeback, a comissão correspondente não será devida ao Afiliado.</li>
                <li>Em caso de cancelamento posterior à liberação de pagamento ao Afiliado, a SimpleWork poderá compensar o valor em pagamentos futuros ou requerer reembolso, conforme apuração.</li>
                <li>A SimpleWork poderá suspender ou cancelar temporariamente o pagamento de comissões vinculadas a qualquer transação que esteja sob investigação por suspeita de fraude ou abuso.</li>
              </ul>
            </section>

            {/* Política de fraude, abuso e denúncias */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3" style={{ fontFamily: 'var(--font-heading)' }}>Política de Fraude, Abuso e Denúncias</h2>
              <ul className="space-y-3 text-muted-foreground leading-relaxed list-disc list-inside">
                <li>A SimpleWork adota política de tolerância zero para fraudes e práticas abusivas.</li>
                <li>Denúncias de irregularidades podem ser enviadas pelos canais de atendimento da SimpleWork. Ao receber uma denúncia, a SimpleWork poderá reter valores e suspender o Afiliado até conclusão da investigação.</li>
                <li>Caso a investigação confirme fraude ou violação destas Regras por parte do Afiliado, serão aplicadas sanções que podem incluir retenção de comissões, rescisão do vínculo e exigência de ressarcimento por perdas e danos.</li>
                <li>O Afiliado não deve utilizar mecanismos artificiais (bots, geração falsa de leads, manipulação de cookies, múltiplas contas) para obtenção de comissões.</li>
              </ul>
            </section>

            {/* Obrigações do Afiliado */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3" style={{ fontFamily: 'var(--font-heading)' }}>Obrigações do Afiliado</h2>
              <ul className="space-y-3 text-muted-foreground leading-relaxed list-disc list-inside">
                <li>Cumprir estas Regras e as diretrizes de marketing publicadas pela SimpleWork.</li>
                <li>Informar dados verdadeiros e atualizados no cadastro.</li>
                <li>Respeitar a legislação aplicável, inclusive normas relativas a proteção de dados (LGPD) e práticas publicitárias.</li>
                <li>Não utilizar materiais promocionais fora dos padrões autorizados sem autorização prévia da SimpleWork.</li>
              </ul>
            </section>

            {/* Direitos e propriedade intelectual */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3" style={{ fontFamily: 'var(--font-heading)' }}>Direitos e Propriedade Intelectual</h2>
              <ul className="space-y-3 text-muted-foreground leading-relaxed list-disc list-inside">
                <li>Todas as marcas, logotipos, textos, imagens, links e materiais fornecidos pela SimpleWork são protegidos por direitos de propriedade intelectual e ficam sob titularidade da SimpleWork.</li>
                <li>O Afiliado recebe licença limitada, não exclusiva e revogável para utilizar tais materiais única e exclusivamente para a promoção prevista neste Programa.</li>
              </ul>
            </section>

            {/* Confidencialidade e tratamento de dados */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3" style={{ fontFamily: 'var(--font-heading)' }}>Confidencialidade e Tratamento de Dados</h2>
              <ul className="space-y-3 text-muted-foreground leading-relaxed list-disc list-inside">
                <li>Informações classificadas como confidenciais disponibilizadas ao Afiliado devem ser mantidas em sigilo.</li>
                <li>O Afiliado deverá observar a legislação de proteção de dados pessoais aplicável (LGPD) no tratamento de dados de leads e clientes.</li>
                <li>O Afiliado concorda em cooperar com a SimpleWork em investigações ou solicitações relacionadas a dados pessoais.</li>
              </ul>
            </section>

            {/* Auditoria e fiscalização */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3" style={{ fontFamily: 'var(--font-heading)' }}>Auditoria e Fiscalização</h2>
              <ul className="space-y-3 text-muted-foreground leading-relaxed list-disc list-inside">
                <li>A SimpleWork poderá auditar as atividades do Afiliado, incluindo relatórios e registros pertinentes, quando necessário para verificar conformidade.</li>
                <li>O Afiliado compromete-se a fornecer cooperação e informações solicitadas para fins de auditoria.</li>
              </ul>
            </section>

            {/* Rescisão e encerramento */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3" style={{ fontFamily: 'var(--font-heading)' }}>Rescisão e Encerramento da Participação</h2>
              <ul className="space-y-3 text-muted-foreground leading-relaxed list-disc list-inside">
                <li>A SimpleWork poderá, a qualquer tempo, suspender ou encerrar a participação do Afiliado mediante notificação, especialmente em casos de violação destas Regras, conduta ilícita ou prática que cause prejuízo à SimpleWork.</li>
                <li>O Afiliado pode encerrar sua participação mediante comunicação pela área logada.</li>
                <li>Obrigações pendentes, como apuração de comissões relativas a período anterior, serão tratadas conforme estas Regras e eventuais débitos poderão ser compensados.</li>
              </ul>
            </section>

            {/* Alterações nas Regras */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3" style={{ fontFamily: 'var(--font-heading)' }}>Alterações nas Regras</h2>
              <ul className="space-y-3 text-muted-foreground leading-relaxed list-disc list-inside">
                <li>A SimpleWork poderá alterar estas Regras mediante comunicação na plataforma ou canal cadastrado; as alterações passarão a vigorar na data indicada na notificação.</li>
                <li>A manutenção das atividades do Afiliado após a vigência das alterações será considerada aceitação tácita das novas regras.</li>
              </ul>
            </section>

            {/* Limitação de responsabilidade */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3" style={{ fontFamily: 'var(--font-heading)' }}>Limitação de Responsabilidade</h2>
              <ul className="space-y-3 text-muted-foreground leading-relaxed list-disc list-inside">
                <li>Na máxima extensão permitida por lei, a SimpleWork não será responsável por danos indiretos, lucros cessantes, perda de oportunidades ou quaisquer danos emergentes em decorrência da participação do Afiliado no Programa.</li>
                <li>A responsabilidade total da SimpleWork por qualquer reivindicação relacionada ao Programa ficará limitada ao montante de comissões efetivamente pagas ao Afiliado nos últimos 12 (doze) meses.</li>
              </ul>
            </section>

            {/* Indenização */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3" style={{ fontFamily: 'var(--font-heading)' }}>Indenização</h2>
              <p className="text-muted-foreground leading-relaxed">
                O Afiliado indenizará e manterá indene a SimpleWork por perdas, danos, custos e despesas (incluindo honorários advocatícios) decorrentes de violação destas Regras, atos ilícitos, infração de direitos de terceiros ou uso indevido de materiais.
              </p>
            </section>

            {/* Disposições gerais */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3" style={{ fontFamily: 'var(--font-heading)' }}>Disposições Gerais</h2>
              <ul className="space-y-3 text-muted-foreground leading-relaxed list-disc list-inside">
                <li>Estas Regras constituem o acordo integral entre as partes em relação ao Programa de Afiliados.</li>
                <li>A eventual invalidade de qualquer disposição não afetará as demais, que permanecerão em pleno vigor.</li>
                <li>Nada nestas Regras cria vínculo empregatício, societário ou de representação entre as partes.</li>
              </ul>
            </section>

            {/* Legislação aplicável */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3" style={{ fontFamily: 'var(--font-heading)' }}>Legislação Aplicável</h2>
              <p className="text-muted-foreground leading-relaxed">
                Estas Regras são regidas pelas leis da República Federativa do Brasil. Fica eleito o foro da comarca onde está localizada a SimpleWork para dirimir controvérsias, com renúncia de outro, por mais privilegiado que seja.
              </p>
            </section>

            {/* Contato e suporte */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3" style={{ fontFamily: 'var(--font-heading)' }}>Contato e Suporte</h2>
              <p className="text-muted-foreground leading-relaxed">
                Dúvidas, comunicações, denúncias e solicitações relacionadas ao Programa deverão ser feitas pelos canais de atendimento ao Afiliado disponíveis na área logada do Portal SimpleWork.
              </p>
            </section>

            {/* Assinatura eletrônica */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3" style={{ fontFamily: 'var(--font-heading)' }}>Assinatura Eletrônica</h2>
              <p className="text-muted-foreground leading-relaxed">
                A participação no Programa implica aceitação destas Regras no momento do cadastro/aceite eletrônico pelo interessado.
              </p>
            </section>
          </article>

          <div className="mt-12 p-6 bg-card border border-border rounded-lg">
            <p className="text-sm text-muted-foreground">
              Ao se cadastrar no Programa de Afiliados SimpleWork, você automaticamente concorda com todas as regras e termos apresentados nesta página.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
