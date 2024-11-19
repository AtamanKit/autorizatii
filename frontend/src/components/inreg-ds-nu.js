import React from 'react';
import {Form, Loader} from 'semantic-ui-react';
import {CookiesFunc} from './cookie-funk';
import {AbrOfFunc} from './abrOf-func';
import '../styles/inreg-al.css';
import InregReus from './inreg-reus';
import {NowDate} from './now-date';

const myCookies = CookiesFunc();
const myOf = AbrOfFunc(myCookies[2]);
const myToday = NowDate();

class InregDs extends React.Component {
    state = {
        oficii_items: [],
        // cu_dec_items: [],
        angaj_items: [],
        inst_items: [],
        pt_items: [],
        lucr_items: [],
        fid_select: [],
        ts_items: [],
        of_select: undefined,
        // cu_dec_select: undefined,
        sef_select: undefined,
        mem_select: undefined,
        em_select: undefined,
        inst_select: undefined,
        pt_select: undefined,
        fid_select: undefined,
        lucr_select: undefined,
        // sm_select: undefined,
        of_status: false,
        // cu_dec_status: false,
        sef_status: false,
        em_status: false,
        inst_status: false,
        pt_status: false,
        fid_status: false,
        lucr_status: false,
        // sm_status: false,
        link_al: undefined,
        local_link: undefined,
        success_status: false,
        inreg_status: false,
        dsAl_num: undefined,
        auto_select: false,
        ts_select: undefined,
        inst_ad: undefined,
        upload_status: undefined,
        gr_select: undefined,
    }

    componentDidMount() {
        if (myCookies[3] === "Dispecer") {
            fetch('http://localhost:5000/oficii/', {
                method: 'GET',
            })
            .then(res => res.json())
            .then(result => this.setState({oficii_items: result}))
            .catch(error => console.log(error));
        } else {
            fetch(`http://localhost:5000/angajati/${myCookies[2]}/`, {
            method: 'GET',
            })
            .then(res => res.json())
            .then(result => this.setState({angaj_items: result}))
            .catch(error => console.log(error));

            fetch(`http://localhost:5000/pt/${myCookies[2]}/`, {
                method: 'GET',
            })
            .then(res => res.json())
            .then(result => this.setState({pt_items: result}))
            .catch(error => console.log(error));

            this.setState({of_status: true})
            this.setState({of_select: myCookies[2]})
            this.setState({em_select: myCookies[1] + " gr. 5"})
        }

        fetch('http://localhost:5000/instalatia/', {
            method: 'GET',
        })
        .then(res => res.json())
        .then(result => this.setState({inst_items: result}))
        .catch(error => console.log(error));

        fetch('http://localhost:5000/lucrari/', {
            method: 'GET',
        })
        .then(res => res.json())
        .then(result => this.setState({lucr_items: result}))
        .catch(error => console.log(error));

        this.setState({inreg_status: false})

        // if (myCookies[2] !== "" && myCookies[2] !== undefined) {
        //     const { al_link_cookie } = this.state;
        //     this.setState({ al_link_cookie: true })
        // }

        // if (myCookies[3] !== "" && myCookies[3] !== undefined) {
        //     const { reg_al_cookie } = this.state;
        //     this.setState({ reg_al_cookie: true })
        // }

        if (myCookies[1] === "" || myCookies[1] === undefined) {
            alert("Nu sinteti logat");
            document.cookie = "status_cookie=non-approved";
            document.location.href = "/"

        }
    }

    OfChoose = (evt, data) => {
        fetch(`http://localhost:5000/angajati/${data.value.abr}/`, {
            method: 'GET',
        })
        .then(res => res.json())
        .then(result => this.setState({angaj_items: result}))
        .catch(error => console.log(error));

        fetch(`http://localhost:5000/pt/${data.value.abr}/`, {
            method: 'GET',
        })
        .then(res => res.json())
        .then(result => this.setState({pt_items: result}))
        .catch(error => console.log(error));

        if (data.value !== "") {
            this.setState({of_status: true})
        } else {
            this.setState({of_status: false})
        }

        this.setState({of_select: data.value.abr})
    }

    OfInput = evt => {
        document.getElementById("of_input").innerText = myCookies[2]
    }

