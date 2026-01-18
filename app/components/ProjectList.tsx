import { projects } from "./constants";
import { ProjectCard } from "./ProjectCard";

export const ProjectsList = () => {
    return (
        <div>
            <h1 className="text-2xl font-heading text-cyan-400 mb-6">
                ~ Projects
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
        </div>
    );
};