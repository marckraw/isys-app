import React from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 1000;
    background-color: rgba(0, 0, 0, .65);
`;

const Content = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 10000;
    overflow: auto;
    text-align: center;
    padding: 4px;
    cursor: pointer;

    &:after {
        vertical-align: middle;
        display: inline-block;
        height: 100%;
        margin-left: -.05em;
        content: '';
    }
`;

const Dialog = styled.div`
    position: relative;
    outline: 0;
    width: auto;
    display: inline-block;
    vertical-align: middle;
    box-sizing: border-box;
    max-width: auto;
    cursor: default;
    border-radius: 4px;

    background-color: white;
`

const Modal = (props) => (
    <ModalOverlay>
        <Content>
            <Dialog>
                { props.children }
                this is from content in modal
            </Dialog>
        </Content>
    </ModalOverlay>
)

export default Modal;
