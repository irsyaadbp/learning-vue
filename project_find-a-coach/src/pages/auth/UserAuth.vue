<template>
  <div>
    <base-dialog
      :show="!!error"
      title="An error occurred"
      @close="handleModalError"
    >
      <p>{{ error }}</p>
    </base-dialog>
    <base-dialog :show="isLoading" title="Authenticating" fixed>
      <p>Please wait...</p>
      <base-spinner></base-spinner>
    </base-dialog>
    <base-card>
      <form @submit.prevent="submitForm">
        <h2 class="title">{{ title }}</h2>
        <p class="description">{{ description }}</p>
        <div class="form-control">
          <label for="email">E-Mail</label>
          <input type="email" name="email" id="email" v-model.trim="email" />
        </div>
        <div class="form-control">
          <label for="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            v-model.trim="password"
          />
        </div>
        <p v-if="!formIsValid">
          Please enter a valid email and password (must be at least 6 character)
        </p>
        <base-button>{{ title }}</base-button>
        <base-button type="button" mode="flat" @click="switchAuthMode">
          {{ switchModeButtonCaption }}
        </base-button>
      </form>
    </base-card>
  </div>
</template>

<script>
import { capitalize } from '../../utils/common';
export default {
  data() {
    return {
      email: '',
      password: '',
      formIsValid: true,
      mode: 'login',
      isLoading: false,
      error: null,
    };
  },
  computed: {
    title() {
      return capitalize(this.mode);
    },
    description() {
      if (this.mode === 'login') {
        return 'Hello, we are happy to see you again!!';
      } else {
        return "It's time to join us";
      }
    },
    switchModeButtonCaption() {
      if (this.mode === 'login') {
        return 'Sign up instead';
      } else {
        return 'Login instead';
      }
    },
  },
  methods: {
    async submitForm() {
      this.formIsValid = true;
      if (
        !this.email ||
        !this.email.includes('@') ||
        this.password.length < 6
      ) {
        this.formIsValid = false;
        return;
      }

      this.isLoading = true;
      try {
        await this.$store.dispatch(this.mode, {
          email: this.email,
          password: this.password,
        });
        const redirect = `/${this.$route.query.redirect || 'coaches'}`;
        this.$router.replace(redirect);
      } catch (err) {
        this.error = err.message || 'Failed to authenticate';
      } finally {
        this.isLoading = false;
      }
    },
    switchAuthMode() {
      if (this.mode === 'login') {
        this.mode = 'signup';
      } else {
        this.mode = 'login';
      }
    },
    handleModalError() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.errors {
  font-weight: bold;
  color: red;
}

.actions {
  text-align: center;
}
h2.title {
  margin: 0;
}
p.description {
  margin-top: 8px;
}
</style>
