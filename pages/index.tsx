import Container from "../components/container";
import MoreStories from "../components/more-stories";
import HeroPost from "../components/hero-post";
import Intro from "../components/intro";
import SectionShowcaseCreative from "../components/SectionShowcaseCreative";
import { useState } from "react";

import Layout from "../components/layout";
import { getAllPosts, getAllPoems } from "../lib/api";
import Head from "next/head";
import { CMS_NAME } from "../lib/constants";
import Post from "../interfaces/post";

import FloatingBubblesVisualization from "../components/FloatingBubblesVisualization";
import TagBarsVisualization from "../components/TagBarsVisualization";
import GridVisualization from "../components/GridVisualization";

type Props = {
  allPosts: Post[];
};

type Book = {
  title: string;
  position: number;
};

export default function Index({ allPosts }: Props) {
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);
  const [inverted, setInverted] = useState(false);
  return (
    <>
      <Layout>
        <Head>
          <title>{`ZamuroAtomico`}</title>
        </Head>
        <Container>
          <Intro />

          <div className="max-w-4xl mx-auto mt-8 space-y-4">
            <div className="flex items-center justify-between mb-2">
              
            </div>
{/* 
            <FloatingBubblesVisualization posts={allPosts} />

            <TagBarsVisualization posts={allPosts} />
            <GridVisualization posts={allPosts} /> */}



            <SectionShowcaseCreative
              title="Instalaciones informáticas"
              description="Redes, CCTV, servidores y soporte para PYMES."
              icon="server"
              color="emerald"
              invert={inverted}
            />

            <SectionShowcaseCreative
              title="Aplicaciones web"
              description="eCommerce, APIs y portales con despliegue en la nube."
              icon="code"
              color="sky"
              invert={inverted}
            />

            <SectionShowcaseCreative
              title="Realidad Virtual"
              description="Prototipos VR/WebXR para educación y museos."
              icon="vr"
              color="violet"
              invert={inverted}
            />

            <SectionShowcaseCreative
              title="Desarrollo de videojuegos"
              description="Prototipado, mecánicas y publicación con Unity."
              icon="gamepad"
              color="amber"
              invert={inverted}
            />
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
  );
}

export const getStaticProps = async () => {
  const allPosts = getAllPosts([
    "title",
    "date",
    "slug",
    "author",
    "coverImage",
    "excerpt",
  ]);

  return {
    props: { allPosts },
  };
};
