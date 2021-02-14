import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person'


class App extends Component {
    state = {
        persons: [
            { name: 'Vlad', age: '36' },
            { name: 'Peter', age: '5' },
            { name: 'Danila', age: '2' }
        ]
    }

    switchNameHandler = () => {
        console.log('Was called')
        // DON'T DO THIS this.state.persons[0].name = 'Ksenya';
        this.setState({ persons: [
                { name: 'Ksenya', age: '36' },
                { name: 'Peter', age: '5' },
                { name: 'Danila', age: '2' }
            ] })
    }

    render() {
        return (

            <div className="App">
                <h1>Hi, I'm a React App</h1>

                <button onClick={ this.switchNameHandler }>Switch Name</button>

                <Person name={ this.state.persons[0].name } age={ this.state.persons[0].age }/>
                <Person name={ this.state.persons[1].name } age={ this.state.persons[1].age }>My Hobbies: Racing</Person>
                <Person name={ this.state.persons[2].name } age={ this.state.persons[2].age }/>
            </div>

        );
    }
}


export default App;
