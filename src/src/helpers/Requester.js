import axios from 'axios';

class Requester {
    constructor() {
        // this.apiUrl = 'http://dotnet.demos.i-sklep.pl/rest_api/shop_api/v1/';

        this.categoryRESTEndpoint = `/api/categories`;
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
        return axios.get(this.categoryRESTEndpoint);
    }
};

export default Requester;
