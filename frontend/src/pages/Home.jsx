import React, { useEffect } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { Badge } from '../components/ui/badge';
import {
  PlayCircle,
  Film,
  Camera,
  Zap,
  Sparkles,
  Check,
  X,
  ChevronRight,
  Volume2,
  Palette,
  BookOpen,
  Rocket,
  Star,
} from 'lucide-react';
import { productData, testimonials, showcaseScenes, resultVideos } from '../mock';

const iconMap = {
  'play-circle': PlayCircle,
  film: Film,
  camera: Camera,
  zap: Zap,
  sparkles: Sparkles,
  'volume-2': Volume2,
  palette: Palette,
  'book-open': BookOpen,
};

const KIWIFY_CHECKOUT_URL = 'https://pay.kiwify.com.br/FGAsVK2'; // Plataforma
const KIWIFY_CHECKOUT_PLUGIN_URL = 'https://pay.kiwify.com.br/7t7Vix1'; // Plataforma + Plugin

const OFFER_SECTION_ANCHOR = 'oferta';
const OFFER_SECTION_BONUS_ANCHOR = 'bonus';

export const Home = () => {
  const handleScroll = (id) => (e) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  // Tracking params Kiwify
  useEffect(() => {
    const params = window.location.search;

    if (params) {
      const links = document.querySelectorAll('a[href*="kiwify.com.br"]');

      links.forEach((link) => {
        let currentHref = link.getAttribute('href');

        if (currentHref && !currentHref.includes(params.replace('?', ''))) {
          const separator = currentHref.includes('?') ? '&' : '?';
          const finalParams = separator === '&' ? params.replace('?', '') : params;

          link.setAttribute('href', currentHref + finalParams);
        }
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-600 selection:text-white">
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
      `}</style>

      {/* =========================
          1) HERO (Hormozi)
         ========================= */}
      <section className="relative pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-black to-black" />

        <div className="hidden md:block absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 bg-blue-600/30 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-20 right-10 w-96 h-96 bg-blue-700/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: '1s' }}
          />
        </div>

        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="text-center">
            <h2 className="font-black tracking-tight leading-[1.1] text-[28px] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
              Pare de garimpar cenas genéricas.{' '}
              <span className="inline-block bg-gradient-to-r from-blue-400 via-blue-600 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(37,99,235,0.25)]">
                Tenha um Arsenal Cinematográfico
              </span>{' '}
              aplicável em 1 clique,
              <br className="hidden sm:block" />
              <span className="block mt-2 sm:mt-0">direto no seu software de edição</span>
            </h2>

            {/* HERO VIDEO */}
            <div className="w-full flex justify-center mt-8 sm:mt-10">
              <div className="w-full max-w-5xl mx-auto">
                <div className="relative w-full overflow-hidden rounded-2xl border border-zinc-800 drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)] bg-black">
                  <div className="relative w-full aspect-[16/9]">
                    <video
                      className="absolute inset-0 w-full h-full object-cover"
                      src="https://res.cloudinary.com/dwh5qsz4m/video/upload/v1770402808/02_Correto.22Mp4_xmvxlh.mp4"
                      autoPlay
                      muted
                      loop
                      playsInline
                      controls
                      preload="metadata"
                    />
                  </div>
                </div>
              </div>
            </div>

            <p className="text-base sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mt-8 sm:mt-10 leading-relaxed">
              Você recebe um sistema pronto para{' '}
              <span className="font-bold text-white">entregar vídeos com estética de cinema em minutos</span>, mantendo
              consistência visual e economizando horas de tentativa e erro.
            </p>

            {/* CTA (2 produtos) */}
            <div className="pt-8 sm:pt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
              <a
                href="#plano-plataforma"
                onClick={handleScroll('plano-plataforma')}
                className="inline-flex items-center justify-center bg-zinc-900/70 border border-zinc-800 hover:border-zinc-600 text-white font-black text-sm sm:text-lg px-6 sm:px-10 py-4 sm:py-6 rounded-full transition-all duration-300 hover:scale-105 w-full sm:w-auto"
              >
                Quero só a Plataforma
                <ChevronRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </a>

              <a
                href="#plano-plugin"
                onClick={handleScroll('plano-plugin')}
                className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-black text-sm sm:text-lg px-6 sm:px-10 py-4 sm:py-6 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-600/50 w-full sm:w-auto"
              >
                Quero Plataforma + Plugin (1 clique)
                <ChevronRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </a>
            </div>

            {/* Micro-proof */}
            <div className="mt-8 flex flex-wrap gap-3 justify-center text-xs sm:text-sm text-gray-400">
              <span className="px-3 py-2 rounded-full border border-zinc-800 bg-zinc-950/60">
                +200 cenas cinematográficas
              </span>
              <span className="px-3 py-2 rounded-full border border-zinc-800 bg-zinc-950/60">
                Pré-visualização rápida
              </span>
              <span className="px-3 py-2 rounded-full border border-zinc-800 bg-zinc-950/60">
                Organização por objetivo
              </span>
              <span className="px-3 py-2 rounded-full border border-zinc-800 bg-zinc-950/60">
                Acesso vitalício + 7 dias de garantia
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          2) PROBLEMA (Hormozi)
         ========================= */}
      <section className="py-16 px-4 bg-zinc-950">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-10">
            <Badge className="bg-blue-600/10 text-blue-500 border-blue-600/20 mb-4 px-4 py-1">
              O problema real
            </Badge>
            <h3 className="text-3xl md:text-4xl font-bold">
              Editar não é o difícil. <span className="text-blue-600">O difícil é ter repertório pronto.</span>
            </h3>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto mt-4">
              Sem um arsenal organizado, você paga com tempo: procura infinita, inconsistência visual e “cara de banco
              genérico”.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800">
              <X className="h-7 w-7 text-red-500 mb-3" />
              <h4 className="font-bold text-white mb-2">Horas perdidas</h4>
              <p className="text-gray-400 text-sm">
                Você fica caçando cena, testando, descartando — e o prazo continua correndo.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800">
              <X className="h-7 w-7 text-red-500 mb-3" />
              <h4 className="font-bold text-white mb-2">Estética fraca</h4>
              <p className="text-gray-400 text-sm">
                O cliente sente quando é “banco grátis”. E isso trava seu ticket.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800">
              <X className="h-7 w-7 text-red-500 mb-3" />
              <h4 className="font-bold text-white mb-2">Inconsistência</h4>
              <p className="text-gray-400 text-sm">
                Cada projeto fica com uma cara diferente — difícil criar assinatura visual.
              </p>
            </div>
          </div>

          <div className="text-center mt-10">
            <a
              href={`#${OFFER_SECTION_ANCHOR}`}
              onClick={handleScroll(OFFER_SECTION_ANCHOR)}
              className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white font-black text-sm sm:text-lg px-6 sm:px-10 py-4 sm:py-6 rounded-full transition-all duration-300 hover:scale-105 uppercase shadow-[0_10px_40px_rgba(37,99,235,0.35)] w-full sm:w-auto"
            >
              Quero resolver isso agora <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 ml-2 animate-pulse" />
            </a>
          </div>
        </div>
      </section>

      {/* =========================
          3) DEMO / EXEMPLOS (prova visual)
         ========================= */}
      <section className="py-20 px-4 bg-gradient-to-b from-black via-zinc-950 to-black relative overflow-hidden">
        <div className="hidden md:block absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/30 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-700/20 rounded-full filter blur-3xl"></div>
        </div>

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-16">
            <Badge className="bg-blue-600/20 text-blue-500 border-blue-600/30 mb-4">Exemplos reais</Badge>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Veja a <span className="text-blue-600">Qualidade Cinematográfica</span>
            </h3>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Algumas das cenas que você aplica em minutos, com consistência visual.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 px-4">
            {showcaseScenes.slice(0, 4).map((scene, index) => (
              <div
                key={scene.id}
                className="group relative"
                style={{
                  transform: `translateY(${index % 2 === 0 ? '0' : '2rem'})`,
                  animation: `float ${3 + index * 0.5}s ease-in-out infinite`,
                }}
              >
                <div className="relative mx-auto w-full max-w-[180px] sm:max-w-[200px] md:max-w-[220px]">
                  <div className="relative bg-zinc-900 rounded-[2.5rem] p-2 shadow-2xl border-4 border-zinc-800 group-hover:border-blue-600/50 transition-all duration-300">
                    <div className="relative bg-black rounded-[2rem] overflow-hidden aspect-[9/19.5]">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-6 bg-zinc-900 rounded-b-2xl z-10"></div>

                      <video
                        className="w-full h-full object-cover"
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="metadata"
                        loading="lazy"
                      >
                        <source src={scene.videoUrl} type="video/mp4" />
                      </video>

                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full px-4">
                          <Badge className="bg-blue-600 text-white text-xs shadow-lg mx-auto block w-fit">
                            Cena {index + 1}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="hidden md:block absolute inset-0 -z-10 bg-blue-600/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-90"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Painel funcionando */}
          <div className="mt-16 md:mt-20">
            <div className="max-w-5xl mx-auto text-center">
              <h3 className="text-2xl md:text-4xl font-black tracking-tight mb-4">
                Diga adeus à bagunça de pastas e downloads infinitos.
              </h3>

              <p className="text-gray-400 text-base md:text-lg max-w-3xl mx-auto mb-10">
                Veja o painel funcionando dentro do After Effects / Premiere: pré-visualização, seleção e aplicação
                rápida.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div className="relative rounded-2xl border border-zinc-800 overflow-hidden bg-black shadow-[0_18px_50px_rgba(0,0,0,0.55)]">
                  <img
                    src="https://res.cloudinary.com/dpu5xvirv/image/upload/v1770852918/Sequence01-ezgif.com-video-to-gif-converter_xv3fho.gif"
                    alt="Painel funcionando no AE/Premiere - Demonstração 1"
                    className="w-full h-auto block"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                </div>

                <div className="relative rounded-2xl border border-zinc-800 overflow-hidden bg-black shadow-[0_18px_50px_rgba(0,0,0,0.55)]">
                  <img
                    src="https://res.cloudinary.com/dpu5xvirv/image/upload/v1770852917/gifafter-ezgif.com-video-to-gif-converter_wnmj9r.gif"
                    alt="Painel funcionando no AE/Premiere - Demonstração 2"
                    className="w-full h-auto block"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                </div>
              </div>

              <div className="flex justify-center mt-10 px-4">
                <a
                  href={`#${OFFER_SECTION_ANCHOR}`}
                  onClick={handleScroll(OFFER_SECTION_ANCHOR)}
                  className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white font-black text-sm sm:text-lg px-6 sm:px-10 py-4 sm:py-6 rounded-full transition-all duration-300 hover:scale-105 shadow-[0_10px_30px_rgba(37,99,235,0.35)] w-full sm:w-auto"
                >
                  QUERO ACESSAR AGORA
                  <ChevronRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes float {
            0%,
            100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-10px);
            }
          }
        `}</style>
      </section>

      {/* =========================
          4) MECANISMO ÚNICO (Hormozi)
         ========================= */}
      <section className="py-20 px-4 bg-zinc-950">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-10">
            <Badge className="bg-blue-600/10 text-blue-500 border-blue-600/20 mb-4 px-4 py-1">
              Mecanismo
            </Badge>
            <h3 className="text-3xl md:text-5xl font-bold">
              Não é “pack”. É um <span className="text-blue-600">Sistema de Arsenal Cinematográfico</span>.
            </h3>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto mt-4">
              Em vez de 100GB de arquivos soltos, você recebe um acervo organizado por objetivo, com pré-visualização e
              aplicação rápida — para terminar em minutos, não em horas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800">
              <Check className="h-7 w-7 text-blue-600 mb-3" />
              <h4 className="font-bold text-white mb-2">Organizado por objetivo</h4>
              <p className="text-gray-400 text-sm">Você encontra a cena certa rápido, sem ficar “garimpando”.</p>
            </div>
            <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800">
              <Check className="h-7 w-7 text-blue-600 mb-3" />
              <h4 className="font-bold text-white mb-2">Pré-visualização</h4>
              <p className="text-gray-400 text-sm">Passou o mouse, viu. Decide rápido e segue o workflow.</p>
            </div>
            <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800">
              <Zap className="h-7 w-7 text-blue-600 mb-3" />
              <h4 className="font-bold text-white mb-2">Aplicação em 1 clique</h4>
              <p className="text-gray-400 text-sm">Com o Plugin, você acelera ainda mais e aplica direto na timeline.</p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          5) RESULTADOS (mantém TODOS do array)
         ========================= */}
      <section className="py-24 px-4 bg-zinc-950 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-full bg-blue-600/5 blur-[100px] pointer-events-none"></div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-16">
            <Badge className="bg-blue-600/10 text-blue-500 border-blue-600/20 mb-4 px-4 py-1">
              Veja na prática
            </Badge>
            <h3 className="text-3xl md:text-5xl font-bold mb-6">
              O que você consegue criar <span className="text-blue-600">em minutos</span>
            </h3>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Exemplos reais de aplicação do arsenal cinematográfico no fluxo de edição.
            </p>
          </div>

          <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 md:overflow-visible scrollbar-hide">
            {resultVideos.map((video) => (
              <div
                key={video.id}
                className="min-w-[85vw] sm:min-w-[350px] md:min-w-0 snap-center group relative bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-blue-600/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(37,99,235,0.18)]"
              >
                <div className="absolute top-4 left-4 z-20">
                  <div className="bg-black/60 backdrop-blur-md border border-white/10 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-blue-600" />
                    {video.tag || 'Viral'}
                  </div>
                </div>

                <div className="relative aspect-[9/16] bg-black">
                  <video
                    className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                    controls
                    preload="none"
                    playsInline
                    poster={video.posterUrl}
                  >
                    <source src={video.videoUrl} type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>
                </div>

                <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-medium text-sm">{video.title}</span>
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <PlayCircle className="w-5 h-5 text-white fill-white/20" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <p className="text-gray-400 mb-6 text-lg">Agora escolha o plano e comece a aplicar hoje.</p>
            <div className="flex justify-center px-4">
              <a
                href={`#${OFFER_SECTION_ANCHOR}`}
                onClick={handleScroll(OFFER_SECTION_ANCHOR)}
                className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-black text-sm sm:text-lg px-6 sm:px-10 py-4 sm:py-6 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-600/50 w-full sm:w-auto"
              >
                QUERO ACESSAR AGORA
                <ChevronRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          6) O QUE TEM DENTRO (sem treinos/scripts)
         ========================= */}
      <section className="py-20 px-4 bg-black">
        <div className="container mx-auto max-w-6xl">
          <h3 className="text-3xl md:text-4xl font-bold mb-12 text-center text-white">
            O que tem dentro da <span className="text-blue-600">Plataforma</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-blue-600/30 transition-all">
              <PlayCircle className="h-10 w-10 text-blue-600 mb-4" />
              <h4 className="text-xl font-bold text-white mb-2">Biblioteca de cenas (+200)</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                Cenas cinematográficas prontas para usar, separadas por estilo e objetivo na edição.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-blue-600/30 transition-all">
              <Film className="h-10 w-10 text-blue-600 mb-4" />
              <h4 className="text-xl font-bold text-white mb-2">Área de referências</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                Referências rápidas para destravar criação e bater consistência visual.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-blue-600/30 transition-all">
              <Camera className="h-10 w-10 text-blue-600 mb-4" />
              <h4 className="text-xl font-bold text-white mb-2">Organização por temas</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                Categorias prontas para cada tipo de vídeo, cena e objetivo (impacto, transição, emoção etc.).
              </p>
            </div>

            <div className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-blue-600/30 transition-all">
              <Volume2 className="h-10 w-10 text-blue-600 mb-4" />
              <h4 className="text-xl font-bold text-white mb-2">Biblioteca de músicas virais</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                Repertório pronto para acelerar escolhas e manter ritmo/retenção.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-blue-600/30 transition-all">
              <Sparkles className="h-10 w-10 text-blue-600 mb-4" />
              <h4 className="text-xl font-bold text-white mb-2">Atualizações</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                Novas cenas e organização contínua para o acervo não “morrer” com o tempo.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-blue-600/5 border border-blue-600/20 hover:border-blue-600/50 transition-all shadow-[0_0_20px_rgba(37,99,235,0.06)]">
              <Zap className="h-10 w-10 text-blue-500 mb-4" />
              <h4 className="text-xl font-bold text-white mb-2">Aplicação em 1 clique (Plugin)</h4>
              <p className="text-gray-300 text-sm leading-relaxed">
                Para quem quer o workflow mais rápido: selecionar e aplicar direto no Premiere/After.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          7) SEM vs COM
         ========================= */}
      <section className="py-20 px-4 bg-zinc-950">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-2xl md:text-3xl font-bold mb-6 text-center lg:text-left">
                Sem o Arsenal Cinematográfico você vai...
              </h3>
              {productData.withoutPack.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 bg-red-950/20 p-4 rounded-lg border border-red-900/30"
                >
                  <X className="h-6 w-6 text-red-500 flex-shrink-0 mt-1" />
                  <span className="text-gray-300">{item}</span>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl md:text-3xl font-bold mb-2 text-center lg:text-left">
                Com a Plataforma você vai...
              </h3>

              <p className="text-gray-400 text-sm text-center lg:text-left mb-4">
                (e com a opção Plataforma + Plugin, você acelera ainda mais com aplicação em 1 clique.)
              </p>

              <div className="flex items-start space-x-3 bg-green-950/40 p-4 rounded-lg border border-green-500/50 shadow-lg shadow-green-500/10">
                <Check className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                <span className="text-gray-100 font-medium">
                  Ter um arsenal pronto para aplicar em minutos, com consistência e estética de cinema.
                </span>
              </div>

              {productData.withPack.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 bg-green-950/20 p-4 rounded-lg border border-green-900/30"
                >
                  <Check className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                  <span className="text-gray-300">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          8) BÔNUS (restaurado - Hormozi stack)
         ========================= */}
      <section id={OFFER_SECTION_BONUS_ANCHOR} className="py-24 px-4 bg-zinc-950 overflow-hidden relative">
        <div className="hidden md:block absolute top-1/4 left-0 w-96 h-96 bg-blue-600/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="hidden md:block absolute bottom-1/4 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="text-center mb-16">
            <Badge className="bg-blue-600/10 text-blue-500 border-blue-600/20 mb-6 px-4 py-1 text-base uppercase tracking-wider font-bold">
              Stack de Valor
            </Badge>
            <h3 className="text-4xl md:text-5xl font-black mb-6 text-white tracking-tight leading-tight uppercase">
              Exclusividades do <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700">PLATAFORMA + PLUGIN</span>
            </h3>
            <p className="text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed">
              Materiais profissionais que você recebe <span className="text-blue-500 font-bold border-b border-blue-600/50">sem custo adicional</span> ao escolher a oferta mais vendida.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {[
              {
                title: 'Pack de Efeitos Sonoros Cinematográficos',
                desc: 'Impactos, transições e ambientes para elevar a imersão e finalizar com estética premium.',
                price: 'R$ 97,00',
                tag: 'EXCLUSIVIDADE PLATAFORMA + PLUGIN',
              },
              {
                title: 'Pack de LUTs Cinematográficas',
                desc: 'Looks prontos para dar tom de cinema em segundos e manter consistência visual.',
                price: 'R$ 69,00',
                tag: 'EXCLUSIVIDADE PLATAFORMA + PLUGIN',
              },
              {
                title: 'Biblioteca de Hooks & Estruturas',
                desc: 'Estruturas prontas para acelerar criação, prender atenção e manter ritmo.',
                price: 'R$ 80,00',
                tag: 'EXCLUSIVIDADE PLATAFORMA + PLUGIN',
              },
              {
                title: 'Pack de Overlays (Impacto & Acabamento)',
                desc: 'Overlays e elementos para dar acabamento, dinamismo e impacto visual.',
                price: 'R$ 47,00',
                tag: 'EXCLUSIVIDADE PLATAFORMA + PLUGIN',
              },
            ].map((b, idx) => (
              <div
                key={idx}
                className="group relative bg-zinc-900/40 border border-blue-600/30 rounded-3xl p-6 md:p-10 overflow-hidden transition-all duration-500 hover:bg-zinc-900/60 shadow-[0_0_30px_rgba(37,99,235,0.06)]"
              >
                <div className="hidden md:block absolute -right-20 -bottom-20 w-[500px] h-[500px] bg-blue-700 blur-[120px] rounded-full pointer-events-none mix-blend-screen opacity-10 group-hover:opacity-20 transition-all duration-700"></div>

                <div className="relative z-10 flex flex-col gap-5">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600/20 text-blue-500 font-bold text-sm border border-blue-600/20">
                      {idx + 1}
                    </span>
                    <span className="text-blue-600 font-bold tracking-wider text-sm uppercase">{b.tag}</span>
                  </div>

                  <h4 className="text-2xl md:text-4xl font-bold text-white uppercase italic leading-tight">
                    {b.title}
                  </h4>

                  <p className="text-gray-400 text-lg leading-relaxed max-w-3xl">{b.desc}</p>

                  <div className="pt-2 flex flex-wrap items-center gap-4">
                    <div className="bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2">
                      <span className="text-gray-500 text-[10px] uppercase block mb-1 font-medium">
                        Valor Individual
                      </span>
                      <span className="text-xl font-bold text-gray-500 line-through italic">{b.price}</span>
                    </div>

                    <div className="flex items-center font-black text-xs px-5 py-2.5 rounded-lg border bg-blue-600 text-white border-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.35)] uppercase">
                      <Check className="w-4 h-4 mr-2" />
                      INCLUSO NO PLATAFORMA + PLUGIN
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-14 px-4">
            <a
              href={`#${OFFER_SECTION_ANCHOR}`}
              onClick={handleScroll(OFFER_SECTION_ANCHOR)}
              className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-black text-sm sm:text-lg px-6 sm:px-10 py-4 sm:py-6 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-600/50 w-full sm:w-auto"
            >
              QUERO A OFERTA MAIS VENDIDA
              <ChevronRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </a>
          </div>
        </div>
      </section>

      {/* =========================
          9) OFERTA (2 cards)
         ========================= */}
      <section id={OFFER_SECTION_ANCHOR} className="py-24 px-4 bg-black">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <div className="inline-block bg-blue-600 text-white font-black text-sm md:text-base px-6 py-2 rounded-full animate-pulse shadow-lg shadow-blue-600/20 uppercase tracking-wide mb-8">
              Oferta por tempo limitado
            </div>

            <h3 className="text-3xl md:text-5xl font-black mb-4 uppercase tracking-tighter text-white italic">
              Escolha seu <span className="text-blue-600">Arsenal</span>
            </h3>

            <p className="text-gray-400 text-base md:text-lg max-w-3xl mx-auto">
              Dois caminhos: acesso ao acervo (Plataforma) ou o workflow mais rápido (Plataforma + Plugin) para aplicar em 1 clique.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-6xl mx-auto">
            {/* CARD 1 — PLATAFORMA */}
            <div
              id="plano-plataforma"
              className="bg-zinc-900/40 border border-zinc-800 rounded-[2.5rem] p-8 sm:p-10 flex flex-col hover:border-zinc-700 transition-all"
            >
              <div className="mb-8 text-left">
                <h4 className="text-xl font-bold text-gray-300 uppercase tracking-widest mb-2">Plataforma</h4>

                <div className="flex flex-col gap-1">
                  <span className="text-5xl sm:text-6xl font-black text-white italic">R$ 27</span>
                  <span className="text-zinc-400 text-xs sm:text-sm">ou 6x de R$ 5,07</span>
                </div>

                <p className="text-zinc-400 mt-3 text-sm italic">
                  Ideal para quem quer o acervo organizado e pronto para aplicar manualmente.
                </p>
              </div>

              <div className="space-y-4 flex-1 text-sm">
                <div className="flex items-center gap-3 text-gray-100">
                  <Check className="h-4 w-4 text-green-500" /> Biblioteca de cenas (+200)
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Check className="h-4 w-4 text-green-500" /> Área de referências
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Check className="h-4 w-4 text-green-500" /> Biblioteca de músicas virais
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Check className="h-4 w-4 text-green-500" /> Atualizações
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Check className="h-4 w-4 text-green-500" /> Acesso vitalício
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Check className="h-4 w-4 text-green-500" /> Garantia de 7 dias
                </div>
              </div>

              <a
                href={KIWIFY_CHECKOUT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-10 w-full py-4 rounded-2xl border border-zinc-800 text-zinc-200 font-bold hover:bg-zinc-800 transition-all text-center block uppercase text-xs"
              >
                Assinar Plataforma
              </a>

              <p className="text-center text-zinc-500 text-xs mt-3">Acesso imediato</p>
            </div>

            {/* CARD 2 — PLATAFORMA + PLUGIN — VALUE STACK */}
            <div
              id="plano-plugin"
              className="relative bg-zinc-900 border-2 border-blue-600 rounded-[2.5rem] p-8 sm:p-10 flex flex-col shadow-[0_0_50px_rgba(37,99,235,0.25)]"
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-black px-6 py-1.5 rounded-full uppercase tracking-widest shadow-xl">
                MAIS VENDIDO
              </div>

              <div className="mb-6 text-left">
                <h4 className="text-xl font-bold text-blue-600 uppercase tracking-widest mb-2 italic">
                  Plataforma + Plugin
                </h4>

                <div className="flex flex-col gap-1">
                  <span className="text-5xl sm:text-6xl font-black text-white italic">R$ 87</span>
                  <span className="text-blue-200/70 text-xs sm:text-sm">ou 12x de R$ 9,00</span>
                </div>

                <p className="text-blue-200/80 mt-3 italic text-sm font-medium">
                  Para quem quer o workflow mais rápido e entregar com estética de cinema em minutos.
                </p>
              </div>

              {/* Value Stack */}
              <div className="space-y-4 flex-1 text-sm">
                <div className="flex items-center gap-3 text-white font-bold">
                  <Zap className="h-5 w-5 text-blue-600" /> Inclui tudo da Plataforma
                </div>

                <div className="mt-2 p-5 rounded-2xl border border-blue-600/25 bg-blue-600/5">
                  <p className="text-white font-black uppercase text-xs tracking-widest mb-3">Stack de Valor</p>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3 text-gray-100">
                      <span className="text-blue-500 font-black">⚡</span>
                      <span>
                        <b>Plugin Premiere + After Effects</b> (1 clique)
                      </span>
                    </div>
                    <div className="flex items-start gap-3 text-gray-100">
                      <span className="text-blue-500 font-black">⚡</span>
                      <span>
                        <b>Pack Efeito Sonoro</b> (finalização cinematográfica)
                      </span>
                    </div>
                    <div className="flex items-start gap-3 text-gray-100">
                      <span className="text-blue-500 font-black">⚡</span>
                      <span>
                        <b>Pack de LUTs</b> (look de cinema rápido)
                      </span>
                    </div>
                    <div className="flex items-start gap-3 text-gray-100">
                      <span className="text-blue-500 font-black">⚡</span>
                      <span>
                        <b>Biblioteca de Hooks & Estruturas</b> (atalho criativo)
                      </span>
                    </div>
                    <div className="flex items-start gap-3 text-gray-100">
                      <span className="text-blue-500 font-black">⚡</span>
                      <span>
                        <b>Pack de Overlays</b> (acabamento e impacto)
                      </span>
                    </div>

                    <div className="h-px bg-zinc-800 my-2" />

                    <div className="flex items-start gap-3 text-gray-200">
                      <span className="text-green-500 font-black">✔</span>
                      <span>Biblioteca de cenas (+200)</span>
                    </div>
                    <div className="flex items-start gap-3 text-gray-200">
                      <span className="text-green-500 font-black">✔</span>
                      <span>Biblioteca de músicas virais</span>
                    </div>
                    <div className="flex items-start gap-3 text-gray-200">
                      <span className="text-green-500 font-black">✔</span>
                      <span>Área de referências</span>
                    </div>
                    <div className="flex items-start gap-3 text-gray-200">
                      <span className="text-green-500 font-black">✔</span>
                      <span>Acesso vitalício</span>
                    </div>
                    <div className="flex items-start gap-3 text-gray-200">
                      <span className="text-green-500 font-black">✔</span>
                      <span>Garantia de 7 dias</span>
                    </div>
                  </div>
                </div>

                <p className="text-blue-100/80 text-xs leading-relaxed">
                  Você não está comprando arquivos. Você está comprando <b>velocidade + consistência + estética</b>.
                </p>
              </div>

              <a
                href={KIWIFY_CHECKOUT_PLUGIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-10 group relative flex items-center justify-center w-full bg-blue-600 hover:bg-blue-500 text-white font-black text-base sm:text-xl py-5 sm:py-6 rounded-2xl transition-all duration-300 hover:scale-[1.02] uppercase shadow-[0_10px_30px_rgba(37,99,235,0.45)] text-center px-6"
              >
                Quero Plataforma + Plugin
                <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 ml-1 animate-pulse" />
              </a>

              <p className="text-center text-blue-200 text-xs mt-3 font-semibold">
                Melhor custo-benefício • Oferta mais vendida
              </p>
            </div>
          </div>

          {/* Garantia */}
          <div className="mt-12 max-w-4xl mx-auto">
            <div className="p-6 md:p-8 rounded-3xl border border-zinc-800 bg-zinc-950/60 text-center">
              <h4 className="text-xl md:text-2xl font-black text-white mb-2">Garantia de 7 dias</h4>
              <p className="text-gray-400">
                Teste por 7 dias. Se você não sentir que ficou mais rápido(a) e que seus vídeos ganharam um visual mais
                profissional, você pede reembolso e pronto.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          10) PROVA SOCIAL (mantém tudo)
         ========================= */}
      <section className="py-20 px-4 bg-zinc-950">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-white">
              O que editores <span className="text-blue-600">estão falando?</span>
            </h3>
            <p className="text-gray-400 mt-3">
              Prints reais. Feedback real. Resultados reais.
            </p>
          </div>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="break-inside-avoid bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:scale-[1.02] transition-transform duration-300 shadow-xl"
              >
                <img
                  src={testimonial.image}
                  alt={testimonial.alt || `Depoimento ${index + 1}`}
                  className="w-full h-auto block"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================
          11) FAQ
         ========================= */}
      <section className="py-20 px-4 bg-black">
        <div className="container mx-auto max-w-3xl">
          <h3 className="text-3xl md:text-4xl font-bold mb-12 text-center">Perguntas Frequentes</h3>
          <Accordion type="single" collapsible className="space-y-4">
            {productData.faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-zinc-950 border border-zinc-800 rounded-lg px-6 hover:border-blue-600/30 transition-colors duration-300"
              >
                <AccordionTrigger className="text-left font-semibold hover:text-blue-600 transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-400">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA final */}
      <div className="py-12 bg-zinc-950 flex justify-center px-4 border-t border-zinc-900">
        <a
          href={`#${OFFER_SECTION_ANCHOR}`}
          onClick={handleScroll(OFFER_SECTION_ANCHOR)}
          className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white font-black text-sm sm:text-lg px-6 sm:px-10 py-4 sm:py-6 rounded-full transition-all duration-300 hover:scale-105 uppercase shadow-[0_10px_40px_rgba(37,99,235,0.35)] w-full sm:w-auto"
        >
          GARANTIR MEU ACESSO AGORA <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 ml-2 animate-pulse" />
        </a>
      </div>

      {/* Sobre o criador */}
      <section className="py-20 px-4 bg-zinc-950">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col md:flex-row items-center gap-8 bg-zinc-900 border border-zinc-800 p-8 rounded-3xl">
            <div className="w-full md:w-1/3 flex justify-center">
              <img
                src={productData.about.imageUrl}
                alt={productData.about.name}
                className="w-48 h-48 md:w-full md:h-auto object-cover rounded-2xl shadow-xl border-2 border-blue-600/20"
              />
            </div>

            <div className="w-full md:w-2/3 text-center md:text-left">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">Quem é {productData.about.name}?</h3>
              <p className="text-gray-300 text-lg leading-relaxed">{productData.about.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-zinc-800 py-12 px-4 text-center">
        <div className="container mx-auto max-w-6xl">
          <p className="text-gray-400 mb-2">© 2025 Editor Premium. Todos os direitos reservados.</p>
          <p className="text-gray-500 text-sm">Produto digital entregue via email após confirmação do pagamento.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
