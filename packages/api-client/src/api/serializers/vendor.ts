import { Vendor } from '../../types';

export function deserializeVendor(responseData): Vendor {
  return {
    id: responseData.id,
    name: responseData.attributes.name,
    slug: responseData.attributes.slug,
    aboutUs: responseData.attributes.about_us,
    logoUrl: responseData.attributes.logo_url,
    coverPhotoUrl: responseData.attributes.cover_photo_url
  };
}
