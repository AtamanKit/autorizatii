import React from 'react';
import {Form, Loader} from 'semantic-ui-react';
// import {CookiesFunc} from './cookie-funk';
import '../styles/inreg-al.css';
import InregReus from './inreg-reus';

class AdaugPt extends React.Component {
    state = {
        oficii_items: [],
        of_select: undefined,
        pt_select: undefined,
        orSat_select: undefined,
        localitatea_select: undefined,
        balanta_select: undefined,
        consCas_select: undefined,
        consNon_select: undefined,
        of_status: undefined,
        pt_status: undefined,
        orSat_status: undefined,
        localitatea_status: undefined,
        balanta_status: undefined,
        consCas_status: undefined,
        consNon_status: undefined,
        success_status: undefined,
        inreg_status: undefined,
        sect_items: [],
        sect_status: undefined,
    }

    componentDidMount() {
        fetch('http://localhost:5000/oficii/', {
            method: 'GET',
        })
        .then(res => res.json())
        .then(result => this.setState({oficii_items: result}))
        .catch(error => console.log(error));
    }

    OfChoose = (evt, {value}) => {
        fetch(`http://localhost:5000/sectoare/${value.abr}/`, {
            method: 'GET',
        })
        .then(res => res.json())
        .then(result => this.setState({sect_items: result}))
        .catch(error => console.log(error));

        if (value !== "") {
            this.setState({of_status: true})
        } else {
            this.setState({of_status: undefined})
        }

        this.setState({of_select: value.abr})
    }

    PtSelect = (evt, {value}) => {
        const re = /P\b|PT\b|PD\b|PT\d|PD\d/

        if (value !== "" && re.test(value)) {
            this.setState({pt_status: true})
        } else {
            this.setState({pt_status: undefined})
        }

        if (value === "" || re.test(value)) {
            this.setState({pt_select: value})
        } else {
            this.setState({pt_select: ""})
        }
    }

    OrSatSelect = (evt, {value}) => {
        if (value !== "") {
            this.setState({orSat_status: true})
        } else {
            this.setState({orSat_status: undefined})
        }

        this.setState({orSat_select: value})
    }

    LocalitateaSelect = (evt, {value}) => {
        if (value !== "") {
            this.setState({localitatea_status: true})
        } else {
            this.setState({localitatea_status: undefined})
        }

        this.setState({localitatea_select: value})
    }

    SectSelect = (evt, {value}) => {
        if (value !== "") {
            this.setState({sect_status: true})
        } else {
            this.setState({sect_status: undefined})
        }

        this.setState({sect_select: value.name})
    }

    BalantaSelect = (evt, {value}) => {
        if (value !== "") {
            this.setState({balanta_status: true})
        } else {
            this.setState({balanta_status: undefined})
        }

        this.setState({balanta_select: value})
    }

    ConsCasSelect = (evt, {value}) => {
        const re = /^[0-9\b]+$/;

        if (value !== "" && re.test(value)) {
            this.setState({consCas_status: true})
        } else {
            this.setState({consCas_status: undefined})
        }

        if (value === "" || re.test(value)) {
            this.setState({consCas_select: value})
            // console.log("yes")
        } else {
            this.setState({consCas_select: ""})
        }
    }

    ConsNonSelect = (evt, {value}) => {
        const re = /^[0-9\b]+$/;

        if (value !== "" && re.test(value)) {
            this.setState({consNon_status: true})
        } else {
            this.setState({consNon_status: undefined})
        }

        if (value === "" || re.test(value)) {
            this.setState({consNon_select: value})
        } else {
            this.setState({consNon_select: ""})
        }
    }

    HandleReus = () => {
        document.location.href = `/lista-pt/${this.state.of_select}`
    }

    HandleGreen = () => {
        document.location.reload()
    }

    HandleInreg = () => {
        if (this.state.of_status 
            && this.state.pt_status 
            && this.state.orSat_status 
            && this.state.localitatea_status 
            && this.state.sect_status 
            && this.state.balanta_status 
            && this.state.consCas_status 
            && this.state.consNon_status) {
                fetch(`http://localhost:5000/adaug-pt/${this.state.of_select}/${this.state.pt_select}/${this.state.orSat_select}/${this.state.localitatea_select}/${this.state.sect_select}/${this.state.balanta_select}/${this.state.consCas_select}/${this.state.consNon_select}/`, {
                    method: 'GET',
                })
                .then(res => res.text())
                .then(result => this.setState({success_status: result}))
                .catch(error => console.log(error))

                this.setState({inreg_status: true})
        } else {
            alert("Nu ati introdus unul din cimpurile obligatorii!!")
        }
    }

