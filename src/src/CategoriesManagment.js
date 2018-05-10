import React, { Component } from "react";
import Requester from './helpers/Requester';
import styled from 'styled-components';

import Breadcrumbs from './Breadcrumbs';
import CategoriesList from "./CategoriesList";
import Loader from './Loader';
import ManageCategory from './ManageCategory';
import Modal from './Modal';


const CategoriesManagmentWrapper = styled.div`
    text-align: center;
`;

class CategoriesManagment extends Component {
    constructor() {
        super();

        this.requester = new Requester();
    }

    state = {
        categories: [],
        filteredCategories: [],
        presentCategory: { id: 1, name: 'Root' },
        previousCategory: { id: null, name: null },
        breadcrumbs: [],
        categoriesLoaded: false,
        isAddCategoryOpened: false,
        isEditCategoryOpened: false,
        pendingManagingCategory: false,
        editedCategoryId: 2,
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
    };

    goToCategory = (event) => {
        const categoryId = parseInt(event.currentTarget.value, 10);

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
        const categoryId = parseInt(event.currentTarget.value, 10);

        const previousCategoryName = this.state.categories
            .find( category => category.id === this.state.presentCategory.id).name
        const presentCategoryName = this.state.categories
            .find( category => category.id === categoryId).name

        const previousCategory = {id: this.state.presentCategory.id, name: previousCategoryName};
        const presentCategory = {id: categoryId, name: presentCategoryName};

        const filteredCategories = this.filterCategories(
            this.state.categories, presentCategory.id,
        );

        const breadcrumbs = [...this.state.breadcrumbs, previousCategory];

        this.setState({
            presentCategory,
            previousCategory,
            filteredCategories,
            breadcrumbs,
        });
    };

    toggleAddCategoryModal = () => {
        this.setState({
            isAddCategoryOpened: !this.state.isAddCategoryOpened,
        });
    };

    toggleEditCategoryModal = (event) => {
        const value = event.currentTarget.value;
        const categoryId = parseInt(value, 10);

        this.setState({
            editedCategoryId: categoryId,
            isEditCategoryOpened: !this.state.isEditCategoryOpened,
        });
    };

    addCategory = (categoryData) => {
        this.toggleAddCategoryModal();

        console.log(categoryData);

        this.setState({
            pendingManagingCategory: true,
            categoriesLoaded: false,
        });

        const data = {
            'category': categoryData,
        };

        this.requester.createCategory(data).then(
            response => {
                this.setState({
                    pendingManagingCategory: false,
                });

                this.getCategories();
            },
            error => console.log(error),
        );
    };

    editCategory = (categoryData, categoryId) => {
        this.setState({
            isEditCategoryOpened: !this.state.isEditCategoryOpened,
            pendingManagingCategory: true,
            categoriesLoaded: false,
        });

        const data = {
            'category': categoryData,
        };

        this.requester.editCategory(data, categoryId).then(
            response => {
                this.setState({
                    pendingManagingCategory: false,
                });

                this.getCategories();
            },
            error => console.log(error),
        );
    };

    removeCategory = (event) => {
        const value = event.currentTarget.value;
        const categoryId = parseInt(value, 10);

        this.setState({
            pendingManagingCategory: true,
            categoriesLoaded: false,
        });

        this.requester.deleteCategory(categoryId).then(
            response => {
                this.setState({
                    pendingManagingCategory: false,
                });

                this.getCategories();
            },
            error => console.log(error),
        );
    };

    filterCategories = (categories, id) => {
        return categories.filter(category => category.parent_id === id);
    };

    getCategories = () => {
        this.requester.getCategories().then(
            response => {
                const filteredCategories = this.filterCategories(
                    response.data.data.categories, this.state.presentCategory.id,
                );

                const categoriesLoaded = true;
                const pendingManagingCategory = true;

                this.setState({
                    categories: response.data.data.categories,
                    filteredCategories,
                    categoriesLoaded,
                    pendingManagingCategory,
                });
            },
            error => console.log(error),
        );
    };

    render() {
        return (
            <CategoriesManagmentWrapper>
                <Breadcrumbs
                    breadcrumbs={this.state.breadcrumbs}
                    presentCategory={this.state.presentCategory}
                    goBack={this.goBack}
                    goToCategory={this.goToCategory}
                />

                { this.state.categoriesLoaded && this.state.pendingManagingCategory ? (
                    <CategoriesList
                        filteredCategories={this.state.filteredCategories}
                        changeCategory={this.changeCategory}
                        editCategory={this.editCategory}
                        removeCategory={this.removeCategory}
                        toggleAddCategoryModal={this.toggleAddCategoryModal}
                        toggleEditCategoryModal={this.toggleEditCategoryModal}
                        presentCategory={this.state.presentCategory}/>
                    ) : (
                        <Loader />
                    )
                }

                { this.state.isAddCategoryOpened && (
                    <Modal>
                        <ManageCategory
                            type='add'
                            parentId={this.state.presentCategory.id}
                            onConfirm={this.addCategory}
                            toggleModal={this.toggleAddCategoryModal}/>
                    </Modal>
                )}

                { this.state.isEditCategoryOpened && (
                    <Modal>
                        <ManageCategory
                            type='edit'
                            categoryId={this.state.editedCategoryId}
                            filteredCategories={this.state.filteredCategories}
                            parentId={this.state.presentCategory.id}
                            onConfirm={this.editCategory}
                            toggleModal={this.toggleEditCategoryModal}/>
                    </Modal>
                )}


            </CategoriesManagmentWrapper>
        );
    };
}

export default CategoriesManagment;