    Cu_decSelect = (evt, data) => {
        if (data.value !== "") {
            this.setState({cu_dec_status: true})
        } else {
            this.setState({cu_dec_status: false})
        }

        this.setState({cu_dec_select: data.value})
    }

    SefSelect = (evt, data) => {
        if (data.value !== "") {
            this.setState({sef_status: true})
        } else {
            this.setState({sef_status: false})
        }

        this.setState({sef_select: data.value.name + " gr." + data.value.gr_ts})
    }

    MemSelect = (evt, data) => {
        var mem_list = "";
        var i;
        for (i = 0; i < data.value.length; i++) {
            mem_list += data.value[i].name + " gr." + data.value[i].gr_ts + ","
        }
        
        this.setState({mem_select: mem_list})
    }

    EmSelect = (evt, data) => {
        if (data.value !== ""){
            this.setState({em_status: true})
        } else {
            this.setState({em_status: false})
        }

        this.setState({em_select: data.value.name})
        this.setState({gr_select: data.value.gr_ts})
    }

    EmInput = evt => {
        document.getElementById("em_input").innerText = myCookies[1] + " gr. " + this.state.gr_select
    }

    InstSelect = (evt, data) => {
        if (data.value !== "") {
            this.setState({inst_status: true})
        } else {
            this.setState({inst_status: false})
        }
        
        this.setState({inst_select: data.value})
    }

    InstAd = (evt, {value}) => {
        this.setState({inst_ad: value})
    }

    PtSelect = (evt, data) => {
        if (data.value !== "") {
            this.setState({pt_status: true})
        } else {
            this.setState({pt_status: false})
        }

        var pt_list = "";
        var i;
        for (i = 0; i < data.value.length; i++) {
            pt_list += data.value[i].pt + ","
        }
        
        this.setState({pt_select: pt_list})
    }

    FidSelect = (evt, data) => {
        if (data.value !== "") {
            this.setState({fid_status: true})
        } else {
            this.setState({fid_status: false})
        }

        var fid_list = "";
        var i;
        for (i = 0; i < data.value.length; i++) {
            fid_list += data.value[i] + ","
        }
        
        this.setState({fid_select: fid_list})
    }

    LucrSelect = (evt, data) => {
        if (data.value !== "") {
            this.setState({lucr_status: true})
        } else {
            this.setState({lucr_status: false})
        }

        var lucr_list = [];
        var i;
        for (i = 0; i < data.value.length; i++) {
            lucr_list += data.value[i] + ","
        }

        this.setState({lucr_select: lucr_list})
    }

    SmSelect = (evt, data) => {
        if (data.value !== "") {
            this.setState({sm_status: true})
        } else {
            this.setState({sm_status: false})
        }

        var sm_list = [];
        var i;
        for (i = 0; i < data.value.length; i++){
            sm_list += data.value[i] + ","
        }

       this.setState({sm_select: data.value})
    }

    LinkAl = evt => {
        // if (myCookies[2] !== "" && myCookies[2] !== undefined) {
            this.setState({upload_status: true})
            const data = new FormData()
            data.append('file', evt.target.files[0]);

            fetch(`http://localhost:5000/upload-file/`, {
                method: 'POST',
                body: data
            })
            .then(res => res.text())
            .then(result => this.setState({local_link: result}))
            .catch(error => console.log(error));
        // }
    }

    HandleReus = () => {
        document.location.href = `/${this.state.of_select}`
    }

    HandleGreen = () => {
        document.location.reload()
    }

    ChAuto = (evt, data) => {
        fetch('http://localhost:5000/cerinte_ts', {
            method: 'GET',
        })
        .then(res => res.json())
        .then(result => this.setState({ts_items: result}))
        .catch(error => console.log(error));

        this.setState({auto_select: data.checked})
        // console.log(data.checked)
    }

    TsSelect = (evt, {value}) => {
        this.setState({ts_select: value})
    }

