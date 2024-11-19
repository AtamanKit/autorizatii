import React from 'react';
import {Form, Loader} from 'semantic-ui-react';
import {CookiesFunc} from './cookie-funk';
import {AbrOfFunc} from './abrOf-func';
import '../styles/inreg-al.css';
import CorectReus from './corect-reus';
import {NowDate} from './now-date';
import {DateInput} from 'semantic-ui-calendar-react'

const myCookies = CookiesFunc();
const myToday = NowDate();

const myList = document.location.pathname.split("/");
const oficiul = myList[2];
const dsAlNum = myList[3];
const starea = myList[4];

class CorectAl extends React.Component {
    state = {
        oficii_items: [],
        cu_dec_items: [],
        angaj_items: [],
        inst_items: [],
        pt_items: [],
        lucr_items: [],
        fid_select: [],
        of_select: undefined,
        cu_dec_select: undefined,
        sef_select: undefined,
        mem_select: undefined,
        em_select: undefined,
        inst_select: undefined,
        pt_select: undefined,
        fid_select: undefined,
        lucr_select: undefined,
        sm_select: undefined,
        of_status: false,
        cu_dec_status: false,
        sef_status: false,
        em_status: false,
        inst_status: false,
        pt_status: false,
        fid_status: false,
        lucr_status: false,
        sm_status: false,
        link_al: undefined,
        local_link: undefined,
        success_status: false,
        inreg_status: false,
        dsAl_num: undefined,
        inst_ad: undefined,
        upload_status: undefined,
        gr_select: undefined,
        starea_select: undefined,
        dsAl_item: undefined,
        ts_select: undefined,
        auto_select: undefined,
        _date: undefined,
    }

