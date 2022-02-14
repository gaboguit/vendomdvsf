import axios from 'axios';
import { ApiContext } from '../../types';
import getCurrentBearerOrCartToken from '../authentication/getCurrentBearerOrCartToken';
import getAuthorizationHeaders from '../authentication/getAuthorizationHeaders';

export default async function vendoCreatePaymentIntent({ client, config }: ApiContext) {
  try {
    const token = await getCurrentBearerOrCartToken({ client, config });
    const currency = await config.internationalization.getCurrency();

    const response = await axios.post(
      `${config.backendUrl}/api/v2/storefront/checkout/create_stripe_connect_payment`,
      {},
      {
        params: {
          currency: currency
        },
        headers: getAuthorizationHeaders(token)
      }
    );

    return {
      clientKey: response.data.intent_client_key
    };
  } catch (e) {
    console.error(e);
    throw e;
  }
}
