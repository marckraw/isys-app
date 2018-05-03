import React from 'react';
import styled from 'styled-components';

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
        <Button> + </Button>
    </CategoriesListWrapper>
)

export default CategoriesList;