    HandleInreg = () => {
        if (myCookies[3] === "Dispecer") {
            var emSelect = this.state.em_select + " gr. " + this.state.gr_select;
            var starea = "Acceptat:\n" + myToday + "\n" + myCookies[1]
        } else {
            var emSelect = "Confirmat:\n" + myToday + "\n" + 
            document.getElementById("em_input").value;
            var starea = "Nou inregistrat"
        }
        // if (!this.state.auto_select) {
            if (this.state.local_link !== undefined) {
                var slash = this.state.local_link
                var comma = slash.replace(/[/]|\\/g, ",")
            }
        // } else {
        //     var comma = this.state.local_link
        // }

        if (this.state.of_select === undefined
            || this.state.lucr_select === undefined
            || this.state.lucr_select === ""
            || this.state.sef_select === undefined 
            || this.state.sef_select === "undefined gr.undefined"
            || this.state.em_select === undefined
            || this.state.em_select === "undefined gr.undefined"
            || this.state.inst_select === undefined
            || this.state.inst_select === "") {
                    alert("Nu ati introdus unul din cimpurile obligatorii!")
        } else {
            // this.setState({loader_status: true})
            this.setState({inreg_status: true})

            fetch(`http://localhost:5000/inreg-ds/${this.state.of_select}/${this.state.dsAl_num}/${this.state.lucr_select}/${this.state.sef_select}/${this.state.mem_select}/${this.state.inst_select}/${this.state.inst_ad}/${this.state.pt_select}/${this.state.fid_select}/${comma}/${this.state.auto_select}/${this.state.ts_select}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    emitent: emSelect,
                    starea: starea,
                })
            })
            .then(res => res.json())
            .then(result => this.setState({success_status: result}))
            .catch(error => console.log(error));
        } 
    }

    render() {
        const myOficii = this.state.oficii_items.map((item) =>
            (
                {text: item.name, value: item}
            )
        )

        const mySef = [], myEm = [], myMem = [];
        var i;
        for (i = 0; i < this.state.angaj_items.length; i++){
            if (this.state.angaj_items[i].sef === "DA") {
                mySef.push({
                            text: this.state.angaj_items[i].name + " gr. " +
                            this.state.angaj_items[i].gr_ts, 
                            value: this.state.angaj_items[i]
                        });
            }
            if (myCookies[3] === "Dispecer") {
                if (this.state.angaj_items[i].emitent === "DA") {
                    myEm.push({
                                text: this.state.angaj_items[i].name + " gr. " +
                                this.state.angaj_items[i].gr_ts,
                                value: this.state.angaj_items[i]
                            });
                }
            } else {
                if (this.state.angaj_items[i].name === myCookies[1]) {
                   var tsSelect = this.state.angaj_items[i].gr_ts
                }
            }
            myMem.push({
                text: this.state.angaj_items[i].name + " gr. " +
                this.state.angaj_items[i].gr_ts,
                value: this.state.angaj_items[i]
            });
        }

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

        const myLucr = [];
        if (this.state.lucr_items[0] !== undefined) {
            for (i = 0; i < this.state.lucr_items[0].lista.length; i++) {
                myLucr.push({
                    text: this.state.lucr_items[0].lista[i],
                    value: this.state.lucr_items[0].lista[i],
                })
            }
        }

        const myAuto = [];
        if (this.state.ts_items[0] !== undefined) {
            for (i=0; i < this.state.ts_items[0].lista.length; i++) {
                myAuto.push({
                    text: this.state.ts_items[0].lista[i],
                    value: this.state.ts_items[0].lista[i],
                })
            }
        }

        // const myCu_dec = [{text: "Fara deconectari", value: "Fara deconectari"}]

        if (this.state.inreg_status && this.state.success_status) {
            return (
                <InregReus
                    title="INREGISTRARE REUSITA DISPOZITIE"
                    func={this.HandleReus}
                    reg="Registru AL/DS"
                    greenFunc={this.HandleGreen}
                    green="Inregistrati din nou!"
                />
            )
        } else {
        return ( 
            <React.Fragment>
                {(this.state.inreg_status && !this.state.success_status) ||
                    (this.state.upload_status && this.state.local_link === undefined)
                ? <Loader size='big' active/>
                :[]
                }
                <img className="up-space"/>
                <img src="images/ataman_enter.png" alt="Loc pentru logo" className="logo-inreg"/>
                <h1 className="bir_disp">INREGISTRATI DISPOZITIE</h1>
                <Form className="form-inreg">
                    <Form.Group widths='equal'>
                    {
                        myCookies[3] === "Dispecer"
                        ?   <Form.Field required>
                                {this.state.of_status === true
                                ?   []
                                :   <label className="obligatoriu">Obligatoriu</label>   
                                }
                                <Form.Select
                                    fluid
                                    options={myOficii}
                                    placeholder='Oficiul'
                                    search
                                    clearable
                                    onChange={this.OfChoose}
                                    label='Oficiul'
                                />
                            </Form.Field>
                        :   <Form.Input
                                fluid
                                label='Oficiul'
                                // disabled
                                value={myOf}
                                onChange={this.OfInput}
                                id="of_input"
                                // placeholder={myCookies[1]}
                            />
                    }
                        <Form.Field required>
                            {this.state.lucr_status === true
                            ?   []
                            :   <label className="obligatoriu">Obligatoriu</label>   
                            }    
                            <Form.Select
                                fluid
                                options={myLucr}
                                placeholder='Lucrarile efectuate'
                                search
                                clearable
                                multiple
                                onChange={this.LucrSelect}
                                label='Lucrarile efectuate'
                            />
                        </Form.Field>
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Field required>
                            {this.state.sef_status === true
                            ?   []
                            :   <label className="obligatoriu">Obligatoriu</label>   
                            }    
                            <Form.Select
                                fluid
                                options={mySef}
                                placeholder='Sef de lucrari'
                                search
                                clearable
                                onChange={this.SefSelect}
                                label='Sef de lucrari'
                            />
                        </Form.Field>
                        {/* <Form.Field required>
                            <label className="obligatoriu">Obligatoriu</label> */}
                            <Form.Select
                                fluid
                                options={myMem}
                                placeholder='Membrii echipei'
                                search
                                clearable
                                multiple
                                onChange={this.MemSelect}
                                label='Membrii echipei'
                            />
                        {/* </Form.Field> */}
                    </Form.Group>
                    <Form.Group widths='equal'>
                        {
                            myCookies[3] === "Dispecer"
                            ?   <Form.Field required>
                                    {this.state.em_status === true
                                    ?   []
                                    :   <label className="obligatoriu">Obligatoriu</label>   
                                    }    
                                    <Form.Select
                                        fluid
                                        options={myEm}
                                        placeholder='Emitent'
                                        search
                                        clearable
                                        onChange={this.EmSelect}
                                        label='Emitent'
                                    />
                                </Form.Field>
                            :   <Form.Input
                                    fluid
                                    label='Emitent'
                                    value={myCookies[1] + " gr. " + tsSelect}
                                    onChange={this.EmInput}
                                    id="em_input"
                                />
                        }
                        <Form.Field required>
                            {this.state.inst_status === true
                            ?   []
                            :   <label className="obligatoriu">Obligatoriu</label>   
                            }    
                            <Form.Select
                                fluid
                                options={myInst}
                                placeholder='Instalatia'
                                search
                                clearable
                                // multiple
                                onChange={this.InstSelect}
                                label='Instalatia'
                            />
                        </Form.Field>
                    </Form.Group>
                    <Form.Input
                        fluid
                        label="Suplimentar (la instalatie)"
                        placeholder="Pot fi adaugate comentarii de alt ordin"
                        onChange={this.InstAd}
                    />
                    <Form.Group widths='equal'>
                        <Form.Field>
                            <Form.Select
                                fluid
                                options={myPt}
                                placeholder='PT, denumirea de dispecerat'
                                search
                                clearable
                                multiple
                                onChange={this.PtSelect}
                                label='PT, denumirea de dispecerat'
                            />
                        </Form.Field>
                        <Form.Field>
                            <Form.Select
                                fluid
                                options={myFid}
                                placeholder='Fider nr.'
                                search
                                clearable
                                multiple
                                onChange={this.FidSelect}
                                label='Fider nr.'
                            />
                        </Form.Field>
                    </Form.Group>
                    <Form.Checkbox 
                        label='Auto completati formular AL/DS'
                        onChange={this.ChAuto}
                    />
                    {
                        this.state.auto_select
                        ?  <Form.Select
                            fluid
                            options={myAuto}
                            placeholder='Cerinte Tehnica Securitatii'
                            search
                            clearable
                            multiple
                            onChange={this.TsSelect}
                            label='Cerinte TS'
                            />
                        : <Form.Input 
                            type="file" 
                            onChange={this.LinkAl}
                            label="Introduceti AL/DS"
                            />
                    }
                    <Form.Field>
                        <button className="login" onClick={this.HandleInreg}>Inregistrati</button>
                    </Form.Field>
                </Form>
            </React.Fragment>
        )}
    }
}
export default InregDs