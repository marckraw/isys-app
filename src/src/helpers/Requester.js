import axios from 'axios';

class Requester {
    constructor() {
        // this.mockedBackend = new MockedBackend();

        this.categoryRESTEndpoint = process.env.REACT_APP_REST_API_URL;

        const auth = {
            login: process.env.REACT_APP_REST_API_USER,
            password: process.env.REACT_APP_REST_API_PASS,
        };

        const username = auth.login;
        const password = auth.password;
        const basicAuth = 'Basic ' + btoa(username + ':' + password)

        axios.defaults.headers.common['Authorization'] = basicAuth;
    }

    createCategory(category) {
        return axios.post(this.categoryRESTEndpoint, category);
    }

    editCategory(data, categoryId) {
        return axios.put(`${this.categoryRESTEndpoint}/${categoryId}`, data);
    }

    deleteCategory(categoryId) {
        return axios.delete(`${this.categoryRESTEndpoint}/${categoryId}`);
    }

    getCategories() {
        return axios.get(this.categoryRESTEndpoint);
    }

    getCategory(id) {
        return axios.get(`${this.categoryRESTEndpoint}/${id}`);
    }
};

export default Requester;
