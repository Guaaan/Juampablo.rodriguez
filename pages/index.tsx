import Container from '@/components/container'
import MoreStories from '@/components/more-stories'
import HeroPost from '@/components/hero-post'
import Intro from '@/components/intro'
import Layout from '@/components/layout'
import SectionShowcase from '@/components/SectionShowcase'
import { getAllPosts } from '@/lib/api'
import Head from 'next/head'
import Link from 'next/link'
import { CMS_NAME } from '@/lib/constants'
import Post from '@/interfaces/post'

type Props = {
  allPosts: Post[]
}


export default function Index({ allPosts}: Props) {
  const heroPost = allPosts[0]
  const morePosts = allPosts.slice(1)

  return (
    <>
      <Layout>
        <Head>
          <title>{`Juampablo Rodríguez Rojas`}</title>
        </Head>
        <div className="w-full overflow-hidden">
          <img
            src="/assets/main-page/mosaico.JPG"
            alt="Mosaico principal"
            className="block w-full h-48 sm:h-64 md:h-72 object-cover"
          />
        </div>
        <Container>
          <Intro />

          {/* Secciones estilizadas full-width */}
          <SectionShowcase
            title="Instalaciones informáticas"
            description="Instalación y mantenimiento integral de infraestructura TI: cámaras de seguridad, impresoras en red, redes LAN/Wi‑Fi, servidores Windows/Ubuntu, puntos de red y racks, POS y equipos de trabajo. Servicios dirigidos a PYMES, comercios y farmacias que reducen incidencias operativas y mejoran la velocidad y estabilidad de la red. Solicite un diagnóstico gratuito."
            imageSrc="https://www.todoelectronica.com/img/cms/CCTV%20instalaci%C3%B3n.png"
            variant="parallax"
            titleColorClass="text-emerald-100"
             descriptionColorClass="text-white"
            overlayClass="bg-emerald-900/40"
          />

          <SectionShowcase
            title="Aplicaciones web"
            description="Desarrollo de eCommerce, portales B2B, sistemas internos, dashboards y APIs escalables. Trabajamos con Svelte, React/Next.js, Python, Node.js y .NET; bases PostgreSQL/SQL Server y despliegue en AWS/Azure. Entregamos MVPs rápidos, integraciones eficientes y soporte continuo para optimizar procesos y rendimiento."
            hasPhoto={false}
            color="#3a88e7"
            variant="normal"
            reverse={false}
            titleColorClass="text-sky-700"
          />

          <SectionShowcase
            title="Realidad Virtual"
            description="Creación de experiencias VR para educación, museos, entrenamiento y marketing, compatibles con Meta Quest, PC/VR y WebXR. Desde prototipos hasta soluciones de producción optimizadas para exposición y pruebas de usuario; diseñadas para mejorar la retención y ofrecer experiencias inmersivas sin mareo. Consulte demo."
            hasPhoto={false}
            color="#00450e"
            variant="parallax"
            titleColorClass="text-violet-200"
          />

          <SectionShowcase
            title="Desarrollo de videojuegos"
            description="Desarrollo de juegos indie y serious games (WebGL/PC) con Unity: prototipado, mecánicas, arte 3D básico, sonido, optimización y publicación. Trabajamos con museos, centros educativos e instituciones culturales para crear experiencias interactivas con resultados medibles; títulos y demos publicados en itch.io."
            imageSrc="https://img.itch.zone/aW1hZ2UvMzIyODY4NS8yMzk1MzQzNi5wbmc=/original/At0QlG.png"
            hasPhoto={false}
            color="#facc15"
            variant="normal"
            reverse={true}
            titleColorClass="text-amber-300"
          />
          <div className="flex justify-center py-14 md:py-20">
            <Link
              href="/juego-de-la-vida"
              className="px-8 py-3 rounded border border-slate-300 text-lg font-medium hover:bg-slate-50 transition-colors"
            >
              ¿Has jugado al juego de la vida?
            </Link>
          </div>

          {/* el post grande que se ve en medio */}
          {heroPost && (
            <HeroPost
              title={heroPost.title}
              coverImage={heroPost.coverImage}
              date={heroPost.date}
              author={heroPost.author}
              slug={heroPost.slug}
              excerpt={heroPost.excerpt}
            />
          )}
          {/* More posts */}
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </Container>
      </Layout>
    </>
  )
}

export const getStaticProps = async () => {
  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
  ])

  return {
    props: { allPosts }
  }
}
