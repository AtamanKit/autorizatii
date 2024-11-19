import React from 'react';
import {Form, Checkbox, Loader} from 'semantic-ui-react';
import '../styles/inreg-al.css';
import InregReus from './inreg-reus';
// import {CookiesFunc} from './cookie-funk';

// const myCookies = CookiesFunc()
class AdaugAngaj extends React.Component {
    state = {
        oficii_items: [],
        sect_items: [],
        pos_items: [],
        of_select: undefined,
        sect_select: undefined,
        tabel_select: undefined,
        name_select: undefined,
        pos_select: undefined,
        ts_select: undefined,
        tel_pers_select: undefined,
        tel_serv_select: undefined,
        semn_select: undefined,
        em_select: false,
        cond_select: false,
        adm_select: false,
        sef_select: false,
        sup_select: false,
        mem_select: false,
        inreg_status: false,
        success_status: undefined,
        link_semn: undefined,
        link_up: undefined,
        // adaug_status: undefined,
        of_status: undefined,
        sect_status: undefined,
        tabel_status: undefined,
        name_status: undefined,
        pos_status: undefined,
        ts_status: undefined,
    }

    componentDidMount() {
        fetch('http://localhost:5000/oficii/', {
            method: 'GET',
        })
        .then(res => res.json())
        .then(result => this.setState({oficii_items: result}))
        .catch(error => console.log(error));

        fetch('http://localhost:5000/position/', {
            method: 'GET',
        })
        .then(res => res.json())
        .then(result => this.setState({pos_items: result}))
        .catch(error => console.log(error));
    }

