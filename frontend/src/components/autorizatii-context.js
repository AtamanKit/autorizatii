import AL from './autorizatii';
import ContextMenu from './context-autorizatii'
import React, { useState } from 'react';
import {CookiesFunc} from './cookie-funk';
import ErrorLoad from './errors';
import {Loader} from 'semantic-ui-react';
// import NumeleDvs from './numele-dvs';
// import ErrorBoundary from './error-boundary';
// import InregReus from './inreg-reus';

// var al_state = false;
const myCookies = CookiesFunc()
class AlContext extends React.Component {
    // state = {
    //     dsAlNum: "proba",
    //     docLink: "",
    // }
    state = {
        of_select: undefined,
        del_state: undefined,
        ds_state: undefined,
        al_state: undefined,
        starea_status: undefined,
        preg_status: undefined,
        adm_status: undefined,
        term_status: undefined,
        term_noserv: undefined,
        term_select: undefined,
        intr_status: undefined,
        nulucr_status: undefined,
        mth_select: undefined,
        excel_control: false,
        excel_status: undefined,
        excel_noserv: false,
        // al_control: false,
        // up_link_status: undefined,
        // up_status: undefined,
    }

    HandleToday = () => {
        const myDate = new Date();
        const myYear = myDate.getFullYear().toString().slice(-2)
        const myMonth = ("0" + (myDate.getMonth() + 1)).slice(-2);
        const myDay = ("0" + myDate.getDate()).slice(-2);
        const myHour = ("0" + myDate.getHours()).slice(-2);
        const myMin = ("0" + myDate.getMinutes()).slice(-2);

        const myToday = myDay + "." + myMonth + "." + myYear + "\n" + myHour + ":" + myMin

        return myToday
    }

    RefreshFunc = () => {
        if (this.state.of_select !== undefined) {
            document.location.href = `/${this.state.of_select}`
        } else if (document.location.pathname.slice(-2) === "/") {
            document.location.href = '/'
        } else {
            document.location.href = `/${document.location.pathname.slice(-2)}`
        }
    }

