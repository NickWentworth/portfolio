type ClassValue = string | boolean | undefined;

/**
 * Builds a class string for use in JSX elements
 *
 * Accepts the following:
 * - `string` class names, ex: `styles.container`
 * - `<bool> && <bool> && ... && <class_name>`, ex: `props.isSquare && styles.square`
 */
export function buildClass(...classes: ClassValue[]): string {
    return classes.filter((c) => c !== false ?? false).join(' ');
}
