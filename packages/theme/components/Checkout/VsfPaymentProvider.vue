<template>
  <div>
    <div v-for="method in paymentMethods" :key="method.type">
      <SfRadio
        v-if="areMultiplePaymentMethodsAvailable"
        v-e2e="'payment-method'"
        :key="method.type"
        :label="method.label"
        :value="method.type"
        :description="method.description"
        :selected="selectedMethod"
        name="paymentMethod"
        class="form__radio"
        @input="selectMethod(method.type)"
      />
      <component
        class="payment-method-details"
        v-if="method.type === selectedMethod"
        :is="paymentComponent"
        :method="method"
        @change:payment="handlePaymentChange"
      />
    </div>
  </div>
</template>

<script>
import { SfButton, SfRadio } from '@storefront-ui/vue';
import { ref, onMounted, computed } from '@nuxtjs/composition-api';
import { useVSFContext } from '@vue-storefront/core';
import Stripe from '~/components/Checkout/PaymentMethod/Stripe';
import Check from '~/components/Checkout/PaymentMethod/Check';
import VendoStripePaymentElement from '~/components/Checkout/PaymentMethod/VendoStripePaymentElement';

export default {
  name: 'VsfPaymentProvider',

  components: {
    SfButton,
    SfRadio,
    Stripe,
    Check,
    VendoStripePaymentElement
  },

  setup(props, { emit }) {
    const { $spree } = useVSFContext();
    const paymentMethods = ref([]);
    const selectedMethod = ref(null);

    const selectMethod = (method) => {
      emit('change:payment', { isPaymentReady: false, savePayment: () => {} });
      selectedMethod.value = method;
    };

    const areMultiplePaymentMethodsAvailable = computed(() => paymentMethods.length > 1);

    const paymentComponent = computed(() => {
      switch (selectedMethod.value) {
        case 'Spree::Gateway::StripeElementsGateway':
          return 'Stripe';
        case 'Spree::PaymentMethod::Check':
          return 'Check';
        case 'StripeConnect::MultiVendorGateway':
          return 'VendoStripePaymentElement';
        case 'StripeConnect::StandardGateway':
          return 'VendoStripePaymentElement';
      }
    });

    const handlePaymentChange = (params) => {
      emit('change:payment', params);
    };

    onMounted(async () => {
      try {
        paymentMethods.value = await $spree.api.getPaymentMethods();
        if (paymentMethods.value.length > 0) {
          const defaultPaymentMethod = paymentMethods.value[0];
          selectedMethod.value = defaultPaymentMethod.type;
        }
      } catch (e) {
        console.error(e);
      }
    });

    return {
      areMultiplePaymentMethodsAvailable,
      paymentMethods,
      selectedMethod,
      selectMethod,
      paymentComponent,
      handlePaymentChange
    };
  }
};
</script>

<style lang="scss" scoped>
.payment-method-details {
  padding: var(--spacer-base);
  background: var(--c-light);
}
</style>
