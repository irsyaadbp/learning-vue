import { computed, ref, watch } from 'vue';

export default function useSearch(items, searchProps) {
  const enteredSearchTerm = ref('');
  const activeSearchTerm = ref('');

  const availableItems = computed(() => {
    let filteredItems = [];
    if (activeSearchTerm.value) {
      filteredItems = items.value.filter(usr =>
        usr[searchProps]
          .toLowerCase()
          .includes(activeSearchTerm.value.toLowerCase())
      );
    } else if (items.value) {
      filteredItems = items.value;
    }
    return filteredItems;
  });

  watch(enteredSearchTerm, function(newValue) {
    setTimeout(() => {
      if (newValue.toLowerCase() === enteredSearchTerm.value.toLowerCase()) {
        activeSearchTerm.value = newValue;
      }
    }, 300);
  });

  const updateSearch = val => {
    enteredSearchTerm.value = val;
  };

  return {
    enteredSearchTerm,
    activeSearchTerm,
    availableItems,
    updateSearch
  };
}
