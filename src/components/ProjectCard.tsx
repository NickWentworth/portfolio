import { GitHub } from '../icons';
import styles from './project.module.css';

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
        <div className={styles.project}>
            <div className={styles.image}>
                {/* TODO: better indicate there is a link here */}
                <a href={project.link} target='_blank'>
                    <img src={project.image} />
                </a>
            </div>

            <div className={styles.summary}>
                <a href={project.link} target='_blank'>
                    <h4>{project.name}</h4>
                </a>

                <p>{project.description}</p>

                <div className={styles.technologies}>
                    {project.technologies.map((tech) => (
                        <p key={tech}>{tech}</p>
                    ))}
                </div>

                {project.source && (
                    <a href={project.source} target='_blank'>
                        <GitHub />
                    </a>
                )}
            </div>
        </div>
    );
}
