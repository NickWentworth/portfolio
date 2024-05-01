import { GitHub } from '../icons';
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
                    <Link href={project.link} isExternal>
                        <Image src={project.image} borderRadius='0.25rem' />
                    </Link>

                    <Link href={project.link} fontSize='xl' isExternal>
                        {project.name}
                    </Link>

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
