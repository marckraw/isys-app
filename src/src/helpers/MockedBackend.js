import { UNAUTHORIZED, RESOURCE_NOT_FOUND } from "./mocked-responses";

export class MockedBackend {
        // these are method for making things in localstorage
        // localStorage.setItem();
        // localStorage.getItem();
        // localStorage.removeItem();

        // these are method to serialize and normalize data from and to localstorage
        // JSON.parse();
        // JSON.stringify();

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
                const categoriesLS = localStorage.getItem('categories');
                const categoriesJSON = JSON.parse(categoriesLS);

                const response = {
                    "version": "v1",
                    "success": true,
                    "error": null,
                    "data": {
                        "categories": categoriesJSON.data.categories,
                    },
                }

                resolve(response);
            } else {
                reject(UNAUTHORIZED);
            }
        });
    }

    getCategory(auth, id) {
        return new Promise((resolve, reject) => {
            if (auth.login === "rest" && auth.password === "gBict?3J") {
                const categoriesLS = localStorage.getItem('categories');
                const categoriesJSON = JSON.parse(categoriesLS);

                console.log(categoriesJSON.data.categories);

                const category = categoriesJSON.data.categories.filter( category => {
                    console.log(category.id + " ? " + id);
                    return category.id === id;
                })[0];


                if (category) {

                    const response = {
                        version: "v1",
                        success: true,
                        error: null,
                        data: { category },
                    }

                    resolve(response);
                } else {
                    reject(RESOURCE_NOT_FOUND)
                }
            } else {
                reject(UNAUTHORIZED);
            }
        });
    }
};

export default MockedBackend;

