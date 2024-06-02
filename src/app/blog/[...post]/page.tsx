import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';

const POSTS_PATH = join(process.cwd(), 'src', 'posts');

type PageProps = {
    params: {
        post: string[];
    };
};

export default async (props: PageProps) => {
    try {
        const path = join(POSTS_PATH, ...props.params.post).concat('.md');
        const file = readFileSync(path);
        const text = file.toString();

        return <MDXRemote source={text} />;
    } catch {
        notFound();
    }
};

export function generateStaticParams() {
    return readdirSync(POSTS_PATH, {
        recursive: true,
    })
        .map((path) => path.toString())
        .filter((path) => path.endsWith('.md'))
        .map((path) => path.replace('.md', ''))
        .map((path) => path.split('\\'))
        .map((route) => ({ post: route }));
}
