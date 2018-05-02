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
    };

    onClickHandler = () => {
        console.log("changing staste !!!");

        this.requester.getCategories().then(
            response => {
                this.setState({
                    categories: response.data.categories,
                });

                console.log(response);
            },
            error => console.log(error),
            () => console.log("completed ? "),
        );
    }

    onClickChangeLocalStorage = () => {
        localStorage.setItem('categorier', 'something funny');
    }

    render() {
        return (
            <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">{ this.state.someState } Welcome to React</h1>
            </header>
            <p className="App-intro">
                To get started, edit <code>src/App.js</code> and save to reload.
            </p>
            <button onClick={this.onClickHandler}>click me!</button>
            <button onClick={this.onClickChangeLocalStorage}>change local storage</button>
            </div>
        );
    }
}

export default App;
