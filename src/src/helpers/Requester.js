import axios from 'axios';
import { MockedBackend } from './MockedBackend';

class Requester {
    constructor() {
        // this.mockedBackend = new MockedBackend();

        this.categoryRESTEndpoint = `https://cors-anywhere.herokuapp.com/http://dotnet.demos.i-sklep.pl/rest_api/shop_api/v1/categories`;

        const auth = {
            login: 'rest',
            password: 'gBict?3J',
        };

        const username = auth.login;
        const password = auth.password;
        const basicAuth = 'Basic ' + btoa(username + ':' + password)

        axios.defaults.headers.common['Authorization'] = basicAuth;
    }

    createCategory(category) {
        return axios.post(this.categoryRESTEndpoint, category);
    }

    editCategory(categoryId) {
        return axios.put(`${this.categoryRESTEndpoint}/${categoryId}`);
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
