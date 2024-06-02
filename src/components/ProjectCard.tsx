import { Card, Icon, TagList } from '@/components/common';
import Link from 'next/link';

type ProjectCardProps = {
    name: string;
    image: string;
    description: string;
    tags: string[];

    link?: string;
    source?: string;
};

export function ProjectCard(props: ProjectCardProps) {
    return (
        <Card>
            <div className='flex flex-col h-full gap-2'>
                <ConditionalLink href={props.link}>
                    <div className='flex flex-col gap-2'>
                        <img className='rounded-sm' src={props.image} />

                        <h4 className='flex items-center gap-2'>
                            {props.name}
                            {props.link && <Icon icon='link' size='22' />}
                        </h4>
                    </div>
                </ConditionalLink>

                <hr />

                <p>{props.description}</p>

                <TagList tags={props.tags} />

                {props.source && (
                    <div className='flex-grow flex flex-col-reverse items-end mt-2'>
                        <Link href={props.source} target='_blank'>
                            <Icon icon='github' />
                        </Link>
                    </div>
                )}
            </div>
        </Card>
    );
}

type ConditionalLinkProps = React.PropsWithChildren<{
    href?: string;
}>;

function ConditionalLink(props: ConditionalLinkProps) {
    return props.href ? (
        <Link href={props.href} target='_blank'>
            {props.children}
        </Link>
    ) : (
        props.children
    );
}
