import React from 'react';
import {Form} from 'semantic-ui-react';
import '../styles/inreg-al.css';
import InregReus from './inreg-reus';

class StergPt extends React.Component {
    state = {
        oficii_items: [],
        pt_items: [],
        of_status: undefined,
        pt_status: undefined,
        success_status: undefined,
        inreg_status: undefined,
        of_select: undefined,
        pt_select: undefined,
    }

    componentDidMount() {
        fetch('http://localhost:5000/oficii', {
            method: 'GET',
        })
        .then(res => res.json())
        .then(result => this.setState({oficii_items: result}))
        .catch(error => console.log(error));
    }

    OfChoose = (evt, {value}) => {
        fetch(`http://localhost:5000/pt/${value.abr}/`, {
            method: 'GET',
        })
        .then(res => res.json())
        .then(result => this.setState({pt_items: result}))
        .catch(error => console.log(error))

        if (value !== "") {
            this.setState({of_status: true})
        } else {
            this.setState({of_status: undefined})
        }

        this.setState({of_select: value.abr})
    }

    PtSelect = (evt, {value}) => {
        if (value !== "") {
            this.setState({pt_status: true})
        } else {
            this.setState({pt_status: undefined})
        }

        this.setState({pt_select: value.pt})
    }

    HandleInreg = () => {
        if (this.state.of_status &&
            this.state.pt_status) {
                fetch(`http://localhost:5000/sterg-pt/${this.state.of_select}/${this.state.pt_select}/`, {
                    method: 'GET',
                })
                .then(res => res.text())             
                .then(result => this.setState({success_status: result}))
                .catch(error => console.log(error))

                this.setState({inreg_status: true})

            } else {
                alert ("Nu ati introdus unul din cimpurile obligatorii!!")
            }
    }

    HandleReus = () => {
        document.location.href = `/lista-pt/${this.state.of_select}`
    }

    HandleGreen = () => {
        document.location.reload()
    }

    render(){
        const myOficii = this.state.oficii_items.map((item) =>
            (
                {
                    text: item.name, value: item
                }
            )
        );

        const myPt = this.state.pt_items.map((item) => 
            (
                {
                    text: item.pt, value: item
                }
            )
        );
        
        if (this.state.success_status && this.state.inreg_status) {
            return (
                <InregReus
                    title="STERGERE REUSITA PT"
                    func={this.HandleReus}
                    reg="Lista PT"
                    greenFunc={this.HandleGreen}
                    green="Stergeti din nou!"
                />
            )
        } else {
            return(
                <React.Fragment>
                    <img className="up-space"/>
                    <img src="images/ataman_enter.png" alt="Loc pentru logo" className="logo-inreg"/>
                    <h1 className="bir_disp">STERGERI PT</h1>
                    <Form className="form-inreg">
                        <Form.Group widths='equal'>
                            <Form.Field required>
                                {this.state.of_status
                                ? []
                                : <label className="obligatoriu">Obligatoriu</label>
                                }
                                <Form.Select
                                    fluid
                                    options={myOficii}
                                    placeholder="Oficiul"
                                    search
                                    clearable
                                    onChange={this.OfChoose}
                                    label="Oficiul"
                                />
                            </Form.Field>
                            <Form.Field required>
                                {this.state.pt_status
                                ? []
                                : <label className="obligatoriu">Obligatoriu</label>
                                }
                                <Form.Select
                                    fluid
                                    options={myPt}
                                    placeholder="Denumire PT"
                                    search
                                    clearable
                                    onChange={this.PtSelect}
                                    label="PT, denumirea de dispecerat"
                                />
                            </Form.Field>
                        </Form.Group>
                            <Form.Field>
                                <button className="login" onClick={this.HandleInreg}>Stergeti</button>
                            </Form.Field>
                    </Form>
                </React.Fragment>
            )
        }
    }
}
export default StergPt