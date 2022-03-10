export type Vendor = {
    id: string;
    name: string;
    slug: string;
    aboutUs: string;
    logoUrl: string;
    coverPhotoUrl: string;
};

export type GetVendorParams = {
    vendorSlug: any;
};
