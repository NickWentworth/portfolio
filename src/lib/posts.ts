import { existsSync, readFileSync, readdirSync } from 'fs';
import { join } from 'path';

const POSTS_DIR = join(process.cwd(), 'src', 'posts');

/**
 * Returns a list of split paths to each post recursively searching the posts directory
 *
 * Only returns paths to `.md` files
 *
 * @example
 * // Given files at:
 * 'post.md' => ['post']
 * 'deeply/nested/post.md' => ['deeply', 'nested', 'post']
 */
export function getAllPostPaths(): string[][] {
    return readdirSync(POSTS_DIR, {
        recursive: true,
    })
        .map((path) => path.toString())
        .filter((path) => path.endsWith('.md'))
        .map((path) => path.replace('.md', ''))
        .map((path) => path.split('\\'));
}

/**
 * Given a relative path as a list of strings, returns the text of the post at that path
 *
 * @example
 * // Given a file at deeply/nested/post.md
 * getPostText(['deeply', 'nested', 'post']) => '... content'
 */
export function getPostText(relativePath: string[]): string | undefined {
    const path = join(POSTS_DIR, ...relativePath).concat('.md');

    if (!existsSync(path)) {
        return undefined;
    }

    return readFileSync(path).toString();
}
