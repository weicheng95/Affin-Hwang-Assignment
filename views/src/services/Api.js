import axios from 'axios';

export default () => axios.create({
  baseURL: 'https://cim-api-7apwve7oma-as.a.run.app',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
