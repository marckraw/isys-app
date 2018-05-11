import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const BreadcrumbsWrapper = styled.div`
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

const PresentCategory = styled.button`
    display: inline-block;
    padding: 25px 50px;
    margin: 10px;
    background-color: #ddd;
`;


const Breadcrumbs = ({ breadcrumbs, goToCategory, presentCategory}) => (
    <BreadcrumbsWrapper>
        <ul>
            {
                breadcrumbs.map( crumb => (
                    <Button
                        key={crumb.id}
                        onClick={goToCategory}
                        value={crumb.id}
                    >
                        { crumb.name }
                    </Button>
                ))
            }
            <PresentCategory>{ presentCategory.name }</PresentCategory>
        </ul>

    </BreadcrumbsWrapper>
)

Breadcrumbs.propTypes = {
    breadcrumbs: PropTypes.array.isRequired,
    presentCategory: PropTypes.object.isRequired,
    goBack: PropTypes.func.isRequired,
    goToCategory: PropTypes.func.isRequired,
};

export default Breadcrumbs;
