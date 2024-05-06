import { ExternalLink, GitHub } from '../icons';
import {
    Card,
    CardBody,
    Divider,
    Image,
    Link,
    Spacer,
    Stack,
    Tag,
    Text,
    Wrap,
} from '@chakra-ui/react';

type Project = {
    name: string;
    image: string;
    description: string;
    technologies: string[];

    /** Optional main link to view the project in action */
    link?: string;
    /** Optional source link to view the project's source code */
    source?: string;
};

type ProjectCardProps = {
    project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
    return (
        <Card>
            <CardBody>
                <Stack h='100%'>
                    <ConditionalLink href={project.link}>
                        <Stack>
                            <Image src={project.image} borderRadius='0.25rem' />

                            <Text fontSize='xl'>
                                {project.name.concat(' ')}
                                {project.link && <ExternalLink />}
                            </Text>
                        </Stack>
                    </ConditionalLink>

                    <Divider />

                    <Text>{project.description}</Text>

                    <Wrap>
                        {project.technologies.map((tech) => (
                            <Tag key={tech} borderRadius='full'>
                                {tech}
                            </Tag>
                        ))}
                    </Wrap>

                    <Spacer />

                    {project.source && (
                        <Link href={project.source} alignSelf='end' isExternal>
                            <GitHub fontSize='2xl' />
                        </Link>
                    )}
                </Stack>
            </CardBody>
        </Card>
    );
}

type ConditionalLinkProps = React.PropsWithChildren<{
    href?: string;
}>;

// conditionally renders a link (if given) around children elements
function ConditionalLink(props: ConditionalLinkProps) {
    return props.href ? (
        <Link href={props.href} isExternal>
            {props.children}
        </Link>
    ) : (
        props.children
    );
}
