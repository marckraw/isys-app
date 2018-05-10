import React, { Component }from 'react';
import Requester from './helpers/Requester';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ManageCategoryWrapper = styled.div`
    > form > div {
        padding: 10px;
        margin: 20px
    }

    > form > div > label {
        margin-right: 40px;
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


class ManageCategory extends Component {
    constructor(props) {
        super(props);

        this.requester = new Requester();
    };

    state = {
        parent_id: this.props.parentId,
        is_visible: false,
        name: "",
        description: "",
        picture_filename: "",
        ordering: 1,
    };

    componentDidMount = () => {
        console.log(this.props.filteredCategories);
        console.log(this.props.categoryId);
        if (this.props.filteredCategories && this.props.categoryId) {
            const category = this.props.filteredCategories.find( category => category.id === this.props.categoryId);

            console.log(category);

            this.setState({
                name: category.name || '',
                description: category.description || '',
                picture_filename: category.picture_filename || '',
                ordering: category.ordering || 1,
                is_visible: category.is_visible || false,
            });
        }
    };


    onInputChange = (event) => {
        const target = event.currentTarget;
        const name = target.name;
        let value;

        if (target.type === 'checkbox') {
            value = target.checked;
        } else if (target.type === 'number') {
            value = parseInt(target.value, 10);
        } else {
            value = target.value;
        };

        this.setState({
            [name]: value,
        });
    };

    onSubmit = (event) => {
        event.preventDefault();
        const newCategoryData = this.state;

        this.props.onConfirm(newCategoryData, this.props.categoryId);
    };

    render() {
        return (
            <ManageCategoryWrapper>
                <form onSubmit={this.onSubmit}>
                    <div>
                        <label>Parent ID</label>
                        <input name="parent_id" type="number" value={this.state.parent_id} onChange={this.onInputChange} />
                    </div>

                    <div>
                        <label>Is visible</label>
                        <input name="is_visible" type="checkbox" checked={this.state.is_visible} onChange={this.onInputChange} />
                    </div>

                    <div>
                        <label>Name</label>
                        <input name="name" type="text" value={this.state.name} onChange={this.onInputChange} />
                    </div>

                    <div>
                        <label>Description</label>
                        <input name="description" type="textarea" value={this.state.description} onChange={this.onInputChange} />
                    </div>

                    <div>
                        <label>Picture filename</label>
                        <input name="picture_filename" type="text" value={this.state.picture_filename} onChange={this.onInputChange} />
                    </div>

                    <div>
                        <label>Ordering</label>
                        <input name="ordering" type="number" value={this.state.ordering} onChange={this.onInputChange} />
                    </div>

                    <div>
                        <Button type="submit">{ this.props.type === 'add' ? 'Add' : 'Edit'}</Button>
                        <Button onClick={this.props.toggleModal}>Close</Button>
                    </div>
                </form>
        </ManageCategoryWrapper>
        );
    };
}

ManageCategory.propTypes = {
    type: PropTypes.string.isRequired,
    parentId: PropTypes.number.isRequired,
    onConfirm: PropTypes.func.isRequired,
    toggleModal: PropTypes.func.isRequired,
    filteredCategories: PropTypes.array,
    categoryId: PropTypes.number,
};

export default ManageCategory;
