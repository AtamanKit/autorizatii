import React from 'react';
import {Form, Checkbox} from 'semantic-ui-react';
import '../styles/inreg-al.css';


class CorectReus extends React.Component {
    HandleReload = () => {
        document.location.reload()
    }
    render() {
        return ( 
            <React.Fragment>
                <img className="up-space-reus"/>
                <img src="/images/ataman_enter.png" alt="Loc pentru logo" className="logo-inreg"/>
                <h1 className="bir_disp">CORECTARE REUSITA</h1>
                <Form className="form-inreg">
                    <Form.Group widths="equal">
                        <Form.Field>
                            <button className="login" onClick={this.props.func}>{this.props.reg}</button>
                        </Form.Field>
                        {/* <Form.Field>
                            <button className="login-vezi" onClick={this.HandleReload}>Mai inregistrati!</button>
                        </Form.Field> */}
                    </Form.Group>
                </Form>
            </React.Fragment>
        )
    }
}
export default CorectReus