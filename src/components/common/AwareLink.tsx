'use client';

import { buildClass } from '@/lib/utils';
import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';

type AwareLinkProps = React.PropsWithChildren<
    LinkProps & {
        /** Should the route exactly match the given href? */
        exact?: boolean;
        /** Class name that is always set on the link */
        className?: string;
        /** Class name that is only set for an active link */
        activeClassName?: string;
        /** Class name that is only set for an inactive link */
        inactiveClassName?: string;
    }
>;

/**
 * Next.js `Link` with ability to style itself based on if the route is at the given `href`
 */
export function AwareLink(props: AwareLinkProps) {
    const {
        exact,
        className,
        activeClassName,
        inactiveClassName,
        ...linkProps
    } = props;

    const route = usePathname();

    // should this route be styled as active?
    const isActive = exact
        ? route === linkProps.href
        : route.startsWith(linkProps.href.toString());

    // build class name based on active state
    const cn = buildClass(
        className,
        isActive && 'text-accent-200 font-semibold',
        isActive && activeClassName,
        !isActive && inactiveClassName
    );

    return <Link {...linkProps} className={cn} />;
}
