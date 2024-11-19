import React from 'react';
import {Form, Loader} from 'semantic-ui-react';
// import {CookiesFunc} from './cookie-funk';
import '../styles/inreg-al.css';
import InregReus from './inreg-reus';
import {CookiesFunc} from './cookie-funk';
// import { DateInput, TimeInput } from 'semantic-ui-calendar-react';
// import ErrorLoad from './errors';
import {NowDate} from './now-date';

const myCookies = CookiesFunc();

class InregSig extends React.Component {
    state = {
        oficii_items: [],
        cauza_sig_items: [],
        angaj_items: [],
        of_select: undefined,
        of_status: undefined,
        pt_status: undefined,
        cauza_sig_status: undefined,
        cauza_sig_select: undefined,
        cont_select: undefined,
        nume_select: undefined,
        adresa_select: undefined,
        angaj_select: undefined,
        success_status: undefined,
        inreg_status: undefined,
    }

    componentDidMount() {
        fetch('http://localhost:5000/oficii/', {
            method: 'GET',
        })
        .then(res => res.json())
        .then(result => this.setState({oficii_items: result}))
        .catch(error => console.log(error));

        fetch('http://localhost:5000/cauza-sig/', {
            method: 'GET',
        })
        .then(res => res.json())
        .then(result => this.setState({cauza_sig_items: result}))
        .catch(error => console.log(error));

        this.setState({inreg_status: false})
    }

    OfChoose = (evt, { value }) => {
        fetch(`http://localhost:5000/angajati/${value.abr}/`, {
            method: 'GET',
        })
        .then(res => res.json())
        .then(result => this.setState({ angaj_items: result }))
        .catch(error => console.log(error))

        if (value !== ""){
            this.setState({of_status: true})
        } else {
            this.setState({of_status: undefined})
        }

        this.setState({of_select: value.abr})
    }

    // PtSelect = (evt, data) => {
    //     if (data.value !== "") {
    //         this.setState({pt_status: true})
    //     } else {
    //         this.setState({pt_status: undefined})
    //     }
        
    //     this.setState({pt_select: data.value.pt})
    // }

    // FidSelect = (evt, data) => {     
    //     if (data.value !== "") {
    //         this.setState({fid_status: true})
    //     } else {
    //         this.setState({fid_status: undefined})
    //     }
        
    //     this.setState({fid_select: data.value})
    // }

    CauzaSigSelect = (evt, {value}) => {
        if (value.length !== 0) {
            this.setState({cauza_sig_status: true})
        } else {
            this.setState({cauza_sig_status: undefined})
        }

        var cauza_list = [];
        var i;
        for (i = 0; i < value.length; i++) {
            cauza_list += value[i] + ","
        }

        this.setState({cauza_sig_select: cauza_list})
    }

    ContSelect = (evt, {value}) => {
        this.setState({cont_select: value})
    }

    NumeSelect = (evt, {value}) => {
        this.setState({nume_select: value})
    }

    AdresaSelect = (evt, {value}) => {
        this.setState({adresa_select: value})
    }

    AngajSelect = (evt, {value}) => {
        this.setState({angaj_select: value.name})
    }

    HandleReus = () => {
        document.location.href = `/lista-sig/${this.state.of_select}`
    }

    HandleGreen = () => {
        document.location.reload()
    }

