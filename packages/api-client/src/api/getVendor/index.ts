import { ApiContext, GetVendorParams, VendorSearchResult } from '../../types';
import axios from 'axios';

export default async function getVendor({ config }: ApiContext, { vendorSlug }: GetVendorParams): Promise<VendorSearchResult> {
  const response = await axios.get(
    `${config.backendUrl}/api/v2/storefront/vendors/${vendorSlug}`
  );
  try {
    const responseData = response.data;
    const currentVendor = deserializeVendor(responseData.data);
    return {
      currentVendor: currentVendor
    };
  } catch (e) {
    console.log(e);
    throw e;
  }
}

function deserializeVendor(responseData) {
  return {
    id: responseData.id,
    name: responseData.attributes.name,
    slug: responseData.attributes.slug,
    aboutUs: responseData.attributes.about_us,
    logoUrl: responseData.attributes.logo_url,
    coverPhotoUrl: responseData.attributes.cover_photo_url
  };
}
