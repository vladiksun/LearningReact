import React, { Component } from 'react';
import './App.css';
import Radium from "radium";
import Person from './components/Person/Person'
import AssignmentsHolder from "./components/AssignmentsHolder/AssignmentsHolder";


class App extends Component {
    state = {
        persons: [
            { id: '1', name: 'Vlad', age: '36' },
            { id: '2', name: 'Peter', age: '5' },
            { id: '3', name: 'Danila', age: '2' }
        ],
        showPersons: false,
        showAssignments: false
    }

    // The Arrow notation encapsulates the class's "THIS" in runtime
    switchNameHandler = (newName) => {
        // DON'T DO THIS this.state.persons[0].name = 'Ksenya';
        this.setState({ persons: [
                { name: newName, age: '!!!!' },
                { name: newName, age: '!!!!' },
                { name: newName, age: '!!!!' }
            ] })
    }

    // The Arrow notation encapsulates the class's "THIS" in runtime
    nameChangedHandler = (event, id) => {
        const personIndex = this.state.persons.findIndex(person => {
            return person.id === id;
        })

        // Copy object ES6 way
        const person = {
            ...this.state.persons[personIndex]
        };

        // Copy object traditional way
        // const person - Object.assign({}, this.state.persons[personIndex])

        person.name = event.target.value;

        const persons = [...this.state.persons];
        persons[personIndex] = person;

        this.setState({
            persons: persons
        })
    }

    togglePersonsHandler = (event) => {
        const doesShow = this.state.showPersons;
        this.setState({ showPersons: !doesShow })
    }

    toggleAssignments = () => {
        const doesShow = this.state.showAssignments;
        this.setState({ showAssignments: !doesShow })
    }

    deletePersonHandler = (personIndex) => {
        // Copy an array 1
        //const persons = this.state.persons.slice();

        // Copy an array ES6 way
        const persons = [...this.state.persons]

        persons.splice(personIndex, 1);
        this.setState({ persons: persons })
    }

    render() {
        const buttonStyle = {
            backgroundColor: 'green',
            color: 'white',
            font: 'inherit',
            border: '1px solid blue',
            padding: '8px',
            cursor: 'pointer',
            margin: '5px',
            ':hover': {
                backgroundColor: 'lightgreen',
                color: 'black'
            }
        };

        let persons = null;

        if (this.state.showPersons) {
            persons = (
                <div>
                    { this.state.persons.map((person, index) => {
                        return <Person
                            key={ person.id }
                            name={ person.name }
                            age={ person.age }
                            click={ () => this.deletePersonHandler(index) }
                            changed={(event) => this.nameChangedHandler(event, person.id)}/>
                    })}

                    <Person name="I am robot"
                            age="22222"
                    >Hardcoded robot</Person>
                </div>
            );

            buttonStyle.backgroundColor = 'red';
            buttonStyle[':hover'] = {
                backgroundColor: 'lightred',
                color: 'black'
            }
        }

        let classes = [];
        if (this.state.showPersons) {
            classes.push('red', 'bold')
        } else {
            classes = [];
        }

        let assignments = null;
        if (this.state.showAssignments) {
            assignments = (
                <AssignmentsHolder/>
            );
        }

        return (
            <div className="App">
                <h1 className={classes.join(' ')}>Hi, I'm a React App</h1>

                <button style={buttonStyle} key="button1"
                    onClick={ this.switchNameHandler.bind(this, 'TEST_NAME_AS_BIND') }>Switch Name via BIND</button>

                <button style={buttonStyle} key="button2"
                    onClick={(event) => this.switchNameHandler('TEST_NAME_AS_ARROW_FUNCTION')}>Switch Name via Arrow Function</button>

                <button style={buttonStyle} key="button3"
                        onClick={this.togglePersonsHandler}>Toggle Persons</button>

                <button style={buttonStyle} key="button4"
                        onClick={this.toggleAssignments}>Show Assignments</button>

                { persons }


                <hr/>
                { assignments }

            </div>
        );
    }
}


export default Radium(App);
