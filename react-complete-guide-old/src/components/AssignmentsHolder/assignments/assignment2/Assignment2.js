import React, { Component } from 'react';
import './Assignment2.css'
import ValidationComponent from './components/ValidationComponent/ValidationComponent'
import CharComponent from "./components/CharComponent/CharComponent";


class Assignment2 extends Component {

    state = {
        text: ''
    }

    inputChangeListener = (event) => {
        this.setState({ text: event.target.value });
    }

    removeCharFromString = (charIndex) => {
        const newText = [...this.state.text];
        newText.splice(charIndex, 1);
        this.setState({ text: newText.join('') });
    }

    render() {

        let charComponents = null;

        if (this.state.text.length !== 0) {
            charComponents = (
                <div>
                    {
                        [...this.state.text].map((char, index) => {
                            return <CharComponent char={char}
                                                  key={index}
                                                  click={ () => this.removeCharFromString(index) }/>
                        })
                    }

                </div>
            )
        }

        return (

            <div className="Assignment2">
                <h3>Assignment 2</h3>

                <ol>
                    <li>Create an input field (in App component) with a change listener which outputs the length of the entered text below it (e.g. in a paragraph).</li>
                    <li>Create a new component (=> ValidationComponent) which receives the text length as a prop</li>
                    <li>Inside the ValidationComponent, either output "Text too short" or "Text long enough" depending on the text length (e.g. take 5 as a minimum length)</li>
                    <li>Create another component (=> CharComponent) and style it as an inline box (=> display: inline-block, padding: 16px, text-align: center, margin: 16px, border: 1px solid black).</li>
                    <li>Render a list of CharComponents where each CharComponent receives a different letter of the entered text (in the initial input field) as a prop.</li>
                    <li>When you click a CharComponent, it should be removed from the entered text.</li>
                </ol>
                <p>Hint: Keep in mind that JavaScript strings are basically arrays!</p>

                <h4>Solution</h4>

                <input type="text"
                       onChange={this.inputChangeListener} value={this.state.text.toString()}/>
                <span> TEXT LENGTH IS: { this.state.text.length }</span>
                <ValidationComponent textLength={ this.state.text.length }/>

                { charComponents }

            </div>

        );
    }
}


export default Assignment2;
