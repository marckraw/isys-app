import React, { Component } from "react";
import logo from "./logo.svg";
import Requester from './helpers/Requester';
import "./App.css";

class App extends Component {
    constructor() {
        super();

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
                    categories: response.data.catgories,
                });

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
            <p className="App-intro">
                To get started, edit <code>src/App.js</code> and save to reload.
            </p>
            <button onClick={this.onClickHandler}>click me!</button>
            </div>
        );
    }
}

export default App;
