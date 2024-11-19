import React from 'react';
import { Form, Loader, TextArea } from 'semantic-ui-react';
import '../styles/inreg-al.css';
import { CookiesFunc } from './cookie-funk';
import InregReus from './inreg-reus';

var myCookies = CookiesFunc();

class InregDeranj extends React.Component {
    state = {
        oficii_items: [],
        angaj_items: [],
        sect_items: [],
        inst_items: [],
        pt_items: [],
        of_state: undefined,
        sect_status: undefined,
        inst_state: undefined,
        cont_state: undefined,
        success_state: undefined,
        inreg_state: undefined,
        of_select: undefined,
        angaj_select: undefined,
        sect_select: undefined,
        inst_select: undefined,
        fid10_select: undefined,
        pr_select: undefined,
        fid04_select: undefined,
        cont_select: undefined,
    }

    componentDidMount() {
        fetch('http://localhost:5000/oficii/', {
            method: 'GET',
        })
        .then(res => res.json())
        .then(result => this.setState({oficii_items: result}))
        .catch(error => console.log(error));

        fetch('http://localhost:5000/instalatia/', {
            method: 'GET',
        })
        .then(res => res.json())
        .then(result => this.setState({inst_items: result}))
        .catch(error => console.log(error))
    }

    OfChoose = (evt, { value }) => {
        fetch(`http://localhost:5000/angajati/${value.abr}/`, {
            method: 'GET',
        })
        .then(res => res.json())
        .then(result => this.setState({ angaj_items: result }))
        .catch(error => console.log(error))

        fetch(`http://localhost:5000/sectoare/${value.abr}/`, {
            method: 'GET',
        })
        .then(res => res.json())
        .then(result => this.setState({sect_items: result}))
        .catch(error => console.log(error));

        fetch(`http://localhost:5000/pt/${value.abr}/`, {
            method: 'GET',
        })
        .then(res => res.json())
        .then(result => this.setState({pt_items: result}))
        .catch(error => console.log(error));

        if (value !== ""){
            this.setState({of_state: true})
        } else {
            this.setState({of_state: undefined})
        }

        this.setState({of_select: value.abr})
    }

    AngajSelect = (evt, {value}) => {
        this.setState({angaj_select: value.name})
    }

    SectSelect = (evt, {value}) => {
        if (value !== "") {
            this.setState({sect_status: true})
        } else {
            this.setState({sect_status: undefined})
        }

        this.setState({sect_select: value.name})
    }
    
    InstSelect = (evt, {value}) => {
        if (value !== "") {
            this.setState({inst_state: true})
        } else {
            this.setState({inst_state: undefined})
        }

        this.setState({inst_select: value})
    }

    Fid10Select = (evt, {value}) => {
        this.setState({fid10_select: value})
    }

    PtSelect = (evt, {value}) => {
        this.setState({pt_select: value.pt})
    }

    Fid04Select = (evt, {value}) => {
        this.setState({fid04_select: value})
    }

    ContSelect = (evt, {value}) => {
        if (value !== ""){
            this.setState({cont_state: true})
        } else {
            this.setState({cont_state: undefined})
        }

        this.setState({cont_select: value})
    }

    HandleReus = () => {
        document.location.href = `/deranj-context/${this.state.of_select}`
    }

    HandleGreen = () => {
        document.location.reload()
    }

    HandleInreg = () => {
        if (this.state.of_state 
            && this.state.sect_status 
            && this.state.inst_state 
            && this.state.cont_state) {
            fetch(`http://localhost:5000/inreg-deranj/${this.state.of_select}/${this.state.angaj_select}/${this.state.sect_select}/${this.state.inst_select}/${this.state.fid10_select}/${this.state.pt_select}/${this.state.fid04_select}/${this.state.cont_select}/`, {
            })
            .then(res => res.text())
            .then(result => this.setState({success_state: result}))
            .catch(error => console.log(error));
            
            this.setState({inreg_state: true})
        } else {
            alert("Nu ati introdus unul din cimpurile obligatorii!!")
        }       
    }

