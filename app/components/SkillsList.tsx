import { AwsIcon, CloudflareIcon, DigitaloceanIcon, DockerIcon, ExpressIcon, GithubIcon, GitIcon, JavascriptIcon, LinuxIcon, MongodbIcon, NextIcon, NginxIcon, NodeIcon, PostgresIcon, PostmanIcon, PrismaIcon, ReactIcon, SqlIcon, TailwindIcon, TypescriptIcon, VercelIcon } from "../lib/icons"
import { SkillsCard } from "./SkillsCard"

export const SkillsList = () => {
    return (
        <div>
            <h1 className="text-2xl font-heading text-cyan-400">~ Skills / Tools</h1>
            <div className="mt-4 flex flex-wrap gap-3">
                <SkillsCard icon={<JavascriptIcon height={4} width={4} />} label="Javascript" />
                <SkillsCard icon={<ReactIcon height={4} width={4} />} label="React.js" />
                <SkillsCard icon={<NodeIcon height={4} width={4} />} label="Node.js" />
                <SkillsCard icon={<NextIcon height={4} width={4} />} label="Next.js" />
                <SkillsCard icon={<ExpressIcon height={4} width={4} />} label="Express.js" />
                <SkillsCard icon={<TypescriptIcon height={4} width={4} />} label="TypeScript" />
                <SkillsCard icon={<DockerIcon height={4} width={4} />} label="Docker" />
                <SkillsCard icon={<GitIcon height={4} width={4} />} label="Git" />
                <SkillsCard icon={<GithubIcon height={4} width={4} />} label="Github" />
                <SkillsCard icon={<LinuxIcon height={4} width={4} />} label="Linux" />
                <SkillsCard icon={<SqlIcon height={4} width={4} />} label="SQL" />
                <SkillsCard icon={<MongodbIcon height={4} width={4} />} label="MongoDb" />
                <SkillsCard icon={<PostgresIcon height={4} width={4} />} label="PostgreSQL" />
                <SkillsCard icon={<PrismaIcon height={4} width={4} />} label="Prisma" />
                <SkillsCard icon={<PostmanIcon height={4} width={4} />} label="Postman" />
                <SkillsCard icon={<TailwindIcon height={4} width={4} />} label="Tailwind" />
                <SkillsCard icon={<VercelIcon height={4} width={4} />} label="Vercel" />
                <SkillsCard icon={<NginxIcon height={4} width={4} />} label="Nginx" />
                <SkillsCard icon={<AwsIcon height={4} width={4} />} label="AWS" />
                <SkillsCard icon={<DigitaloceanIcon height={4} width={4} />} label="DigitalOcean" />
                <SkillsCard icon={<CloudflareIcon height={4} width={4} />} label="Cloudflare" />
            </div>
        </div>
    )
}