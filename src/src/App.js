import React, { Component } from "react";
import logo from "./logo.svg";
import Requester from './helpers/Requester';
import "./App.css";

import { categoriesEndpointInitialData } from './helpers/initial-data';

class App extends Component {
    constructor() {
        super();

        localStorage.setItem('categories', JSON.stringify(categoriesEndpointInitialData));

        this.requester = new Requester();
    }

    state = {
        someState: "asdasdas",
        categories: [],
        filteredCategories: [],
        presentCategory: 1,
        previousCategory: 1,
        presentCategoryName: "",
        previousCategoryName: "",
    };

    componentDidMount = () => {
        this.getCategories();
    };


    goBack = () => {
        const categoryId = this.state.previousCategory;

        const filteredCategories = this.state.categories
            .filter( category => category.parent_id === categoryId );

            this.setState({
                filteredCategories,
                previousCategory: this.state.presentCategory,
                presentCategory: categoryId,
            })
    }



    changeCategory = (event) => {
        const categoryId = parseInt(event.target.value, 10);

        console.log(categoryId)

        const previousCategory = this.state.presentCategory;
        const presentCategory = categoryId;
        const categoryNames = this.getCategoriesNames(this.state.categories, {presentCategory, previousCategory});

        const filteredCategories = this.state.categories
                    .filter( category => category.parent_id === presentCategory);

        console.log(filteredCategories);

        console.log(previousCategory);
        console.log(presentCategory);
        console.log(categoryNames);


        this.setState({
            presentCategory,
            previousCategory,
            previousCategoryName: categoryNames.previousCategoryName,
            presentCategoryName: categoryNames.presentCategoryName,
            filteredCategories,
        })
    };

    getCategoriesNames = (categories, categoryIds) => {
        const presentCategoryName = categories.find( category => category.id === categoryIds.presentCategory).name;
        const previousCategoryName = categories.find( category => category.id === categoryIds.previousCategory).name;

        return {
            presentCategoryName,
            previousCategoryName,
        }
    }

    getCategories = () => {
        console.log("changing staste !!!");

        this.requester.getCategories().then(
            response => {

                const filteredCategories = response.data.categories
                    .filter( category => category.parent_id === this.state.presentCategory);

                const presentCategory = this.state.presentCategory;
                const previousCategory = this.state.previousCategory;


                const categoryNames = this.getCategoriesNames(response.data.categories, {presentCategory, previousCategory});

                this.setState({
                    categories: response.data.categories,
                    filteredCategories,
                    previousCategoryName: categoryNames.previousCategoryName,
                    presentCategoryName: categoryNames.presentCategoryName,
                });
            },
            error => console.log(error),
            () => console.log("completed ? "),
        );
    };

    onClickChangeLocalStorage = () => {
        localStorage.setItem('categories', 'something funny');
    }

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
            <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">Welcome to React</h1>
            </header>
            <div className="breadcrumbs">
                Previous Category: <button className="breadcrumb-item" onClick={this.goBack}><i>{ this.state.previousCategoryName } </i></button> ----
                Present category: <strong>{ this.state.presentCategoryName }</strong>
            </div>

            <div className="categories">
                {
                    this.state.filteredCategories.map( (category, index) => (
                        <button
                            className="category"
                            key={category.id}
                            onClick={this.changeCategory}
                            value={category.id}>
                            { category.name } { category.parent_id } : { category.id }
                        </button>
                    ))
                }
                <button
                    className="category category-add">
                    +
                </button>
            </div>

            <p className="App-intro">
                To get started, edit <code>src/App.js</code> and save to reload.
            </p>
            <button onClick={this.getCategories}>click me!</button>
            <button onClick={this.onClickChangeLocalStorage}>change local storage</button>
            <button onClick={this.getCategory} value={16}>get one category</button>
            </div>
        );
    }
}

export default App;
