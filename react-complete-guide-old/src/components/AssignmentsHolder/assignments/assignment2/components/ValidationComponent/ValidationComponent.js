const ValidationComponent = (props) => {

    let validationOutput = (<p>OK !!! </p>);

    if (props.textLength < 5) {
        validationOutput = (
            <p>Text too short</p>
        );
    } else if (props.textLength > 5) {
        validationOutput = (
            <p>Text too long</p>
        );
    }

    return (
         validationOutput
    );
};

export default ValidationComponent;