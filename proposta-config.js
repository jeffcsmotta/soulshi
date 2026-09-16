/**
 * ONIRA.FLY — Proposta Base: Configuração de Nichos & Benchmarks de Mercado
 * Fonte única de verdade para dados setoriais injetados no template dinâmico.
 *
 * URL Params:
 *   ?nome=Nome+do+Prospect
 *   &nicho=hamburgueria        (chave do NICHO_CONFIG)
 *   &dominio=meusite.com.br
 *   &tel=5554999999999         (somente dígitos)
 *   &av=842                    (avaliações Google)
 *   &cidade=Caxias+do+Sul
 *   &bairro=Centro
 */
const NICHO_CONFIG = {
    bebidas: {
        label: "Bebidas, Adega & Conveniência", emoji: "🍺",
        screenshot: "../assets/screenshots/montecristo_mobile.jpg",
        hero: {
            eyebrow: "ADEGA & DELIVERY DE BEBIDAS",
            headline: "Sem comissão de marketplace nas compras que seus clientes já fazem toda semana.",
            sub: "Packs de cerveja, destilados e bebidas geladas chegam direto no WhatsApp da adega — sem o cliente precisar abrir nenhum app de entrega."
        },
        micrometrics: [
            { icon:"percent",      title:"Margem 100% sua",          desc:"O cliente que pede pack todo fim de semana não tem que pagar 27% pra plataforma. O lucro fica com quem vende." },
            { icon:"layers",       title:"Zero Mudança no Balcão",   desc:"Sem sistema novo: a comanda chega no WhatsApp da adega exatamente como está hoje." },
            { icon:"shield-check", title:"Tecnologia Invisível",     desc:"Sem login e sem app a instalar. Seu cliente encontra o pack que quer em 2 toques." },
            { icon:"send",         title:"Despacho Pronto",          desc:"Pedido formatado com bebidas, quantidade e forma de pagamento. Pronto para separação." }
        ],
        benchmark: {
            taxa:     { value:"~27%",       label:"Taxa Média iFood & Apps",     desc:"Comissão média que marketplaces cobram por pedido de bebidas e conveniência — tratada como CAC de aquisição." },
            ticket:   { value:"R$ 90,00",   label:"Ticket Médio do Setor",       desc:"Valor médio por pedido em adega e conveniência com bebidas, packs e petiscos." },
            retencao: { value:"68%",        label:"dos Pedidos São Recompras",   desc:"Em bebidas e conveniência, mais de 6 em 10 pedidos vêm do mesmo cliente recorrente toda semana." },
            saving:   { value:"R$ 4.750",   label:"Saving Potencial por Mês",    desc:"Valor preservado em margem ao reter 340 pedidos recorrentes no canal próprio." }
        },
        cta_phrase: "Vamos conversar 10 minutos sobre a sua adega?"
    },
    delicatessen: {
        label: "Delicatessen, Doces & Pâtisserie", emoji: "🍰",
        screenshot: "../assets/screenshots/fafa_mobile.jpg",
        hero: {
            eyebrow: "ATELIÊ DE CONFEITARIA & PRESENTES",
            headline: "Seus doces artesanais e presentes gourmets chegam sem taxa de marketplace na recompra.",
            sub: "Caixas personalizadas, tortas e encomendas enviadas com comanda mastigada no WhatsApp — preservando 100% da margem em cada presente afetivo."
        },
        micrometrics: [
            { icon:"sparkles",       title:"Margem 100% na Recompra",   desc:"Cada caixa de cookies e encomenda mensal do cliente fiel fica 100% no seu caixa, sem comissão." },
            { icon:"gift",           title:"Encomendas com Agendamento", desc:"Campo de data, horário e dedicatória no próprio checkout, sem troca de mensagem manual." },
            { icon:"shield-check",   title:"Tecnologia Invisível",      desc:"O cliente escolhe o doce, a caixa e a quantidade em 2 toques. Zero login." },
            { icon:"calendar-clock", title:"Comanda com Dedicatória",   desc:"A mensagem do presente chega mastigada junto com a comanda no WhatsApp." }
        ],
        benchmark: {
            taxa:     { value:"~27%",       label:"Taxa Média Marketplace",       desc:"Comissão média cobrada nos pedidos de pâtisserie e confeitaria fina em plataformas." },
            ticket:   { value:"R$ 88,00",   label:"Ticket Médio do Setor",        desc:"Valor médio por pedido em confeitaria artesanal e presentes gourmets." },
            retencao: { value:"75%",        label:"dos Clientes Voltam Todo Mês", desc:"Confeitaria fina tem alta fidelidade: 3 em 4 clientes fazem nova encomenda no mês seguinte." },
            saving:   { value:"R$ 4.980",   label:"Saving Potencial por Mês",     desc:"Margem preservada ao reter 280 pedidos mensais recorrentes no canal próprio." }
        },
        cta_phrase: "Vamos alinhar os detalhes da sua confeitaria?"
    },
    hamburgueria: {
        label: "Hamburgueria Artesanal & Smash", emoji: "🍔",
        screenshot: "../assets/screenshots/baitakao_mobile.jpg",
        hero: {
            eyebrow: "HAMBURGUERIA ARTESANAL & SMASH",
            headline: "Noites de pico com 460 pedidos mastigados, sem digitar nada no balcão.",
            sub: "Ponto da carne, molho especial e adicionais chegam formatados no WhatsApp do balcão. A chapa trabalha sem fila de dúvidas."
        },
        micrometrics: [
            { icon:"flame",        title:"Margem 100% na Recompra",   desc:"O cliente que pede smash toda sexta não tem que pagar 27% de comissão. O lucro fica com quem assa." },
            { icon:"layers",       title:"Zero Digitação no Balcão",  desc:"A comanda chega mastigada com ponto, queijo e adicional. Sem retrabalho para a chapa." },
            { icon:"shield-check", title:"Sem App para Baixar",       desc:"O cliente monta o hambúrguer em 26 segundos e envia pelo WhatsApp. Zero cadastro." },
            { icon:"trending-up",  title:"Upsell de Batata & Bebida", desc:"Sugestão de combo aparece antes de finalizar, elevando ticket médio sem pressão." }
        ],
        benchmark: {
            taxa:     { value:"~27%",       label:"Taxa Média iFood & Apps",   desc:"Comissão média de marketplace sobre pedidos de hamburgueria artesanal e smash." },
            ticket:   { value:"R$ 65,00",   label:"Ticket Médio do Setor",     desc:"Ticket médio em hamburguerias artesanais incluindo combo lanche + batata + bebida." },
            retencao: { value:"62%",        label:"dos Pedidos São Recompras", desc:"Hamburguerias têm forte fidelidade: mais de 6 em 10 pedidos vêm de clientes habituais." },
            saving:   { value:"R$ 6.420",   label:"Saving Potencial por Mês",  desc:"Margem preservada ao reter 460 pedidos recorrentes de sexta e sábado no canal próprio." }
        },
        cta_phrase: "Vamos alinhar os detalhes da sua hamburgueria?"
    },
    pizzaria: {
        label: "Pizzaria & Forneria Artesanal", emoji: "🍕",
        screenshot: "../assets/screenshots/pizzaria_mobile.jpg",
        hero: {
            eyebrow: "PIZZARIA & FORNERIA ARTESANAL",
            headline: "Meio a meio, bordas e tamanho em 30 segundos. Comanda pronta para o forno.",
            sub: "Sem confusão de pedido por WhatsApp manual: o cliente escolhe os 2 sabores, a borda e a quantidade. Tudo formatado antes de chegar na esteira."
        },
        micrometrics: [
            { icon:"flame",        title:"Margem 100% na Recompra",     desc:"Os clientes de pizza em família todo sábado não devem 27% pra plataforma. Essa margem é sua." },
            { icon:"pie-chart",    title:"Meio a Meio sem Confusão",    desc:"Divisão de até 2 sabores e bordas selecionadas no próprio card. Sem pedido errado." },
            { icon:"shield-check", title:"Tecnologia Invisível",        desc:"Zero cadastro e zero app. Em 30 segundos o pedido está mastigado no WhatsApp." },
            { icon:"receipt",      title:"Comanda Pronta para o Forno", desc:"A mensagem traz sabores, borda e adicionais formatados para impressão direta." }
        ],
        benchmark: {
            taxa:     { value:"~27%",       label:"Taxa Média Marketplace",          desc:"Comissão média cobrada por marketplaces em pedidos de pizza artesanal e forneria." },
            ticket:   { value:"R$ 78,00",   label:"Ticket Médio do Setor",           desc:"Ticket médio em pizzarias artesanais incluindo pizza + bebida + sobremesa." },
            retencao: { value:"71%",        label:"das Famílias Voltam Toda Semana", desc:"Pizzaria tem ritual semanal: 7 em 10 pedidos são de clientes habituais." },
            saving:   { value:"R$ 5.850",   label:"Saving Potencial por Mês",        desc:"Margem preservada ao reter 390 pedidos recorrentes de fim de semana no canal próprio." }
        },
        cta_phrase: "Vamos alinhar os detalhes da sua pizzaria?"
    },
    pastelaria: {
        label: "Pastelaria Artesanal & Tradição", emoji: "🥟",
        screenshot: "../assets/screenshots/claem_mobile.jpg",
        hero: {
            eyebrow: "PASTELARIA ARTESANAL",
            headline: "Pastéis doces e salgados em 22 segundos. Comanda pronta para a fritadeira.",
            sub: "O cliente seleciona recheio, tamanho e combo em 2 toques. A comanda chega mastigada no WhatsApp sem confusão de pedido manual."
        },
        micrometrics: [
            { icon:"badge-check",  title:"Margem 100% na Recompra",      desc:"Os clientes fiéis que pedem pastel toda semana não têm que pagar comissão de marketplace." },
            { icon:"tag",          title:"Tamanhos & Combos no Card",    desc:"Pills de P, G e 10 unidades no próprio card. Pedido de família em 2 toques." },
            { icon:"shield-check", title:"Sem App para Baixar",          desc:"Zero cadastro e zero login. O cliente fecha o pedido em 22 segundos no WhatsApp." },
            { icon:"send",         title:"Comanda Pronta para o Balcão", desc:"Endereço e forma de pagamento já organizados para o atendente." }
        ],
        benchmark: {
            taxa:     { value:"~27%",       label:"Taxa Média Marketplace",        desc:"Comissão média de marketplace sobre pedidos de pastelaria e salgados artesanais." },
            ticket:   { value:"R$ 52,00",   label:"Ticket Médio do Setor",         desc:"Ticket médio em pastelarias incluindo combo de pastéis mais bebida." },
            retencao: { value:"65%",        label:"dos Clientes Voltam Toda Semana", desc:"Pastelaria tem consumo habitual: mais de 6 em 10 pedidos são de clientes recorrentes." },
            saving:   { value:"R$ 4.750",   label:"Saving Potencial por Mês",       desc:"Margem preservada ao reter 360 pedidos semanais recorrentes no canal próprio." }
        },
        cta_phrase: "Vamos alinhar os detalhes da sua pastelaria?"
    },
    sushi: {
        label: "Sushi, Temakeria & Pokes", emoji: "🍣",
        screenshot: "assets/soulshi_demo.png",
        hero: {
            eyebrow: "SUSHI & TEMAKERIA NO LOURDES",
            headline: "Combos, temakis e pokes em 30 segundos. Comanda pronta para a cozinha.",
            sub: "O cliente monta o combinado e envia direto no WhatsApp oficial — sem app, sem cadastro e sem comissão na recompra."
        },
        micrometrics: [
            { icon:"fish",         title:"Margem 100% na Recompra",   desc:"O cliente que pede combo toda semana não tem que pagar taxa de marketplace. O lucro fica com quem monta a peça." },
            { icon:"layers",        title:"Combinado sem Confusão",    desc:"Peças, hots e porções escolhidos no próprio card. O pedido chega mastigado, sem erro de anotação." },
            { icon:"shield-check",  title:"Sem App para Baixar",       desc:"Zero cadastro e zero login. Do cardápio ao WhatsApp em menos de 30 segundos." },
            { icon:"send",          title:"Comanda Pronta p/ Cozinha", desc:"Endereço, pagamento e observações já organizados para o atendente despachar." }
        ],
        benchmark: {
            taxa:     { value:"~27%",      label:"Taxa Média Marketplace",    desc:"Comissão média de marketplace sobre pedidos de sushi delivery — tratada como CAC de aquisição." },
            ticket:   { value:"R$ 131,00", label:"Ticket Médio dos Combos",   desc:"Ticket médio real dos 18 combos do cardápio Soulshi no delivery." },
            retencao: { value:"68%",       label:"dos Pedidos São Recompras", desc:"Em sushi delivery, a maioria dos pedidos vem de clientes fiéis que recompram toda semana." },
            saving:   { value:"R$ 5.900",  label:"Saving Potencial por Mês",  desc:"Margem preservada ao reter os pedidos recorrentes dos fiéis no canal próprio." }
        },
        cta_phrase: "Vamos alinhar os detalhes da Soulshi?"
    }
};