    componentDidMount() {

        fetch(`http://localhost:5000/autorizatii/corect/${dsAlNum}/${starea}/`, {
            method: 'GET',
        })
        .then(res => res.json())
        .then(result => this.setState({dsAl_item: result}))
        .catch(error => console.log(error));

        fetch('http://localhost:5000/oficii/', {
            method: 'GET',
        })
        .then(res => res.json())
        .then(result => this.setState({oficii_items: result}))
        .catch(error => console.log(error));

        fetch('http://localhost:5000/cu_dec/', {
            method: 'GET',
        })
        .then(res => res.json())
        .then(result => this.setState({cu_dec_items: result}))
        .catch(error => console.log(error));

        this.LoadAngaj(oficiul)
        this.LoadPt(oficiul)

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

    LoadAngaj(oficiu) {
        fetch(`http://localhost:5000/angajati/${oficiu}/`, {
            method: 'GET',
        })
        .then(res => res.json())
        .then(result => this.setState({angaj_items: result}))
        .catch(error => console.log(error));
    }

    LoadPt(oficiu) {
        fetch(`http://localhost:5000/pt/${oficiu}/`, {
            method: 'GET',
        })
        .then(res => res.json())
        .then(result => this.setState({pt_items: result}))
        .catch(error => console.log(error));
    }

    OfChoose = (evt, data) => {
        this.LoadAngaj(data.value.abr)
        this.LoadPt(data.value.abr)

        if (data.value !== "") {
            this.setState({of_status: true})
        } else {
            this.setState({of_status: false})
        }

        this.setState({of_select: data.value.abr})
    }

    // OfInput = evt => {
    //     document.getElementById("of_input").innerText = myCookies[2]
    // }

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
        // console.log(data.value)
        var mem_list = "";
        var i;
        for (i = 0; i < data.value.length; i++) {
            if (data.value[i] !== "Nu completati") {
                mem_list += data.value[i].name + " gr." + data.value[i].gr_ts + ","
            } else {
                mem_list = "Nu completati"
            }
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
        // console.log(data.value)
        if (data.value !== "") {
            this.setState({pt_status: true})
        } else {
            this.setState({pt_status: false})
        }

        if (data.value.length) {
            var pt_list = "";
            var i;
            for (i = 0; i < data.value.length; i++) {
                if (data.value[i] !== "Nu completati") {
                    pt_list += data.value[i].pt + ","
                } else {
                    pt_list = "Nu completati"
                }
            }
        } else {
            var pt_list = data.value.pt
        }
        
        this.setState({pt_select: pt_list})
    }

    FidSelect = (evt, data) => {
        if (data.value !== "") {
            this.setState({fid_status: true})
        } else {
            this.setState({fid_status: false})
        }

        if (data.value.length) {
            var fid_list = "";
            var i;
            for (i = 0; i < data.value.length; i++) {
                fid_list += data.value[i] + ","
            }
        } else {
            var fid_list = data.value
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
        document.location.href = `/${this.state.dsAl_item.oficiul}`
    }

    ChAuto = (evt, data) => {
        fetch('http://localhost:5000/cerinte_ts', {
            method: 'GET',
        })
        .then(res => res.json())
        .then(result => this.setState({ts_items: result}))
        .catch(error => console.log(error));

        this.setState({auto_select: data.checked})
    }

    TsSelect = (evt, {value}) => {
        if (value.length !== 0) {
            this.setState({ts_select: value})
        } else {
            this.setState({ts_select: undefined})
        }
    }

    HandleDate = (evt, {name, value}) => {
        if (this.state.hasOwnProperty(name)) {
            this.setState({[name]: value})
        }
    }


    HandleInreg = () => {
        if (myCookies[3] === "Dispecer") {
            var starea = "Acceptat:\n" + myToday[0] + "\n" + myCookies[1]
        } else {
            var starea = "Nou inregistrat"
        }

        // ######### Corect variables #####################
        if (
            this.state.of_select === undefined
            ) {
                var oficiul = this.state.dsAl_item.oficiul
        } else {
            var oficiul = this.state.of_select
        }
        if (
            this.state.cu_dec_select === undefined
            || this.state.cu_dec_select === ""
            ) {
                var cu_dec = this.state.dsAl_item.cu_dec
        } else {
            var cu_dec = this.state.cu_dec_select
        }
        if (
            this.state.sef_select === "undefined gr.undefined"
            || this.state.sef_select === undefined
            || this.state.sef_select === ""
            ) {
                var sef = this.state.dsAl_item.sef
        } else {
            var sef = this.state.sef_select
        }
        if (
            this.state.mem_select === "undefined gr.undefined"
            || this.state.mem_select === undefined
            || this.state.mem_select === ""
            ) {
                if (this.state.dsAl_item.mem_ech != "") {
                    var mem = this.state.dsAl_item.mem_ech
                } else {
                    var mem = undefined
                }
        } else {
            var mem = this.state.mem_select
        }
        if (
            this.state.em_select === "undefined gr.undefined"
            || this.state.em_select === undefined
            || this.state.em_select === ""
            ) {
                if (myCookies[3] === "Dispecer") {
                    var emSelect = this.state.dsAl_item.emitent
                } else {
                    var emSelect = "Confirmat:\n" + myToday[0] + "\n" + 
                    document.getElementById("em_input").value;
               }
        } else {
            var emSelect = this.state.em_select + " gr. " + this.state.gr_select
        }
        if (
            this.state.inst_select === undefined
            || this.state.inst_select === ""
            ) {
                if (this.state.dsAl_item.instalatia !== "") {
                    var inst = this.state.dsAl_item.instalatia
                } else {
                    var inst = undefined
                }
        } else {
            var inst = this.state.inst_select
        }
        if (
            this.state.inst_ad === undefined
            || this.state.inst_select === ""
            ) {
                var inst_ad = undefined
        } else {
            var inst_ad = this.state.inst_ad
        }
        if (
            this.state.pt_select === undefined
            || this.state.pt_select === ""
            ) {
                if (this.state.dsAl_item.pt !== ""){
                    var pt = this.state.dsAl_item.pt
                } else {
                    var pt = undefined
                }
        } else {
            var pt = this.state.pt_select
        }
        if (
            this.state.fid_select === undefined
            || this.state.fid_select === ""
            ) {
                if (this.state.dsAl_item.fid_nr !== ""){
                    var fid = this.state.dsAl_item.fid_nr.split("F")[1]
                } else {
                    var fid = undefined
                }
        } else {
            var fid = this.state.fid_select
        }
        if (
            this.state.lucr_select === undefined
            || this.state.lucr_select === ""
            ) {
                var lucr = this.state.dsAl_item.lucrarile
        } else {
            var lucr = this.state.lucr_select
        }
        if (
            this.state.sm_select === undefined
            || this.state.sm_select === ""
            ) {
                if (this.state.dsAl_item.mas_teh !== ""){
                    var sm = this.state.dsAl_item.mas_teh.split(" SM")[1]
                } else {
                    var sm = undefined
                }
        } else {
            var sm = this.state.sm_select
        }
        if (this.state.local_link !== undefined) {
            var slash = this.state.local_link
            var comma = slash.replace(/[/]|\\/g, ",")
        } else if (comma === undefined){
            if (this.state.dsAl_item.link !== ""){
                slash = this.state.dsAl_item.link
                comma = slash.split("/")[5]
                // comma = slash.replace(/[/]|\\/g, ",")
                // comma = comma.replace(/https:,,drive.google.com,file,d,/g, "----")
            }
        }

        if (cu_dec === "Programat"
                || cu_dec === "Neprogramat") {
            if (inst === undefined
                || pt === undefined
                || fid === undefined
                || sm === undefined) {
                    alert("Nu ati introdus unul din cimpurile obligatorii!")
            } else {
                this.setState({inreg_status: true})

                fetch(`http://localhost:5000/inreg-al/${oficiul}/${this.state.dsAl_item._id}/${cu_dec}/${sef}/${mem}/${inst}/${inst_ad}/${pt}/${fid}/${lucr}/${sm}/${comma}/${this.state.auto_select}/${this.state.ts_select}/${this.state._date}/`, {
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
        } else if (cu_dec === "Fara deconectari"
                    || cu_dec === "Dispozitie") {
            if (lucr === undefined) {
                    alert("Nu ati introdus unul din cimpurile obligatorii!")
            } else {
                this.setState({inreg_status: true})

                fetch(`http://localhost:5000/inreg-al/${oficiul}/${this.state.dsAl_item._id}/${cu_dec}/${sef}/${mem}/${inst}/${inst_ad}/${pt}/${fid}/${lucr}/${sm}/${comma}/${this.state.auto_select}/${this.state.ts_select}/${this.state._date}/`, {
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
    }

    render() {
        const myOficii = this.state.oficii_items.map((item) =>
            (
                {text: item.name, value: item}
            )
        )

        if (this.state.dsAl_item !== undefined) {
            if (this.state.cu_dec_select === undefined){
                var cu_dec = this.state.dsAl_item.cu_dec
            } else {
                var cu_dec = this.state.cu_dec_select
            }
        }

        const mySef = [], myEm = [], myMem = [{text: "Nu completati", value: "Nu completati"}]
        // if (cu_dec !== "Programat" || cu_dec !== "Neprogramat") {
        //     var myMem = [{text: "Nu completati", value: "Nu completati"}];
        // } else {
        //     var myMem = []
        // }

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
                   var grSelect = this.state.angaj_items[i].gr_ts
                }
            }
            myMem.push({
                text: this.state.angaj_items[i].name + " gr. " +
                this.state.angaj_items[i].gr_ts,
                value: this.state.angaj_items[i]
            });
        }
        // const myMem_numeste = [];
        // myMem_numeste.push({
        //     text: "Nu completati",
        //     value: "Nu completati"
        // });
        // myMem_numeste.push(myMem)
        // console.log(myMem)
        // console.log(cu_dec)
        if (cu_dec === "Programat" || cu_dec === "Neprogramat") {
            var myInst_ = []
        } else {
            var myInst_ = [{text: "Nu completati", value: "Nu completati"}];
        }
        const myInst = myInst_
        if (this.state.inst_items[0] !== undefined) {
            for (i = 0; i < this.state.inst_items[0].lista.length; i++) {
                myInst.push({
                        text: this.state.inst_items[0].lista[i],
                        value: this.state.inst_items[0].lista[i],
                    })
            }
        }
        if (cu_dec === "Programat" || cu_dec === "Neprogramat") {
            var myPt_ = []
        } else {
            var myPt_ = [{text: "Nu completati", value: "Nu completati"}]
        }
        const myPt = myPt_
        this.state.pt_items.map((item) =>
            myPt.push
            (
                {text: item.pt, value: item,}
            )
        )
        // // myPt.push(_myPt);
        // console.log(myPt);

        if (cu_dec === "Programat" || cu_dec === "Neprogramat") {
            var i_ = 1
        } else {
            var i_ = 0
        }
        const myFid = [];
        for (i = i_ ; i < 151; i++) {
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

        const mySm = [];
        for (i = i_ ; i < 152; i++) {
            mySm.push(
                {
                    text: i, value: i,
                }
            )
        }

        const myCu_dec = this.state.cu_dec_items[0] !== undefined
                    ? this.state.cu_dec_items[0].lista.map((item) => 
                        (
                            {
                                text: item,
                                value: item
                            }
                        )
                    )
                    : []

        const myAuto = [];
        if (this.state.dsAl_item !== undefined) {
            if (
                this.state.cu_dec_select === "Dispozitie"
                || this.state.dsAl_item.cu_dec === "Dispozitie"
                ) {
                if (this.state.ts_items !== undefined) {
                    for (i=0; i < this.state.ts_items[0].lista.length; i++) {
                        myAuto.push({
                            text: this.state.ts_items[0].lista[i],
                            value: this.state.ts_items[0].lista[i],
                        })
                    }
                }
            }
        }
        
        if (this.state.dsAl_item !== undefined) {
            var myOf = AbrOfFunc(this.state.dsAl_item.oficiul)

            var mas_teh = this.state.dsAl_item.mas_teh
            var mas_teh_list = mas_teh.split(" SM")

            var fid = this.state.dsAl_item.fid_nr
            var fid_list = fid.split("F")
        }

        if (this.state.inreg_status && this.state.success_status) {
            return (
                <CorectReus func={this.HandleReus} reg="Registru AL/DS"/>
            )
        } else if (this.state.dsAl_item === undefined) {
            return(
                <Loader size='big' active />
            )
        } else if (this.state.dsAl_item !== undefined) {
            return ( 
                <React.Fragment>
                    {(this.state.inreg_status && !this.state.success_status) ||
                    (this.state.upload_status && this.state.local_link === undefined)
                    ? <Loader size='big' active/>
                    :[]
                    }
                    <img className="up-space"/>
                    <img src="/images/ataman_enter.png" alt="Loc pentru logo" className="logo-inreg"/>
                    <h1 className="bir_disp">CORECTATI AUTORIZATIE (DISPOZITIE)<div>nr. {dsAlNum}</div></h1>
                    <Form className="form-inreg">
                        {/* {this.state.success_status === true
                        ?   <Form.Field>
                                <h4 className="success">Inregistrat cu succes!</h4>
                            </Form.Field>
                        :   ""
                        } */}
                        {/* {!this.state.reg_al_cookie
                        ? <p className="no-pass">Nu este introdusa destinatia registrului AL/DS excel. AL/DS nu vor putea fi inregistrate!</p>
                        : ""
                        } */}
                        <Form.Group widths='equal'>
                            <Form.Field required>
                                {this.state.of_status === true
                                    || this.state.dsAl_item.oficiul !== ""
                                ?   []
                                :   <label className="obligatoriu">Obligatoriu</label>    
                                }
                                <Form.Select
                                    fluid
                                    options={myOficii}
                                    placeholder={myOf}
                                    search
                                    clearable
                                    onChange={this.OfChoose}
                                    label='Oficiul'
                                />
                            </Form.Field>
                            <Form.Field required>
                                {this.state.cu_dec_status === true
                                    || this.state.dsAl_item.cu_dec !== ""
                                ?   []
                                :   <label className="obligatoriu">Obligatoriu</label> 
                                }
                                <Form.Select
                                    fluid
                                    options={myCu_dec}
                                    placeholder={this.state.dsAl_item.cu_dec}
                                    search
                                    clearable
                                    onChange={this.Cu_decSelect}
                                    label='Plan'
                                />
                            </Form.Field>
                        </Form.Group>
                        <Form.Group widths='equal'>
                            <Form.Field required>
                                {this.state.sef_status === true 
                                    || this.state.cu_dec_status === false
                                    || this.state.dsAl_item.sef !== ""
                                ?   []
                                :   <label className="obligatoriu">Obligatoriu</label>
                                }
                                <Form.Select
                                    fluid
                                    options={mySef}
                                    placeholder={this.state.dsAl_item.sef}
                                    search
                                    clearable
                                    onChange={this.SefSelect}
                                    label='Sef de lucrari'
                                />
                            </Form.Field>
                            <Form.Select
                                fluid
                                options={myMem}
                                placeholder={this.state.dsAl_item.mem_ech}
                                search
                                clearable
                                multiple
                                onChange={this.MemSelect}
                                label='Membrii echipei'
                            />
                        </Form.Group>
                        <Form.Group widths='equal'>
                            {
                                myCookies[3] === "Dispecer"
                                ?    <Form.Field required>
                                        {this.state.em_status === true 
                                            || this.state.cu_dec_status === false
                                            || this.state.dsAl_item.emitent !== ""
                                        ?   []
                                        :   <label className="obligatoriu">Obligatoriu</label>
                                        }
                                        <Form.Select
                                            fluid
                                            options={myEm}
                                            placeholder={this.state.dsAl_item.emitent}
                                            search
                                            clearable
                                            onChange={this.EmSelect}
                                            label='Emitent'
                                        />
                                    </Form.Field>
                                :   <Form.Input
                                        fluid
                                        label='Emitent'
                                        // disabled
                                        value={myCookies[1] + " gr. " + grSelect}
                                        onChange={this.EmInput}
                                        id="em_input"
                                        // placeholder={myCookies[1]}
                                    />
                            }
                            <Form.Field required>
                                {this.state.inst_status === true 
                                    || this.state.cu_dec_status === false
                                    || this.state.cu_dec_select === "Fara deconectari"
                                    || this.state.cu_dec_select === "Dispozitie"
                                    || this.state.dsAl_item.instalatia !== ""
                                ?   []
                                :   <label className="obligatoriu">Obligatoriu</label>
                                }
                                <Form.Select
                                    fluid
                                    options={myInst}
                                    placeholder={this.state.dsAl_item.instalatia}
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
                            <Form.Field required>
                                {this.state.pt_status === true 
                                || this.state.cu_dec_status === false
                                || this.state.cu_dec_select === "Fara deconectari"
                                || this.state.cu_dec_select === "Dispozitie"
                                || this.state.dsAl_item.pt !== ""
                                ?   []
                                :   <label className="obligatoriu">Obligatoriu</label>
                                }
                                {cu_dec === "Fara deconectari"
                                || cu_dec === "Dispozitie"
                                ?    <Form.Select
                                        fluid
                                        options={myPt}
                                        placeholder={this.state.dsAl_item.pt}
                                        search
                                        clearable
                                        multiple
                                        onChange={this.PtSelect}
                                        label='PT, denumirea de dispecerat'
                                    />
                                :   <Form.Select
                                        fluid
                                        options={myPt}
                                        placeholder={this.state.dsAl_item.pt}
                                        search
                                        clearable
                                        // multiple
                                        onChange={this.PtSelect}
                                        label='PT, denumirea de dispecerat'
                                    />
                                }
                            </Form.Field>
                            <Form.Field required>
                                {this.state.fid_status === true 
                                || this.state.cu_dec_status === false
                                || this.state.cu_dec_select === "Fara deconectari"
                                || this.state.cu_dec_select === "Dispozitie"
                                || this.state.dsAl_item.fid_nr !== ""
                                ?   []
                                :   <label className="obligatoriu">Obligatoriu</label>
                                }
                                {cu_dec === "Fara deconectari"
                                || cu_dec === "Dispozitie"
                                ?    <Form.Select
                                        fluid
                                        options={myFid}
                                        placeholder={this.state.dsAl_item.fid_nr.split("F")[1]}
                                        search
                                        clearable
                                        multiple
                                        onChange={this.FidSelect}
                                        label='Fider nr.'
                                    />
                                :    <Form.Select
                                        fluid
                                        options={myFid}
                                        placeholder={fid_list[1]}
                                        search
                                        clearable
                                        // multiple
                                        onChange={this.FidSelect}
                                        label='Fider nr.'
                                    />
                                }
                            </Form.Field>
                        </Form.Group>
                        <Form.Group widths='equal'>
                            <Form.Field required>
                                {this.state.lucr_status === true
                                || this.state.cu_dec_status === false
                                || this.state.dsAl_item.lucrarile !== ""
                                ?   []
                                :   <label className="obligatoriu">Obligatoriu</label>
                                }
                                <Form.Select
                                    fluid
                                    options={myLucr}
                                    placeholder={this.state.dsAl_item.lucrarile}
                                    search
                                    clearable
                                    multiple
                                    onChange={this.LucrSelect}
                                    label='Lucrarile efectuate'
                                />
                            </Form.Field>
                            <Form.Field required>
                                {this.state.sm_status === true
                                || this.state.cu_dec_status === false
                                || this.state.cu_dec_select === "Fara deconectari"
                                || this.state.cu_dec_select === "Dispozitie"
                                || this.state.dsAl_item.mas_teh != ""
                                ?   []
                                :   <label className="obligatoriu">Obligatoriu</label>
                                }
                                <Form.Select
                                    fluid
                                    options={mySm}
                                    placeholder={mas_teh_list[1]}
                                    search
                                    clearable
                                    multiple
                                    onChange={this.SmSelect}
                                    label='SM nr.'
                                />
                            </Form.Field>
                        </Form.Group>
                        {
                            cu_dec === "Dispozitie" 
                            || cu_dec === ""
                            ? <Form.Checkbox 
                                label='Auto completati formular AL/DS'
                                onChange={this.ChAuto}
                                />
                            : []
                        }
                        {
                            this.state.auto_select
                            && (cu_dec === "Dispozitie"
                                || cu_dec === "")
                            ?  <Form.Group widths='equal'>
                                    <Form.Select
                                        fluid
                                        options={myAuto}
                                        placeholder='Alegeti, mai multe obtiuni'
                                        search
                                        clearable
                                        multiple
                                        onChange={this.TsSelect}
                                        label='Cerinte TS'
                                    />
                                    <DateInput
                                        name="_date"
                                        placeholder="Introduceti"
                                        label="Data activitatii"
                                        value={this.state._date}
                                        iconPosition='left'
                                        onChange={this.HandleDate}
                                        dateFormat='DD.MM.YY'
                                        closable
                                        clearable
                                        hideMobileKeyboard='false'
                                        // inline="true"
                                        // popupPosition="bottom right"
                                        // preserveViewMode="false"
                                    />
                                </Form.Group>
                            :   <Form.Input 
                                    type="file" 
                                    onChange={this.LinkAl}
                                    label="Introduceti AL/DS"
                                />
                        }
                        <Form.Field>
                            <button className="login" onClick={this.HandleInreg}>Corectati</button>
                        </Form.Field>
                    </Form>
                </React.Fragment>
            )
        // } else {
        //     return (
        //         <ErrorLoad />
        //     )
    }
    }
}
export default CorectAl