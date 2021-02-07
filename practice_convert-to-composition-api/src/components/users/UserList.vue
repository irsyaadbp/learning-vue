<template>
  <base-container>
    <h2>Active Users</h2>
    <base-search
      @search="updateSearch"
      :search-term="enteredSearchTerm"
    ></base-search>
    <div>
      <button @click="sort('asc')" :class="{ selected: sorting === 'asc' }">
        Sort Ascending
      </button>
      <button @click="sort('desc')" :class="{ selected: sorting === 'desc' }">
        Sort Descending
      </button>
    </div>
    <ul>
      <user-item
        v-for="user in displayedUsers"
        :key="user.id"
        :user-name="user.fullName"
        :id="user.id"
        @list-projects="$emit('list-projects', $event)"
      ></user-item>
    </ul>
  </base-container>
</template>

<script>
import { toRefs } from 'vue';
import useSearch from '../../hooks/search';
import useSort from '../../hooks/sort';
import UserItem from './UserItem.vue';

export default {
  components: {
    UserItem,
  },
  props: ['users'],
  emits: ['list-projects'],
  setup(props) {
    // Comment this because we use custom hooks for search
    // const enteredSearchTerm = ref('');
    // const activeSearchTerm = ref('');

    // const availableUsers = computed(() => {
    //   let users = [];
    //   if (activeSearchTerm.value) {
    //     users = props.users.filter((usr) =>
    //       usr.fullName
    //         .toLowerCase()
    //         .includes(activeSearchTerm.value.toLowerCase())
    //     );
    //   } else if (props.users) {
    //     users = props.users;
    //   }
    //   return users;
    // });

    // watch(enteredSearchTerm, function (newValue) {
    //   setTimeout(() => {
    //     if (newValue.toLowerCase() === enteredSearchTerm.value.toLowerCase()) {
    //       activeSearchTerm.value = newValue;
    //     }
    //   }, 300);
    // });

    // const updateSearch = (val) => {
    //   enteredSearchTerm.value = val;
    // };

    const { users } = toRefs(props);

    // Example custom hooks
    const { enteredSearchTerm, availableItems, updateSearch } = useSearch(
      users,
      'fullName'
    );
    const { sorting, displayedUsers, sort } = useSort(
      availableItems,
      'fullName'
    );

    // Comment this because we use custom hooks for search
    // const sorting = ref(null);

    // const displayedUsers = computed(() => {
    //   if (!sorting.value) {
    //     return availableItems.value;
    //   }
    //   return availableItems.value.slice().sort((u1, u2) => {
    //     if (sorting.value === 'asc' && u1.fullName > u2.fullName) {
    //       return 1;
    //     } else if (sorting.value === 'asc') {
    //       return -1;
    //     } else if (sorting.value === 'desc' && u1.fullName > u2.fullName) {
    //       return -1;
    //     } else {
    //       return 1;
    //     }
    //   });
    // });

    // const sort = (mode) => {
    //   sorting.value = mode;
    // };

    return {
      enteredSearchTerm,
      sorting,
      displayedUsers,
      updateSearch,
      sort,
    };
  },

  // Comment this because we handle state with compotition api
  // data() {
  //   return {
  //     enteredSearchTerm: '',
  //     activeSearchTerm: '',
  //     sorting: null,
  //   };
  // },

  // Comment this because we handle computed with compotition api
  // computed: {
  //   availableUsers() {
  //     let users = [];
  //     if (this.activeSearchTerm) {
  //       users = this.users.filter((usr) =>
  //         usr.fullName
  //           .toLowerCase()
  //           .includes(this.activeSearchTerm.toLowerCase())
  //       );
  //     } else if (this.users) {
  //       users = this.users;
  //     }
  //     return users;
  //   },
  //   displayedUsers() {
  //     if (!this.sorting) {
  //       return this.availableUsers;
  //     }
  //     return this.availableUsers.slice().sort((u1, u2) => {
  //       if (this.sorting === 'asc' && u1.fullName > u2.fullName) {
  //         return 1;
  //       } else if (this.sorting === 'asc') {
  //         return -1;
  //       } else if (this.sorting === 'desc' && u1.fullName > u2.fullName) {
  //         return -1;
  //       } else {
  //         return 1;
  //       }
  //     });
  //   },
  // },

  // Comment this because we handle computed with compotition api
  // methods: {
  //   updateSearch(val) {
  //     this.enteredSearchTerm = val;
  //   },
  //   sort(mode) {
  //     this.sorting = mode;
  //   },
  // },

  // Comment this because we handle watch with compotition api
  // watch: {
  //   enteredSearchTerm(val) {
  //     setTimeout(() => {
  //       if (val.toLowerCase() === this.enteredSearchTerm.toLowerCase()) {
  //         this.activeSearchTerm = val;
  //       }
  //     }, 300);
  //   },
  // },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>