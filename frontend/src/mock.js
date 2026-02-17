// Mock data para Plataforma Editor Premium (Hormozi 100M Offers - 2 produtos)

export const productData = {
  id: 'plataforma_editor_premium',
  name: 'Plataforma Editor Premium',
  tagline: 'Um Arsenal Cinematográfico pronto para aplicar em minutos — com opção de 1 clique no Premiere e After Effects',
  description:
    'A Plataforma Editor Premium não é um pack de cenas. É um Sistema de Arsenal Cinematográfico: biblioteca organizada por objetivo + pré-visualização rápida + aplicação prática. E se você quiser o workflow mais rápido, você pode adicionar o Plugin (Premiere + After Effects) para aplicar em 1 clique.',

  scenesCount: 200,

  // Features focadas no produto base + upgrade do plugin
  features: [
    {
      title: 'Biblioteca Cinematográfica Organizada',
      description: 'Cenas organizadas por objetivo e impacto para você encontrar rapidamente o que precisa.',
      icon: 'play-circle',
    },
    {
      title: 'Cenas de abertura de alto impacto',
      description: 'Perfeitas para prender atenção nos primeiros segundos e fugir totalmente do visual amador.',
      icon: 'film',
    },
    {
      title: 'B-Roll Cinematográfico Premium',
      description: 'Detalhes, texturas e enquadramentos pensados para dar profundidade e storytelling real.',
      icon: 'camera',
    },
    {
      title: 'Cenas de clímax e impacto',
      description: 'Momentos intensos para ofertas, chamadas e viradas estratégicas no vídeo.',
      icon: 'zap',
    },
    {
      title: 'Modo Turbo (Upgrade): Plugin Premiere + After Effects',
      description: 'Pré-visualize e aplique cenas direto na timeline com 1 clique (somente no plano Plataforma + Plugin).',
      icon: 'sparkles',
    },
  ],

  withoutPack: [
    'Perder horas organizando pastas e procurando cenas espalhadas.',
    'Usar bancos genéricos que todo mundo já utiliza.',
    'Ter um workflow lento e desorganizado.',
    'Cobrar menos porque sua edição não transmite nível profissional.',
  ],

  withPack: [
    'Aplicar cenas cinematográficas direto na timeline em minutos.',
    'Ter uma biblioteca organizada com + de 200 cenas.',
    'Elevar o nível visual dos seus vídeos imediatamente.',
    'Cobrar mais caro com confiança.',
    'Ganhar velocidade real no workflow.',
  ],

  // Benefits do produto base (27)
  benefits: [
    '+ de 200 cenas cinematográficas organizadas',
    'Pré-visualização rápida',
    'Atualizações constantes',
    'Uso comercial liberado',
    'Acesso vitalício',
    'Garantia de 7 dias',
  ],

  faqs: [
    {
      question: 'O plugin funciona dentro do Premiere e After Effects?',
      answer:
        'Sim. O plugin é instalado dentro do seu software e permite pré-visualizar e aplicar cenas em 1 clique direto na timeline.',
    },
    {
      question: 'Consigo usar as cenas em qualquer programa de edição?',
      answer:
        'Sim. As cenas podem ser usadas em qualquer editor. O plugin (1 clique) é exclusivo para Premiere e After Effects.',
    },
    {
      question: 'Funciona no CapCut ou no celular?',
      answer:
        'Você pode usar as cenas em qualquer editor, mas o Plugin (1 clique) é exclusivo para Premiere e After Effects no computador.',
    },
    {
      question: 'Por quanto tempo tenho acesso?',
      answer: 'O acesso é vitalício. Comprou uma vez, é seu para sempre.',
    },
    {
      question: 'Como recebo o acesso?',
      answer:
        'Após a confirmação do pagamento, você recebe automaticamente por email as instruções de acesso e acesso imediato à plataforma.',
    },
    {
      question: 'Posso usar em projetos para clientes?',
      answer: 'Sim, o uso comercial é liberado para projetos de clientes.',
    },
    {
      question: 'Isso é assinatura?',
      answer:
        'Não. Você paga uma vez e tem acesso vitalício (incluindo atualizações e novos conteúdos conforme liberados).',
    },
    {
      question: 'Se eu não gostar, posso pedir reembolso?',
      answer:
        'Sim. Você tem 7 dias de garantia. Se não sentir diferença real na velocidade e na estética, é só solicitar reembolso.',
    },
  ],

  about: {
    name: 'Diorgy',
    imageUrl: 'https://res.cloudinary.com/dxphh6tjh/image/upload/v1771269168/DFFDSFAS_mgjknu.png',
    description:
      'Editor profissional especializado em reels de alta retenção e workflow otimizado para criadores e infoprodutores.',
  },
};

