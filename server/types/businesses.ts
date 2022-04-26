interface BusinessFields {
    ownerName: string;
    businessName: string;
    hasPaidFee: boolean;
    email: string;
    password: string;
    hasShipping: boolean;
    bannerImg: string;
    website: string;
    facebook: string;
    instagram: string;
    locationId: number;
    keywords: string[];
    category: string;
    twitter: string;
}

export interface Business extends BusinessFields {
    id: number;
}

export type BusinessPayload = BusinessFields;
