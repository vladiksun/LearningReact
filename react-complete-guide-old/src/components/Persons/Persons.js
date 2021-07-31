import React from 'react';
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import Person from "./Person/Person";


const Persons = (props) => props.persons.map((person, index) => {
    console.log('[Persons.js] rendering')

        return <ErrorBoundary key={person.id}>
                    <Person
                        name={person.name}
                        age={person.age}
                        click={() => props.clicked(index)}
                        changed={(event) => props.changed(event, person.id)}/>
                </ErrorBoundary>
    });

export default Persons;