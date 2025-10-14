import { useUserSessionStore } from "@/stores/user-session.ts";

export class ApiService {
    private static apiUrl: string;

    static {
        const apiBaseUrl = import.meta.env.VITE_API_URL;

        if (typeof apiBaseUrl !== "string" || !apiBaseUrl) {
            throw new Error("VITE_API_URL is not defined or invalid.");
        }

        this.apiUrl = apiBaseUrl;
    }

    private static getHeaders(customHeaders?: HeadersInit): Headers {
        const headers = new Headers(customHeaders || {});
        const token = useUserSessionStore().token;

        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }

        headers.set("Content-Type", "application/json");
        return headers;
    }

    private static async request<T>(
        endpoint: string,
        method: string,
        body?: any,
        optionsAddon?: RequestInit
    ): Promise<T> {
        const url = `${this.apiUrl}${endpoint}`;
        const headers = this.getHeaders(optionsAddon?.headers);

        const options: RequestInit = {
            ...optionsAddon,
            method,
            headers,
            body: body ? JSON.stringify(body) : undefined,
        };

        try {
            const response = await fetch(url, options);
            return await this.handleResponse<T>(response);
        } catch (error: any) {
            throw new Error("Network error: Unable to reach server.");
        }
    }

    private static async handleResponse<T>(response: Response): Promise<T> {
        try {
            return await response.json() as T;
        } catch (e: any) {
            throw new Error(e.message || `Invalid response format`);
        }
    }

    public static get<T>(endpoint: string, optionsAddon?: RequestInit): Promise<T> {
        return this.request<T>(endpoint, "GET", undefined, optionsAddon);
    }

    public static post<T>(endpoint: string, data: object, optionsAddon?: RequestInit): Promise<T> {
        return this.request<T>(endpoint, "POST", data, optionsAddon);
    }

    public static delete<T>(endpoint: string, optionsAddon?: RequestInit): Promise<T> {
        return this.request<T>(endpoint, "DELETE", undefined, optionsAddon);
    }

    public static put<T>(endpoint: string, data: object, optionsAddon?: RequestInit): Promise<T> {
        return this.request<T>(endpoint, "PUT", data, optionsAddon);
    }

    public static patch<T>(endpoint: string, data: object, optionsAddon?: RequestInit): Promise<T> {
        return this.request<T>(endpoint, "PATCH", data, optionsAddon);
    }
}