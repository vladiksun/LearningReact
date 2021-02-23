import React, { useState } from 'react';
import './App.css';
import Person from '../Person/Person'


const App = (props) => {

    const [ personsState, setPersonsState ] = useState({
        persons: [
            {name: 'Vlad', age: '36'},
            {name: 'Peter', age: '5'},
            {name: 'Danila', age: '2'}
        ]
    });

    const [otherState, setOtherState] = useState('some other value')

    console.log(personsState, otherState);

    const switchNameHandler = () => {
        // console.log('Was called')
        // DON'T DO THIS this.state.persons[0].name = 'Ksenya';
        setPersonsState({ persons: [
                { name: 'Ksenya', age: '36' },
                { name: 'Peter', age: '5' },
                { name: 'Danila', age: '2' }
            ]
        })
    }

    return (

        <div className="App">
            <h1>Hi, I'm a React App</h1>

            <button onClick={switchNameHandler}>Switch Name</button>

            <Person name={personsState.persons[0].name}
                    age={personsState.persons[0].age}/>

            <Person name={personsState.persons[1].name}
                    age={personsState.persons[1].age}
                    click={switchNameHandler} >My Hobbies: Racing</Person>

            <Person name={personsState.persons[2].name}
                    age={personsState.persons[2].age}/>
        </div>

    );
}


export default App;
