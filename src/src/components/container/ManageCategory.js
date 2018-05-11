import React, { Component }from 'react';
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

    .error {
        border: 1px solid red;
    }

    .success {
        border: 1px solid black;
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
    state = {
        formData: {
            parent_id: this.props.parentId,
            is_visible: false,
            name: "",
            description: "",
            picture_filename: "",
            ordering: 1,
        },
        errors: {
            is_visible: {
                hasError: false,
                touched: false,
            },
            name: {
                hasError: false,
                touched: false,
            },
            description: {
                hasError: false,
                touched: false,
            },
            picture_filename: {
                hasError: false,
                touched: false,
            },
            ordering: {
                hasError: false,
                touched: false,
            }
        },
        formHasErrors: false,
    };

    componentDidMount = () => {
        if (this.props.filteredCategories && this.props.categoryId) {
            const category = this.props.filteredCategories.find( category => category.id === this.props.categoryId);

            this.setState({
                formData: {
                    ...this.state.formData,
                    name: category.name || '',
                    description: category.description || '',
                    picture_filename: category.picture_filename || '',
                    ordering: category.ordering || 1,
                    is_visible: category.is_visible || false,
                }
            });
        }
    };

    handleBlur = (event) => {
        const target = event.currentTarget;
        const name = target.name;

        this.setState({
            errors: {
                ...this.state.errors,
                [name]: {
                    ...this.state.errors[name],
                    touched: true,
                },
            },
        });
    }

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
            formData: {
                ...this.state.formData,
                [name]: value,
            },
        });
    };

    onSubmit = (event) => {
        event.preventDefault();
        const newCategoryData = this.state.formData;

        this.props.onConfirm(newCategoryData, this.props.categoryId);
    };

    render() {
        return (
            <ManageCategoryWrapper>
                <form onSubmit={this.onSubmit}>
                    <div>
                        <label>Parent ID</label>
                        <input
                            disabled="true"
                            name="parent_id"
                            type="number"
                            value={this.state.formData.parent_id}/>
                    </div>

                    <div>
                        <label>Is visible</label>
                        <input
                            name="is_visible"
                            type="checkbox"
                            checked={this.state.formData.is_visible}
                            onChange={this.onInputChange} />
                    </div>

                    <div>
                        <label>Name</label>
                        <input
                            className={
                                this.state.errors.name.hasError &&
                                this.state.errors.name.touched ? 'error': 'success'
                            }
                            name="name"
                            type="text"
                            value={this.state.formData.name}
                            onBlur={this.handleBlur}
                            onChange={this.onInputChange} />
                    </div>

                    <div>
                        <label>Description</label>
                        <input
                            className={
                                this.state.errors.description.hasError &&
                                this.state.errors.description.touched ? 'error': 'success'
                            }
                            name="description"
                            type="textarea"
                            value={this.state.formData.description}
                            onBlur={this.handleBlur}
                            onChange={this.onInputChange} />
                    </div>

                    <div>
                        <label>Picture filename</label>
                        <input
                            className={
                                this.state.errors.picture_filename.hasError &&
                                this.state.errors.picture_filename.touched ? 'error': 'success'
                            }
                            name="picture_filename"
                            type="text"
                            value={this.state.formData.picture_filename}
                            onBlur={this.handleBlur}
                            onChange={this.onInputChange} />
                    </div>

                    <div>
                        <label>Ordering</label>
                        <input
                            className={
                                this.state.errors.ordering.hasError &&
                                this.state.errors.ordering.touched ? 'error': 'success'
                            }
                            name="ordering"
                            type="number"
                            value={this.state.formData.ordering}
                            onBlur={this.handleBlur}
                            onChange={this.onInputChange} />
                    </div>

                    <div>
                        <Button disabled={this.state.formHasErrors} type="submit">{ this.props.type === 'add' ? 'Add' : 'Edit'}</Button>
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