    NuLucrFunc = () => {
        if (myCookies[3] === "Dispecer") {
            const pregatire = document.getElementById("preg_" + this.state.dsAlNum);
            const admitere = document.getElementById("adm_" + this.state.dsAlNum);
            const terminare = document.getElementById("term_" + this.state.dsAlNum);
            const starea = document.getElementById("starea_" + this.state.dsAlNum);

            if (pregatire.innerHTML === "Pregatire") {

                pregatire.innerHTML = `Nu s-a lucrat:\n${this.HandleToday()}\n${myCookies[1]}`;
                pregatire.style.backgroundColor = 'rgb(13, 158, 163)';

                admitere.innerHTML = `Nu s-a lucrat:\n${this.HandleToday()}\n${myCookies[1]}`;
                admitere.style.backgroundColor = 'rgb(13, 158, 163)';
                
                terminare.innerHTML = `Nu s-a lucrat:\n${this.HandleToday()}\n${myCookies[1]}`;
                terminare.style.backgroundColor = 'rgb(13, 158, 163)';

                fetch(`http://localhost:5000/autorizatii/nulucrat/${this.state.dsAlNum}/`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        pregatire: pregatire.innerHTML,
                        admitere: admitere.innerHTML,
                        terminare: terminare.innerHTML,
                        starea: starea.innerHTML,
                    })
                })
                .then(res => res.text())
                .then(result => this.setState({nulucr_status: result}))
                .catch(error => console.log(error));
            } else {
                alert("Aceasta obtiune nu poate fi aleasa dupa pregatirea lucrarilor!")
            }
        } else {
            alert("Nu aveti suficiente drepturi!")
        }
    }

    TermFunc = () => {
        if (myCookies[3] === "Dispecer") {
            const pregatire = document.getElementById("preg_" + this.state.dsAlNum);
            const admitere = document.getElementById("adm_" + this.state.dsAlNum);
            const terminare = document.getElementById("term_" + this.state.dsAlNum);
            const starea = document.getElementById("starea_" + this.state.dsAlNum);


            if ((terminare.innerHTML === "Terminare" ||
                terminare.innerHTML.includes("Intrerupere:")) && 
                admitere.innerHTML.includes("Admitere:")) {
                
                this.setState({term_select: true})

                pregatire.innerHTML = pregatire.innerHTML + "\n--";
                pregatire.style.color = '#fff';
                pregatire.style.backgroundColor = 'rgb(80, 80, 80)';

                admitere.innerHTML = admitere.innerHTML + "\n--"
                admitere.style.color = '#fff';
                admitere.style.backgroundColor = 'rgb(80, 80, 80)';
                
                terminare.innerHTML = `Terminat:\n${this.HandleToday()}\n${myCookies[1]}\n--`;
                terminare.style.color = '#fff';
                terminare.style.backgroundColor = 'rgb(80, 80, 80)';

                fetch(`http://localhost:5000/autorizatii/terminare/${this.state.dsAlNum}/`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        pregatire: pregatire.innerHTML,
                        admitere: admitere.innerHTML,
                        terminare: terminare.innerHTML,
                        starea: starea.innerHTML,
                    })
                })
                .then(res => res.text())
                .then(result => this.setState({term_status: result}))
                .catch(error => {
                        this.setState({term_noserv: true})
                })
            } else {
                alert("Nu poate fi oferit timpul la terminarea lucrarilor!")
            }
        } else {
            alert("Nu aveti suficiente drepturi!")
        }
    }
    
    IntrFunc = () => {
        if (myCookies[3] === "Dispecer") {
            const admitere = document.getElementById("adm_" + this.state.dsAlNum);
            const terminare = document.getElementById("term_" + this.state.dsAlNum);
            const starea = document.getElementById("starea_" + this.state.dsAlNum);


            if (terminare.innerHTML === "Terminare" && admitere.innerHTML.includes("Admitere:")) {
                
                // this.setState({term_select: true})
                
                terminare.innerHTML = `Intrerupere:\n${this.HandleToday()}\n${myCookies[1]}\n`;
                terminare.style.color = '#fff';
                terminare.style.backgroundColor = 'rgb(137, 156, 134)';

                fetch(`http://localhost:5000/autorizatii/intrerupere/${this.state.dsAlNum}/`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        intrerupere: terminare.innerHTML,
                        starea: starea.innerHTML,
                    })
                })
                .then(res => res.text())
                .then(result => this.setState({intr_status: result}))
                .catch(error => console.log(error))
            } else {
                alert("AL/DS nu poate fi intrerupta!\nSau AL/DS deja este intrerupta!")
            }
        } else {
            alert("Nu aveti suficiente drepturi!")
        }
    }

    AdmFunc = () => {
        if (myCookies[3] === "Dispecer") {
            const pregatire = document.getElementById("preg_" + this.state.dsAlNum);
            const admitere = document.getElementById("adm_" + this.state.dsAlNum);
            const starea = document.getElementById("starea_" + this.state.dsAlNum)

            if (admitere.innerHTML === "Admitere" && pregatire.innerHTML.includes("Pregatire:")) {

                admitere.innerHTML = `Admitere:\n${this.HandleToday()}\n${myCookies[1]}`;
                admitere.style.backgroundColor = 'rgb(194, 199, 40)';

                fetch(`http://localhost:5000/autorizatii/admitere/${this.state.dsAlNum}/`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        admitere: admitere.innerHTML,
                        starea: starea.innerHTML,
                    })
                })
                .then(res => res.text())
                .then(result => this.setState({adm_status: result}))
                .catch(error => console.log(error));

            } else {
                alert("Nu poate fi oferit timpul la admitere!")
            }
        } else {
            alert("Nu aveti suficiente drepturi!")
        }
    }
    
    PregFunc = () => {
        if (myCookies[3] === "Dispecer") {
            const starea = document.getElementById("starea_" + this.state.dsAlNum)
            const pregatire = document.getElementById("preg_" + this.state.dsAlNum);
            
            if (pregatire.innerHTML === "Pregatire" &&
                starea.innerHTML.includes("Acceptat:")) {

                pregatire.innerHTML = `Pregatire:\n${this.HandleToday()}\n${myCookies[1]}`;
                pregatire.style.color = '#fff';
                pregatire.style.backgroundColor = 'rgb(35, 99, 145)';

                fetch(`http://localhost:5000/autorizatii/pregatire/${this.state.dsAlNum}/`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        pregatire: pregatire.innerHTML,
                        starea: starea.innerHTML,
                    })
                })
                .then(res => res.text())
                .then(result => this.setState({preg_status: result}))
                .catch(error => console.log(error));

            } else {
                alert("Nu poate fi oferit timpul la pregatire!")
            }
        } else {
            alert("Nu aveti suficiente drepturi!")
        }
    }

    RefuseFunc = () => {
        if (myCookies[3] === "Dispecer") {
            const starea = document.getElementById("starea_" + this.state.dsAlNum)

            if (starea.innerHTML === "Nou inregistrat") {
                starea.innerHTML = `Refuz:\n${this.HandleToday()}\n${myCookies[1]}`;
                starea.style.background = 'rgb(80, 80, 80)';

                fetch(`http://localhost:5000/autorizatii/starea/${this.state.dsAlNum}/`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        starea: starea.innerHTML
                    })
                })
                .then(res => res.text())
                .then(result => this.setState({starea_status: result}))
                .catch(error => console.log(error));
            } else {
                alert("Nu este posibil refuzul!")
            }
        } else {
            alert("Nu aveti suficiente drepturi!")
        }
    }

    AcceptFunc = () => {
        if (myCookies[3] === "Dispecer") {
            const starea = document.getElementById("starea_" + this.state.dsAlNum)

            if (starea.innerHTML === "Nou inregistrat") {
                starea.innerHTML = `Acceptat:\n${this.HandleToday()}\n${myCookies[1]}`;
                starea.style.color = '#000'
                starea.style.backgroundColor = 'rgb(92, 156, 107)'

                fetch(`http://localhost:5000/autorizatii/starea/${this.state.dsAlNum}/`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        starea: starea.innerHTML
                    })
                })
                .then(res => res.text())
                .then(result => this.setState({starea_status: result}))
                .catch(error => console.log(error));
            } else {
                alert("Nu este posibila acceptarea!")
            }
        } else {
            alert("Nu aveti suficiente drepturi!")
        }
    }

    CorectFunc = () => {
        // if (myCookies[3] === "Dispecer") {
            var oficiul = document.getElementById("oficiul_" + this.state.dsAlNum)
            var em = document.getElementById("em_" + this.state.dsAlNum)
            var starea = document.getElementById("starea_" + this.state.dsAlNum)
            const pregatire = document.getElementById("preg_" + this.state.dsAlNum);
            
            oficiul = oficiul.innerHTML
            
            starea = starea.innerHTML
            if (starea !== "Nou inregistrat") {
                var starea_list = starea.split("\n")
            } else {
                var starea_list = em.innerHTML.split("\n")
            }
            starea_list = starea_list[1].split(".")

            if (pregatire.innerHTML === "Pregatire") {
                if (this.state.ds_state === true) {
                    document.location.href = `/corect-ds/${this.state.dsAlNum}`;
                } else if (this.state.al_state === true) {
                    document.location.href = `/corect-al/${oficiul}/${this.state.dsAlNum}/${starea_list[1]}`;
                }
            // if (pregatire.innerHTML === "Pregatire") {
            //     fetch(`http://localhost:5000/corect/${this.state.dsAlNum}/${starea_list[1]}/`, {
            //         method: 'GET',
            //     })
            //     .then(res => res.json())
            //     .then(result => this.setState)
            } else {
                alert("Nu pot fi efectuate corectari dupa pregatirea locului de munca!")
            }
        // } 
        // else {
        //     alert("Nu aveti suficiente drepturi pentru a efectua corectari!")
        // }
    }

    DeleteFunc = () => {
        if (myCookies[3] === "Dispecer") {
            const pregatire = document.getElementById("preg_" + this.state.dsAlNum);
            const dsAl = document.getElementById("dsAl_" + this.state.dsAlNum);
            if (pregatire.innerHTML === "Pregatire") {
                fetch(`http://localhost:5000/autorizatii/delete/${this.state.dsAlNum}/`);
                dsAl.style.display = 'none';

            } else {
                alert("Aceasta obtiune nu poate fi aleasa dupa pregatirea lucrarilor!")
            }
        } else {
            alert("Nu aveti suficiente drepturi!")
        }
    }

    LinkFunc = () => {
        if (this.state.docLink.includes("http")){
            window.open(this.state.docLink)
        } else if (this.state.docLink !== "" && !this.state.docLink.includes("http")) {
            alert("Nu exista link pe internet!\n" + this.state.docLink)
        } else {
            alert("Nu exista link!")
        }
    }

    ExcelFunc = () => {
        this.setState({excel_status: true})
        fetch(`http://127.0.0.1:5000/autorizatii/excel/${this.state.mth_select}/`, {
            method: 'GET',
        })
        // .then(res => res.text())
        .then(result => this.setState({excel_control: result}))
        .catch(error => this.setState({excel_noserv: true}))
    }

    HandleLink = item => evt => {
        if (item.link.includes("http")){
            window.open(item.link)
        } else if (item.link !== "" && !item.link.includes("http")) {
            alert("Nu exista link pe internet!\n" + item.link)
        } else {
            alert("Nu exista link!")
        }
    }

    // UploadLink = () => {
    //     this.setState({up_status: true});

    //     if (this.state.docLink !== "" && !this.state.docLink.includes("http")) {
    //         fetch(`http://localhost:5000/autorizatii/upload-link/${this.state.dsAlNum}/`, {
    //             method: 'GET',
    //         })
    //         .then(res => res.text())
    //         .then(result => this.setState({up_link_status: result}))
    //         .then(error => console.log(error));
    //     }
    //     window.location.reload()
    // }

    // AlFunc = () => {
    //     window.location.href = "/inreg-al"
    // }

    // DsFunc = () => {
    //     window.location.href = "/inreg-ds"
    // }

    HandleReload = () => {
        document.location.reload()
    }

    HandleContext = (item, num, month) => evt  => {
        // this.setState({al_control: true})
        
        const {dsAlNum} = this.state;
        this.setState({dsAlNum: item._id});

        const {docLink} = this.state;
        this.setState({docLink: item.link});

        this.setState({of_select: item.oficiul})

        if (item.nr_ds !== "") {
            this.setState({ds_state: true});
            this.setState({al_state: undefined});
        } else if (item.nr_al !== "") {
            this.setState({al_state: true});
            this.setState({ds_state: undefined})
        }
        this.ChColorTr(item, num)

        // const {mth_select} = this.state;
        this.setState({mth_select: month})
    }

    HandleClick = (item, num) => evt => {
        this.ChColorTr(item, num)
    }
    
    ChColorTr(item, num) {
        for (var i = 3; i < num + 3; i++){
            document.getElementsByTagName('tr')[i].style.background = 'rgb(230, 230, 230)';
          }
        document.getElementById("dsAl_" + item._id).style.background = 'rgb(200, 200, 200)'
    }
    
    render() {
        if (this.state.starea_status === "non-approved"){
            return(
                <ErrorLoad
                    ErrorWarning="EROARE:"
                    TypeOf={`Starea nu poate fi modificata!\nPosibil undeva mai este deschisa o fereastra!`}
                    erFunc={this.HandleReload}
                    erBtn="Registru AL/DS"
                />
            )
        }
        if (this.state.preg_status === "non-approved") {
            return (
                <ErrorLoad 
                    ErrorWarning="EROARE:"
                    TypeOf={`A fost oferit, deja, timpul la PREGATIRE!\nPosibil undeva mai este deschisa o fereastra!`}
                    erFunc={this.HandleReload}
                    erBtn="Registru AL/DS"
                />
            )
        } else if (this.state.adm_status === "non-approved") {
            return (
                <ErrorLoad 
                    ErrorWarning="EROARE:"
                    TypeOf={`A fost oferit, deja, timpul la ADMITERE!\nPosibil undeva mai este deschisa o fereastra!`}
                    erFunc={this.HandleReload}
                    erBtn="Registru AL/DS"
                />
            )
        } else if (this.state.term_status === "non-approved") {
            return (
                <ErrorLoad 
                    ErrorWarning="EROARE:"
                    TypeOf={`A fost oferit, deja, timpul la TERMINAREA lucrarilor!\nPosibil undeva mai este deschisa o fereastra!`}
                    erFunc={this.HandleReload}
                    erBtn="Registru AL/DS"
                />
            )
        } else if (this.state.nulucr_status === "non-approved") {
            return (
                <ErrorLoad 
                    ErrorWarning="EROARE:"
                    TypeOf={`Nu pot fi anulate lucrarile!\nRupbrica a fost, deja, completata!`}
                    erFunc={this.HandleReload}
                    erBtn="Registru AL/DS"
                />
            )
        } else if (this.state.intr_status === "non-approved") {
            return (
                <ErrorLoad 
                    ErrorWarning="EROARE:"
                    TypeOf={`Pe AL/DS data lucrarile, deja, au fost intrerupte!\nPosibil undeva mai este deschisa o fereastra!`}
                    erFunc={this.HandleReload}
                    erBtn="Registru AL/DS"
                />
            )
        // } else if (this.state.term_status === "non_excel") {
        //     return (
        //         <ErrorLoad
        //             ErrorWarning="EROARE:"
        //             TypeOf={"Nu s-au inscris datele in SAIDI excel!\nPosibil undeva este deschisa aplicatia excel!"}
        //             erFunc={this.HandleReload}
        //             erBtn="Registru AL/DS"
        //         />
        //     )
        } else if (this.state.excel_control.status === 403) {
            return (
                <ErrorLoad
                    ErrorWarning="EROARE 403:"
                    TypeOf={"Nu s-au inscris datele in REAGISTRU AUTORIZATII excel!\nPosibil undeva este deschisa aplicatia excel!"}
                    erFunc={this.HandleReload}
                    erBtn="Registru AL/DS"
                />
            )
        } else if (this.state.excel_noserv) {
            return (
                <ErrorLoad
                    ErrorWarning="EROARE 403:"
                    TypeOf={'Posibil nu este pornit serverul local!'}
                    erFunc={this.HandleReload}
                    erBtn="Registru AL/DS"
                />
            )
        } else {
            return(
                <div>
                    {/* <ErrorBoundary> */}
                        {
                            this.state.excel_status && this.state.excel_control === false
                            ? <Loader size='big' active/>
                            : []
                        }
                        {/* <NumeleDvs /> */}
                        <AL myContext = {this.HandleContext}
                            goLink = {this.HandleLink}
                            chColor = {this.HandleClick}
                        />,
                        <ContextMenu 
                            myRefresh = {this.RefreshFunc}
                            myAccept = {this.AcceptFunc}
                            myRefuse = {this.RefuseFunc}
                            myPreg = {this.PregFunc} 
                            myAdm = {this.AdmFunc}
                            myTerm = {this.TermFunc}
                            myIntr = {this.IntrFunc}
                            nuLucr = {this.NuLucrFunc}
                            myCorect = {this.CorectFunc}
                            myDel = {this.DeleteFunc}
                            myLink = {this.LinkFunc}
                            myExcel = {this.ExcelFunc}
                            // alControl = {this.state.dsAlNum}
                            // upLink = {this.UploadLink}
                            // myAl = {this.AlFunc}
                            // myDs = {this.DsFunc}
                        />
                    {/* </ErrorBoundary>, */}
                </div>          
            )
        }
    }
}

export default AlContext;