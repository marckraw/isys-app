import React, { Component } from "react";
import Requester from './helpers/Requester';
import styled from 'styled-components';

import ButtonReact from './Button';
import Breadcrumbs from './Breadcrumbs';
import CategoriesList from "./CategoriesList";
import Loader from './Loader';
import AddCategory from './AddCategory';


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

        this.requester = new Requester();
    }

    state = {
        categories: [],
        filteredCategories: [],
        presentCategory: {
            id: 1,
            name: 'Root',
        },
        previousCategory: {
            id: null,
            name: null,
        },
        breadcrumbs: [],
        categoriesLoaded: false,
        isAddCategoryOpened: false,
        pendingAddingCategory: false,
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
        breadcrumbs = breadcrumbs.filter( crumb => crumb.id < categoryId );

        const presentCategoryName = this.state.categories.find( category => category.id === categoryId).name;

        const presentCategory = {id: categoryId, name: presentCategoryName};
        const previousCategory = breadcrumbs[breadcrumbs.length-1];

        const filteredCategories = this.state.categories
            .filter( category => category.parent_id === presentCategory.id );

        this.setState({
            filteredCategories,
            presentCategory,
            previousCategory,
            breadcrumbs,
        })
    };

    changeCategory = (event) => {
        const categoryId = parseInt(event.target.value, 10);

        const previousCategoryName = this.state.categories.find( category => category.id === this.state.presentCategory.id).name
        const presentCategoryName = this.state.categories.find( category => category.id === categoryId).name

        const previousCategory = {id: this.state.presentCategory.id, name: previousCategoryName};
        const presentCategory = {id: categoryId, name: presentCategoryName};

        const filteredCategories = this.filterCategories(
            this.state.categories, presentCategory.id,
        );

        const breadcrumbs = this.state.breadcrumbs;
        breadcrumbs.push(previousCategory);

        this.setState({
            presentCategory,
            previousCategory,
            filteredCategories,
            breadcrumbs,
        }, () => {
            console.log(this.state);
        })
    };

    openAddCategoryModal = () => {
        this.setState({
            isAddCategoryOpened: !this.state.isAddCategoryOpened,
        });
    }

    addCategory = (categoryData) => {
        this.setState({
            pendingAddingCategory: true,
            categoriesLoaded: false,
        });

        const data = {
            'category': categoryData,
        };

        this.requester.createCategory(data).then(
            response => {
                this.setState({
                    pendingAddingCategory: false,
                });

                this.getCategories();
            },
            error => console.log(error),
            () => console.log("completed"),
        );
    }

    filterCategories = (categories, id) => {
        return categories.filter(category => category.parent_id === id);
    }

    getCategories = () => {
        this.requester.getCategories().then(
            response => {
                const filteredCategories = this.filterCategories(
                    response.data.data.categories, this.state.presentCategory.id,
                );

                const categoriesLoaded = true;
                const pendingAddingCategory = true;

                this.setState({
                    categories: response.data.data.categories,
                    filteredCategories,
                    categoriesLoaded,
                    pendingAddingCategory,
                });
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

                { this.state.categoriesLoaded && this.state.pendingAddingCategory ? (
                    <CategoriesList
                        filteredCategories={this.state.filteredCategories}
                        changeCategory={this.changeCategory}
                        openAddCategoryModal={this.openAddCategoryModal}
                        presentCategory={this.state.presentCategory}
                    />
                    ) : (
                        <Loader />
                    )
                }

                <hr />

                { this.state.isAddCategoryOpened && (
                    <AddCategory
                        parentId={this.state.presentCategory.id}
                        addCategory={this.addCategory}
                    />
                )}
            </AppWrapper>
        );
    }
}

export default App;
