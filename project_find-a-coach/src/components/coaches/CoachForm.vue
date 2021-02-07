<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{ invalid: !firstName.isValid }">
      <label for="firstname">Firstname</label>
      <input
        type="text"
        name="firstname"
        id="firstname"
        v-model.trim="firstName.val"
        @blur="clearValidity('firstName')"
      />
      <small class="badge-invalid" v-if="!firstName.isValid">
        Firstname must not be empty
      </small>
    </div>
    <div class="form-control" :class="{ invalid: !lastName.isValid }">
      <label for="lastname">Lastname</label>
      <input
        type="text"
        name="lastname"
        id="lastname"
        v-model.trim="lastName.val"
        @blur="clearValidity('lastName')"
      />
      <small class="badge-invalid" v-if="!lastName.isValid">
        Lastname must not be empty.
      </small>
    </div>
    <div class="form-control" :class="{ invalid: !description.isValid }">
      <label for="description">Description</label>
      <textarea
        name="description"
        id="description"
        rows="5"
        v-model="description.val"
        @blur="clearValidity('description')"
      />
      <small class="badge-invalid" v-if="!description.isValid">
        Description must not be empty.
      </small>
    </div>
    <div class="form-control" :class="{ invalid: !rate.isValid }">
      <label for="rate">Hourly Rate</label>
      <input
        type="number"
        name="rate"
        id="rate"
        v-model="rate.val"
        @blur="clearValidity('rate')"
      />
      <small class="badge-invalid" v-if="!rate.isValid">
        Rate must greater than 0.
      </small>
    </div>
    <div class="form-control" :class="{ invalid: !areas.isValid }">
      <label>Areas of Expertise</label>
      <div>
        <input
          type="checkbox"
          name="frontend"
          id="frontend"
          value="frontend"
          v-model.number="areas.val"
          @blur="clearValidity('areas')"
        />
        <label for="frontend">Frontend Development</label>
      </div>
      <div>
        <input
          type="checkbox"
          name="backend"
          id="backend"
          value="backend"
          v-model.number="areas.val"
          @blur="clearValidity('areas')"
        />
        <label for="backend">Backend Development</label>
      </div>
      <div>
        <input
          type="checkbox"
          name="career"
          id="career"
          value="career"
          v-model.number="areas.val"
          @blur="clearValidity('areas')"
        />
        <label for="career">Career Advisory</label>
      </div>
      <small class="badge-invalid" v-if="!areas.isValid">
        At least one expertise must be selected.
      </small>
    </div>
    <base-button>Register</base-button>
  </form>
</template>

<script>
export default {
  emits: ['save-data'],
  data() {
    return {
      firstName: {
        val: '',
        isValid: true,
      },
      lastName: {
        val: '',
        isValid: true,
      },
      description: {
        val: '',
        isValid: true,
      },
      rate: {
        val: null,
        isValid: true,
      },
      areas: {
        val: [],
        isValid: true,
      },
      formIsValid: true,
    };
  },
  methods: {
    validateForm() {
      this.formIsValid = true;

      if (!this.firstName.val) {
        this.changeInputInvalid('firstName');
      }
      if (!this.lastName.val) {
        this.changeInputInvalid('lastName');
      }
      if (!this.description.val) {
        this.changeInputInvalid('description');
      }

      if (!this.rate.val || this.rate.val < 0) {
        this.changeInputInvalid('rate');
      }

      if (!this.areas.val.length) {
        this.changeInputInvalid('areas');
      }
    },
    changeInputInvalid(name) {
      this[name].isValid = false;
      this.formIsValid = false;
    },
    clearValidity(name) {
      this[name].isValid = true;
    },
    submitForm() {
      this.validateForm();
      if (!this.formIsValid) {
        return;
      }
      const dataForm = {
        firstName: this.firstName.val,
        lastName: this.lastName.val,
        desccription: this.description.val,
        hourlyRate: this.rate.val,
        areas: this.areas.val,
      };

      this.$emit('save-data', dataForm);
    },
  },
};
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}

small.badge-invalid {
  display: block;
  width: 100%;
  padding: 4px 8px;
  background: rgba(235, 63, 33, 0.281);
  color: rgb(235, 63, 33);
}
</style>