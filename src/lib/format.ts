/**
 * Returns a formatted string given a date string in ISO format (`YYYY-MM-DD`)
 */
export function formatPostDate(date: string) {
    const d = new Date(date);

    return d.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });
}