    render() {
        // console.log(this.state.sect_items)
        // console.log(this.state.inst_items[0].lista)
        // const myOficii = this.state.oficii_items.map((item) => 
        //     (
        //         {text: item.name, value: item}
        //     )
        // )
        const myOficii = []
        for (i = 1; i < this.state.oficii_items.length; i++) {
            myOficii.push(
                {text: this.state.oficii_items[i].name, value: this.state.oficii_items[i]}
            )
        }
        const myAngaj = this.state.angaj_items.map((item) =>
                (
                    {text: item.name, value: item}
                )
        )
        const mySect = this.state.sect_items.map((item) => 
                (
                    {text: item.name, value: item}
                )
        )
        var i;
        const myInst = [];
        if (this.state.inst_items[0] !== undefined) {
            for (i = 0; i < this.state.inst_items[0].lista.length; i++) {
                myInst.push({
                        text: this.state.inst_items[0].lista[i],
                        value: this.state.inst_items[0].lista[i],
                    })
            }
        }
        const myPt = this.state.pt_items.map((item) =>
            (
                {text: item.pt, value: item}
            )
        )
        const myFid = [];
        for (i = 1; i < 151; i++) {
            myFid.push({
                text: i, value: i
            })
        }
        if (this.state.inreg_state && this.state.success_state) {
            return (
                <InregReus
                    title="INREGISTRARE REUSITA DERANJAMENT"
                    func={this.HandleReus}
                    reg="Registru deranjamente"
                    greenFunc={this.HandleGreen}
                    green="Inregistrati din nou!"
                />
            )
        }
        return(
            <React.Fragment>
                <img className="up-space"/>
                <img src="images/ataman_enter.png" alt="Loc pentru logo" className="logo-inreg"/>
                <h1 className="bir_disp">INREGISTRATI DERANJAMENT</h1>
                <Form className="form-inreg">
                    <Form.Group widths='equal'>
                        <Form.Field required>
                            {this.state.of_state
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
                        {/* <Form.Field required>
                            <label className="obligatoriu">Obligatoriu</label> */}
                            <Form.Select
                                fluid
                                options={myAngaj}
                                placeholder='Alegeti'
                                search
                                clearable
                                onChange={this.AngajSelect}
                                label='Transmis'
                            />
                        {/* </Form.Field> */}
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
                                onChange={this.SectSelect}
                                label='Sectorul'
                            />
                        </Form.Field>
                        <Form.Field required>
                            {this.state.inst_state
                            ? []
                            : <label className="obligatoriu">Obligatoriu</label>
                            }
                            <Form.Select
                                fluid
                                options={myInst}
                                placeholder='Alegeti'
                                search
                                clearable
                                onChange={this.InstSelect}
                                label='Instalatia'
                            />
                        </Form.Field>
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Input
                            onChange={this.Fid10Select}
                            label='Fider 10kV'
                            placeholder='Introduceti (Ex: 10PR)'
                        />
                        <Form.Select
                            fluid
                            options={myPt}
                            placeholder='Alegeti'
                            search
                            clearable
                            onChange={this.PtSelect}
                            label='PT'
                        />
                        <Form.Select
                            fluid
                            options={myFid}
                            placeholder='Alegeti'
                            search
                            clearable
                            onChange={this.Fid04Select}
                            label='Fider 0,4kV'
                        />
                    </Form.Group> 
                        <Form.Field required>
                            {
                                this.state.cont_state
                                ? []
                                : <label className="obligatoriu">Obligatoriu</label>
                            }
                            <Form.TextArea
                                fluid
                                placeholder='Introduceti'
                                onChange={this.ContSelect}
                                label='Continutul'
                            />
                        </Form.Field>
                    <Form.Field>
                        <button className="login" onClick={this.HandleInreg}>Inregistrati</button>
                    </Form.Field>    
                </Form>
            </React.Fragment>
        )
    }
}
export default InregDeranj
