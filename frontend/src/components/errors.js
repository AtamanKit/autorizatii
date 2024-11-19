import React from 'react';
import '../styles/inreg-al.css';
import {Form} from 'semantic-ui-react';

class ErrorLoad extends React.Component {
    render(){
        return (
            <React.Fragment>
                <img className="up-space"/>
                <img src="/images/ataman_enter.png" 
                    alt="Loc pentru logo" 
                    style={{ display: "block", 
                            marginLeft: "auto", 
                            marginRight: "auto"  
                        }}
                />
                <h1 style={{ color: "rgb(255, 255, 255)",
                            textAlign: "center",
                        }}
                    >
                    {this.props.ErrorWarning}
                </h1>
                <p style={{ color: "rgb(255, 255, 255)",
                            textAlign: "center",
                            whiteSpace: 'pre-wrap',
                        }}
                    >
                    {this.props.TypeOf}
                </p>
                <Form className="form-inreg">
                        <Form.Field>
                            <button className="login" onClick={this.props.erFunc}>
                                {this.props.erBtn}
                            </button>
                        </Form.Field>
                </Form>
            </React.Fragment>
        )
    }
}
export default ErrorLoad