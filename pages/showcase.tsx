// pages/showcase.tsx
import { GetStaticProps } from 'next';
import PostsShowcase from '@/components/showcase/PostsShowcase';
import { getAllPosts } from '@/lib/api';
import type { Post } from '@/types/post';

interface ShowcasePageProps {
  allPosts: Post[];
}

export default function ShowcasePage({ allPosts }: ShowcasePageProps) {
  return <PostsShowcase posts={allPosts} />;
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