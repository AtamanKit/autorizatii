import React from 'react';
import {Form, Checkbox} from 'semantic-ui-react';
import '../styles/inreg-al.css';


class InregReus extends React.Component {
    render() {
        return ( 
            <React.Fragment>
                <img className="up-space-reus"/>
                <img src="images/ataman_enter.png" alt="Loc pentru logo" className="logo-inreg"/>
                <h1 className="bir_disp">{this.props.title}</h1>
                <Form className="form-inreg">
                    <Form.Group widths="equal">
                        <Form.Field>
                            <button className="login" onClick={this.props.func}>{this.props.reg}</button>
                        </Form.Field>
                        <Form.Field>
                            <button className="login-vezi" onClick={this.props.greenFunc}>{this.props.green}</button>
                        </Form.Field>
                    </Form.Group>
                </Form>
            </React.Fragment>
        )
    }
}
export default InregReus