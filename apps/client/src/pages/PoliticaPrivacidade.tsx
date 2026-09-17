import { motion } from 'framer-motion'

/* @section: politica-privacidade */
export default function PoliticaPrivacidade() {
  return (
    <div className="min-h-screen bg-off-white">
      {/* Hero banner */}
      <div className="bg-dark-blue py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-divider block" />
            <h1 className="text-4xl md:text-5xl font-black text-white mb-3">
              Política de Privacidade
            </h1>
            <p className="text-white/60 text-sm">
              MX Brasil Participações S.A. / RE/MAX Brasil — REMAX Agro
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="prose prose-lg max-w-none"
        >

          {/* 1 INTRODUÇÃO */}
          <section className="mb-12">
            <h2 className="text-2xl font-black section-title mb-4">1. INTRODUÇÃO</h2>
            <div className="space-y-4 body-text text-base leading-relaxed">
              <p>
                A MX BRASIL PARTICIPAÇÕES S.A. ("MX Brasil"), empresa brasileira com sede no Município de São Paulo, Estado de São Paulo, inscrita no CNPJ/ME sob o n.º 05.432.519/0001-06, detentora dos direitos de uso da marca RE/MAX no Brasil, preza pela segurança dos dados pessoais de seus usuários e pela transparência acerca das informações que coleta e utiliza.
              </p>
              <p>
                Esta Política de Privacidade tem como objetivo informar como a RE/MAX BRASIL coleta, armazena, utiliza e compartilha as informações pessoais de seus usuários quando da utilização dos serviços por ela disponibilizados, inclusive por meio do site <strong>agro.remax.com.br</strong> e quaisquer outras plataformas digitais da marca REMAX Agro.
              </p>
              <p>
                Ao acessar ou utilizar nossos serviços, você concorda com os termos desta Política de Privacidade. Caso não concorde, por favor, não utilize nossos serviços.
              </p>
              <p>
                Esta Política está em conformidade com a Lei Geral de Proteção de Dados Pessoais (Lei n.º 13.709/2018 — LGPD) e demais normas aplicáveis de proteção de dados no Brasil.
              </p>
            </div>
          </section>

          {/* 2 COLETA E ARMAZENAMENTO */}
          <section className="mb-12">
            <h2 className="text-2xl font-black section-title mb-4">2. COLETA E ARMAZENAMENTO DAS INFORMAÇÕES</h2>
            <div className="space-y-4 body-text text-base leading-relaxed">
              <p>
                A RE/MAX BRASIL poderá coletar informações pessoais fornecidas diretamente pelos usuários, tais como: nome completo, endereço de e-mail, número de telefone/WhatsApp, localização (estado/cidade), tipo de interesse (compra ou venda de propriedade), entre outros dados relevantes para a prestação dos serviços imobiliários rurais.
              </p>
              <p>
                Adicionalmente, podemos coletar automaticamente informações técnicas de navegação, como endereço IP, tipo de navegador, páginas visitadas, tempo de permanência no site, dados de cookies e identificadores de dispositivo, com o objetivo de melhorar a experiência do usuário e personalizar nossos serviços.
              </p>
              <p>
                Os dados coletados são armazenados em servidores seguros, com proteção adequada contra acesso não autorizado, perda, destruição ou divulgação indevida. Adotamos medidas técnicas e organizacionais compatíveis com os padrões de segurança da informação exigidos pelo mercado.
              </p>
              <p>
                Os dados pessoais serão retidos pelo período necessário ao cumprimento das finalidades para as quais foram coletados, respeitadas as obrigações legais de guarda e os prazos previstos na legislação brasileira aplicável.
              </p>
            </div>
          </section>

          {/* 3 USO DAS INFORMAÇÕES */}
          <section className="mb-12">
            <h2 className="text-2xl font-black section-title mb-4">3. USO DAS INFORMAÇÕES</h2>
            <div className="space-y-4 body-text text-base leading-relaxed">
              <p>As informações coletadas pela RE/MAX BRASIL são utilizadas exclusivamente para as seguintes finalidades:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Prestação e melhoria dos serviços de intermediação imobiliária rural;</li>
                <li>Contato com o usuário para atendimento de solicitações, envio de propostas e informações sobre propriedades de interesse;</li>
                <li>Envio de comunicações de marketing, newsletters e informações sobre o mercado agroimobiliário, mediante consentimento do usuário;</li>
                <li>Cumprimento de obrigações legais e regulatórias;</li>
                <li>Análise estatística para aprimoramento da plataforma e dos serviços oferecidos;</li>
                <li>Prevenção de fraudes e garantia da segurança das operações.</li>
              </ul>
              <p>
                Não utilizaremos seus dados pessoais para finalidades incompatíveis com aquelas para as quais foram originalmente coletados, salvo com base em nova hipótese legal ou com seu consentimento.
              </p>
            </div>
          </section>

          {/* 4 CONFIDENCIALIDADE */}
          <section className="mb-12">
            <h2 className="text-2xl font-black section-title mb-4">4. CONFIDENCIALIDADE E COMPARTILHAMENTO</h2>
            <div className="space-y-4 body-text text-base leading-relaxed">
              <p>
                A RE/MAX BRASIL trata os dados pessoais dos usuários com sigilo e confidencialidade, não os vendendo, alugando ou compartilhando com terceiros para fins comerciais próprios de terceiros.
              </p>
              <p>Seus dados poderão ser compartilhados nas seguintes hipóteses:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Com parceiros de negócios:</strong> como a DATAGRO e franqueados RE/MAX, na medida necessária para a prestação dos serviços contratados ou solicitados;</li>
                <li><strong>Com prestadores de serviços:</strong> empresas que nos auxiliam na operação de tecnologia, hospedagem, marketing e atendimento ao cliente, sob obrigações de confidencialidade equivalentes;</li>
                <li><strong>Por obrigação legal:</strong> quando exigido por lei, regulamento, ordem judicial ou autoridade competente;</li>
                <li><strong>Em operações societárias:</strong> em caso de fusão, aquisição ou venda de ativos, mediante ciência dos usuários.</li>
              </ul>
            </div>
          </section>

          {/* 5 COOKIES */}
          <section className="mb-12">
            <h2 className="text-2xl font-black section-title mb-4">5. COOKIES E TECNOLOGIAS DE RASTREAMENTO</h2>
            <div className="space-y-4 body-text text-base leading-relaxed">
              <p>
                Utilizamos cookies e tecnologias similares (como pixels de rastreamento e identificadores de sessão) para melhorar a navegação, personalizar conteúdo e analisar o desempenho do site.
              </p>
              <p>Os cookies utilizados incluem:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Cookies essenciais:</strong> necessários para o funcionamento básico do site;</li>
                <li><strong>Cookies de desempenho:</strong> coletam informações sobre como os usuários utilizam o site (ex: Google Analytics);</li>
                <li><strong>Cookies de funcionalidade:</strong> lembram preferências do usuário;</li>
                <li><strong>Cookies de marketing:</strong> usados para exibir anúncios relevantes.</li>
              </ul>
              <p>
                Você pode gerenciar ou desativar cookies por meio das configurações do seu navegador. A desativação de alguns cookies pode afetar a funcionalidade do site.
              </p>
            </div>
          </section>

          {/* 6 DIREITOS DE CANCELAMENTO */}
          <section className="mb-12">
            <h2 className="text-2xl font-black section-title mb-4">6. DIREITOS DO TITULAR DOS DADOS</h2>
            <div className="space-y-4 body-text text-base leading-relaxed">
              <p>Nos termos da LGPD, você possui os seguintes direitos em relação aos seus dados pessoais:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Confirmação e acesso:</strong> saber se tratamos seus dados e acessá-los;</li>
                <li><strong>Correção:</strong> solicitar a correção de dados incompletos, inexatos ou desatualizados;</li>
                <li><strong>Anonimização, bloqueio ou eliminação:</strong> de dados desnecessários, excessivos ou tratados em desconformidade com a LGPD;</li>
                <li><strong>Portabilidade:</strong> receber seus dados em formato estruturado para transferência a outro fornecedor;</li>
                <li><strong>Eliminação dos dados tratados com consentimento;</strong></li>
                <li><strong>Informação sobre compartilhamento;</strong></li>
                <li><strong>Revogação do consentimento</strong> a qualquer momento, sem prejuízo da licitude dos tratamentos realizados anteriormente.</li>
              </ul>
              <p>
                Para exercer qualquer desses direitos, entre em contato conosco pelo e-mail <strong>contatoagro@remax.com.br</strong>. Responderemos dentro do prazo de 15 dias úteis.
              </p>
            </div>
          </section>

          {/* 7 ENTRE EM CONTATO */}
          <section className="mb-12">
            <h2 className="text-2xl font-black section-title mb-4">7. ENTRE EM CONTATO</h2>
            <div className="space-y-4 body-text text-base leading-relaxed">
              <p>
                Se você tiver dúvidas, solicitações ou reclamações sobre esta Política de Privacidade ou sobre o tratamento de seus dados pessoais, entre em contato com nosso Encarregado de Proteção de Dados (DPO):
              </p>
              <div className="glass-box p-6 mt-4">
                <p><strong>REMAX Agro / MX Brasil Participações S.A.</strong></p>
                <p>E-mail: <a href="mailto:contatoagro@remax.com.br" className="text-bridge-red hover:underline">contatoagro@remax.com.br</a></p>
                <p>Site: <a href="https://agro.remax.com.br" target="_blank" rel="noopener noreferrer" className="text-bridge-red hover:underline">agro.remax.com.br</a></p>
                <p>Localização: São Paulo, SP — Brasil</p>
              </div>
              <p className="text-sm text-gray-400 mt-6">
                Última atualização: Junho de 2025. Esta Política pode ser atualizada periodicamente. Recomendamos sua revisão periódica.
              </p>
            </div>
          </section>

        </motion.div>
      </div>
    </div>
  )
}
