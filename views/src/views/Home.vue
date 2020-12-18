<template>
  <div class="home w-10/12 mx-auto">
     <button
        class="px-5 py-1 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none"
        @click="createCustomer()"
      >
        Create
      </button>
    <CustomerList :customers="customers"
    @editCustomerDetail="editCustomerDetail"
    @showCustomerDetail="showCustomerDetail"
    @deleteCustomer="deleteCustomer"></CustomerList>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapActions, mapState } from 'vuex';
import CustomerList from '../components/Customer/CustomerList.vue';

export default {
  name: 'Home',
  components: {
    CustomerList,
  },
  computed: {
    ...mapState([
      'customers',
    ]),
  },
  methods: {
    ...mapActions([
      'getCustomers',
      'deleteCustomer',
    ]),

    showCustomerDetail(customerDetail) {
      console.log(customerDetail);
      this.$modal.show('customer-detail', { customerDetail });
    },

    editCustomerDetail(customerDetail) {
      this.$modal.show('customer-detail', { customerDetail, mode: 'edit' });
    },

    createCustomer() {
      this.$modal.show('customer-detail', { customerDetail: {}, mode: 'create' });
    },

    deleteCustomer(customerId) {
      console.log(customerId);
      this.$store.dispatch('deleteCustomer', customerId);
    },
  },
  async created() {
    const res = await this.$store.dispatch('getCustomers');
    if (!res.result) {
      alert(res.message);
    }
  },
};
</script>
