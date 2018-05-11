import React from 'react';
import styled from 'styled-components';

const ErrorBoxWrapper = styled.div``;

const ErrorBox = ({ message }) => (
    <ErrorBoxWrapper>
        { message }
    </ErrorBoxWrapper>
)

export default ErrorBox;
