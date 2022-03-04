<template>
  <div class="vendor__div">
    <label class="vendor__label" >
      <a :href="localePath(vendorGetters.getUrl(vendor))" class="vendor__href">
        <img :src="vendorGetters.getLogoUrl(vendor)" title="Vendor logo" class="vendor__logo">
        <h3 class = "vendor__name">{{ vendorGetters.getName(vendor) }}</h3>
      </a>
    </label>
  </div>
</template>

<script>
import {vendorGetters} from '@vue-storefront/spree';
export default {
  name: 'VendorInfo',
  props: ['vendor'],
  setup() {
    return {
      vendorGetters
    };
  }
};
</script>

<style lang="scss" scoped>
$vendor-height: 30px;
.vendor__div {
  text-align: right;
}
.vendor__href {
  display: inline-flex;
}
.vendor__logo {
  width: $vendor-height;
  height: $vendor-height;
  padding-left: var(--spacer-xs);
}
.vendor__name {
  height: $vendor-height;
  display: flex;
  align-items: center;
  padding: var(--spacer-xs);
  box-sizing: border-box;
}
.vendor__label {
  padding: var(--spacer-xs);
  box-sizing: border-box;
  display: inline-flex;
  background: lightgray;
}
</style>
