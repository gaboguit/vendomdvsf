import { ApiContext, Category, CategorySearchResult, GetCategoryParams } from '../../types';
import { deserializeCategories } from '../serializers/category';
import { TaxonAttr } from '@spree/storefront-api-v2-sdk/types/interfaces/Taxon';

const findCategory = (categories: Category[], slug: string) => categories.find(e => e.slug === slug);

const mockRoot = (data) => {
  return {
    relationships: {
      children: {data: data.map(e => {
        return {id: e.id, type: 'taxon'};
      })},
      parent: null
    },
    attributes: {
      name: 'Categories',
      permalink: 'categories',
      is_root: true
    },
    id: 'categories_id',
    type: 'taxon'
  };
};
export default async function getCategory({ client }: ApiContext, { categorySlug, vendorId }: GetCategoryParams): Promise<CategorySearchResult> {
  const result = await client.taxons.list({filter: {vendor_id: vendorId}, fields: { taxon: 'name,permalink,children,parent,is_root' }, per_page: 500 });

  if (result.isSuccess()) {
    try {
      const data = result.success().data;
      if (vendorId) {
        const root = mockRoot(data);
        data.forEach(e => {
          e.relationships.parent.data['id'] = root.id;
        });
        data.push(<TaxonAttr><unknown>root);
      }
      const categories = deserializeCategories(data);
      return {
        root: findCategory(categories, 'categories'),
        current: findCategory(categories, categorySlug)
      };
    } catch (e) {
      console.log(e);
      throw e;
    }
  } else {
    console.log(result.fail());
    throw result.fail();
  }
}
