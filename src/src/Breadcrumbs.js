import React from 'react';
import styled from 'styled-components';

const BreadcrumbsStyled = styled.div`
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
    <BreadcrumbsStyled>
        <ul>
            {
                props.breadcrumbs.map( crumb => (
                    <Crumb key={crumb}>
                        { crumb } /&nbsp;
                    </Crumb>
                ))
            }
        </ul>
        Previous Category: <Button className="breadcrumb-item" onClick={props.goBack}><i>{ props.previousCategory } </i></Button> ----
        Present category: <strong>{ props.presentCategory }</strong>
    </BreadcrumbsStyled>
)

export default Breadcrumbs;
