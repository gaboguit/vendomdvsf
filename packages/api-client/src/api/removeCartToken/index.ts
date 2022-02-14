import { ApiContext } from '../../types';

export default async function removeCartToken({ config }: ApiContext) {
  try {
    await config.auth.removeCartToken();
  } catch (e) {
    console.error(e);
    throw e;
  }
}
