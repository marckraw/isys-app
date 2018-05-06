import React from 'react';
import styled from 'styled-components';

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

const ButtonReact = () => (
    <Button>
        something
    </Button>
);

export default ButtonReact;
