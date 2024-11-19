import React from 'react';
import {Form, Loader} from 'semantic-ui-react';
// import {CookiesFunc} from './cookie-funk';
import '../styles/inreg-al.css';
import InregReus from './inreg-reus';
import { DateInput, TimeInput } from 'semantic-ui-calendar-react';
import ErrorLoad from './errors';
import {NowDate} from './now-date';

class InregDec extends React.Component {
    state = {
        _date: "",
        time: "",
        oficii_items: [],
        cauza_dec_items: [],
        pt_items: [],
        fid_select: [],
        of_select: undefined,
        pt_select: undefined,
        fid_select: undefined,
        cauza_dec_select: undefined,
        of_status: undefined,
        pt_status: undefined,
        fid_status: undefined,
        cauza_dec_status: undefined,
        date_status: undefined,
        time_status: undefined,
        success_status: undefined,
        inreg_status: undefined,
        dec_noserv: undefined,
    }

    componentDidMount() {
        fetch('http://localhost:5000/oficii/', {
            method: 'GET',
        })
        .then(res => res.json())
        .then(result => this.setState({oficii_items: result}))
        .catch(error => console.log(error));

        fetch('http://localhost:5000/cauza-dec/', {
            method: 'GET',
        })
        .then(res => res.json())
        .then(result => this.setState({cauza_dec_items: result}))
        .catch(error => console.log(error));

        this.setState({inreg_status: false})
    }

    OfChoose = (evt, data) => {
        fetch(`http://localhost:5000/pt/${data.value.abr}/`, {
            method: 'GET',
        })
        .then(res => res.json())
        .then(result => this.setState({pt_items: result}))
        .catch(error => console.log(error));

        if (data.value !== "") {
            this.setState({of_status: true})
        } else {
            this.setState({of_status: undefined})
        }

        this.setState({of_select: data.value.abr})
    }

    PtSelect = (evt, data) => {
        if (data.value !== "") {
            this.setState({pt_status: true})
        } else {
            this.setState({pt_status: undefined})
        }
        
        this.setState({pt_select: data.value.pt})
    }

    FidSelect = (evt, data) => {     
        if (data.value !== "") {
            this.setState({fid_status: true})
        } else {
            this.setState({fid_status: undefined})
        }
        
        this.setState({fid_select: data.value})
    }

    CauzaDecSelect = (evt, data) => {
        // console.log(data.value.length);
        if (data.value !== "") {
            this.setState({cauza_dec_status: true})
        } else {
            this.setState({cauza_dec_status: undefined})
        }

        var lucr_list = [];
        var i;
        for (i = 0; i < data.value.length; i++) {
            lucr_list += data.value[i] + ","
        }

        this.setState({cauza_dec_select: lucr_list})
    }

    HandleReus = () => {
        document.location.href = `/nepr-lunar/${this.state.of_select}`
    }

    HandleGreen = () => {
        document.location.reload()
    }

    // handleChange = (event, {name, value}) => {
    //     if (this.state.hasOwnProperty(name)) {
    //       this.setState({ [name]: value });
    //     }
    //   }
    HandleDate = (evt, {name, value}) => {
        if (value !== "") {
            this.setState({date_status: true})
        } else {
            this.setState({date_status: undefined})
        }

        if (this.state.hasOwnProperty(name)) {
            this.setState({[name]: value})
        }
    }

    HandleTime = (evt, {name, value}) => {
        if (value !== "") {
            this.setState({time_status: true})
        } else {
            this.setState({time_status: undefined})
        }

        if (this.state.hasOwnProperty(name)) {
            this.setState({[name]: value})
        }
    }

