<template>
  <modal name="customer-detail" @before-open="beforeOpen">
    <div class="customer-detail p-4">
      <div class="customer-detail__row">
        <div>Name:</div>
        <div v-if="mode === 'edit' | mode === 'create'">
          <input
            class="ml-4 px-1 border border-black"
            v-model="customer.name"
          />
        </div>
        <div v-else>{{ customer.name }}</div>
      </div>
      <div class="customer-detail__row">
        <div>Email:</div>
        <div v-if="mode === 'edit' | mode === 'create'">
          <input
            class="ml-4 px-1 border border-black"
            v-model="customer.email"
          />
        </div>
        <div v-else>{{ customer.email }}</div>
      </div>
      <div class="customer-detail__row">
        <div>Age:</div>
        <div v-if="mode === 'edit' | mode === 'create'">
          <input
            class="ml-4 px-1 border border-black"
            v-model="customer.age"
          />
        </div>
        <div v-else>{{ customer.age }}</div>
      </div>
      <div class="customer-detail__row">
        <div>Phone Number:</div>
        <div v-if="mode === 'edit' | mode === 'create'">
          <input
            class="ml-4 px-1 border border-black"
            v-model="customer.phoneNumber"
          />
        </div>
        <div v-else>{{ customer.phoneNumber }}</div>
      </div>
      <div class="customer-detail__row" v-if="mode !== 'create'">
        <div>Created Date:</div>
        <div class="pl-2">{{ customer.createdDate }}</div>
      </div>
      <button
        class="px-5 py-2 mr-3 border-green-500 border text-green-500 rounded transition duration-300 hover:bg-green-700 hover:text-white focus:outline-none"
        v-if="mode === 'edit' | mode === 'create'"
        @click="saveForm()"
      >
        Save
      </button>
      <button
        class="px-5 py-2 border-red-500 border text-red-500 rounded transition duration-300 hover:bg-red-700 hover:text-white focus:outline-none"
        @click="closeModal()"
      >
        Close
      </button>
    </div>
  </modal>
</template>

<script>
export default {
  data() {
    return {
      customer: {},
      mode: 'view',
    };
  },
  methods: {
    beforeOpen(data) {
      this.customer = { ...data.params.customerDetail };
      this.mode = data.params.mode ? data.params.mode : 'view';
    },
    closeModal() {
      this.$modal.hide('customer-detail');
    },
    async saveForm() {
      if (this.mode === 'edit') {
        const res = await this.$store.dispatch('editCustomer', this.customer);
        if (res.result) {
          window.location.reload();
        } else {
          // eslint-disable-next-line no-alert
          alert(res.message);
        }
      } else if (this.mode === 'create') {
        const res = await this.$store.dispatch('createCustomer', this.customer);
        if (res.result) {
          window.location.reload();
        } else {
          // eslint-disable-next-line no-alert
          alert(res.message);
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.customer-detail {
  &__row {
    display: flex;
    padding-bottom: 1em;
    font-size: 1.1em;
    font-weight: normal;
  }
}
</style>
