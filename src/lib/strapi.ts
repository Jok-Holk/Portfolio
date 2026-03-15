interface Props {
    endpoint: string;
    query?: Record<string, string>;
    wrappedByKey?: string;
    wrappedByList?: boolean;
}

/**
 * Fetches data from the Strapi API
 * @param endpoint - The endpoint to fetch from
 * @param query - The query parameters to add to the url
 * @param wrappedByKey - The key to unwrap the response from
 * @param wrappedByList - If the response is a list, unwrap it
 * @returns
 */
export default async function fetchApi<T>({ endpoint, query, wrappedByKey, wrappedByList }: Props): Promise<T> {
    if (endpoint.startsWith('/')) {
        endpoint = endpoint.slice(1);
    }

    const url = new URL(`${import.meta.env.STRAPI_URL}/api/${endpoint}`);

    if (query) {
        Object.entries(query).forEach(([key, value]) => {
            url.searchParams.append(key, value);
        });
    }
    const res = await fetch(url.toString());
    let data = await res.json();

    if (wrappedByKey) {
        data = data[wrappedByKey];
    }

    if (wrappedByList) {
        data = data[0];
    }

    // Unwrap Strapi v4 attributes
    if (Array.isArray(data)) {
        data = data.map((item: any) => {
            const flat = { id: item.id, ...item.attributes };
            // Unwrap nested relations (image, categories...)
            if (flat.image?.data) {
                flat.image = { id: flat.image.data.id, ...flat.image.data.attributes };
            }
            if (flat.categories?.data) {
                flat.categories = flat.categories.data.map((c: any) => ({ id: c.id, ...c.attributes }));
            }
            return flat;
        });
    } else if (data?.attributes) {
        data = { id: data.id, ...data.attributes };
    }

    return data as T;
}
