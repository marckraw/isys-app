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
        presentCategory: 146,
        presentCategoryName: "",
    };

    componentDidMount = () => {
        this.getCategories();
    };



    egories = () => {
        const presentCategory = this.state.presentCategory;
    };

    getCategories = () => {
        console.log("changing staste !!!");

        this.requester.getCategories().then(
            response => {

                const filteredCategories = response.data.categories
                    .filter( category => category.parent_id === this.state.presentCategory);

                console.log(filteredCategories);

                const presentCategoryName = response.data.categories.find( category => category.id === this.state.presentCategory).name;


                this.setState({
                    categories: response.data.categories,
                    filteredCategories,
                    presentCategoryName,
                });
            },
            error => console.log(error),
            () => console.log("completed ? "),
        );
    }

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
    }



    render() {
        return (
            <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">{ this.state.someState } Welcome to React</h1>
            </header>
            <div className="breadcrumbs">
                Present category: <strong>{ this.state.presentCategoryName }</strong>
            </div>

            <div className="categories">
                {
                    this.state.filteredCategories.map( (category, index) => (
                        <div key={category.id}>
                            { category.name } { category.parent_id } : { category.id }
                        </div>
                    ))
                }
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
