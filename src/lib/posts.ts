import { existsSync, readFileSync, readdirSync } from 'fs';
import { join } from 'path';

const BLOG_HREF = '/blog';
const POSTS_DIR = join(process.cwd(), 'src', 'posts');

// TODO: enforce ordering on posts, ex: first by category, then by ordering number
// TODO: use a proper title (likely through frontmatter) instead of href

type CategoryMeta = string;

export function getCategoryMeta(): CategoryMeta[] {
    return readdirSync(POSTS_DIR, { withFileTypes: true })
        .filter((category) => category.isDirectory())
        .map((category) => category.name);
}

type PostMeta = {
    category: string;
    title: string;

    /** Link that this post lives at, includes `blog/` */
    href: string;

    /** List of dynamic route params to find this post, relative to `/blog`, meant to be passed to `generateStaticParams` */
    params: string[];
};

/**
 * Returns a list of `PostMeta` objects with one matching each post
 */
export function getPostMeta(category: string): PostMeta[] {
    const pathToCategory = join(POSTS_DIR, category);
    const files = readdirSync(pathToCategory);

    return files
        .map((filename) => parseFilename(filename))
        .filter((meta) => meta.extension === 'md')
        .filter((meta) => meta.order !== 0)
        .map((meta) => ({
            category,
            title: meta.title,
            href: `${BLOG_HREF}/${category}/${meta.title}`,
            params: [category, meta.title],
        }));
}

/**
 * Given a category and optional post name, returns the plain text value of a markdown file (if exists)
 *
 * If post name is undefined, will search for the `category` index file at `posts/<category>/0-<category>.md`
 *
 * If post name is given, will search for the `post` in the given `category` at `posts/<category>/<order>-<post>.md`
 */
export function getPostText(category: string, post?: string) {
    const pathToCategory = join(POSTS_DIR, category);

    if (!existsSync(pathToCategory)) {
        return undefined;
    }

    const match = readdirSync(pathToCategory).find((filename) => {
        const meta = parseFilename(filename);

        if (post === undefined) {
            return category === meta.title && meta.order === 0;
        } else {
            return post === meta.title;
        }
    });

    if (match) {
        const pathToPost = join(pathToCategory, match);
        return readFileSync(pathToPost).toString();
    }
}

/**
 * Parses the given filename in the form `<order>-<title>.<extension>` into an object
 */
function parseFilename(filename: string) {
    const [rest, extension] = filename.split('.');
    const split = rest.split('-');

    const order = Number.parseInt(split[0]);
    const title = split.slice(1).join('-');

    return { extension, title, order };
}
