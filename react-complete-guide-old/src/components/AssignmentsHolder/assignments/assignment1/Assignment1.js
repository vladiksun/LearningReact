import React, { Component } from 'react';
import './Assignment1.css'
import UserInput from "./components/UserInput/UserInput";
import UserOutput from "./components/UserOutput/UserOutput";

class Assignment1 extends Component {

    state = {
        username: 'Super Vlad'
    }

    // The Arrow notation encapsulates the class's "THIS" in runtime
    userNameChangeHandler = (event) => {
        this.setState({ username: event.target.value });
    }

    render() {
        return (

            <div className="Assignment1">
                <h3>Assignment 1</h3>

                <ol>
                    <li>Create TWO new components: UserInput and UserOutput</li>
                    <li>UserInput should hold an input element, UserOutput two paragraphs</li>
                    <li>Output multiple UserOutput components in the App component (any paragraph texts of your choice)</li>
                    <li>Pass a username (of your choice) to UserOutput via props and display it there</li>
                    <li>Add state to the App component (=> the username) and pass the username to the UserOutput component</li>
                    <li>Add a method to manipulate the state (=> an event-handler method)</li>
                    <li>Pass the event-handler method reference to the UserInput component and bind it to the input-change event</li>
                    <li>Ensure that the new input entered by the user overwrites the old username passed to UserOutput</li>
                    <li>Add two-way-binding to your input (in UserInput) to also display the starting username</li>
                    <li>Add styling of your choice to your components/ elements in the components - both with inline styles and stylesheets</li>
                </ol>

                <h4>Solution</h4>

                <UserInput changedHandler={this.userNameChangeHandler}
                           currentName={this.state.username} />

                <UserOutput userName={this.state.username} />
                <UserOutput userName={this.state.username} />
                <UserOutput userName="Name hardcoded"/>

            </div>

        );
    }
}


export default Assignment1;