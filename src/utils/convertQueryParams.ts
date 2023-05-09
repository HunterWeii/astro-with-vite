export default function convertQueryParams(params: Record<string, string>) {
    const queryParams = Object
                            .entries(params)
                            .map(data => {
                                const [key, value] = data;
                                return `${key}=${value}`
                            })
                            .join('&');
    
    return `?${queryParams}`;
}