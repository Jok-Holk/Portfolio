import { z, defineCollection } from 'astro:content';

const experienceCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        company: z.string(),
        time: z.string(),
        techs: z.array(z.string()),
        url: z.string().url(),
    }),
});

export const collections = {
    'experience': experienceCollection,
};
