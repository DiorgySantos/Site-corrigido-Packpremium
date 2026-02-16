import React, { useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import { Badge } from "../components/ui/badge";
import {
  PlayCircle,
  Film,
  Camera,
  Zap,
  Sparkles,
  Check,
  X,
  Star,
  ChevronRight,
  Volume2,
  Palette,
  BookOpen,
  Rocket,
} from "lucide-react";
import {
  productData,
  testimonials,
  showcaseScenes,
  resultVideos,
  bonuses,
} from "../mock";

const iconMap = {
  "play-circle": PlayCircle,
  film: Film,
  camera: Camera,
  zap: Zap,
  sparkles: Sparkles,
  "volume-2": Volume2,
  palette: Palette,
  "book-open": BookOpen,
};

const KIWIFY_CHECKOUT_URL = "https://pay.kiwify.com.br/FGAsVK2"; // Plano 27
const KIWIFY_CHECKOUT_PLUGIN_URL = "https://pay.kiwify.com.br/7t7Vix1"; // Plano 87 (PRINCIPAL)
const KIWIFY_CHECKOUT_PRO_URL = "https://pay.kiwify.com.br/AnYFsDH"; // Plano 149 (UPGRADE)

const OFFER_SECTION_ANCHOR = "oferta";
const OFFER_SECTION_BONUS_ANCHOR = "bonus";

export const Home = () => {
  const handleScroll = (id) => (e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // tracking params (UTM, etc) — mantém e injeta nos links da Kiwify
  useEffect(() => {
    const params = window.location.search;
    if (!params) return;

    const links = document.querySelectorAll('a[href*="kiwify.com.br"]');
    links.forEach((link) => {
      const currentHref = link.getAttribute("href");
      if (!currentHref) return;

      const raw = params.replace("?", "");
      if (currentHref.includes(raw)) return;

      const separator = currentHref.includes("?") ? "&" : "?";
      const finalParams = separator === "&" ? raw : params;

      link.setAttribute("href", currentHref + separator + finalParams.replace("?", ""));
    });
  }, []);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-600 selection:text-white">
      {/* CSS GLOBAL (SEM style jsx) */}
      <style>{`
        html { scroll-behavior: smooth; }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
      `}</style>

      {/* HERO */}
      <section className="relative pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-black to-black" />

        <div className="hidden md:block absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 bg-blue-600/30 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-20 right-10 w-96 h-96 bg-blue-700/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          />
        </div>

        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="text-center">
            <h2 className="font-black tracking-tight leading-[1.1] text-[28px] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
              Pare de garimpar cenas genéricas.{" "}
              <span className="inline-block bg-gradient-to-r from-blue-400 via-blue-600 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(37,99,235,0.25)]">
                Tenha um arsenal Cinematográfico
              </span>{" "}
              aplicado em 1 clique,
              <br className="hidden sm:block" />
              <span className="block mt-2 sm:mt-0">
                direto no seu software de edição
              </span>
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
              Você para de perder tempo com pastas e downloads. Entra no painel,
              escolhe a cena e aplica na timeline.{" "}
              <span className="font-bold text-white">
                Resultado com estética de cinema em minutos.
              </span>
            </p>

            {/* CTA (NOVA ESTRATÉGIA) */}
            <div className="pt-8 sm:pt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
              {/* PRINCIPAL 87 */}
              <a
                href="#plano-plugin"
                onClick={handleScroll("plano-plugin")}
                className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-black text-sm sm:text-lg px-6 sm:px-10 py-4 sm:py-6 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-600/50 w-full sm:w-auto"
              >
                Quero o Workflow Completo (R$ 87)
                <ChevronRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </a>

              {/* UPGRADE 149 */}
              <a
                href="#plano-editor-premium"
                onClick={handleScroll("plano-editor-premium")}
                className="inline-flex items-center justify-center bg-zinc-900/60 border border-blue-600/40 hover:border-blue-600/70 text-white font-black text-sm sm:text-lg px-6 sm:px-10 py-4 sm:py-6 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-600/30 w-full sm:w-auto"
              >
                Quero o Pro (R$ 149)
                <ChevronRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </a>
            </div>

            <p className="text-gray-500 text-xs sm:text-sm mt-4">
              (Se você quiser só o acesso às cenas, tem a opção básica de R$ 27
              lá embaixo.)
            </p>
          </div>
        </div>
      </section>

      {/* SHOWCASE CENAS */}
      <section className="py-20 px-4 bg-gradient-to-b from-black via-zinc-950 to-black relative overflow-hidden">
        <div className="hidden md:block absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/30 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-700/20 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-16">
            <Badge className="bg-blue-600/20 text-blue-500 border-blue-600/30 mb-4">
              Exemplos de Cenas
            </Badge>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Qualidade <span className="text-blue-600">Cinematográfica</span>
            </h3>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Algumas cenas do acervo que você aplica direto na timeline.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 px-4">
            {showcaseScenes.slice(0, 4).map((scene, index) => (
              <div
                key={scene.id}
                className="group relative"
                style={{
                  transform: `translateY(${index % 2 === 0 ? "0" : "2rem"})`,
                  animation: `float ${3 + index * 0.5}s ease-in-out infinite`,
                }}
              >
                <div className="relative mx-auto w-full max-w-[180px] sm:max-w-[200px] md:max-w-[220px]">
                  <div className="relative bg-zinc-900 rounded-[2.5rem] p-2 shadow-2xl border-4 border-zinc-800 group-hover:border-blue-600/50 transition-all duration-300">
                    <div className="relative bg-black rounded-[2rem] overflow-hidden aspect-[9/19.5]">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-6 bg-zinc-900 rounded-b-2xl z-10" />

                      <video
                        className="w-full h-full object-cover"
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="metadata"
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

                  <div className="hidden md:block absolute inset-0 -z-10 bg-blue-600/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-90" />
                </div>
              </div>
            ))}
          </div>

          {/* GIFS (PAINEL FUNCIONANDO) */}
          <div className="mt-16 md:mt-20">
            <div className="max-w-5xl mx-auto text-center">
              <h3 className="text-2xl md:text-4xl font-black tracking-tight mb-4">
                Diga adeus à bagunça de pastas e downloads infinitos.
              </h3>

              <p className="text-gray-400 text-base md:text-lg max-w-3xl mx-auto mb-10">
                Veja o painel funcionando dentro do After Effects / Premiere:
                pré-visualização, seleção e aplicação rápida.
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
            </div>
          </div>
        </div>
      </section>

      {/* O QUE É */}
      <section className="py-20 px-4 bg-zinc-950">
        <div className="container mx-auto max-w-4xl">
          <h3 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            O que é a <span className="text-blue-600">Plataforma?</span>
          </h3>

          <div className="prose prose-lg prose-invert max-w-none text-center">
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              É um painel com acervo organizado + aplicação rápida, para você
              parar de travar e terminar vídeos com estética cinematográfica
              sem depender de “achismos”.
            </p>

            <p className="text-gray-400 text-md leading-relaxed mb-10">
              Em vez de pacotes gigantes e bagunçados, você acessa o que realmente
              importa, do jeito mais rápido possível.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 text-left">
              <div className="flex items-start space-x-3 bg-zinc-900/50 p-5 rounded-xl border border-zinc-800 hover:border-blue-600/30 transition-all">
                <Check className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                <span className="text-gray-200 font-medium">
                  Acervo organizado por objetivo e estilo
                </span>
              </div>

              <div className="flex items-start space-x-3 bg-zinc-900/50 p-5 rounded-xl border border-zinc-800 hover:border-blue-600/30 transition-all">
                <Check className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                <span className="text-gray-200 font-medium">
                  Pré-visualização rápida antes de aplicar
                </span>
              </div>

              <div className="flex items-start space-x-3 bg-zinc-900/50 p-5 rounded-xl border border-zinc-800 hover:border-blue-600/30 transition-all">
                <Check className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                <span className="text-gray-200 font-medium">
                  Workflow mais rápido (menos cliques e menos arquivos)
                </span>
              </div>

              <div className="flex items-start space-x-3 bg-blue-600/10 p-5 rounded-xl border border-blue-600/20 hover:border-blue-600/40 transition-all shadow-[0_0_15px_rgba(37,99,235,0.12)]">
                <Sparkles className="h-6 w-6 text-blue-500 flex-shrink-0 mt-1" />
                <span className="text-blue-50 font-bold">
                  No plano Pro: bônus e materiais extras de editor
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRINT DA PLATAFORMA */}
      <section className="py-20 px-4 bg-black">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-10">
            <Badge className="bg-blue-600/10 text-blue-500 border-blue-600/20 mb-4 px-4 py-1">
              Por dentro da plataforma
            </Badge>

            <h3 className="text-3xl md:text-5xl font-bold">
              Veja a <span className="text-blue-600">Plataforma por dentro</span>
            </h3>

            <p className="text-gray-400 text-lg max-w-2xl mx-auto mt-4">
              Interface organizada, busca rápida e aplicação em poucos cliques.
            </p>
          </div>

          <div className="relative rounded-3xl border border-zinc-800 overflow-hidden bg-zinc-950 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
            <img
              src="https://res.cloudinary.com/dpu5xvirv/image/upload/v1770769785/Captura_de_tela_2026-02-10_212910_vzoayv.png"
              alt="Tela da plataforma"
              className="w-full h-auto block"
              loading="lazy"
            />
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/25 via-transparent to-transparent" />
          </div>

          <div className="flex justify-center mt-10 px-4">
            <a
              href={`#${OFFER_SECTION_ANCHOR}`}
              onClick={handleScroll(OFFER_SECTION_ANCHOR)}
              className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white font-black text-sm sm:text-lg px-6 sm:px-10 py-4 sm:py-6 rounded-full transition-all duration-300 hover:scale-105 shadow-[0_10px_30px_rgba(37,99,235,0.35)] w-full sm:w-auto"
            >
              QUERO O WORKFLOW COMPLETO
              <ChevronRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </a>
          </div>
        </div>
      </section>

      {/* VÍDEOS DE RESULTADO */}
      <section className="py-24 px-4 bg-zinc-950 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-full bg-blue-600/5 blur-[100px] pointer-events-none" />

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-16">
            <Badge className="bg-blue-600/10 text-blue-500 border-blue-600/20 mb-4 px-4 py-1">
              Resultados
            </Badge>
            <h3 className="text-3xl md:text-5xl font-bold mb-6">
              Resultado que <span className="text-blue-600">fala por si</span>
            </h3>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Exemplos reais combinando cenas + edição + ritmo.
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
                    {video.tag || "Viral"}
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                </div>

                <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-medium text-sm">
                      {video.title}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <PlayCircle className="w-5 h-5 text-white fill-white/20" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <p className="text-gray-400 mb-6 text-lg">
              Se você quer velocidade + estética, o plano mais vendido é o
              <span className="text-white font-bold"> Workflow Completo </span>
              (R$ 87).
            </p>

            <div className="flex justify-center px-4">
              <a
                href="#plano-plugin"
                onClick={handleScroll("plano-plugin")}
                className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-black text-sm sm:text-lg px-6 sm:px-10 py-4 sm:py-6 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-600/50 w-full sm:w-auto"
              >
                QUERO O WORKFLOW COMPLETO
                <ChevronRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* O QUE VOCÊ RECEBE (COM ICONES DO MOCK) */}
      <section className="py-20 px-4 bg-black">
        <div className="container mx-auto max-w-6xl">
          <h3 className="text-3xl md:text-4xl font-bold mb-12 text-center text-white">
            O que tem dentro da <span className="text-blue-600">Plataforma</span>?
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productData.features?.map((feat, idx) => {
              const Icon = iconMap[feat.icon] || Sparkles;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-blue-600/30 transition-all group relative overflow-hidden"
                >
                  <Icon className="h-10 w-10 text-blue-600 mb-4" />
                  <h4 className="text-xl font-bold text-white mb-2">
                    {feat.title}
                  </h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SEM VS COM */}
      <section className="py-20 px-4 bg-zinc-950">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-2xl md:text-3xl font-bold mb-6 text-center lg:text-left">
                Sem a Plataforma você vai...
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
                E no <span className="text-white font-bold">Workflow Completo</span>{" "}
                (R$ 87) você aplica em 1 clique.
              </p>

              <div className="flex items-start space-x-3 bg-green-950/40 p-4 rounded-lg border border-green-500/50 shadow-lg shadow-green-500/10">
                <Check className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                <span className="text-gray-100 font-medium">
                  Aplicar cenas rapidamente e entregar estética de cinema em minutos.
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

      {/* BONUS (PRO) */}
      <section
        id={OFFER_SECTION_BONUS_ANCHOR}
        className="py-24 px-4 bg-zinc-950 overflow-hidden relative"
      >
        <div className="hidden md:block absolute top-1/4 left-0 w-96 h-96 bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="hidden md:block absolute bottom-1/4 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="text-center mb-20">
            <Badge className="bg-blue-600/10 text-blue-500 border-blue-600/20 mb-6 px-4 py-1 text-base uppercase tracking-wider font-bold">
              Bônus (Plano Pro)
            </Badge>

            <h3 className="text-4xl md:text-5xl font-black mb-6 text-white tracking-tight leading-tight uppercase">
              Presentes exclusivos do{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700">
                Pro (R$ 149)
              </span>
            </h3>

            <p className="text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed">
              Materiais profissionais que você recebe ao escolher o Pro.
            </p>
          </div>

          <div className="flex flex-col gap-12">
            {bonuses.map((bonus, index) => {
              const prices = ["97,00", "69,00", "80,00", "47,00", "40,00", "29,00"];
              const price = prices[index] || "47,00";

              return (
                <div
                  key={index}
                  className="group relative bg-zinc-900/40 border border-blue-600/30 rounded-3xl p-6 md:p-10 overflow-hidden transition-all duration-500 hover:bg-zinc-900/60 shadow-[0_0_30px_rgba(37,99,235,0.06)]"
                >
                  <div className="hidden md:block absolute -right-20 -bottom-20 w-[500px] h-[500px] bg-blue-700 blur-[120px] rounded-full pointer-events-none mix-blend-screen opacity-10 group-hover:opacity-20 transition-all duration-700" />

                  <div className="relative z-10 flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-12">
                    <div className="flex-1 flex flex-col items-start text-left space-y-5">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600/20 text-blue-500 font-bold text-sm border border-blue-600/20">
                          {index + 1}
                        </span>
                        <span className="text-blue-600 font-bold tracking-wider text-sm uppercase">
                          Exclusivo do Pro
                        </span>
                      </div>

                      <h4 className="text-2xl md:text-4xl font-bold text-white uppercase italic leading-tight">
                        {bonus.title}
                      </h4>

                      <div className="space-y-2 border-l-2 border-zinc-800 pl-4 text-gray-400 text-lg">
                        {bonus.description.split("\n").map((linha, i) => {
                          const textoLimpo = linha.replace(/^- /, "").trim();
                          if (!textoLimpo) return null;

                          return (
                            <div key={i} className="flex items-start gap-2">
                              <span className="text-blue-600 font-bold">+</span>
                              <span>{textoLimpo}</span>
                            </div>
                          );
                        })}
                      </div>

                      <div className="pt-4 flex flex-wrap items-center gap-4">
                        <div className="bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2">
                          <span className="text-gray-500 text-[10px] uppercase block mb-1 font-medium">
                            Valor individual
                          </span>
                          <span className="text-xl font-bold text-gray-500 line-through italic">
                            R$ {price}
                          </span>
                        </div>

                        <div className="flex items-center font-black text-xs px-5 py-2.5 rounded-lg border bg-blue-600 text-white border-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.35)] uppercase">
                          <Check className="w-4 h-4 mr-2" />
                          Incluso no Pro
                        </div>
                      </div>
                    </div>

                    <div className="flex-shrink-0 w-full md:w-[40%] flex justify-center items-center">
                      <img
                        src={bonus.image}
                        alt={bonus.title}
                        className="w-full max-w-[280px] md:max-w-[320px] aspect-square object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-transform duration-700 group-hover:scale-105"
                        style={{ animation: `floatSlow ${5 + index}s ease-in-out infinite` }}
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* OFERTA (NOVA ESTRATÉGIA 27 / 87 / 149) */}
      <section id={OFFER_SECTION_ANCHOR} className="py-24 px-4 bg-black">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <div className="inline-block bg-blue-600 text-white font-black text-sm md:text-base px-6 py-2 rounded-full animate-pulse shadow-lg shadow-blue-600/20 uppercase tracking-wide mb-8">
              Escolha o plano ideal
            </div>

            <h3 className="text-3xl md:text-5xl font-black mb-4 uppercase tracking-tighter text-white italic">
              A melhor decisão é o <span className="text-blue-600">Workflow Completo</span>
            </h3>

            <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
              <span className="text-white font-bold">R$ 87</span> é o plano mais vendido:
              Plataforma + Plugin para aplicar em 1 clique.
              <br />
              Se quiser bônus e materiais extras, escolha o <span className="text-white font-bold">Pro (R$ 149)</span>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">

            {/* CARD 1 — 27 */}
            <div
              id="plano-plataforma"
              className="bg-zinc-900/40 border border-zinc-800 rounded-[2.5rem] p-8 sm:p-10 flex flex-col hover:border-zinc-700 transition-all opacity-85"
            >
              <div className="mb-8 text-left">
                <h4 className="text-xl font-bold text-gray-500 uppercase tracking-widest mb-2">
                  Básico
                </h4>

                <div className="flex flex-col gap-1">
                  <span className="text-4xl sm:text-5xl font-black text-white italic">
                    R$ 27
                  </span>
                  <span className="text-zinc-400 text-sm">
                    (só acesso às cenas)
                  </span>
                </div>

                <p className="text-zinc-500 mt-3 text-sm italic">
                  Ideal se você quer só a biblioteca e faz tudo manual.
                </p>
              </div>

              <div className="space-y-4 flex-1 text-sm">
                <div className="flex items-center gap-3 text-white">
                  <Check className="h-4 w-4 text-green-500" /> Biblioteca de cenas
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Check className="h-4 w-4 text-green-500" /> Organização por temas
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Check className="h-4 w-4 text-green-500" /> Acesso vitalício
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Check className="h-4 w-4 text-green-500" /> Garantia 7 dias
                </div>
              </div>

              <a
                href={KIWIFY_CHECKOUT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-10 w-full py-4 rounded-2xl border border-zinc-800 text-zinc-200 font-bold hover:bg-zinc-800 transition-all text-center block uppercase text-xs"
              >
                Quero o Básico (R$ 27)
              </a>

              <p className="text-center text-zinc-500 text-xs mt-3">
                Acesso imediato
              </p>
            </div>

            {/* CARD 2 — 87 (PRINCIPAL) */}
            <div
              id="plano-plugin"
              className="relative bg-zinc-900 border-2 border-blue-600 rounded-[2.5rem] p-8 sm:p-10 flex flex-col shadow-[0_0_50px_rgba(37,99,235,0.25)] transform md:scale-110 z-20"
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-black px-6 py-1.5 rounded-full uppercase tracking-widest shadow-xl">
                MAIS VENDIDO
              </div>

              <div className="mb-8 text-left">
                <h4 className="text-xl font-bold text-blue-600 uppercase tracking-widest mb-2 italic">
                  Workflow Completo
                </h4>

                <div className="flex flex-col gap-1">
                  <span className="text-5xl sm:text-6xl font-black text-white italic">
                    R$ 87
                  </span>
                  <span className="text-blue-200/70 text-sm">
                    Plataforma + Plugin (aplica em 1 clique)
                  </span>
                </div>

                <p className="text-blue-600/80 mt-3 italic text-sm font-medium">
                  O melhor custo-benefício para editar rápido e com estética.
                </p>
              </div>

              <div className="space-y-4 flex-1">
                <div className="flex items-center gap-3 text-white font-bold text-sm">
                  <Zap className="h-5 w-5 text-blue-600" /> Inclui tudo do Básico
                </div>

                <div className="flex items-center gap-3 text-white font-bold text-sm">
                  <Zap className="h-5 w-5 text-blue-600" /> Plugin Premiere + After Effects
                </div>

                <div className="flex items-center gap-3 text-gray-200 text-sm">
                  <Check className="h-5 w-5 text-green-500" /> Aplicação rápida (menos cliques)
                </div>

                <div className="flex items-center gap-3 text-gray-200 text-sm">
                  <Check className="h-5 w-5 text-green-500" /> Fluxo de edição mais rápido
                </div>

                <div className="flex items-center gap-3 text-gray-200 text-sm">
                  <Check className="h-5 w-5 text-green-500" /> Garantia 7 dias
                </div>
              </div>

              <a
                href={KIWIFY_CHECKOUT_PLUGIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-10 group relative flex items-center justify-center w-full bg-blue-600 hover:bg-blue-500 text-white font-black text-base sm:text-xl py-5 sm:py-6 rounded-2xl transition-all duration-300 hover:scale-[1.02] uppercase shadow-[0_10px_30px_rgba(37,99,235,0.45)] text-center px-6"
              >
                Quero o Workflow Completo{" "}
                <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 ml-1 animate-pulse" />
              </a>

              <p className="text-center text-blue-200 text-xs mt-3 font-semibold">
                Melhor escolha para a maioria
              </p>
            </div>

            {/* CARD 3 — 149 (UPGRADE) */}
            <div
              id="plano-editor-premium"
              className="bg-zinc-900/40 border border-zinc-800 rounded-[2.5rem] p-8 sm:p-10 flex flex-col hover:border-blue-600/40 transition-all"
            >
              <div className="mb-8 text-left">
                <h4 className="text-xl font-bold text-gray-200 uppercase tracking-widest mb-2">
                  Pro
                </h4>

                <div className="flex flex-col gap-1">
                  <span className="text-5xl sm:text-6xl font-black text-white italic">
                    R$ 149
                  </span>
                  <span className="text-zinc-400 text-sm">
                    Workflow + bônus extras
                  </span>
                </div>

                <p className="text-zinc-400 mt-3 italic text-sm font-medium">
                  Para quem quer tudo e ainda ganhar materiais extras.
                </p>
              </div>

              <div className="space-y-4 flex-1">
                <div className="flex items-center gap-3 text-white font-bold text-sm">
                  <Star className="h-5 w-5 text-blue-600 fill-blue-600" /> Inclui tudo do Workflow (R$ 87)
                </div>

                <div className="flex items-center gap-3 text-gray-200 text-sm">
                  <Check className="h-5 w-5 text-blue-600" /> Bônus e packs extras
                </div>

                <div className="flex items-center gap-3 text-gray-200 text-sm">
                  <Check className="h-5 w-5 text-blue-600" /> Materiais do editor (extras)
                </div>

                <div className="flex items-center gap-3 text-gray-200 text-sm">
                  <Check className="h-5 w-5 text-blue-600" /> Garantia 7 dias
                </div>

                <a
                  href={`#${OFFER_SECTION_BONUS_ANCHOR}`}
                  onClick={handleScroll(OFFER_SECTION_BONUS_ANCHOR)}
                  className="inline-flex items-center gap-2 text-blue-400 font-bold text-sm hover:text-blue-300 transition-colors"
                >
                  Ver bônus do Pro <ChevronRight className="w-4 h-4" />
                </a>
              </div>

              <a
                href={KIWIFY_CHECKOUT_PRO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-10 w-full py-4 rounded-2xl border border-zinc-800 text-zinc-200 font-bold hover:bg-zinc-800 transition-all text-center block uppercase text-xs"
              >
                Quero o Pro (R$ 149)
              </a>

              <p className="text-center text-zinc-500 text-xs mt-3">
                Upgrade recomendado para quem quer tudo
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section className="py-20 px-4 bg-zinc-950">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-white">
              O que editores <span className="text-blue-600">estão falando?</span>
            </h3>
          </div>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {testimonials.map((t, index) => (
              <div
                key={index}
                className="break-inside-avoid bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:scale-[1.02] transition-transform duration-300 shadow-xl"
              >
                <img
                  src={t.image}
                  alt={t.alt || `Depoimento ${index + 1}`}
                  className="w-full h-auto block"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 bg-black">
        <div className="container mx-auto max-w-3xl">
          <h3 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Perguntas Frequentes
          </h3>

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
                <AccordionContent className="text-gray-400">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA FINAL (empurra pro 87) */}
      <div className="py-12 bg-zinc-950 flex justify-center px-4 border-t border-zinc-900">
        <a
          href="#plano-plugin"
          onClick={handleScroll("plano-plugin")}
          className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white font-black text-sm sm:text-lg px-6 sm:px-10 py-4 sm:py-6 rounded-full transition-all duration-300 hover:scale-105 uppercase shadow-[0_10px_40px_rgba(37,99,235,0.35)] w-full sm:w-auto"
        >
          GARANTIR WORKFLOW COMPLETO (R$ 87)
          <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 ml-2 animate-pulse" />
        </a>
      </div>

      {/* SOBRE O CRIADOR */}
      <section className="py-20 px-4 bg-zinc-950">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col md:flex-row items-center gap-8 bg-zinc-900 border border-zinc-800 p-8 rounded-3xl">
            <div className="w-full md:w-1/3 flex justify-center">
              <img
                src={productData.about.imageUrl}
                alt={productData.about.name}
                className="w-48 h-48 md:w-full md:h-auto object-cover rounded-2xl shadow-xl border-2 border-blue-600/20"
                loading="lazy"
              />
            </div>

            <div className="w-full md:w-2/3 text-center md:text-left">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                Quem é {productData.about.name}?
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                {productData.about.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black border-t border-zinc-800 py-12 px-4 text-center">
        <div className="container mx-auto max-w-6xl">
          <p className="text-gray-400 mb-2">
            © 2025 Editor Premium. Todos os direitos reservados.
          </p>
          <p className="text-gray-500 text-sm">
            Produto digital entregue via email após confirmação do pagamento.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
