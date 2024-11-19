import React from 'react';
import {Loader} from 'semantic-ui-react';
import ErrorLoad from './errors'

class ExportExcel extends React.Component {
    state = {
        excel_control: false,
        excel_status: undefined,
        excel_noserv: false,
    }

    componentDidMount() {
        // console.log("test")
        this.setState({excel_status: true})

        fetch(`http://localhost:5000/autorizatii/excel/undefined/`, {
            method: 'GET',
        })
        // .then(result => this.setState({excel_control: result}))
        // .then(error => this.setState({excel_noserv: true}))

        fetch(`http://localhost:5000/prog-lunar/excel/undefined/`, {
            method: 'GET',
        })
        // .then(result => this.setState({excel_control: result}))
        // .then(error => this.setState({excel_noserv: true}))

        setTimeout(this.NeprLunarExcel, 10000)
    }

    NeprLunarExcel = () => {
        fetch(`http://127.0.0.1:5000/nepr-lunar/excel/undefined/`, {
            method: 'GET',
        })
        .then(result => this.setState({excel_control: result}))
        .catch(error => this.setState({excel_noserv: true}))
    }

    HandleBack = () => {
        window.history.back()
    }

    render() {
        // console.log("test")
        if (this.state.excel_control.status === 403){
            return(
                <ErrorLoad
                    ErrorWarning="EROARE 403:"
                    TypeOf={"Nu s-au introdus datele in SAIDI excel!\nPosibil undeva este deschisa aplicatia excel!"}
                    erFunc={this.HandleBack}
                    erBtn="Inapoi"
                />
            )
        } else if (this.state.excel_noserv) {
            return(
                <ErrorLoad
                    ErrorWarning="EROARE 403:"
                    TypeOf={'Posibil nu este pornit serverul local!'}
                    erFunc={this.HandleBack}
                    erBtn="Inapoi"
                />
            )
        } else if (this.state.excel_status && !this.state.excel_control) {
            return(
                <React.Fragment>
                    <Loader size='big' active/>
                    <ErrorLoad
                        ErrorWarning={"ARE LOC PROCEDURA DE EXPORT\nASTEPTATI!"}
                        erBtn="Inapoi"
                    />
                </React.Fragment>
            ) 
        } else {
            return(
                <React.Fragment>
                    {/* {
                        this.state.excel_status && !this.state.excel_control
                        ? <Loader size='big' active/>
                        : []
                    } */}
                    <ErrorLoad
                        ErrorWarning="EXPORT EXCEL CU SUCCES!" 
                        erFunc={this.HandleBack}
                        erBtn="Inapoi"
                    />
                </React.Fragment>
            )
        }
    }
}
export default ExportExcel;