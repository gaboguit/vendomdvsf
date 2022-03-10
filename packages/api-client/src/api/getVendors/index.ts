import { ApiContext, Vendor } from '../../types';
import { deserializeVendor } from '../serializers/vendor';
import axios from 'axios';

export default async function getVendors({ config }: ApiContext): Promise<Vendor[]> {
  const response = await axios.get(
    `${config.backendUrl}/api/v2/storefront/vendors`
  );
  try {
    const responseData = response.data;
    return responseData.data.map(vendor => {
      return deserializeVendor(vendor);
    });
  } catch (e) {
    console.log(e);
    throw e;
  }
}
