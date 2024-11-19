import React from 'react';
import '../styles/inreg-al.css';
import {Form} from 'semantic-ui-react';

class ErrorBoundary extends React.Component {
    state = {
        hasError: false,
    }

    componentDidCatch(error, info) {
        console.log("test")
        this.setState({hasError: true});
    }

    render() {
        if (this.state.hasError) {
            console.log("test")
            return (
                <h1>Something went wrong!</h1>
            )
        }
        return this.props.children;
    }
}

export default ErrorBoundary;