<template>
  <div class="vendor__div">
    <label class="vendor__label">
      <a :href="localePath(vendorGetters.getUrl(vendor))" class="vendor__href">
        <img
          v-if="vendorGetters.getLogoUrl(vendor)"
          :src="vendorGetters.getLogoUrl(vendor)"
          :alt="vendorGetters.getName(vendor)"
          class="vendor__logo"
        >
        <h3
          v-else
          class="vendor__name"
        >
          {{ vendorGetters.getName(vendor) }}
        </h3>
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
  align-items: center;
}
.vendor__logo {
  max-height: $vendor-height;
  padding-left: var(--spacer-xs);
}
.vendor__name {
  display: flex;
  align-items: center;
  padding: var(--spacer-xs);
  box-sizing: border-box;
}
.vendor__label {
  padding: var(--spacer-xs);
  box-sizing: border-box;
  display: inline-flex;
  background: var(--c-light);
}
</style>
