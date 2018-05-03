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
        previousCategory: null,
        breadcrumb: [],
    };

    componentDidMount = () => {
        this.getCategories();
    };


    goBack = () => {
        if (this.state.breadcrumb.length !== 0) {
            const breadcrumb = this.state.breadcrumb;
            const presentCategory = breadcrumb.pop();
            const previousCategory = breadcrumb[breadcrumb.length-1];

            const filteredCategories = this.state.categories
                .filter( category => category.parent_id === presentCategory );

            this.setState({
                filteredCategories,
                presentCategory,
                previousCategory,
                breadcrumb,
            })
        }
    }

    changeCategory = (event) => {
        const categoryId = parseInt(event.target.value, 10);

        console.log(categoryId)

        const previousCategory = this.state.presentCategory;
        const presentCategory = categoryId;

        const filteredCategories = this.filterCategories(
            this.state.categories, presentCategory,
        );

        console.log(filteredCategories);

        console.log(previousCategory);
        console.log(presentCategory);

        const breadcrumb = this.state.breadcrumb;
        breadcrumb.push(previousCategory);

        this.setState({
            presentCategory,
            previousCategory,
            filteredCategories,
            breadcrumb,
        })
    };

    filterCategories = (categories, id) => {
        return categories.filter(category => category.parent_id === id);
    }

    getCategories = () => {
        this.requester.getCategories().then(
            response => {

                const filteredCategories = this.filterCategories(
                    response.data.categories, this.state.presentCategory,
                );

                const presentCategory = this.state.presentCategory;
                const previousCategory = this.state.previousCategory;

                console.log("Filtered categories: ");
                console.log(filteredCategories);

                console.log("All categories: ");
                console.log(response);

                this.setState({
                    categories: response.data.categories,
                    filteredCategories,
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
            <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">Welcome to React</h1>
            </header>
            <div className="breadcrumbs">
                <ul>
                    {
                        this.state.breadcrumb.map( crumb => (
                            <li className="crumb" key={crumb}>
                                { crumb } /&nbsp;
                            </li>
                        ))
                    }
                </ul>
                Previous Category: <button className="breadcrumb-item" onClick={this.goBack}><i>{ this.state.previousCategory } </i></button> ----
                Present category: <strong>{ this.state.presentCategory }</strong>
            </div>

            <div className="categories">
                {
                    this.state.filteredCategories.map( (category, index) => (
                        <button
                            className="category"
                            key={category.id}
                            onClick={this.changeCategory}
                            value={category.id}
                            style={category.is_visible ? {color: 'black'} : {color: 'gray'}}>
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
            <button onClick={this.getCategories}>get all categories</button>
            <button onClick={this.getCategory} value={16}>get one category</button>
            </div>
        );
    }
}

export default App;
