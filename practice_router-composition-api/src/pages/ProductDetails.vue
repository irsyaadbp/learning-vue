<template>
  <section>
    <h2>{{ title }}</h2>
    <h3>${{ price }}</h3>
    <p>{{ description }}</p>
    <router-link to="/products/p2">Product 2</router-link>
  </section>
</template>

<script>
import { computed, inject } from 'vue';
import { useRoute } from 'vue-router';

export default {
  // if you doesnt need props
  // props: ['pid'],
  setup() {
    const route = useRoute();
    const products = inject('products');

    // You can use props
    // const selectedProduct = computed(() =>
    //   products.value.find((prod) => prod.id === props.pid)
    // );

    // Or you can user route params, if you doesnt need props
    const selectedProduct = computed(() =>
      products.value.find((prod) => prod.id === route.params.pid)
    );

    const title = computed(() => selectedProduct.value.title);
    const price = computed(() => selectedProduct.value.price);
    const description = computed(() => selectedProduct.value.description);

    return { title, price, description };
  },
};
</script>


<style scoped>
section {
  margin: 3rem auto;
  max-width: 40rem;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
}
</style>