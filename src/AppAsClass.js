import React, { Component } from 'react';
import './App.css';
import Person from './components/Person/Person'


class App extends Component {
    state = {
        persons: [
            { name: 'Vlad', age: '36' },
            { name: 'Peter', age: '5' },
            { name: 'Danila', age: '2' }
        ]
    }

    switchNameHandler = (newName) => {
        console.log('Was called')
        // DON'T DO THIS this.state.persons[0].name = 'Ksenya';
        this.setState({ persons: [
                { name: newName, age: '36' },
                { name: 'Peter', age: '5' },
                { name: 'Danila', age: '2' }
            ] })
    }

    nameChangedHandler = (event) => {
        this.setState({ persons: [
                { name: 'Vlad', age: '36' },
                { name: event.target.value, age: '5' },
                { name: 'Danila', age: '2' }
            ] })
    }

    render() {
        const buttonStyle = {
            backgroundColor: 'white',
            font: 'inherit',
            border: '1px solid blue',
            padding: '8px',
            cursor: 'pointer',
            margin: '5px'
        };

        return (

            <div className="App">
                <h1>Hi, I'm a React App</h1>

                <button style={buttonStyle}
                    onClick={ this.switchNameHandler.bind(this, 'TEST_NAME_AS_BIND') }>Switch Name via BIND</button>

                <button style={buttonStyle}
                    onClick={(event) => this.switchNameHandler('TEST_NAME_AS_ARROW_FUNCTION')}>Switch Name via Arrow Function</button>

                <Person name={ this.state.persons[0].name }
                        age={ this.state.persons[0].age }/>

                <Person name={ this.state.persons[1].name }
                        age={ this.state.persons[1].age }
                        click={ this.switchNameHandler.bind(this, 'TEST_NAME_AS_BIND') }
                        changed={this.nameChangedHandler}
                >My Hobbies: Racing</Person>

                <Person name={ this.state.persons[2].name }
                        age={ this.state.persons[2].age }/>
            </div>

        );
    }
}


export default App;
