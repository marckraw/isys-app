import axios from 'axios';
import { MockedBackend } from './MockedBackend';

class Requester {
    constructor() {
        /* when the CORS and proxy problem will be solved */
        // this.categoryRESTEndpoint = `/api/categories`;

        this.mockedBackend = new MockedBackend();
    }

    // TODO: Implement using basic auth to login to API

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
        const auth = {
            login: 'rest',
            password: 'gBict?3J',
        };

        return this.mockedBackend.getCategories(auth);


        // return axios.get(this.categoryRESTEndpoint);
    }
};

export default Requester;