    render() {
        // const myOficii = this.state.oficii_items.map((item) =>
        //     (
        //         {text: item.name, value: item}
        //     )
        // )
        var i;
        const myOficii = [];
        for (i = 1; i < this.state.oficii_items.length; i++) {
            myOficii.push(
                {text: this.state.oficii_items[i].name, value: this.state.oficii_items[i]}
            )
        }

        const orSat = [
            {text: "or.", value: "or."},
            {text: "s.", value: "s."}
        ];

        const mySect = this.state.sect_items.map((item) =>
            (
                {text: item.name, value: item}
            )
        )

        // const myCons = [];
        // for (i = 0; i < 1500; i++) {
        //     myCons.push(
        //         {
        //             text: i, value: i,
        //         }
        //     )
        // }

        if (this.state.inreg_status && this.state.success_status === "success") {
            return (
                <InregReus
                    title="ADAUGARE REUSITA PT"
                    func={this.HandleReus}
                    reg="Lista PT"
                    greenFunc={this.HandleGreen}
                    green="Adaugati din nou!"
                />
            )
        } else {
            return ( 
                <React.Fragment>
                    {/* {this.state.inreg_status && !this.state.success_status === "success"
                        ? <Loader size='big' active/>
                        :[]
                    } */}
                    <img className="up-space"/>
                    <img src="/images/ataman_enter.png" alt="Loc pentru logo" className="logo-inreg"/>
                    <h1 className="bir_disp">ADAUGATI PT</h1>
                    <Form className="form-inreg">
                    {
                        this.state.success_status === "repeated"
                        ? <p className="no-pass">Nu s-a inregistrat PT, se repet datele!</p>
                        : []
                    }
                        <Form.Group widths='equal'>
                            <Form.Field required>
                                {this.state.of_status
                                    ? []
                                    : <label className="obligatoriu">Obligatoriu</label>
                                }
                                <Form.Select
                                    fluid
                                    options={myOficii}
                                    placeholder='Alegeti'
                                    search
                                    clearable
                                    onChange={this.OfChoose}
                                    label='Oficiul'
                                />
                            </Form.Field>
                            <Form.Field required>
                                {this.state.pt_status
                                    ? []
                                    : <label className="obligatoriu">Obligatoriu</label>
                                }   
                                <Form.Input
                                    placeholder='Introduceti (PT111FD11)'
                                    value = {this.state.pt_select}
                                    label='PT, denumirea de dispecerat'
                                    onChange={this.PtSelect}
                                />
                            </Form.Field>
                        </Form.Group>
                        <Form.Group widths='equal'>
                            <Form.Field required>
                                {this.state.orSat_status
                                    ? []
                                    : <label className="obligatoriu">Obligatoriu</label>
                                }
                                <Form.Select
                                    fluid
                                    options={orSat}
                                    placeholder='Alegeti'
                                    search
                                    clearable
                                    // multiple
                                    onChange={this.OrSatSelect}
                                    label='Oras/Sat'
                                />
                            </Form.Field>
                            <Form.Field required>
                                {this.state.localitatea_status
                                    ? []
                                    : <label className="obligatoriu">Obligatoriu</label>
                                }
                                <Form.Input
                                    placeholder='Introduceti (Balti)'
                                    onChange={this.LocalitateaSelect}
                                    label='Localitatea'
                                />
                            </Form.Field>
                        </Form.Group>
                        <Form.Group widths='equal'>
                            <Form.Field required>
                                {this.state.sect_status
                                    ? []
                                    : <label className="obligatoriu">Obligatoriu</label>
                                }
                                <Form.Select
                                    fluid
                                    options={mySect}
                                    placeholder='Alegeti'
                                    search
                                    clearable
                                    // multiple
                                    onChange={this.SectSelect}
                                    label='Sector'
                                />
                            </Form.Field>
                            <Form.Field required>
                                    {this.state.balanta_status
                                        ? []
                                        : <label className="obligatoriu">Obligatoriu</label>
                                    }
                                <Form.Input
                                    placeholder='Introduceti'
                                    onChange={this.BalantaSelect}
                                    label='Balanta'
                                />
                            </Form.Field>
                        </Form.Group>
                        <Form.Group widths='equal'>
                            <Form.Field required>
                                {this.state.consCas_status
                                    ? []
                                    : <label className="obligatoriu">Obligatoriu</label>
                                }
                                <Form.Input
                                    fluid
                                    value = {this.state.consCas_select}
                                    // options={myCons}
                                    placeholder='Introduceti (numar intreg)'
                                    search
                                    clearable
                                    onChange={this.ConsCasSelect}
                                    label='Consumatori casnici'
                                />
                            </Form.Field>
                            <Form.Field required>
                                {this.state.consNon_status
                                    ? []
                                    : <label className="obligatoriu">Obligatoriu</label>
                                }
                                <Form.Input
                                    fluid
                                    value = {this.state.consNon_select}
                                    // options={myCons}
                                    placeholder='Introduceti (numar intreg)'
                                    search
                                    clearable
                                    // multiple
                                    onChange={this.ConsNonSelect}
                                    label='Consumatori non-casnici'
                                />
                            </Form.Field>
                        </Form.Group>
                        <Form.Field>
                            <button className="login" onClick={this.HandleInreg}>Inregistrati</button>
                        </Form.Field>
                    </Form>
                </React.Fragment>
            )
        }
    }
}
export default AdaugPt