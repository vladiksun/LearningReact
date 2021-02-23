import React, {Component} from 'react';
import styled from 'styled-components';
import styles from './App.module.css';

import Person from './components/Person/Person'
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import AssignmentsHolder from "./components/AssignmentsHolder/AssignmentsHolder";


const StyledButton = styled.button`
  background-color: ${props => props.alt ? 'red' : 'green'};
  color: white;
  font: inherit;
  border: 1px solid blue;
  padding: 8px;
  cursor: pointer;
  margin: 5px;

  :hover {
    background-color: ${props => props.alt ? 'yellow' : 'lightgreen'} ;
    color: black
  }
`;


class App extends Component {
    state = {
        persons: [
            {id: '1', name: 'Vlad', age: '36'},
            {id: '2', name: 'Peter', age: '5'},
            {id: '3', name: 'Danila', age: '2'}
        ],
        showPersons: false,
        showAssignments: false
    }

    // The Arrow notation encapsulates the class's "THIS" in runtime
    switchNameHandler = (newName) => {
        // DON'T DO THIS this.state.persons[0].name = 'Ksenya';
        this.setState({
            persons: [
                {name: newName, age: '!!!!'},
                {name: newName, age: '!!!!'},
                {name: newName, age: '!!!!'}
            ]
        })
    }

    // The Arrow notation encapsulates the class's "THIS" in runtime
    setUserInputAsNameValueChangedHandler = (event, id) => {
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
        this.setState({showPersons: !doesShow})
    }

    toggleAssignments = () => {
        const doesShow = this.state.showAssignments;
        this.setState({showAssignments: !doesShow})
    }

    deletePersonHandler = (personIndex) => {
        // Copy an array 1
        //const persons = this.state.persons.slice();

        // Copy an array ES6 way
        const persons = [...this.state.persons]

        persons.splice(personIndex, 1);
        this.setState({persons: persons})
    }

    render() {
        let persons = null;
        let buttonClasses = [styles.ModuleDefault];

        if (this.state.showPersons) {
            persons = (
                <div>
                    {this.state.persons.map((person, index) => {
                        return <ErrorBoundary key={person.id}>
                                <Person
                                    name={person.name}
                                    age={person.age}
                                    click={() => this.deletePersonHandler(index)}
                                    changed={(event) => this.setUserInputAsNameValueChangedHandler(event, person.id)}/>
                               </ErrorBoundary>
                    })}
                </div>
            );
        }

        let assignedClasses = [];
        if (this.state.showPersons) {
            assignedClasses.push(styles.red, styles.bold)
        } else {
            assignedClasses = [];
        }

        let assignments = null;
        if (this.state.showAssignments) {
            assignments = (
                <AssignmentsHolder/>
            );
            buttonClasses.push(styles.Yellow);
        }

        return (
            <div className={styles.App}>
                <h1 className={assignedClasses.join(' ')}>Hi, I'm a React App</h1>

                <StyledButton key="button1"
                              title="CSS Via styled-components"
                              onClick={this.switchNameHandler.bind(this, 'TEST_NAME_AS_BIND')}>
                    Switch Name via BIND
                </StyledButton>

                <StyledButton key="button2"
                              title="CSS Via styled-components"
                              onClick={(event) => this.switchNameHandler('TEST_NAME_AS_ARROW_FUNCTION')}>
                    Switch Name via Arrow Function
                </StyledButton>

                <StyledButton alt={this.state.showPersons}
                              key="button3"
                              title="CSS Via styled-components"
                              onClick={this.togglePersonsHandler}>
                    Toggle Persons
                </StyledButton>

                <button className={buttonClasses.join(' ')} title="CSS Via CSS module"
                        key="button4"
                        onClick={this.toggleAssignments}>Show Assignments</button>

                {persons}


                <hr/>
                {assignments}

            </div>

        );
    }
}


export default App;
