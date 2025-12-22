import type { CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'>;

export interface PostCardProps {
  post: Post;
  showTags?: boolean;
}

export interface NavItem {
  label: string;
  href: string;
}
