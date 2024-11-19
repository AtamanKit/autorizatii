import React from 'react';
import '../styles/autorizatii.css';
import DpOficii from './dp-oficii';
import '../styles/dropdown.css';
import DpMth from './dp-month';
import { Loader } from 'semantic-ui-react';
import { CookiesFunc } from './cookie-funk';
import NumeleDvs from './numele-dvs';
import ContextMenu from './context-prog-lunar';
import ErrorLoad from './errors';

const myCookies = CookiesFunc()

class ProgLunar extends React.Component {

  state = {
      prog_lunar_items: [],
      of_select: undefined,
      mth_select: undefined,
      excel_control: false,
      excel_status: undefined,
      excel_noserv: false,
  }

  HandleOfMth = (ofVar) => {
    fetch(`http://localhost:5000/prog-lunar/${ofVar}/${undefined}/`, {
      method: 'GET',
    })
    .then(res => res.json())
    .then(result => this.setState({prog_lunar_items: result.reverse()}))
    .catch(error => console.log(error));
  }

  HandleOf = (ofVarSec) => {
    var abrOf = ofVarSec;
    if (abrOf === undefined) {
      abrOf = myCookies[2]
    }
    return abrOf 
  }

  componentDidMount(){
      this.HandleOfMth(myCookies[2])
  }

  ChOfFunc = (evt, {value}) => {
    var valueOf = this.HandleOf(value.abr)
    this.HandleOfMth(valueOf)

    this.setState({of_select: valueOf})
  }

  ChMthFunc = (evt, {value}) => {
    var valueOf = this.HandleOf(this.state.of_select)

    if (value === "") {
      value = undefined
    }

    fetch(`http://localhost:5000/prog-lunar/${valueOf}/${value}/`, {
        method: 'GET',
    })
    .then(res =>  res.json())
    .then(result => this.setState({prog_lunar_items: result.reverse()}))
    .catch(error => console.log(error));

    this.setState({mth_select: value})
  }

  ExcelFunc = () => {
    this.setState({excel_status: true})
    fetch(`http://localhost:5000/prog-lunar/excel/${this.state.mth_select}/`, {
      method: 'GET',
    })
    .then(result => this.setState({excel_control: result}))
    .catch(error => this.setState({excel_noserv: true}))
  }

  HandleReload = () => {
    document.location.reload()
  }

  render() {
    if (this.state.excel_control.status === 403){
      return(
        <ErrorLoad
          ErrorWarning="EROARE 403:"
          TypeOf={"Nu s-au introdus datele in SAIDI excel!\nPosibil undeva este deschisa aplicatia excel!"}
          erFunc={this.HandleReload}
          erBtn="Deconectari programate lunare"
        />
      )
    } else if (this.state.excel_noserv) {
      return(
        <ErrorLoad
          ErrorWarning="EROARE 403:"
          TypeOf={'Posibil nu este pornit serverul local!'}
          erFunc={this.HandleReload}
          erBtn="Deconectari programate lunare"
        />
      )
    } else {
      return (
        <React.Fragment>
          {
            this.state.excel_status && this.state.excel_control === false
            ? <Loader size='big' active/>
            : []
          }
          <ContextMenu myExcel={this.ExcelFunc}/>
          <NumeleDvs/>
          <div className="drop-oficii">
            <DpOficii myChoose = {this.ChOfFunc} />
          </div>
          <div className="drop-month">
            <DpMth ChMth = {this.ChMthFunc}/>
          </div>
          <table className='centerAL'>
            <thead>
              <tr>
                <th colSpan='14'>
                  <img src='images/deconect.jpg' alt="header banner" className='banner'/>
                </th>
              </tr>
              <tr>
                <th colSpan='14'  className="th-al-title">
                  DECONECTARI LUNARE PROGRAMATE
                </th>
              </tr>
              {this.state.prog_lunar_items.length === 0
              ? <Loader size='big' active/>
              :  <tr>
                  <th className="th-al-column-name">Oficiul</th>
                  <th className="th-al-column-name">Nr. ordine</th>
                  <th className="th-al-column-name">PT</th>
                  <th className="th-al-column-name">Fider 0,4kV</th>
                  <th className="th-al-column-name">Data si ora<br />deconectarii</th>
                  <th className="th-al-column-name">Data si ora<br />conectarii</th>
                  <th className="th-al-column-name">Durata<br />intreruperii</th>
                  <th className="th-al-column-name">Cons. casnici</th>
                  <th className="th-al-column-name">Cons. non-casnici</th>
                  <th className="th-al-column-name">Total cons.</th>
                  <th className="th-al-column-name">Lacalitate</th>
                  <th className="th-al-column-name">Cauza<br />deconectarii</th>
                  <th className="th-al-column-name">Termen<br />reglementat</th>
                  <th className="th-al-column-name">Compensatie<br />(lei)</th>
                </tr>
              }
            </thead>
            <tbody>
              {this.state.prog_lunar_items.map((item) => 
                <tr key={item._id} id={"dsAl_" + item._id} className='tr-al'>
                  <td className={item.oficiul==="UN" ? 'un'
                                : item.oficiul==="FL" ? 'fl'
                                : item.oficiul==="GL" ? 'gl'
                                : item.oficiul==="RS" ? 'rs'
                                : ''}>
                    {item.oficiul}
                  </td>
                  <td>{item._id}</td>
                  <td className={item.pt === "" ? ""
                                : 'pt'}>
                    {item.pt}
                  </td>
                  <td>{item.fid_04kv}</td>
                  <td>{item.data_dec}</td>
                  <td>{item.data_conect}</td>
                  <td>{item.durata}</td>
                  <td>{item.cons_cas}</td>
                  <td>{item.cons_ec}</td>
                  <td>{item.total}</td>
                  <td>{item.localitate}</td>
                  <td>{item.cauza}</td>
                  <td className={item.termen.includes("Incadrat") ? 'executat'
                                : item.termen.includes("Depasit") ? 'nou-inregistrat'
                                : ""
                              }>
                    {item.termen}
                  </td>
                  <td>{item.compens}</td>
                </tr>
              )}
            </tbody>
          </table>
        </React.Fragment>
      )
    }
  }
}

export default ProgLunar;