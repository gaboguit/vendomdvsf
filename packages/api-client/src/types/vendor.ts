export type Vendor = {
    id: string;
    name: string;
    slug: string;
};

export type GetVendorParams = {
    vendorSlug: string;
};

export type VendorSearchResult = {
    currentVendor: Vendor
}
