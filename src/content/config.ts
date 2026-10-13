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
    schema: ({ image }) =>
        z.object({
            title: z.string(),
            tags: z.array(z.string()),
            codeLink: z.string().url(),
            demoLink: z.string().url().optional(),
            /** Short role line, e.g. "Gameplay, AI, UI". */
            role: z.string().optional(),
            /** Optional screenshot, stored next to the content as a local file. */
            image: image().optional(),
            imageAlt: z.string().optional(),
            lang: z.enum(['en', 'vi']).default('en'),
        }),
});

export const collections = {
    experience: experienceCollection,
    projects: projectsCollection,
};
