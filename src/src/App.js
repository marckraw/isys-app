import React, { Component } from "react";
import Requester from './helpers/Requester';
import styled from 'styled-components';

import ButtonReact from './Button';
import Breadcrumbs from './Breadcrumbs';

import { categoriesEndpointInitialData } from './helpers/initial-data';


const AppWrapper = styled.div`
    text-align: center;
`;

const AppIntro = styled.p`
    font-size: large;
`

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

const Category = styled.div``;


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

    filterCategories = (categories, id) => {
        return categories.filter(category => category.parent_id === id);
    }

    getCategories = () => {
        this.requester.getCategories().then(
            response => {
                console.log(response);

                const filteredCategories = this.filterCategories(
                    response.data.categories, this.state.presentCategory,
                );

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
                <Breadcrumbs
                    breadcrumbs={this.state.breadcrumbs}
                    presentCategory={this.state.presentCategory}
                    previousCategory={this.state.previousCategory}
                    goBack={this.goBack}
                />

                <Category>
                    {
                        this.state.filteredCategories.map( (category, index) => (
                            <Button
                                key={category.id}
                                onClick={this.changeCategory}
                                value={category.id}
                                style={category.is_visible ? {color: 'black'} : {color: 'gray'}}>
                                { category.name } { category.parent_id } : { category.id }
                            </Button>
                        ))
                    }
                    <ButtonReact></ButtonReact>
                    <Button> + </Button>
                </Category>

                <AppIntro>
                    To get started, edit <code>src/App.js</code> and save to reload.
                </AppIntro>
                <Button onClick={this.getCategories}>get all categories</Button>
                <Button onClick={this.getCategory} value={16}>get one category</Button>
            </AppWrapper>
        );
    }
}

export default App;
