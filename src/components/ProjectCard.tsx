import { GitHub } from '../icons';
import {
    Card,
    CardBody,
    Divider,
    IconButton,
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
                    <Link href={project.link}>
                        <Image src={project.image} borderRadius='0.25rem' />
                    </Link>

                    <Link href={project.link} fontSize='xl'>
                        {project.name}
                    </Link>

                    <Divider />

                    <Text>{project.description}</Text>

                    <Wrap>
                        {project.technologies.map((tech) => (
                            <Tag borderRadius='full'>{tech}</Tag>
                        ))}
                    </Wrap>

                    <Spacer />

                    {project.source && (
                        <Link href={project.source} alignSelf='end'>
                            <IconButton
                                aria-label='Source code link'
                                isRound
                                icon={<GitHub />}
                            />
                        </Link>
                    )}
                </Stack>
            </CardBody>
        </Card>
    );
}
