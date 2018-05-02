import { UNAUTHORIZED } from "./mocked-responses";

export class MockedBackend {
    constructor() {
        // these are method for making things in localstorage
        // localStorage.setItem();
        // localStorage.getItem();
        // localStorage.removeItem();

        // these are method to serialize and normalize data from and to localstorage
        // JSON.parse();
        // JSON.stringify();
    }

    // TODO: Implement using basic auth to login to API

    // createCategory(category) {
    //     return axios.post(this.categoryRESTEndpoint, category);
    // }

    // editCategory(categoryId) {
    //     return axios.put(`${this.categoryRESTEndpoint}/${categoryId}`);
    // }

    // deleteCategory(categoryId) {
    //     return axios.delete(`${this.categoryRESTEndpoint}/${categoryId}`);
    // }

    getCategories(auth) {
        return new Promise((resolve, reject) => {
            if (auth.login === "rest" && auth.password === "gBict?3J") {
                const categories = localStorage.getItem('categories');
                const categoriesJSON = JSON.parse(categories);

                resolve(categoriesJSON);
            } else {
                reject(UNAUTHORIZED);
            }
        });
    }
};

export default MockedBackend;
