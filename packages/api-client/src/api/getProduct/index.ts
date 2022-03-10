import { ApiContext, GetProductParams, ProductVariant } from '../../types';
import { addHostToProductImages, deserializeSingleProductVariants } from '../serializers/product';

export default async function getProduct({ client, config }: ApiContext, { slug }: GetProductParams): Promise<ProductVariant[]> {
  const currency = await config.internationalization.getCurrency();

  let include;

  if (config.spreeFeatures.fetchPrimaryVariant) {
    include = 'primary_variant,default_variant,variants.option_values,option_types,product_properties,taxons,taxons.parent,images';
  } else {
    include = 'default_variant,variants.option_values,option_types,product_properties,taxons,taxons.parent,images';
  }
  let productFields = 'name,slug,sku,description,primary_variant,default_variant,variants,option_types,product_properties,taxons';
  if (config.spreeFeatures.vendoMarketplace) {
    include += ',vendor';
    productFields += ',vendor';
  }

  const result = await client.products.show(
    slug,
    undefined,
    {
      fields: {
        product: productFields,
        variant: 'sku,price,display_price,in_stock,product,images,option_values,is_master'
      },
      include,
      currency
    }
  );

  if (result.isSuccess()) {
    try {
      const data = result.success();
      const productsData = addHostToProductImages(data, config);
      const deserializedVariants = deserializeSingleProductVariants(productsData);
      return deserializedVariants;
    } catch (e) {
      console.log(e);
    }
  } else {
    console.log(result.fail());
    throw result.fail();
  }
}

