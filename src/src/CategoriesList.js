import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import CategoryButton from './CategoryButton';

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
            <CategoryButton
                key={category.id}
                changeCategory={props.changeCategory}
                editCategory={props.editCategory}
                removeCategory={props.removeCategory}
                category={category}>
            </CategoryButton>
        ))
    }
    <Button onClick={props.openAddCategoryModal} value={props.presentCategory.id}> + </Button>
    </CategoriesListWrapper>
)

CategoriesList.propTypes = {
    changeCategory: PropTypes.func.isRequired,
    editCategory: PropTypes.func.isRequired,
    removeCategory: PropTypes.func.isRequired,
    filteredCategories: PropTypes.array.isRequired,
    openAddCategoryModal: PropTypes.func.isRequired,
    presentCategory: PropTypes.object.isRequired,
};

export default CategoriesList;
