import React, { Component } from "react";
import Requester from '../../helpers/Requester';
import styled from 'styled-components';

import ManageCategory from './ManageCategory';

import Breadcrumbs from '../presentational/Breadcrumbs';
import CategoriesList from "../presentational/CategoriesList";
import Loader from '../presentational/Loader';
import Modal from '../presentational/Modal';
import ErrorBox from '../presentational/ErrorBox';


const MainAppWrapper = styled.div`
    text-align: center;
`;

class MainApp extends Component {
    constructor() {
        super();
        this.requester = new Requester();
    }

    state = {
        categories: [],
        filteredCategories: [],
        breadcrumbs: [],

        presentCategory: { id: 1, name: 'Root' },
        previousCategory: { id: null, name: null },

        categoriesLoaded: false,
        isAddCategoryOpened: false,
        isEditCategoryOpened: false,
        pendingManagingCategory: false,

        editedCategoryId: 1,

        isErrorHappened: false,
        errorMessage: '',
    };

    componentDidMount = () => { this.getCategories() };

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
        this.setState({ isAddCategoryOpened: !this.state.isAddCategoryOpened });
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

        this.setState({
            pendingManagingCategory: true,
            categoriesLoaded: false,
        });

        const data = { 'category': categoryData };

        this.requester.createCategory(data).then(
            response => {
                this.setState({ pendingManagingCategory: false });
                this.getCategories();
            },
            error => {
                const errorMessage = error.response.data.error.reason_code;
                this.setError(errorMessage);
            },
        );
    };

    editCategory = (categoryData, categoryId) => {
        this.setState({
            isEditCategoryOpened: !this.state.isEditCategoryOpened,
            pendingManagingCategory: true,
            categoriesLoaded: false,
        });

        const data = { 'category': categoryData };

        this.requester.editCategory(data, categoryId).then(
            response => {
                this.setState({ pendingManagingCategory: false });
                this.getCategories();
            },
            error => {
                const errorMessage = error.response.data.error.reason_code;
                this.setError(errorMessage);
            },
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
                this.setState({ pendingManagingCategory: false });
                this.getCategories();
            },
            error => {
                const errorMessage = error.response.data.error.reason_code;
                this.setError(errorMessage);
            },
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
            error => {
                const errorMessage = error.response.data.error.reason_code;
                this.setError(errorMessage);
            },
        );
    };

    setError = (errorMessage) => {
        this.setState({
            isErrorHappened: true,
            errorMessage,
            pendingManagingCategory: true,
            categoriesLoaded: true,
        });

        setTimeout(this.removeError, 3000);
    }

    removeError = () => {
        this.setState({
            isErrorHappened: false,
            errorMessage: '',
        });
    }

    render() {
        return (
            <MainAppWrapper>
                <Breadcrumbs
                    breadcrumbs={this.state.breadcrumbs}
                    presentCategory={this.state.presentCategory}
                    goBack={this.goBack}
                    goToCategory={this.goToCategory}
                />

                { this.state.isErrorHappened ? (
                        <ErrorBox message={this.state.errorMessage} />
                    ) : this.state.categoriesLoaded && this.state.pendingManagingCategory ? (
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
            </MainAppWrapper>
        );
    };
}

export default MainApp;
