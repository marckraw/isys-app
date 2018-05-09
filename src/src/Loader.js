import React from 'react';
import styled from 'styled-components';

const LoaderWrapper = styled.div`
    .loader {
        margin: 20px auto;
        font-size: 5px;
        position: relative;
        border: 1.1em solid rgba(255, 255, 255, 0.2);
        border-left: 1.1em solid #ddd;
        transform: translateZ(0);
        animation: loadAnimation 1.1s infinite linear;
    }
    .loader,
    .loader:after {
        border-radius: 50%;
        width: 10em;
        height: 10em;
    }
    @-webkit-keyframes loadAnimation {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
        }
        @keyframes loadAnimation {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`

const Loader = () => (
    <LoaderWrapper>
        <div className='loader'></div>
    </LoaderWrapper>
);

export default Loader;
