import React from 'react';
import {Form} from 'semantic-ui-react';
import '../styles/inreg-al.css';
import InregReus from './inreg-reus';

class StergAngaj extends React.Component {
    state = {
        oficii_items: [],
        angaj_items: [],
        tabel_items: [],
        of_status: undefined,
        angaj_status: undefined,
        tabel_status: undefined,
        success_status: undefined,
        inreg_status: undefined,
        of_select: undefined,
        angaj_select: undefined,
        tabel_select: undefined,
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
        fetch(`http://localhost:5000/angajati/${value.abr}/`, {
            method: 'GET',
        })
        .then(res => res.json())
        .then(result => this.setState({angaj_items: result}))
        .catch(error => console.log(error))

        if (value !== "") {
            this.setState({of_status: true})
        } else {
            this.setState({of_status: undefined})
        }

        this.setState({of_select: value.abr})
    }

    AngajSelect = (evt, {value}) => {
        fetch(`http://localhost:5000/nr-tabel/${this.state.of_select}/${value.name}/`, {
            method: 'GET',
        })
        .then(res => res.json())
        .then(result => this.setState({tabel_items: result}))
        .catch(error => console.log(error))

        this.setState({angaj_select: value.name})

        if (value !== "") {
            this.setState({angaj_status: true})
        } else {
            this.setState({angaj_status: undefined})
        }
    }

    TabelSelect = (evt, {value}) => {
        if (value !== "") {
            this.setState({tabel_status: true})
        } else {
            this.setState({tabel_status: undefined})
        }

        this.setState({tabel_select: value})
    }

    HandleInreg = () => {
        if (this.state.of_status &&
            this.state.angaj_status &&
            this.state.tabel_status) {
                fetch(`http://localhost:5000/sterg-angaj/${this.state.of_select}/${this.state.angaj_select}/${this.state.tabel_select}/`, {
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
        document.location.href = `/lista-angaj/${this.state.of_select}`
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

        const myAngaj = this.state.angaj_items.map((item) => 
            (
                {
                    text: item.name, value: item
                }
            )
        );
        
        var i;
        const myTabel = [];
        if (this.state.tabel_items.length !== 0) {
            for (i = 0; i < this.state.tabel_items.length; i++) {
                myTabel.push(
                    {
                        text: this.state.tabel_items[i].nr_tabel, 
                        value: this.state.tabel_items[i].nr_tabel
                    }
                )
                // console.log(i)
            }
        }
        // if (this.state.tabel_items.length !== 0) {
        // console.log(myTabel)
        // }
        if (this.state.success_status && this.state.inreg_status) {
            return (
                <InregReus
                    title="STERGERE REUSITA ANGAJAT"
                    func={this.HandleReus}
                    reg="Lista angajati"
                    greenFunc={this.HandleGreen}
                    green="Stergeti din nou!"
                />
            )
        } else {
            return(
                <React.Fragment>
                    <img className="up-space"/>
                    <img src="images/ataman_enter.png" alt="Loc pentru logo" className="logo-inreg"/>
                    <h1 className="bir_disp">STERGERI ANGAJAT</h1>
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
                                {this.state.angaj_status
                                ? []
                                : <label className="obligatoriu">Obligatoriu</label>
                                }
                                <Form.Select
                                    fluid
                                    options={myAngaj}
                                    placeholder="Nume P."
                                    search
                                    clearable
                                    onChange={this.AngajSelect}
                                    label="Angajat"
                                />
                            </Form.Field>
                            <Form.Field required>
                                {this.state.tabel_status
                                    ? []
                                    : <label className="obligatoriu">Obligatoriu</label>
                                }
                                <Form.Select
                                    fluid
                                    // defaultValue="Value"
                                    options={myTabel}
                                    placeholder="Nr. tabel"
                                    search
                                    clearable
                                    onChange={this.TabelSelect}
                                    label="Nr. tabel"
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
export default StergAngaj