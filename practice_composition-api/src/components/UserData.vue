<template>
  <div>
    <h2>{{ fullName }}</h2>
    <h2>{{ age }}</h2>
  </div>
</template>

<script>
import { computed, inject } from 'vue';
export default {
  props: ['firstName', 'lastName'],
  setup(props) {
    // Example get props from parent
    const fullName = computed(() => {
      return `${props.firstName} ${props.lastName}`;
    });

    // Example for emit, get context from second parameter of setup
    // setup(props, context)
    // then call emit
    // context.emit('save-data');

    // Example for inject to grab provide from parent
    const age = inject('userAge');
    // You can change the value for inject but its not recommend
    // because it's unpredictable
    // age.value = 32;

    return { fullName, age };
  },
};
</script>