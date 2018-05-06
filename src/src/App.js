import React, { Component } from "react";
import Requester from './helpers/Requester';
import styled from 'styled-components';

import ButtonReact from './Button';
import Breadcrumbs from './Breadcrumbs';
import CategoriesList from "./CategoriesList";
import Loader from './Loader';
import AddCategory from './AddCategory';

import { categoriesEndpointInitialData } from './helpers/initial-data';


const AppWrapper = styled.div`
    text-align: center;
`;

const Button = styled.button`
    display: inline-block;
    padding: 25px 50px;
    margin: 10px;
    background-color: #eee;
    cursor: pointer;

    &:hover {
        background-color: #ddd;
    }
`;


class App extends Component {
    constructor() {
        super();

        localStorage.setItem('categories', JSON.stringify(categoriesEndpointInitialData));

        this.requester = new Requester();
    }

    state = {
        categories: [],
        filteredCategories: [],
        presentCategory: 1,
        previousCategory: null,
        breadcrumbs: [],
        categoriesLoaded: false,
        isAddCategoryOpened: false,
    };

    componentDidMount = () => {
        this.getCategories();
    };


    goBack = () => {
        if (this.state.breadcrumbs.length !== 0) {
            const breadcrumbs = this.state.breadcrumbs;
            const presentCategory = breadcrumbs.pop();
            const previousCategory = breadcrumbs[breadcrumbs.length-1];

            const filteredCategories = this.state.categories
                .filter( category => category.parent_id === presentCategory );

            this.setState({
                filteredCategories,
                presentCategory,
                previousCategory,
                breadcrumbs,
            })
        }
    }

    goToCategory = (event) => {
        const categoryId = parseInt(event.target.value, 10);

        let breadcrumbs = this.state.breadcrumbs;
        breadcrumbs = breadcrumbs.slice(0, breadcrumbs.indexOf(categoryId));

        const presentCategory = categoryId;
        const previousCategory = breadcrumbs[breadcrumbs.length-1];

        const filteredCategories = this.state.categories
            .filter( category => category.parent_id === presentCategory );

        this.setState({
            filteredCategories,
            presentCategory,
            previousCategory,
            breadcrumbs,
        })
    };

    changeCategory = (event) => {
        const categoryId = parseInt(event.target.value, 10);

        const previousCategory = this.state.presentCategory;
        const presentCategory = categoryId;

        const filteredCategories = this.filterCategories(
            this.state.categories, presentCategory,
        );

        const breadcrumbs = this.state.breadcrumbs;
        breadcrumbs.push(previousCategory);

        this.setState({
            presentCategory,
            previousCategory,
            filteredCategories,
            breadcrumbs,
        })
    };

    addCategory = () => {
        this.setState({
            isAddCategoryOpened: !this.state.isAddCategoryOpened,
        });
    }

    filterCategories = (categories, id) => {
        return categories.filter(category => category.parent_id === id);
    }

    getCategories = () => {
        this.requester.getCategories().then(
            response => {
                console.log(response);

                const filteredCategories = this.filterCategories(
                    response.data.data.categories, this.state.presentCategory,
                );

                const categoriesLoaded = true;

                this.setState({
                    categories: response.data.data.categories,
                    filteredCategories,
                    categoriesLoaded,
                });
            },
            error => console.log(error),
            () => console.log("completed ? "),
        );
    };

    getCategory = (event) => {
        const id = parseInt(event.target.value, 10);

        this.requester.getCategory(id).then(
            response => {
                console.log(response);
            },
            error => console.log(error),
            () => console.log("completed ? "),
        );
    };

    render() {
        return (
            <AppWrapper>
                <Breadcrumbs
                    breadcrumbs={this.state.breadcrumbs}
                    presentCategory={this.state.presentCategory}
                    goBack={this.goBack}
                    goToCategory={this.goToCategory}
                />

                { this.state.categories.length !== 0 ? (
                    <CategoriesList
                        filteredCategories={this.state.filteredCategories}
                        changeCategory={this.changeCategory}
                        addCategory={this.addCategory}
                        presentCategory={this.state.presentCategory}
                    />
                    ) : (
                        <Loader />
                    )
                }

                <Button onClick={this.getCategories}>get all categories</Button>
                <Button onClick={this.getCategory} value={16}>get one category</Button>
                <hr />

                { this.state.isAddCategoryOpened && (
                    <AddCategory
                        parentId={this.state.presentCategory}
                    />
                )}
            </AppWrapper>
        );
    }
}

export default App;
