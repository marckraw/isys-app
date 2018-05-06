import React from 'react';
import styled from 'styled-components';

const LoaderWrapper = styled.div`
    color: red;
`

const Loader = () => (
    <LoaderWrapper>
        <h1>Loading....</h1>
    </LoaderWrapper>
);

export default Loader;
