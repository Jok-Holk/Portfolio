export default interface Article {
    id: number;
    documentId: string;
    title: string;
    content: string;
    publish_date: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    image: {
        id: number;
        documentId: string;
        name: string;
        alternativeText: string | null;
        caption: string | null;
        width: number;
        height: number;
        formats: {
            thumbnail: {
                ext: string;
                url: string;
                hash: string;
                mime: string;
                name: string;
                path: null | string;
                size: number;
                width: number;
                height: number;
                sizeInBytes: number;
            };
            small: {
                ext: string;
                url: string;
                hash: string;
                mime: string;
                name: string;
                path: null | string;
                size: number;
                width: number;
                height: number;
                sizeInBytes: number;
            };
            medium: {
                ext: string;
                url: string;
                hash: string;
                mime: string;
                name: string;
                path: null | string;
                size: number;
                width: number;
                height: number;
                sizeInBytes: number;
            };
            large: {
                ext: string;
                url: string;
                hash: string;
                mime: string;
                name: string;
                path: null | string;
                size: number;
                width: number;
                height: number;
                sizeInBytes: number;
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
    category: {
        id: number;
        documentId: string;
        name: string;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
    }[];
}
