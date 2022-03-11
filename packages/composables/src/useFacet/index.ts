import { GetProductsParams } from '@vue-storefront/spree-api';
import { Context, useFacetFactory, FacetSearchResult } from '@vue-storefront/core';
import { SearchData, SearchParams } from '../types';
import { buildPriceFacet } from './price';
import { buildVendorFacet } from './vendor';

const factoryParams = {
  search: async (context: Context, params: FacetSearchResult<SearchData>): Promise<SearchData> => {
    const searchParams = params.input as SearchParams;
    let vendorId;
    let vendor;
    if (searchParams.isVendorPage) {
      vendor = searchParams.vendorSlug !== null ? await context.$spree.api.getVendor({vendorSlug: searchParams.vendorSlug}) : null;
      vendorId = vendor?.id;
    } else {
      vendor = null;
      vendorId = searchParams.vendorSlug && Array.isArray(searchParams.vendorSlug) ? [...searchParams.vendorSlug].join(',') : searchParams.vendorSlug;
    }
    const categories = await context.$spree.api.getCategory({ categorySlug: searchParams.categorySlug, vendorId: vendor?.id });
    const getProductsParams: GetProductsParams = {
      categoryId: categories.current?.id,
      vendorId: vendorId,
      term: searchParams.term,
      optionTypeFilters: searchParams.selectedOptionTypeFilters,
      productPropertyFilters: searchParams.selectedProductPropertyFilters,
      priceFilter: searchParams.priceFilter,
      page: searchParams.page,
      itemsPerPage: searchParams.itemsPerPage,
      sort: searchParams.sort
    };
    const productsResponse = await context.$spree.api.getProducts(getProductsParams);
    const { data: products, meta: productsMeta, vendoMarketplace: vendoMarketplace } = productsResponse;

    const priceFacet = buildPriceFacet(searchParams.priceFilter);
    const facets = [...productsMeta.facets, priceFacet];
    if (!searchParams.isVendorPage && vendoMarketplace) {
      const vendorFacet = await buildVendorFacet(context, searchParams.vendorSlug);
      facets.push(vendorFacet);
    }

    return {
      categories,
      vendor,
      products,
      productsMeta,
      facets,
      itemsPerPage: searchParams.itemsPerPage
    };
  }
};

export default useFacetFactory<SearchData>(factoryParams);
