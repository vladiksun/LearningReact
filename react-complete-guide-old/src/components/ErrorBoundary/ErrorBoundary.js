import React, {Component} from 'react';

class ErrorBoundary extends Component {

    // state = {
    //     hasError: false,
    //     errorMessage: ''
    // }

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            errorInfo: null
        }
    }

    componentDidCatch = (error, errorInfo) => {
        this.setState({
            error: error,
            errorInfo: errorInfo
        })

        // You can also log the error to an error reporting service
        console.log(error)
    }

    render() {
        if (this.state.errorInfo) {
            return (
                <div>
                    <h2>This is a 10% error chance. </h2>
                    <h2>We handle it via Error Boundary.</h2>

                    <details style={{ whiteSpace: 'pre-wrap' }}>
                        {this.state.error && this.state.error.toString()}
                        <br />
                        {this.state.errorInfo.componentStack}
                    </details>
                </div>
            );
        }

        // Normally, just render children
        return this.props.children;
    }
}

export default ErrorBoundary;