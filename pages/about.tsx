import Container from '../components/container'
import MoreStories from '../components/more-stories'
import HeroPost from '../components/hero-post'
import Intro from '../components/intro'
import Layout from '../components/layout'
import SectionShowcase from '../components/SectionShowcase'
import { getAllPosts } from '../lib/api'
import Head from 'next/head'
import { CMS_NAME } from '../lib/constants'
import Post from '../interfaces/post'

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
          <title>{`ZamuroAtomico`}</title>
        </Head>
        <Container>
          <Intro />

          {/* Secciones estilizadas full-width */}
          <SectionShowcase
            title="Instalaciones informáticas"
            description="Diseño y mantenimiento de infraestructuras, redes y entornos seguros y escalables para soportar tus aplicaciones y datos."
            imageSrc="https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=1400&q=80"
            variant="parallax"
            titleColorClass="text-emerald-100"
            overlayClass="bg-emerald-900/40"
          />

          <SectionShowcase
            title="Aplicaciones web"
            description="Desarrollo de aplicaciones web modernas, responsivas y accesibles con las mejores prácticas y stack actual."
            imageSrc="https://images.unsplash.com/photo-1555949963-aa79dcee9815?auto=format&fit=crop&w=1400&q=80"
            variant="normal"
            reverse={false}
            titleColorClass="text-sky-700"
          />

          <SectionShowcase
            title="Realidad Virtual"
            description="Experiencias inmersivas con fondos estáticos y efecto 3D para una sensación de profundidad y presencia."
            imageSrc="https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1400&q=80"
            variant="static3d"
            titleColorClass="text-violet-200"
          />

          <SectionShowcase
            title="Desarrollo de videojuegos"
            description="Creación de videojuegos, desde prototipos hasta producción, con enfoque en rendimiento y jugabilidad."
            imageSrc="https://images.unsplash.com/photo-1511515126-9f0b1f1a4d1e?auto=format&fit=crop&w=1400&q=80"
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
