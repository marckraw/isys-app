import React, { Component } from "react";
import logo from "./logo.svg";
import Requester from './helpers/Requester';
import styled from 'styled-components';
import "./App.css";

import { categoriesEndpointInitialData } from './helpers/initial-data';


const AppWrapper = styled.div`
    text-align: center;
`;

const AppHeader = styled.div`
    background-color: #222;
    height: 150px;
    padding: 20px;
    color: white;
`;

const AppTitle = styled.h1`
    font-size: 1.5em;
`;

const AppIntro = styled.p`
    font-size: large;
`

const Breadcrumbs = styled.div`
    padding: 50px 0;
    margin-bottom: 25px;
    background-color: #ddd;

    ul {
        list-style: none;

        li {
            display: inline;
        }
    }
`;

const Img = styled.img`
    animation: App-logo-spin infinite 20s linear;
    height: 80px;

    @keyframes App-logo-spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
`;






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
            <AppWrapper>
                <AppHeader>
                    <Img src={logo} alt="logo" />
                    <AppTitle>Welcome to React</AppTitle>
                </AppHeader>
                <Breadcrumbs>
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
                </Breadcrumbs>

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

                <AppIntro>
                    To get started, edit <code>src/App.js</code> and save to reload.
                </AppIntro>
                <button onClick={this.getCategories}>get all categories</button>
                <button onClick={this.getCategory} value={16}>get one category</button>
            </AppWrapper>
        );
    }
}

export default App;