    HandleInreg = () => {
        const myToday = NowDate();

        if (this.state.of_status &&
            this.state.cauza_dec_status &&
            this.state.pt_status &&
            this.state.fid_status &&
            this.state.date_status &&
            this.state.time_status) {
                fetch(`http://localhost:5000/inreg-dec/${this.state.of_select}/${this.state.cauza_dec_select}/${this.state.pt_select}/${this.state.fid_select}/${this.state._date}/${this.state.time}/`, {
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
        // console.log(this.state.cauza_dec_status)
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

        const myPt = this.state.pt_items.map((item) =>
            (
                {text: item.pt, value: item,}
            )
        )

        const myFid = [];
        for (i = 1; i < 151; i++) {
            myFid.push(
                    {
                        text: i, value: i,
                    }
                )
        }

        var i;
        const myCauza = [];
        if (this.state.cauza_dec_items[0] !== undefined) {
            for (i = 0; i < this.state.cauza_dec_items[0].lista.sort().length; i++) {
                myCauza.push({
                    text: this.state.cauza_dec_items[0].lista[i],
                    value: this.state.cauza_dec_items[0].lista[i],
                })
            }
        }
        // console.log(this.state.success_status)
        if (this.state.success_status === "non_excel") {
            return (
                <ErrorLoad
                    ErrorWarning="EROARE:"
                    TypeOf={"Nu s-au inscris datele in SAIDI excel!\nPosibil undeva este deschisa aplicatia excel!"}
                    erFunc={this.HandleReus}
                    erBtn="Deconectari nepr."
                />
            )
        } else if (this.state.dec_noserv && this.state.success_status === undefined) {
            return (
                <ErrorLoad
                    ErrorWarning="EROARE:"
                    TypeOf={"Nu este pornit serverul local!\nPorniti serverul local, incercati inca o data\nsa inregistrati deconectarea!"}
                    erFunc={this.HandleGreen}
                    erBtn="Incercati din nou!"
                />
            )
        } else if (this.state.inreg_status && this.state.success_status === "approved") {
            return (
                <InregReus
                    title="INREGISTRARE REUSITA DECONECTARE"
                    func={this.HandleReus} 
                    reg="Deconectari nepr."
                    greenFunc={this.HandleGreen}
                    green="Inregistrati din nou!"
                />
            )
        } else {
        return ( 
            <React.Fragment>
                {this.state.inreg_status && this.state.success_status === undefined
                    ? <Loader size='big' active/>
                    :[]
                }
                <img className="up-space"/>
                <img src="images/ataman_enter.png" alt="Loc pentru logo" className="logo-inreg"/>
                <h1 className="bir_disp">INREGISTRATI DECONECTARE NEPLANIFICATA</h1>
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
                                {this.state.cauza_dec_status
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
                                    onChange={this.CauzaDecSelect}
                                    label='Cauza deconectare'
                                />
                            </Form.Field>
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Field required>
                            {this.state.pt_status
                                ? []
                                : <label className="obligatoriu">Obligatoriu</label>
                            }
                            <Form.Select
                                fluid
                                options={myPt}
                                placeholder='Alegeti'
                                search
                                clearable
                                // multiple
                                onChange={this.PtSelect}
                                label='PT, denumirea de dispecerat'
                            />
                        </Form.Field>
                        <Form.Field required>
                            {this.state.fid_status
                                ? []
                                : <label className="obligatoriu">Obligatoriu</label>
                            }
                            <Form.Select
                                fluid
                                options={myFid}
                                placeholder='Alegeti'
                                search
                                clearable
                                // multiple
                                onChange={this.FidSelect}
                                label='Fider nr.'
                            />
                        </Form.Field>
                    </Form.Group>
                    <Form.Field>
                        {this.state.success_status === "non_positive"
                            ? <p className="no-pass">Timpul de conectare nu poate fi mai mic ca
                            timpul deconectarii!</p>
                            : "" 
                        }
                    </Form.Field>
                    <Form.Group widths="equal">
                        <Form.Field required>
                            {this.state.date_status
                                ? []
                                : <label className="obligatoriu">Obligatoriu</label>
                            }
                            <DateInput
                                name="_date"
                                placeholder="Alegeti"
                                label="Data deconectarii"
                                value={this.state._date}
                                iconPosition="left"
                                onChange={this.HandleDate}
                                dateFormat="DD.MM.YY"
                                closable
                                clearable
                            />
                        </Form.Field>
                        <Form.Field required>
                            {this.state.time_status
                                ? []
                                : <label className="obligatoriu">Obligatoriu</label>
                            }
                            <TimeInput
                                name="time"
                                placeholder="Alegeti"
                                label="Timpul deconectarii"
                                value={this.state.time}
                                iconPosition="left"
                                onChange={this.HandleTime}
                                closable
                                clearable
                            />
                        </Form.Field>
                    </Form.Group>
                    <Form.Field>
                        <button className="login" onClick={this.HandleInreg}>Inregistrati</button>
                    </Form.Field>
                </Form>
            </React.Fragment>
        )}
    }
}
export default InregDec