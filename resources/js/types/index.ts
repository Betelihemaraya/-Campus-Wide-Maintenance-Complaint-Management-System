import { PageProps } from '@inertiajs/core';

export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    roles?: {
        role: string;
        pivot?: {
            campus_id: number;
            complaint_type_id: number;
        };
        campus_id?: number;
        complaint_type_id?: number;
    }[];
}

export interface SharedData extends PageProps {
    auth: {
        user: User | null;
    };
}

export interface Campus {
    id: number;
    name: string;
}

export interface ComplaintType {
    id: number;
    name: string;
}

export interface Category {
    id: number;
    name: string;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
} 