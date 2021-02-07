<template>
  <section class="container">
    <!-- Example for State data() -->
    <h1>STATE</h1>
    <hr />
    <h2>{{ userName }}</h2>
    <h3>{{ age }}</h3>
    <hr />
    <h2>{{ userObject.name }}</h2>
    <h3>{{ userObject.age }}</h3>
    <hr />
    <h2>{{ userReactive.name }}</h2>
    <h3>{{ userReactive.age }}</h3>

    <hr />
    <button @click="randomAge">Change Age</button>
  </section>
  <section class="container">
    <!-- Example for computed -->
    <h1>COMPUTED</h1>
    <hr />
    <h3>{{ fullname }}</h3>
    <hr />
    <h6>INPUT CHANGE</h6>
    <input
      type="text"
      name="firstname"
      id="firstname"
      placeholder="First name"
      @input="setFirstname"
    />
    <input
      type="text"
      name="lastname"
      id="lastname"
      placeholder="Last name"
      @input="setLastname"
    />
    <hr />
    <h6>V MODEL</h6>
    <input
      type="text"
      name="firstname"
      id="firstnameVmodel"
      placeholder="First name"
      v-model="firstname"
    />
    <input
      type="text"
      name="lastname"
      id="lastnameVmodel"
      placeholder="Last name"
      v-model="lastname"
    />
    <hr />
    <h6>REF</h6>
    <input
      type="text"
      name="firstname"
      id="firstnameRef"
      placeholder="First name"
      ref="firstnameInput"
    />
    <input
      type="text"
      name="lastname"
      id="lastnameRef"
      placeholder="Last name"
      ref="lastnameInput"
    />
    <button @click="setFullname">Set Fullname</button>
  </section>
  <section class="container">
    <!-- Example for component props -->
    <user-data :firstName="firstname" :lastName="lastname"></user-data>
  </section>
</template>

<script>
import {
  ref,
  reactive,
  computed,
  watch,
  provide,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
} from 'vue';
import UserData from './components/UserData';

export default {
  components: {
    UserData,
  },
  setup() {
    // ref for all type data
    const userName = ref('Irsyaad String');
    const age = ref(21);
    const firstname = ref('');
    const lastname = ref('');

    // example with ref DOM
    const firstnameInput = ref(null);
    const lastnameInput = ref(null);

    // change value
    // userName.value = "Budi"
    // age.value = "20"

    const userObject = ref({
      name: 'irsyaad Object Ref',
      age: 21,
    });

    // change value
    // userObject.value.name = 'Budi';
    // userObject.value.age = 20;

    // reactive just for object
    const userReactive = reactive({
      name: 'irsyaad reactive',
      age: 21,
    });
    // change value
    // userReactive.name = 'Budi';
    // userReactive.age = 20;

    // you can check isRef or isReactive to check reactivity in vue

    // dont do this, cause not reactive
    // return {name: userObject.name, age: userObject.age}
    // return {name: userReactive.name, age: userReactive.age}

    // or if you want use this you can use toRefs
    // const userRefs = toRefs(userReactive);
    // then you can return
    // return {name: userReactive.name, age: userReactive.age}

    // Lifecycle
    // Options API              => Compotition API
    // beforeCreate, created    => Not Needed (setup() replaces these hooks)
    // befoureMount, mounted    => onBeforeMount, onMounted
    // beforeUpdate, updated    => onBeforeUpdate, onUpdated
    // beforeUnmount, unmounted => onBeforeUnmount, onUnmounted

    // Example for lifecycle
    onBeforeMount(() => {
      console.log('onBeforeMount');
    });
    onMounted(() => {
      console.log('onMounted');
    });

    onBeforeUpdate(() => {
      console.log('onBeforeUpdate');
    });
    onUpdated(() => {
      console.log('onUpdated');
    });

    onBeforeUnmount(() => {
      console.log('onBeforeUnmount');
    });
    onUnmounted(() => {
      console.log('onUnmounted');
    });

    // Example to pass function
    function getRandomNumber(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }
    const randomAge = () => {
      age.value = getRandomNumber(25);
      userObject.value.age = getRandomNumber(25);
      userReactive.age = getRandomNumber(25);
    };

    // Example computed
    const fullname = computed(function () {
      return `${firstname.value} ${lastname.value}`;
    });

    const setFirstname = (event) => {
      firstname.value = event.target.value;
    };
    const setLastname = (event) => {
      lastname.value = event.target.value;
    };

    // Example use refs DOM
    const setFullname = () => {
      firstname.value = firstnameInput.value.value;
      lastname.value = lastnameInput.value.value;
    };

    // Example fot watch
    watch(age, function (newValue, oldValue) {
      alert(`New Value of age string is => ${newValue}`);
      alert(`Old Value of age string is => ${oldValue}`);
    });

    // if you want to watch multiple state
    // watch([age, userName], function (newValues, oldValues) {
    //   alert(`New Value of age string is => ${newValues[0]}`);
    //   alert(`Old Value of age string is => ${oldValues[0]}`);
    //
    //   alert(`New Value of name string is => ${newValues[1]}`);
    //   alert(`Old Value of name string is => ${newValues[1]}`);
    // });

    // Example for provide
    provide('userAge', age);

    return {
      userName,
      age,
      userObject,
      userReactive,
      randomAge,
      setFirstname,
      setLastname,
      fullname,
      firstname,
      lastname,
      firstnameInput,
      lastnameInput,
      setFullname,
    };
  },
  // Comment this because we use COMPOSITION API YEEY !!!
  // data() {
  //   return {
  //     userName: 'Maximilian',
  //   };
  // },
};
</script>

<style>
* {
  box-sizing: border-box;
}

html {
  font-family: sans-serif;
}

body {
  margin: 0;
}

.container {
  margin: 3rem auto;
  max-width: 30rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  text-align: center;
}
</style>