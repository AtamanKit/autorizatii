import React from 'react';
import {Form} from 'semantic-ui-react';
import {CookiesFunc} from './cookie-funk';
import '../styles/setari.css';
import InregReus from './inreg-reus';

class DestAl extends React.Component {
    state = {
        al_link: undefined,
        status_link_al: false,
    }

    // HandleLink = (evt, data) => {
    //     this.setState({al_link: data.value})
    // }
    componentDidMount() {
        // console.log(document.cookie)
        // var cookie_list = document.cookie.split("; ");
        // var i;
        // for (i = 0; i < cookie_list.length; i++) {
        //     if (cookie_list[i].includes("file-link-al")) {
        //         var file_link_al_list = cookie_list[i].split("=")
        //         var file_link_al = file_link_al_list[1]
        //     }
        // }
        const myCookies = CookiesFunc()
    
        if (myCookies[2] !== undefined) {
            var comma = myCookies[2];
            var slash = comma.replace(/,/g, "/")
            document.getElementById("al_link").value = slash;
        }
        
        if (myCookies[4] !== undefined) {
            var comma = myCookies[4];
            var slash = comma.replace(/,/g, "/")
            document.getElementById("semnatura-link").value = slash;
        }
        // console.log(myCookies[4])

        // if (myCookies[3] !== undefined) {
        //     var comma = myCookies[3];
        //     var slash = comma.replace(/,/g, "/")
        //     document.getElementById("regAl_link").value = slash;
        // }
    }

    HandleDsAl = () => {
        this.setState({status_link_al: true});
        var slash = document.getElementById("al_link").value
        var comma = slash.replace(/[/]|\\/g, ",")
        if (comma !== "") {
            document.cookie = `file_link_al=${comma}`;
        } else {
            alert("Cimpul AL/DS ese gol!")
        }
    }

    HandleSemn = () => {
        const { status_semn } = this.state;
        this.setState({ status_semn: true });
        var slash = document.getElementById("semnatura-link").value
        var comma = slash.replace(/[/]|\\/g, ",")
        if (comma !== "") {
            document.cookie = `semnatura_link=${comma}`;
        } else {
            alert("Cimpul AL/DS ese gol!")
        }
    }

    HandleRegAl = () => {
        const { status_regAl } = this.state;
        this.setState({ status_regAl: true });
        var slash = document.getElementById("regAl_link").value
        var comma = slash.replace(/[/]|\\/g, ",")
        if (comma !== "") {
            document.cookie = `reg_al=${comma}`;
        } else {
            alert("Cimpul Registru AL/DS ese gol!")
        }
    }

    HandleReus = () => {
        window.location.href = "/"
    }

    render()  {
        if (this.state.status_link_al && document.getElementById("al_link").value !== "") {
            return (
                <InregReus func={this.HandleReus} reg="Home"/>
            )
        } else if (this.state.status_semn && document.getElementById("semnatura-link").value !== "") {
            return (
                <InregReus func={this.HandleReus} reg="Home"/>
            )
        } else if (this.state.status_regAl && document.getElementById("regAl_link").value !== "") {
            return (
                <InregReus func={this.HandleReus} reg="Home"/>
            )
        } else {
            return(
                <React.Fragment>
                    <img className="up-space-setari" />
                    <img src="images/ataman_enter.png" alt="Loc pentru logo" className="logo-setari"/>
                    <h1 className="bir_disp">DESTINATIA RESURSELOR</h1>
                    <Form className="form-setari">
                        {this.state.status_link_al === true && document.getElementById("al_link").value !== "" ?
                            <Form.Field>
                                {/* <h4 className="setat-succes">Setat cu succes!</h4> */}
                                <InregReus />
                            </Form.Field> :
                            []
                        }
                        {/* <Form.Group>
                            <Form.Input 
                                type="text" 
                                placeholder="AL/DS" 
                                className="input-setari" 
                                id="al_link"
                                label="AL/DS"
                                />
                            <Form.Field>
                                <button className="trimite_btn" onClick={this.HandleDsAl}>
                                    Alegeti
                                </button> 
                            </Form.Field>
                        </Form.Group> */}
                        <Form.Group>
                            <Form.Input 
                                type="text" 
                                placeholder="Destinatia Semnatura" 
                                className="input-setari" 
                                id="semnatura-link"
                                label="Semnatura"
                                />
                            <Form.Field>
                                <button className="trimite_btn" onClick={this.HandleSemn}>
                                Alegeti
                                </button> 
                            </Form.Field>
                        </Form.Group>
                        {/* <Form.Group>
                            <Form.Input 
                                type="text" 
                                placeholder="Registru AL/DS" 
                                className="input-setari" 
                                id="regAl_link"
                                label="Registru AL/DS"
                                />
                            <Form.Field>
                                <button className="trimite_btn" onClick={this.HandleRegAl}>
                                    Alegeti
                                </button> 
                            </Form.Field>
                        </Form.Group> */}
                        {/* <Form.Group>
                            <Form.Input 
                                type="text" 
                                placeholder="Registru DECONECTARI ZILNICE" 
                                className="input-setari" 
                                id="semnatura-link"
                                label="DECONECTARI ZILNICE"
                                />
                            <Form.Field>
                                <button className="trimite_btn" onClick={this.HandleSemn}>
                                    Alegeti
                                </button> 
                            </Form.Field>
                        </Form.Group> */}
                        {/* <Form.Group>
                            <Form.Input 
                                type="text" 
                                placeholder="Raport PDJT" 
                                className="input-setari" 
                                id="semnatura-link"
                                label="Destinatia semnatura"
                                />
                            <Form.Field>
                                <button className="trimite_btn" onClick={this.HandleSemn}>
                                    Trimiteti
                                </button> 
                            </Form.Field>
                        </Form.Group> */}

                    </Form>
                </React.Fragment>
            )
        }
    }
}
export default DestAl