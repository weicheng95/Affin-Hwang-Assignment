<template>
  <div class="customer-list">
    <table class="min-w-full">
      <thead>
        <tr>
          <th
            class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider"
          >
            Name
          </th>
          <th
            class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider"
          >
            Email
          </th>
          <th
            class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider"
          >
            Phone Number
          </th>
          <th class="px-4 py-3 border-b-2 border-gray-300"></th>
          <th class="px-4 py-3 border-b-2 border-gray-300"></th>
          <th class="px-4 py-3 border-b-2 border-gray-300"></th>
        </tr>
      </thead>
      <tbody class="bg-white">
        <tr v-for="(customer, i) in customers" :key="i">
          <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
            <div class="flex items-center">
              <div>
                <div class="text-sm leading-5 text-gray-800">
                  {{ customer.name }}
                </div>
              </div>
            </div>
          </td>
          <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
            <div class="text-sm leading-5 text-blue-900">
              {{ customer.email }}
            </div>
          </td>
          <td
            class="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5"
          >
            {{ customer.phoneNumber }}
          </td>
          <td
            class="py-2 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5"
          >
            <button
              class="px-5 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none"
              @click="showCustomerDetail(customer)"
            >
              View
            </button>
          </td>
          <td
            class="py-2 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5"
          >
            <button
              class="px-5 py-2 border-green-500 border text-green-500 rounded transition duration-300 hover:bg-green-500 hover:text-white focus:outline-none"
              @click="editCustomerDetail(customer)"
            >
              Edit
            </button>
          </td>
          <td
            class="py-2 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5"
          >
            <button
              class="px-5 py-2 border-red-500 border text-red-500 rounded transition duration-300 hover:bg-red-700 hover:text-white focus:outline-none"
              @click="deleteCustomer(customer)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
      <customer-detail></customer-detail>
  </div>
</template>

<script>
import CustomerDetail from './CustomerDetail.vue';

export default {
  components: { CustomerDetail },
  props: {
    customers: Array,
  },
  methods: {
    showCustomerDetail(customer) {
      this.$emit('showCustomerDetail', customer);
    },
    editCustomerDetail(customer) {
      this.$emit('editCustomerDetail', customer);
    },
    deleteCustomer(customer) {
      this.$emit('deleteCustomer', customer.id);
    },
  },
};
</script>
