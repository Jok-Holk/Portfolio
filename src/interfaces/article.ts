export default interface Article {
    title: string;
    content: string;
    image: {
        id: number;
        name: string;
        alternativeText: string | null;
        caption: string | null;
        width: number;
        height: number;
        formats: {
            thumbnail: {
                name: string;
                hash: string;
                ext: string;
                mime: string;
                path: null | string;
                width: number;
                height: number;
                size: number;
                sizeInBytes: number;
                url: string;
            };
            small: {
                url: string;
            };
            medium: {
                url: string;
            };
            large: {
                url: string;
            };
        };
        hash: string;
        ext: string;
        mime: string;
        size: number;
        url: string;
        previewUrl: null | string;
        provider: string;
        provider_metadata: null | any;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
    };
    slug: string;
    publish_date: string;
}