    OfChoose = (evt, {value}) => {
        fetch(`http://localhost:5000/sectoare/${value.abr}`, {
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

    SectSelect = (evt, {value}) => {
        if (value !== "") {
            this.setState({sect_status: true})
        } else {
            this.setState({sect_status: undefined})
        }

        this.setState({sect_select: value})
    }

    TabelSelect = (evt, {value}) => {
        const re = /^[0-9\b]+$/;

        if (value !== "" && re.test(value)) {
            this.setState({tabel_status: true})
        } else {
            this.setState({tabel_status: undefined})
        }
        if (value === "" || re.test(value)) {
            this.setState({tabel_select: value})
        } else {
            this.setState({tabel_select: ""})
        }
    }

    NameSelect = (evt, {value}) => {
        if (value !== "") {
            this.setState({name_status: true})
        } else {
            this.setState({name_status: undefined})
        }

        this.setState({name_select: value})
    }

    PosSelect = (evt, {value}) => {
        if (value !== "") {
            this.setState({pos_status: true})
        } else {
            this.setState({pos_status: undefined})
        }

        this.setState({pos_select: value})
    }

    TsSelect = (evt, {value}) => {
        if (value !== "") {
            this.setState({ts_status: true})
        } else {
            this.setState({ts_status: undefined})
        }

        this.setState({ts_select: value})
    }

    TelPers = (evt, {value}) => {
        this.setState({tel_pers_select: value})
    }

    TelServ = (evt, {value}) => {
        this.setState({tel_serv_select: value})
    }

    EmSelect = (evt, {checked}) => {
        this.setState({em_select: checked})
    }

    CondSelect = (evt, {checked}) => {
        this.setState({cond_select: checked})
    }

    AdmSelect = (evt, {checked}) => {
        this.setState({adm_select: checked})
    }

    SefSelect = (evt, {checked}) => {
        this.setState({sef_select: checked})
    }

    SupSelect = (evt, {checked}) => {
        this.setState({sup_select: checked})
    }

    MemSelect = (evt, {checked}) => {
        this.setState({mem_select: checked})
    }

    LinkSemn = evt => {
        this.setState({link_up: true});
        const data = new FormData();
        data.append('file', evt.target.files[0]);

        fetch(`http://localhost:5000/upload-semn/`, {
        method: 'POST',
        body: data
        })
        .then(res => res.text())
        .then(result => this.setState({link_semn: result}))
        .catch(error => console.log(error));
    }

    HandleReus = () => {
        document.location.href = `/lista-angaj/${this.state.of_select}`
    }

    HandleGreen = () => {
        document.location.reload()
    }

    HandleInreg = () => {
        if (this.state.link_semn !== undefined && 
            this.state.link_semn !== "non-approved") {
            var slash = this.state.link_semn;
            var comma = slash.replace(/[/]|\\/g, ",")
        }
        if (this.state.link_semn !== "non-approved") {
            if (this.state.of_status &&
                this.state.sect_status &&
                this.state.tabel_status &&
                this.state.name_status &&
                this.state.pos_status &&
                this.state.ts_status) {
                    fetch(`http://localhost:5000/adaug-angaj/${this.state.of_select}/` +
                `${this.state.sect_select}/${this.state.tabel_select}/` + 
                `${this.state.name_select}/${this.state.pos_select}/` +
                `${this.state.ts_select}/${this.state.tel_pers_select}/` +
                `${this.state.tel_serv_select}/${this.state.em_select}/` +
                `${this.state.cond_select}/${this.state.adm_select}/` +
                `${this.state.sef_select}/${this.state.sup_select}/` +
                `${this.state.mem_select}/${comma}/`, {
                    method:'GET',
                })
                .then(res => res.text())
                .then(result => this.setState({success_status: result}))
                .catch(error => console.log(error))

                this.setState({inreg_status: true})
            } else {
                alert("Nu ati introdus unul din cimpurile obligatorii!!")
            }
        } else {
            alert("Semnatura trebuie sa fie format PNG! Mai incercati!")
        }
    }

    render() {
        const myOficii = this.state.oficii_items.map((item) =>
            (
                {text: item.name, value: item}
            )
        )

        const mySect = this.state.sect_items.map((item) => 
                ({text: item.name, value: item.name})
        )

        const myPos = this.state.pos_items.map((item) => 
                ({text: item.name, value: item.name})
        )

        var myTs = [];
        var i;
        for (i = 1; i < 6; i++) {
            myTs.push({text: i, value: i})
        }
        
        if (this.state.inreg_status === true) {
            return (
                <InregReus
                    title="ADAUGARE REUSITA ANGAJAT"
                    func={this.HandleReus}
                    reg="Lista angajati"
                    greenFunc={this.HandleGreen}
                    green="Adaugati din nou!"
                />
            )
        } else {
            return ( 
                <React.Fragment>
                    {
                        this.state.link_up && this.state.link_semn === undefined
                        ? <Loader size='big' active />
                        : []
                    }
                    <img className="up-space-ad-angaj"/>
                    <img src="images/ataman_enter.png" alt="Loc pentru logo" className="logo-inreg"/>
                    <h1 className="bir_disp">ADAUGATI ANGAJAT</h1>
                    <Form className="form-inreg">
                    {/* <Form.Field required>
                        <label className="obligatoriu">Toate cimpurile sint obligatorii</label>
                    </Form.Field> */}
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
                            {
                                this.state.sect_status
                                ? []
                                : <label className="obligatoriu">Obligatoriu</label>
                            }
                            <Form.Select
                                options={mySect}
                                fluid
                                search
                                clearable
                                placeholder='Alegeti'
                                onChange={this.SectSelect}
                                label='Sectorul'
                            />
                        </Form.Field>
                    </Form.Group>
                    <Form.Group widths='equal'>
                    <Form.Field required>
                            {
                                this.state.tabel_status
                                ? []
                                : <label className="obligatoriu">Obligatoriu</label>
                            }
                            <Form.Input
                                fluid
                                value = {this.state.tabel_select}
                                placeholder='Introduceti (patru cifre)'
                                onChange={this.TabelSelect}
                                label='Nr. tabel'
                                // id="nr_tabel"
                            />
                        </Form.Field>
                        <Form.Field required>
                            {
                                this.state.name_status
                                ? []
                                : <label className="obligatoriu">Obligatoriu</label>
                            }
                            <Form.Input
                                fluid
                                // options={orSat}
                                placeholder='Introduceti (Nume P.)'
                                search
                                clearable
                                onChange={this.OrSatSelect}
                                onChange={this.NameSelect}
                                label='Angajat'
                            />
                        </Form.Field>
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Field required>
                            {
                                this.state.pos_status
                                ? []
                                : <label className="obligatoriu">Obligatoriu</label>
                            }
                            <Form.Select
                                options={myPos}
                                search
                                fluid
                                clearable
                                placeholder='Alegeti'
                                onChange={this.PosSelect}
                                label='Functia'
                            />
                        </Form.Field>
                        <Form.Field required>
                            {
                                this.state.ts_status
                                ? []
                                : <label className="obligatoriu">Obligatoriu</label>
                            }
                            <Form.Select
                                fluid
                                options={myTs}
                                placeholder='Alegeti'
                                search
                                clearable
                                // multiple
                                onChange={this.TsSelect}
                                label='Grupa TS'
                            />
                        </Form.Field>
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Field>
                            {this.state.tel_pers_status === "non-approved"
                            ? <p className="no-pass">Introduceti numar intreg!</p>
                            : ""
                            }
                            <Form.Input
                                fluid
                                // options={myCons}
                                placeholder='Introduceti'
                                search
                                clearable
                                onChange={this.TelPers}
                                label='Telefon pers.'
                                id='tel-pers'
                            />
                        </Form.Field>
                        <Form.Field>
                            {this.state.consNon_status === "non-approved"
                            ? <p className="no-pass">Cimpul Consumatori non-casnici nu poate fi gol!</p>
                            : ""
                            }
                            <Form.Input
                                fluid
                                // options={myCons}
                                placeholder='Introduceti'
                                search
                                clearable
                                // multiple
                                onChange={this.TelServ}
                                label='Telefon serv.'
                            />
                        </Form.Field>
                    </Form.Group>
                    <Form.Group inline widths="equal">
                        <Form.Field>
                            <Checkbox
                                onChange={this.EmSelect}
                                label='Emitent'
                            />
                            </Form.Field>
                            <Form.Field>
                            <Checkbox
                                onChange={this.CondSelect}
                                label='Conducator de lucrari'
                            />
                        </Form.Field>
                    </Form.Group>
                    <Form.Group inline widths="equal">
                        <Form.Field>
                            <Checkbox
                                onChange={this.AdmSelect}
                                label='Admitent'
                            />
                            </Form.Field>
                            <Form.Field>
                            <Checkbox
                                onChange={this.SefSelect}
                                label='Sef de lucrari'
                            />
                        </Form.Field>
                    </Form.Group>
                    <Form.Group inline widths="equal">
                        <Form.Field>
                            <Checkbox
                                onChange={this.SupSelect}
                                label='Supraveghetor'
                            />
                            </Form.Field>
                            <Form.Field>
                            <Checkbox
                                onChange={this.MemSelect}
                                label='Membru echipei'
                            />
                        </Form.Field>
                    </Form.Group>
                        {/* {
                            !myCookies[4]
                            ? <p className="no-pass">Nu este introdusa destinatia SEMANTURII! Semnatura nu poate fi incarcata!</p>
                            : ""
                        } */}
                        {
                            this.state.link_semn === "non-approved"
                            ? <p className="no-pass">Semnatura trebuie sa fie format PNG!</p>
                            : ""
                        }
                        <Form.Input
                            type="file"
                            placeholder="Apasati"
                            fluid
                            label="Link semnatura"
                            onChange={this.LinkSemn}
                            />
                        <Form.Field>
                            <button className="login" onClick={this.HandleInreg}>Inregistrati</button>
                        </Form.Field>
                    </Form>
                </React.Fragment>
        
            )
        }
    }
}
export default AdaugAngaj