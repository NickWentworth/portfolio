import { type PostMetadata } from '@/lib/posts';

export { BlogNav } from './BlogNav';

export type BlogNavSection = {
    index: PostMetadata;
    posts: PostMetadata[];
};
