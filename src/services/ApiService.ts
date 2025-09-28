export class ApiService {

    private static apiUrl: string;

    static {
        const apiBaseUrl = import.meta.env.VITE_API_URL;

        if (typeof apiBaseUrl !== 'string' || !apiBaseUrl) {
            throw new Error("VITE_API_BASE_URL environment variable is not defined or is not a valid string.");
        }
        this.apiUrl = apiBaseUrl;
    }


    private static async handleResponse<T>(response: Response): Promise<T> {
        try {
            return await response.json() as Promise<T>;
        } catch (e) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `Network response was not ok, status: ${response.status}`);
        }
    }


    public static async get<T>(endpoint: string): Promise<T> {
        const url = `${this.apiUrl}${endpoint}`;
        try {
            const response = await fetch(url);
            return this.handleResponse<T>(response);
        } catch (error) {
            console.error('GET request failed:', error);
            throw error;
        }
    }


    public static async post<T>(endpoint: string, data: object): Promise<T> {
        const url = `${this.apiUrl}${endpoint}`;
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        };

        try {
            const response = await fetch(url, options);
            return this.handleResponse<T>(response);
        } catch (error) {
            console.error('POST request failed:', error);
            throw error;
        }
    }

    // private static async handleRequest<T>(): Promise<T> {
    //
    // }
}
