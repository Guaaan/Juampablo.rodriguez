// pages/blog.tsx
import { GetStaticProps } from 'next';
import Head from 'next/head';
import PostsShowcase from '@/components/showcase/PostsShowcase';
import { getAllPosts } from '@/lib/api';
import type PostType from '@/interfaces/post';

interface BlogPageProps {
  allPosts: PostType[];
}

export default function BlogPage({ allPosts }: BlogPageProps) {
  return (
    <>
      <Head>
        <title>Blog | Juampablo Rodríguez Rojas</title>
      </Head>
      <PostsShowcase posts={allPosts} />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const allPosts = getAllPosts([
    'slug',
    'title',
    'excerpt',
    'date',
    'coverImage',
    'tags',
    'author'
  ]);

  return {
    props: { allPosts }
  };
};
