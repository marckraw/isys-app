import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const CategoriesListWrapper = styled.div``;

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

const CategoriesList = (props) => (
    <CategoriesListWrapper>
    {
        props.filteredCategories.map( (category, index) => (
            <Button
                key={category.id}
                onClick={props.changeCategory}
                value={category.id}
                style={category.is_visible ? {color: 'black'} : {color: 'gray'}}>
                { category.name } { category.parent_id } : { category.id }
            </Button>
        ))
    }
    <Button onClick={props.addCategory} value={props.presentCategory}> + </Button>
    </CategoriesListWrapper>
)

CategoriesList.propTypes = {
    changeCategory: PropTypes.func.isRequired,
    filteredCategories: PropTypes.array.isRequired,
    addCategory: PropTypes.func.isRequired,
    presentCategory: PropTypes.number.isRequired,
};

export default CategoriesList;