const NICHO_DEFAULT = {
    label:"Gastronomia Local", emoji:"🍽️",
    screenshot:"../assets/screenshots/montecristo_mobile.jpg",
    hero: {
        eyebrow:"SEU CANAL PRÓPRIO DIGITAL",
        headline:"Seu delivery com 100% da margem, sem taxas de marketplace na recompra.",
        sub:"Cardápio interativo de alta velocidade, pedidos diretos no WhatsApp oficial e domínio próprio da sua marca."
    },
    micrometrics: [
        { icon:"percent",      title:"Margem 100% sua",        desc:"O cliente fiel que recompra todo mês não tem que pagar 20% a 27% de comissão pra plataforma." },
        { icon:"layers",       title:"Zero Mudança no Balcão", desc:"Sem sistema novo: a comanda chega no WhatsApp da sua equipe como está hoje." },
        { icon:"shield-check", title:"Tecnologia Invisível",   desc:"Sem login e sem app. Seu cliente encontra e pede em menos de 30 segundos." },
        { icon:"send",         title:"Despacho Pronto",        desc:"Pedido formatado com todos os opcionais, endereço e pagamento. Direto para a cozinha." }
    ],
    benchmark: {
        taxa:     { value:"~27%",      label:"Taxa Média Marketplace",    desc:"Comissão média que plataformas de delivery cobram por pedido — tratada como CAC de aquisição." },
        ticket:   { value:"R$ 72,00",  label:"Ticket Médio de Referência", desc:"Valor médio de referência por pedido no segmento de gastronomia local." },
        retencao: { value:"65%",       label:"dos Pedidos São Recompras", desc:"Na maioria das operações locais, mais de 6 em 10 pedidos vêm de clientes recorrentes." },
        saving:   { value:"R$ 5.200",  label:"Saving Potencial por Mês",  desc:"Margem preservada ao reter pedidos recorrentes no canal próprio com taxa zero." }
    },
    cta_phrase: "Vamos conversar sobre o seu negócio?"
};
