<template>
  <div id="app">
    <CustomHeader></CustomHeader>
    <router-view/>
  </div>
</template>

<script>
import CustomHeader from './components/Global/CustomHeader.vue';

export default {
  components: {
    CustomHeader,
  },
  mounted() {
    console.log(process.env);
  },
};

</script>
<style lang="scss">
</style>
