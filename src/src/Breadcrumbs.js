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

const Crumb = styled.li``;


const Breadcrumbs = (props) => (
    <BreadcrumbsWrapper>
        <ul>
            {
                props.breadcrumbs.map( crumb => (
                    <Button
                        key={crumb}
                        onClick={props.goToCategory}
                        value={crumb}
                    >
                        { crumb }
                    </Button>
                ))
            }
        </ul>
        Present category: <strong>{ props.presentCategory }</strong>
    </BreadcrumbsWrapper>
)

Breadcrumbs.propTypes = {
    breadcrumbs: PropTypes.array.isRequired,
    presentCategory: PropTypes.number.isRequired,
    goBack: PropTypes.func.isRequired,
    goToCategory: PropTypes.func.isRequired,
};

export default Breadcrumbs;
