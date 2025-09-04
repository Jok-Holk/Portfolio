import { z, defineCollection } from 'astro:content';

const experienceCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        company: z.string(),
        time: z.string(),
        techs: z.array(z.string()),
        url: z.string().url(),
        lang: z.enum(['en', 'vi']).default('en'),
    }),
});
const projectsCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        tags: z.array(z.string()),
        codeLink: z.string().url(),
        demoLink: z.string().url().optional(),
        lang: z.enum(['en', 'vi']).default('en'),
    }),
});

export const collections = {
    'experience': experienceCollection,
    'projects': projectsCollection,
};