    HandleInreg = () => {
        const myToday = NowDate();

        if (this.state.of_status &&
            this.state.cauza_sig_status) {
                fetch(`http://localhost:5000/inreg-sig/${this.state.of_select}/${this.state.cauza_sig_select}/${this.state.cont_select}/${this.state.nume_select}/${this.state.adresa_select}/${myCookies[1]}/${this.state.angaj_select}/`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        now_date: myToday[0],
                    })
                })
                .then(res => res.text())
                .then(result => this.setState({success_status: result}))
                .catch(error => console.log(error));

                this.setState({inreg_status: true})
            } else {
                alert ("Nu ati introdus unul din cimpurile obligatorii!!")
            }
    }

    render() {
        const myOficii = []
        for (i = 1; i < this.state.oficii_items.length; i++) {
            myOficii.push(
                {text: this.state.oficii_items[i].name, value: this.state.oficii_items[i]}
            )
        }

        // const myPt = this.state.pt_items.map((item) =>
        //     (
        //         {text: item.pt, value: item,}
        //     )
        // )

        // const myFid = [];
        // for (i = 1; i < 151; i++) {
        //     myFid.push(
        //             {
        //                 text: i, value: i,
        //             }
        //         )
        // }

        const myAngaj = this.state.angaj_items.map((item) =>
            (
                {text: item.name, value: item}
            )
        )

        var i;
        const myCauza = [];
        if (this.state.cauza_sig_items[0] !== undefined) {
            for (i = 0; i < this.state.cauza_sig_items[0].lista.length; i++) {
                myCauza.push({
                    text: this.state.cauza_sig_items[0].lista[i],
                    value: this.state.cauza_sig_items[0].lista[i],
                })
            }
        }
        // console.log(this.state.success_status)
        // if (this.state.success_status === "non_excel") {
        //     return (
        //         <ErrorLoad
        //             ErrorWarning="EROARE:"
        //             TypeOf={"Nu s-au inscris datele in SAIDI excel!\nPosibil undeva este deschisa aplicatia excel!"}
        //             erFunc={this.HandleReus}
        //             erBtn="Deconectari nepr."
        //         />
        //     )
        // } else if (this.state.dec_noserv && this.state.success_status === undefined) {
        //     return (
        //         <ErrorLoad
        //             ErrorWarning="EROARE:"
        //             TypeOf={"Nu este pornit serverul local!\nPorniti serverul local, incercati inca o data\nsa inregistrati deconectarea!"}
        //             erFunc={this.HandleGreen}
        //             erBtn="Incercati din nou!"
        //         />
        //     )
        if (this.state.inreg_status && this.state.success_status === "approved") {
            return (
                <InregReus
                    title="INREGISTRARE REUSITA DEMONT./SIGILIU"
                    func={this.HandleReus} 
                    reg="Sigilii demontate"
                    greenFunc={this.HandleGreen}
                    green="Inregistrati din nou!"
                />
            )
        } 
        return (
            <React.Fragment>
                {this.state.inreg_status && this.state.success_status === undefined
                    ? <Loader size='big' active/>
                    :[]
                }
                <img className="up-space"/>
                <img src="/images/ataman_enter.png" alt="Loc pentru logo" className="logo-inreg"/>
                <h1 className="bir_disp">INREGISTRATI DEMONTARE SIGILIU</h1>
                <Form className="form-inreg">
                    {/* <Form.Field required>
                            <label className="obligatoriu">Toate cimpurile sint obligatorii</label>    
                        </Form.Field>   */}
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
                                {this.state.cauza_sig_status
                                    ? []
                                    : <label className="obligatoriu">Obligatoriu</label>
                                }
                                <Form.Select
                                    fluid
                                    options={myCauza}
                                    placeholder='Alegeti'
                                    search
                                    clearable
                                    multiple
                                    onChange={this.CauzaSigSelect}
                                    label='Cauza demontarii'
                                />
                            </Form.Field>
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Field>
                            {/* {this.state.pt_status
                                ? []
                                : <label className="obligatoriu">Obligatoriu</label>
                            } */}
                            <Form.Input
                                fluid
                                // options={myPt}
                                placeholder='Introduceti'
                                // search
                                // clearable
                                // multiple
                                onChange={this.ContSelect}
                                label='Contul'
                            />
                        </Form.Field>
                        <Form.Field>
                            {/* {this.state.fid_status
                                ? []
                                : <label className="obligatoriu">Obligatoriu</label>
                            } */}
                            <Form.Input
                                fluid
                                // options={myFid}
                                placeholder='Introduceti'
                                // search
                                // clearable
                                // multiple
                                onChange={this.NumeSelect}
                                label='Nume, prenume'
                            />
                        </Form.Field>
                    </Form.Group>
                    {/* <Form.Field>
                        {this.state.success_status === "non_positive"
                            ? <p className="no-pass">Timpul de conectare nu poate fi mai mic ca
                            timpul deconectarii!</p>
                            : "" 
                        }
                    </Form.Field> */}
                    <Form.Group widths="equal">
                        <Form.Field>
                            {/* {this.state.date_status
                                ? []
                                : <label className="obligatoriu">Obligatoriu</label>
                            } */}
                            <Form.Input
                               fluid
                               placeholder='Introduceti'
                               onChange={this.AdresaSelect}
                               label='Adresa'
                            />
                        </Form.Field>
                        <Form.Field>
                            {/* {this.state.time_status
                                ? []
                                : <label className="obligatoriu">Obligatoriu</label>
                            } */}
                            <Form.Select
                                fluid
                                options={myAngaj}
                                placeholder='Alegeti'
                                search
                                clearable
                                onChange={this.AngajSelect}
                                label='Executorul'
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
export default InregSig
