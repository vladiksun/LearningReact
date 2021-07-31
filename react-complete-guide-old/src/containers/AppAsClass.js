import React, {Component} from 'react';

import styles from './App.module.css';

import Cockpit from "../components/Cockpit/Cockpit";
import Persons from "../components/Persons/Persons";
import AssignmentsHolder from "../components/AssignmentsHolder/AssignmentsHolder";


class App extends Component {

    constructor(props) {
        super(props);
        console.log('[AppAsClass.js] constructor');
    }

    state = {
        persons: [
            {id: '1', name: 'Vlad', age: '36'},
            {id: '2', name: 'Peter', age: '5'},
            {id: '3', name: 'Danila', age: '2'}
        ],
        showPersons: false,
        showAssignments: false
    }

    static getDerivedStateFromProps(props, state) {
        console.log('[AppAsClass.js] getDerivedStateFromProps', props);
        return state;
    }

    componentDidMount() {
        console.log('[AppAsClass.js] componentDidMount');
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log('[AppAsClass.js] shouldComponentUpdate');
        return true;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('[AppAsClass.js] componentDidUpdate');
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
        console.log('[AppAsClass.js] render')

        let persons = null;
        if (this.state.showPersons) {
            persons = <Persons
                        persons={this.state.persons}
                        clicked={this.deletePersonHandler}
                        changed={this.setUserInputAsNameValueChangedHandler}/>;
        }

        let assignments = null;
        if (this.state.showAssignments) {
            assignments = (
                <AssignmentsHolder/>
            );
        }

        return (
            <div className={styles.App}>
                <Cockpit
                    title={this.props.appTitle}
                    showPersons={this.state.showPersons}
                    persons={this.state.persons}
                    showAssignments={this.state.showAssignments}
                    onSwitchNameHandler={this.switchNameHandler}
                    onTogglePersonsHandler={this.togglePersonsHandler}
                    onToggleAssignments={this.toggleAssignments}
                />

                {persons}

                <hr/>
                {assignments}

            </div>

        );
    }
}


export default App;
