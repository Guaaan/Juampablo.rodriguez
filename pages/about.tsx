import Container from '@/components/container'
import MoreStories from '@/components/more-stories'
import HeroPost from '@/components/hero-post'
import Intro from '@/components/intro'
import Layout from '@/components/layout'
import SectionShowcase from '@/components/SectionShowcase'
import { getAllPosts } from '@/lib/api'
import Head from 'next/head'
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
            imageSrc="https://www.promedia.es/wp-content/uploads/2024/11/imagen-3.jpg"
            variant="normal"
            hasPhoto={false}
            reverse={false}
            titleColorClass="text-sky-700"
          />

          <SectionShowcase
            title="Realidad Virtual"
            description="Creación de experiencias VR para educación, museos, entrenamiento y marketing, compatibles con Meta Quest, PC/VR y WebXR. Desde prototipos hasta soluciones de producción optimizadas para exposición y pruebas de usuario; diseñadas para mejorar la retención y ofrecer experiencias inmersivas sin mareo. Consulte demo."
            imageSrc="https://imagenes.20minutos.es/files/image_1920_1080/uploads/imagenes/2023/09/28/meta-quest-3.jpeg"
            variant="parallax"
            titleColorClass="text-violet-200"
          />

          <SectionShowcase
            title="Desarrollo de videojuegos"
            description="Desarrollo de juegos indie y serious games (WebGL/PC) con Unity: prototipado, mecánicas, arte 3D básico, sonido, optimización y publicación. Trabajamos con museos, centros educativos e instituciones culturales para crear experiencias interactivas con resultados medibles; títulos y demos publicados en itch.io."
            imageSrc="https://img.itch.zone/aW1hZ2UvMzIyODY4NS8yMzk1MzQzNi5wbmc=/original/At0QlG.png"
            variant="normal"
            reverse={true}
            titleColorClass="text-amber-300"
          />
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
