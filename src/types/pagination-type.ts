export type PaginationMetaType = {
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
};


export type PaginationLinksType = {
    first: string | null;
    last: string | null;
    prev: string | null;
    next: string | null;
};