import React, { Component }from 'react';
import Requester from './helpers/Requester';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const AddCategoryWrapper = styled.div`
    > form > div {
        padding: 10px;
        margin: 20px
    }

    > form > div > label {
        margin-right: 40px;
    }
`


class AddCategory extends Component {
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
        pendingAddingCategory: this.props.pendingAddingCategory,
    };


    onInputChange = (event) => {
        const target = event.target;
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
    }

    onSubmit = (event) => {
        event.preventDefault();
        const newCategoryData = this.state;

        this.props.addCategory(newCategoryData);
    }

    render() {
        return (
            <AddCategoryWrapper>
                <form onSubmit={this.onSubmit}>
                    <div>
                        <label>Parent ID</label>
                        <input name="parent_id" type="number" value={this.state.parent_id} onChange={this.onInputChange} />
                    </div>

                    <div>
                        <label>Is visible</label>
                        <input name="is_visible" type="checkbox" value={this.state.is_visible} onChange={this.onInputChange} />
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
                        <input type="submit" value="Add" />
                        <button>Close</button>
                    </div>
                </form>
        </AddCategoryWrapper>
        );
    };
}

AddCategory.propTypes = {
    parentId: PropTypes.number.isRequired,
    addCategory: PropTypes.func.isRequired,
};

export default AddCategory;
