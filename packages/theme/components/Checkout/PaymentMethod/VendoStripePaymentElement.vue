<template>
  <div>
    <div ref="paymentRef" />
    <SfLoader v-if="!isStripeReady" />
  </div>
</template>

<script>
import { onMounted, ref, computed } from '@nuxtjs/composition-api';
import { useVSFContext, onSSR } from '@vue-storefront/core';
import { useCart } from '@vue-storefront/spree';
import { loadStripe } from '@stripe/stripe-js';
import { SfLoader } from '@storefront-ui/vue';

export default {
  name: 'VendoStripePaymentElement',

  components: {
    SfLoader
  },

  props: {
    method: {
      type: Object,
      default: () => {}
    }
  },

  setup(props, { emit }) {
    const { $spree } = useVSFContext();
    const { cart, load: loadCart } = useCart();
    const isStripeReady = ref(false);
    const stripe = ref(null);
    const elements = ref(null);
    const paymentElement = ref(null);
    const paymentRef = ref(null);
    const publishableKey = computed(() => props.method.publishableKey);

    const savePayment = async () => {
      const { error } = await stripe.value.confirmPayment({
        elements: elements.value,
        confirmParams: {
          return_url: `${window.location.origin}/checkout/thank-you?order=${cart.value.number}`
        }
      });

      if (error) {
        if (error.type === 'card_error' || error.type === 'validation_error') {
          throw new Error(error.message);
        } else {
          throw new Error('An unexpected error occured.');
        }
      }
    };

    const handlePaymentChange = (ev) => {
      const isPaymentReady = ev.complete && !ev.error;
      emit('change:payment', { isPaymentReady, savePayment });
    };

    onMounted(async () => {
      try {
        stripe.value = await loadStripe(publishableKey.value);
        const { clientKey } = await $spree.api.vendoCreatePaymentIntent();
        const appearance = {
          theme: 'stripe'
        };
        elements.value = stripe.value.elements({ appearance, clientSecret: clientKey });
        paymentElement.value = elements.value.create('payment');
        paymentElement.value.on('change', handlePaymentChange);
        paymentElement.value.on('ready', () => isStripeReady.value = true);
        paymentElement.value.mount(paymentRef.value);
      } catch (e) {
        console.error(e);
      }
    });

    onSSR(async () => {
      await loadCart();
    });

    return {
      paymentRef,
      isStripeReady
    };
  }
};
</script>
