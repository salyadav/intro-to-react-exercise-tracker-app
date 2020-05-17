import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {
    constructor(props) {
        super(props); //ALWAYS

        //binding function scope
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: ''
        }
    }

    onChangeUsername(e) {
        this.setState({ //this should refer to the class scope not the parent scope where this function is being called from
            //thats why we bind this to the function in the constructor
            username: e.target.value //textbox element is the target
        });
    }

    onSubmit(e) {
        e.preventDefault(); //prevent default html form submission

        const user = {
            username: this.state.username
        }

        console.log(user);
        
        //submit this exercise to backend
        axios.post('http://localhost:5000/users/add', user)
            .then(res => console.log(res.data));

        //after submit, empty the form
        this.setState({
            username: ''
        });
    }

    render() {
        return(
            <div>
                <h3>Create New User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Username: </label>
                        <input  type="text"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                            />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        );
    }
}