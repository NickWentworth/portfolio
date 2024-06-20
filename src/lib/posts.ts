import { blogComponents } from '@/components/blog-components';
import { existsSync, readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { serialize } from 'next-mdx-remote/serialize';
import { compileMDX } from 'next-mdx-remote/rsc';

const BLOG_HREF = '/blog';
const POSTS_DIR = join(process.cwd(), 'src', 'posts');

// TODO: enforce ordering on posts, ex: first by category, then by ordering number
// TODO: write some unit tests

export type PostMetadata = {
    category: string;
    post: string;
    frontmatter: PostFrontmatter;
    isCategoryIndex: boolean;
    href: string;
};

export type PostFrontmatter = {
    title: string;
    date?: string;
    summary?: string;
    thumbnail?: string;
};

/**
 * Returns `PostMeta` objects for each category index post that exists,
 * where they are expected as `/posts/<category>/0-<category.md`
 */
export async function categoryIndexPosts() {
    const categories = readdirSync(POSTS_DIR, { withFileTypes: true })
        .filter((category) => category.isDirectory())
        .map(async ({ name }) => {
            const pathToIndex = join(POSTS_DIR, name, `0-${name}.md`);
            const frontmatter = await parseFrontmatter(pathToIndex);

            return {
                category: name,
                post: name,
                frontmatter,
                isCategoryIndex: true,
                href: `${BLOG_HREF}/${name}`,
            } satisfies PostMetadata;
        });

    return await Promise.all(categories);
}

/**
 * Returns `PostMeta` objects for each post in the given category, all but the category index posts
 */
export async function postsByCategory(category: string) {
    const pathToCategory = join(POSTS_DIR, category);

    const posts = readdirSync(pathToCategory)
        .map((post) => parsePostFilename(post))
        .filter((post) => post.extension === 'md')
        .filter((post) => post.order !== 0)
        .map(async ({ filename, title }) => {
            const pathToPost = join(pathToCategory, filename);
            const frontmatter = await parseFrontmatter(pathToPost);

            return {
                category,
                post: title,
                frontmatter,
                isCategoryIndex: false,
                href: `${BLOG_HREF}/${category}/${title}`,
            } satisfies PostMetadata;
        });

    return await Promise.all(posts);
}

/**
 * Returns the previous and next `PostMeta`s from the given one for usage in navigation
 *
 * If the post is the first or last, previous or next will be undefined, respectively
 */
export async function getNeighboringPosts(category: string, post: string) {
    const posts = await postsByCategory(category);

    const postIdx = posts.findIndex((p) => p.post === post);

    if (postIdx === 0) {
        // at(-1) returns the end of list, so return undefined if no previous post
        return [undefined, posts.at(postIdx + 1)] as const;
    } else {
        return [posts.at(postIdx - 1), posts.at(postIdx + 1)] as const;
    }
}

/**
 * Given a category and optional post name, returns the plain text value of a markdown file (if exists)
 *
 * If post name is undefined, will search for the `category` index file at `posts/<category>/0-<category>.md`
 *
 * If post name is given, will search for the `post` in the given `category` at `posts/<category>/<order>-<post>.md`
 */
export async function compilePost(category: string, post?: string) {
    const pathToCategory = join(POSTS_DIR, category);

    if (!existsSync(pathToCategory)) {
        return undefined;
    }

    const match = readdirSync(pathToCategory).find((filename) => {
        const meta = parsePostFilename(filename);

        if (post === undefined) {
            return category === meta.title && meta.order === 0;
        } else {
            return post === meta.title;
        }
    });

    if (match === undefined) {
        return undefined;
    }

    const pathToPost = join(pathToCategory, match);
    const text = readFileSync(pathToPost).toString();

    return await compileMDX<PostFrontmatter>({
        source: text,
        options: { parseFrontmatter: true },
        components: blogComponents,
    });
}

// TODO: verify the file actually exists, contains frontmatter, and frontmatter is correct shape
/**
 * Parses the given absolute path's frontmatter
 */
async function parseFrontmatter(path: string) {
    const source = readFileSync(path).toString();
    const { frontmatter } = await serialize<any, PostFrontmatter>(source, {
        parseFrontmatter: true,
    });

    return frontmatter;
}

/**
 * Parses the given filename in the form `<order>-<title>.<extension>` into an object
 */
function parsePostFilename(filename: string) {
    const [rest, extension] = filename.split('.');
    const split = rest.split('-');

    const order = Number.parseInt(split[0]);
    const title = split.slice(1).join('-');

    return { filename, extension, title, order };
}
