import type { AgnosticFacet, AgnosticGroupedFacet } from '@vue-storefront/core';
import type { Vendor } from '../types';
import { Context } from '@vue-storefront/core';

const vendorRanges = async (context: Context) => {
  try {
    const result = await context.$spree.api.getVendors();
    return result;
  } catch (e) {
    console.log(e);
    return [];
  }
};

const buildVendorOptions = (vendorList: Vendor[], currentVendorIds: string[]): AgnosticFacet[] => {
  return vendorList.map(vendor => {
    const vendorId = vendor.id;
    return {
      type: 'attribute',
      id: vendorId,
      value: vendor.name,
      selected: currentVendorIds?.length ? currentVendorIds.includes(vendorId) : currentVendorIds === vendorId
    };
  });
};

export const buildVendorFacet = async (context: Context, currentVendorIds: string[]): Promise<AgnosticGroupedFacet> => {
  const vendors = await vendorRanges(context);
  return {
    id: 'vendor',
    label: 'Vendor',
    options: buildVendorOptions(vendors, currentVendorIds)
  };
};
