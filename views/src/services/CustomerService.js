import Api from '@/services/Api';

export default {
  getCustomers() {
    return Api().get('/customers');
  },

  deleteCustomer(customerId) {
    return Api().delete(`/customers/${customerId}`);
  },

  editCustomer(customer) {
    return Api().put(`/customers/${customer.id}`, customer);
  },

  createCustomer(customer) {
    return Api().post('/customers', customer);
  },
};