export const testimonials = [
  {
    image: 'https://res.cloudinary.com/dxphh6tjh/image/upload/v1771002617/WhatsApp_Image_2026-01-09_at_12.43.36_pwsuck.jpg',
    alt: 'Depoimento 1',
  },
  {
    image: 'https://res.cloudinary.com/dxphh6tjh/image/upload/v1771002617/WhatsApp_Image_2026-01-09_at_12.43.36_1_lfw1fc.jpg',
    alt: 'Depoimento 2',
  },
  {
    image: 'https://res.cloudinary.com/dxphh6tjh/image/upload/v1771002617/WhatsApp_Image_2026-01-06_at_10.30.25_xwmc1h.jpg',
    alt: 'Depoimento 3',
  },
  {
    image: 'https://res.cloudinary.com/dxphh6tjh/image/upload/v1771002614/WhatsApp_Image_2026-01-06_at_10.29.44_u2nf24.jpg',
    alt: 'Depoimento 4',
  },
  {
    image: 'https://res.cloudinary.com/dxphh6tjh/image/upload/v1771002613/WhatsApp_Image_2026-01-06_at_10.29.13_awbun1.jpg',
    alt: 'Depoimento 5',
  },
];

export const showcaseScenes = [
  { id: 1, category: 'Cena Cinematográfica', videoUrl: 'https://customer-assets.emergentagent.com/job_pro-footage/artifacts/zoahlsft_Sequence%2004_8.mp4' },
  { id: 2, category: 'Cena Cinematográfica', videoUrl: 'https://customer-assets.emergentagent.com/job_pro-footage/artifacts/p8l5yqo2_Sequence%2004_10.mp4' },
  { id: 3, category: 'Cena Cinematográfica', videoUrl: 'https://customer-assets.emergentagent.com/job_pro-footage/artifacts/14j05v9j_Sequence%2003.mp4' },
  { id: 4, category: 'Cena Cinematográfica', videoUrl: 'https://customer-assets.emergentagent.com/job_pro-footage/artifacts/5u6tsopi_Sequence%2003_2.mp4' },
];

export const resultVideos = [
  {
    id: 1,
    title: 'Edição Viral',
    videoUrl: 'https://res.cloudinary.com/dxphh6tjh/video/upload/v1771002983/postar_amanha_iaxmdd.mp4',
    posterUrl: 'https://res.cloudinary.com/dxphh6tjh/image/upload/v1771003578/Captura_de_tela_2026-02-13_142559_ujydng.png',
    tag: 'Viral',
  },
  {
    id: 2,
    title: 'Impacto Cinematográfico',
    videoUrl:
      'https://res.cloudinary.com/dxphh6tjh/video/upload/v1771002750/If_this_is_the_shift_you_know_you_need_in_2026_DM_me_Coaching_and_I_ll_send_you_the_details_cm2map.mp4',
    posterUrl: 'https://res.cloudinary.com/dxphh6tjh/image/upload/v1771003904/Captura_de_tela_2026-02-13_143042_ctx5kc.png',
    tag: 'Impact',
  },
];

// ⚠️ Importante: bônus agora são exclusivos do plano Plataforma + Plugin
export const bonuses = [
  {
    title: 'Pack de Efeitos Sonoros Cinematográficos',
    description: '- Impactos\n- Transições\n- Ambientes\n- Finalização profissional',
    image: 'https://res.cloudinary.com/dxphh6tjh/image/upload/v1771002151/sdfgdsfgdsfgdsgdg_qqsbat.png',
  },
  {
    title: 'Pack de LUTs Cinematográficas',
    description: '- Looks prontos\n- Tom de cinema\n- Consistência visual em segundos',
    image: 'https://res.cloudinary.com/dxphh6tjh/image/upload/v1771002151/sadasd_vz41ul.png',
  },
  {
    title: 'Pack Editor Premium (Overlays + Assets)',
    description: '- Overlays\n- Backgrounds\n- Elementos gráficos\n- Assets de alta conversão',
    image: 'https://res.cloudinary.com/dxphh6tjh/image/upload/v1771002219/Adobe_Express_-_filedfd_1_op19ct.png',
  },
];
