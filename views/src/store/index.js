import Vue from 'vue';
import Vuex from 'vuex';
// import axios from 'axios';
import CustomerService from '../services/CustomerService';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    customers: [],
  },
  mutations: {
    setCustomers(state, customers) {
      state.customers = customers;
    },
    deleteCustomer(state, customerId) {
      state.customers = state.customers.filter((customer) => customer.id !== customerId);
    },
    editCustomer(state, customer) {
      const { customers } = state;
      const existingCustomerIndex = state.customers.findIndex((data) => data.id === customer.id);
      customers[existingCustomerIndex] = customer;
      state.customers = customers;
    },
    createCustomer(state, customer) {
      state.customers = [...state.customers, customer];
    },
  },
  actions: {
    async getCustomers(context) {
      try {
        const customers = await CustomerService.getCustomers();
        context.commit('setCustomers', customers.data);
        return { result: true, message: 'success' };
      } catch (err) {
        return { result: false, message: 'failed' };
      }
    },

    async deleteCustomer(context, payload) {
      try {
        await CustomerService.deleteCustomer(payload);
        context.commit('deleteCustomer', payload);
        return { result: true, message: 'success' };
      } catch (err) {
        return { result: false, message: 'failed' };
      }
    },

    async editCustomer(context, payload) {
      try {
        await CustomerService.editCustomer(payload);
        context.commit('editCustomer', payload);
        return { result: true, message: 'success' };
      } catch (err) {
        if (err.response && err.response.data && err.response.data.message) {
          return { result: false, message: err.response.data.message };
        }
        return { result: false, message: 'failed' };
      }
    },

    async createCustomer(context, payload) {
      try {
        await CustomerService.createCustomer(payload);
        context.commit('createCustomer', payload);
        return { result: true, message: 'success' };
      } catch (err) {
        if (err.response && err.response.data && err.response.data.message) {
          return { result: false, message: err.response.data.message };
        }
        return { result: false, message: 'failed' };
      }
    },
  },
  getters: {
    customers: (state) => () => state.customers,
  },
});
