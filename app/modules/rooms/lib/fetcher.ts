export async function fetcher<T = any>(
    input: RequestInfo,
    init?: RequestInit
): Promise<T> {

    const res = await fetch(input, init);

    if (!res.ok) {
        const errorBody = await res.json().catch(() => ({}));
        const error = new Error(
            errorBody?.message || `Error : ${res.status} ${res.statusText}`
        );
        throw error;
    }

    return res.json();

}