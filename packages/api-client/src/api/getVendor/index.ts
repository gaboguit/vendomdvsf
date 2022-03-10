import {ApiContext, GetVendorParams, Vendor} from '../../types';
import {deserializeVendor} from '../serializers/vendor';
import axios from 'axios';

export default async function getVendor({ config }: ApiContext, { vendorSlug }: GetVendorParams):Promise<Vendor> {
  const response = await axios.get(
    `${config.backendUrl}/api/v2/storefront/vendors/${vendorSlug}`
  );
  try {
    const responseData = response.data;
    return deserializeVendor(responseData.data);
  } catch (e) {
    console.log(e);
    throw e;
  }
}
