<template>
  <div>
    <base-dialog :show="!!error" @close="handleModalError">
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <base-card>
        <header>
          <h2>Request Received</h2>
        </header>
        <base-spinner v-if="isLoading"></base-spinner>
        <ul v-else-if="hasRequests && !isLoading">
          <request-item
            v-for="req in receivedRequest"
            :key="req.id"
            :email="req.userEmail"
            :message="req.message"
          ></request-item>
        </ul>
        <h3 v-else>You haven't received any requests yet!</h3>
      </base-card>
    </section>
  </div>
</template>

<script>
import RequestItem from '../../components/requests/RequestItem.vue';
export default {
  components: { RequestItem },
  data() {
    return {
      isLoading: false,
      error: null,
    };
  },
  computed: {
    receivedRequest() {
      return this.$store.getters['requests/requests'];
    },
    hasRequests() {
      return this.$store.getters['requests/hasRequests'];
    },
  },
  created() {
    this.loadRequest();
  },
  methods: {
    async loadRequest() {
      try {
        this.isLoading = true;
        await this.$store.dispatch('requests/getRequests');
      } catch (error) {
        this.error = error.message || 'Something wrong';
      } finally {
        this.isLoading = false;
      }
    },
    handleModalError() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>