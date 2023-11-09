<script>

export default {
  name: 'SearchField',
  components: {
  },
  data() {
    return {
      searchInput: '',
      feedBack: [],
    }
  },
  methods: {
    fetchSearch(request) {
      this.$router.push({
        path: `/films/search/${request.toLowerCase()}`,
      })
    }
  }

}
</script>

<template>
  <label for="search-field" />
  <input
    v-model="searchInput"
    type="text"
    class="search-field"
    placeholder="Search"
    @keyup.enter="fetchSearch(searchInput)"
  >
</template>

<style scoped lang="scss">
  .search-field{
    height: 56px;
    width: 315px;
    padding: 25px;
    background-color: #21242D;
    color: #F9F9F9AB;
    border: 1px solid #F9F9F91A;
    border-radius: 12px;
    font: {
      size: 18px;
      weight: 500;
    }
  }
</style>
