import axios from 'axios';
import { MockedBackend } from './MockedBackend';

class Requester {
    constructor() {
        /* when the CORS and proxy problem will be solved */
        // this.categoryRESTEndpoint = `/api/categories`;
        this.categoryRESTEndpoint = `https://cors-anywhere.herokuapp.com/http://dotnet.demos.i-sklep.pl/rest_api/shop_api/v1/categories`;

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

        var username = auth.login;
        var password = auth.password;
        var basicAuth = 'Basic ' + btoa(username + ':' + password)

        // return this.mockedBackend.getCategories(auth);


        return axios.get(this.categoryRESTEndpoint, { headers: {'Authorization': basicAuth } });
    }

    getCategory(id) {
        const auth = {
            login: 'rest',
            password: 'gBict?3J',
        };

        return this.mockedBackend.getCategory(auth, id);


        // return axios.get(this.categoryRESTEndpoint, auth);
    }
};

export default Requester;
