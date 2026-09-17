import { motion } from 'framer-motion'

/* @section: termos-uso */
export default function TermosUso() {
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
              Termos de Uso
            </h1>
            <p className="text-white/60 text-sm">
              REMAX Agro — agro.remax.com.br
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
        >

          {/* 1 ACEITAÇÃO */}
          <section className="mb-12">
            <h2 className="text-2xl font-black section-title mb-4">1. ACEITAÇÃO DOS TERMOS</h2>
            <div className="space-y-4 body-text text-base leading-relaxed">
              <p>
                Bem-vindo ao site da <strong>REMAX Agro</strong> — plataforma digital da MX Brasil Participações S.A. para serviços de intermediação de imóveis rurais no Brasil. Ao acessar, navegar ou utilizar qualquer serviço disponível em <strong>agro.remax.com.br</strong>, você concorda com os presentes Termos de Uso.
              </p>
              <p>
                Caso não concorde com qualquer disposição destes Termos, pedimos que não utilize nossos serviços. O uso contínuo do site implica aceitação tácita de todas as condições aqui estabelecidas.
              </p>
            </div>
          </section>

          {/* 2 SERVIÇOS */}
          <section className="mb-12">
            <h2 className="text-2xl font-black section-title mb-4">2. DESCRIÇÃO DOS SERVIÇOS</h2>
            <div className="space-y-4 body-text text-base leading-relaxed">
              <p>
                A REMAX Agro oferece, por meio deste site, serviços de intermediação imobiliária rural, incluindo:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Assessoria de compra e venda de propriedades rurais;</li>
                <li>Avaliação técnica de imóveis rurais;</li>
                <li>Operações estruturadas (permutas, arrendamentos, parcerias);</li>
                <li>Inteligência de mercado agroimobiliário em parceria com a DATAGRO;</li>
                <li>Formulários de contato e captação de leads para conectar usuários com corretores especializados;</li>
                <li>Acesso a newsletter e conteúdo informativo sobre o agronegócio brasileiro.</li>
              </ul>
              <p>
                Os serviços são prestados por corretores de imóveis certificados, devidamente habilitados pelo CRECI competente, em conformidade com a legislação brasileira aplicável ao mercado imobiliário (Lei n.º 6.530/1978 e demais normas do COFECI).
              </p>
            </div>
          </section>

          {/* 3 CADASTRO E RESPONSABILIDADES */}
          <section className="mb-12">
            <h2 className="text-2xl font-black section-title mb-4">3. CADASTRO E RESPONSABILIDADES DO USUÁRIO</h2>
            <div className="space-y-4 body-text text-base leading-relaxed">
              <p>Ao preencher formulários de contato ou cadastro neste site, o usuário declara e garante que:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>As informações fornecidas são verdadeiras, precisas e completas;</li>
                <li>É maior de 18 anos e tem capacidade jurídica para celebrar negócios;</li>
                <li>Tem o interesse legítimo e real em adquirir ou alienar propriedades rurais;</li>
                <li>Não utilizará os serviços para fins ilícitos, fraudulentos ou que contrariem as leis brasileiras.</li>
              </ul>
              <p>
                O usuário é responsável por toda e qualquer ação realizada a partir de suas credenciais de acesso e pelo uso que fizer das informações obtidas por meio do site.
              </p>
            </div>
          </section>

          {/* 4 PROPRIEDADE INTELECTUAL */}
          <section className="mb-12">
            <h2 className="text-2xl font-black section-title mb-4">4. PROPRIEDADE INTELECTUAL</h2>
            <div className="space-y-4 body-text text-base leading-relaxed">
              <p>
                Todo o conteúdo disponibilizado neste site — incluindo, mas não se limitando a textos, imagens, fotografias, logotipos, marcas, layouts, código-fonte e materiais de marketing — é de propriedade exclusiva da MX Brasil Participações S.A. ou de seus licenciadores, sendo protegido pelas leis brasileiras e internacionais de propriedade intelectual.
              </p>
              <p>
                É vedada qualquer reprodução, distribuição, modificação ou uso comercial do conteúdo sem autorização prévia e expressa por escrito da REMAX Agro. O acesso ao site não confere ao usuário qualquer direito sobre marcas, patentes, direitos autorais ou outros ativos intelectuais da empresa.
              </p>
              <p>
                As marcas RE/MAX® e REMAX Agro® são marcas registradas da RE/MAX Holdings, Inc., utilizadas sob licença pela MX Brasil Participações S.A. no Brasil. A marca DATAGRO® é de propriedade de seus respectivos titulares.
              </p>
            </div>
          </section>

          {/* 5 LIMITAÇÃO DE RESPONSABILIDADE */}
          <section className="mb-12">
            <h2 className="text-2xl font-black section-title mb-4">5. LIMITAÇÃO DE RESPONSABILIDADE</h2>
            <div className="space-y-4 body-text text-base leading-relaxed">
              <p>
                A REMAX Agro empenha seus melhores esforços para assegurar a precisão e atualidade das informações disponibilizadas no site, mas não garante a completude, exatidão ou adequação dessas informações para fins específicos.
              </p>
              <p>A REMAX Agro não se responsabiliza por:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Decisões de investimento ou negócios tomadas com base nas informações disponíveis no site;</li>
                <li>Disponibilidade ininterrupta do site ou de seus serviços;</li>
                <li>Danos decorrentes de uso indevido do site pelo usuário;</li>
                <li>Conteúdo de sites de terceiros acessados via links presentes em nossas páginas.</li>
              </ul>
            </div>
          </section>

          {/* 6 POLÍTICA DE LINKS */}
          <section className="mb-12">
            <h2 className="text-2xl font-black section-title mb-4">6. LINKS PARA SITES DE TERCEIROS</h2>
            <div className="space-y-4 body-text text-base leading-relaxed">
              <p>
                Este site pode conter links para sites de terceiros, como o portal da DATAGRO, redes sociais e plataformas de comunicação. Esses links são fornecidos para conveniência do usuário e não representam endosso ou responsabilidade da REMAX Agro pelo conteúdo de tais sites.
              </p>
              <p>
                Recomendamos que o usuário consulte os termos de uso e políticas de privacidade de cada site visitado.
              </p>
            </div>
          </section>

          {/* 7 ALTERAÇÕES */}
          <section className="mb-12">
            <h2 className="text-2xl font-black section-title mb-4">7. ALTERAÇÕES DOS TERMOS</h2>
            <div className="space-y-4 body-text text-base leading-relaxed">
              <p>
                A REMAX Agro reserva-se o direito de modificar estes Termos de Uso a qualquer momento, sem aviso prévio, mediante publicação da versão atualizada neste site. O uso continuado dos serviços após tais modificações implica a aceitação dos novos termos.
              </p>
              <p>
                Recomendamos que o usuário revise periodicamente estes Termos.
              </p>
            </div>
          </section>

          {/* 8 LEI APLICÁVEL */}
          <section className="mb-12">
            <h2 className="text-2xl font-black section-title mb-4">8. LEI APLICÁVEL E FORO</h2>
            <div className="space-y-4 body-text text-base leading-relaxed">
              <p>
                Estes Termos de Uso são regidos pelas leis da República Federativa do Brasil. Para dirimir quaisquer controvérsias decorrentes deste instrumento, as partes elegem o foro da Comarca de São Paulo, Estado de São Paulo, com renúncia expressa a qualquer outro, por mais privilegiado que seja.
              </p>
            </div>
          </section>

          {/* 9 CONTATO */}
          <section className="mb-12">
            <h2 className="text-2xl font-black section-title mb-4">9. CONTATO</h2>
            <div className="space-y-4 body-text text-base leading-relaxed">
              <p>
                Em caso de dúvidas sobre estes Termos de Uso, entre em contato:
              </p>
              <div className="glass-box p-6 mt-4">
                <p><strong>REMAX Agro — MX Brasil Participações S.A.</strong></p>
                <p>E-mail: <a href="mailto:contatoagro@remax.com.br" className="text-bridge-red hover:underline">contatoagro@remax.com.br</a></p>
                <p>Site: <a href="https://agro.remax.com.br" target="_blank" rel="noopener noreferrer" className="text-bridge-red hover:underline">agro.remax.com.br</a></p>
                <p>Localização: São Paulo, SP — Brasil</p>
              </div>
              <p className="text-sm text-gray-400 mt-6">
                Última atualização: Junho de 2025.
              </p>
            </div>
          </section>

        </motion.div>
      </div>
    </div>
  )
}
