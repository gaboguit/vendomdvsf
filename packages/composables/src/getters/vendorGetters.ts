import { Vendor } from '@vue-storefront/spree-api/src/types';

export const getVendorName = (vendor: Vendor): string => vendor?.name || 'Product\'s name';

export const getVendorSlug = (vendor: Vendor): string => vendor?.slug || '';

export const getVendorLogoUrl = (vendor: Vendor): string => vendor?.logoUrl || '';

export const getVendorCoverPhotoUrl = (vendor: Vendor): string => vendor?.coverPhotoUrl || '';

export const getVendorAboutUs = (vendor: Vendor): any => vendor?.aboutUs || '';

export const getVendorId = (vendor: Vendor): string => vendor?.id || '';

export const getVendorUrl = (vendor: Vendor): string => {
  return `/vendor/${vendor.slug}`;
};

const vendorGetters = {
  getName: getVendorName,
  getSlug: getVendorSlug,
  getLogoUrl: getVendorLogoUrl,
  getCoverPhotoUrl: getVendorCoverPhotoUrl,
  getAboutUs: getVendorAboutUs,
  getId: getVendorId,
  getUrl: getVendorUrl
};

export default vendorGetters;
