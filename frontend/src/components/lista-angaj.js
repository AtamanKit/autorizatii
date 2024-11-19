import React from 'react';
import '../styles/autorizatii.css';
import DpOficii from './dp-oficii';
import '../styles/dropdown.css';
import {Loader} from 'semantic-ui-react';
import DpSect from './dp-sect';
import {CookiesFunc} from './cookie-funk';
import NumeleDvs from './numele-dvs';

const myCookies = CookiesFunc()
// console.log(myCookies)
class ListaAngaj extends React.Component {

    state = {
        angaj_items: [],
        sect_by_of: [],
        of_select: undefined,
        // sect_select: undefined,
        
    }

    componentDidMount(){
      if (document.location.pathname.slice(-2) === "aj") {
        this.HandleOfPt(myCookies[2])    
      } else {
        this.HandleOfPt(document.location.pathname.slice(-2))
      }
    }

    HandleOfPt = (ofSectVar) => {
      fetch(`http://localhost:5000/sectoare/${ofSectVar}/`, {
        method: 'GET',
      })
      .then(res => res.json())
      .then(result => this.setState({sect_by_of: result}))
      .catch(error => console.log(error));

      fetch(`http://localhost:5000/lista-angaj/${ofSectVar}/${undefined}/`, {
        method: 'GET',
      })
      .then(res => res.json())
      .then(result => this.setState({angaj_items: result}))
      .catch(error => console.log(error));
    }

    ChOfFunc = (evt, {value}) => {
      // console.log(this.state.pt_by_of)
      var abrOf = value.abr
      if (value.abr === undefined) {
        abrOf = myCookies[2]
        // document.location.href = "/lista-pt"
      }

      this.HandleOfPt(abrOf)
  
      this.setState({of_select: abrOf})
    }

    ChSectFunc = (evt, {value}) => {
      if (value.name === ""){
        value.name = undefined
        // document.location.href = "/lista-pt"
      }

      var abrOf = this.state.of_select
      if (abrOf === undefined) {
        abrOf = myCookies[2]
        // document.location.href = "/lista-pt"
      }

      fetch(`http://localhost:5000/lista-angaj/${abrOf}/${value.name}/`, {
        method: 'GET',
      })
      .then(res => res.json())
      .then(result => this.setState({angaj_items: result}))
      .catch(error => console.log(error));
    }

    render() {
      return (
        <React.Fragment>
          <NumeleDvs/>
          <div className="drop-oficii">
            <DpOficii myChoose = {this.ChOfFunc} />
          </div>
          <div className="drop-month">
            <DpSect mySect={this.state.sect_by_of} ChooseSect={this.ChSectFunc}/>
          </div>
          <table className='centerAL'>
            <thead>
              <tr>
                <th colSpan='15'>
                  <img src='/images/angajati.jpg' alt="header banner" className='banner'/>
                </th>
              </tr>
              <tr>
                <th colSpan='15'  className="th-al-title">
                  LISTA ANGAJATILOR
                </th>
              </tr>
              {this.state.angaj_items.length === 0
              ? <Loader size='big' active/>
              :  <tr>
                  <th className="th-al-column-name">Oficiul</th>
                  <th className="th-al-column-name">Numar tabel</th>
                  <th className="th-al-column-name">Numele P.</th>
                  <th className="th-al-column-name">Functia</th>
                  <th className="th-al-column-name">Grupa TS</th>
                  <th className="th-al-column-name">Sector</th>
                  <th className="th-al-column-name">Nr. tel. pers.</th>
                  <th className="th-al-column-name">Nr. tel. serv.</th>
                  <th className="th-al-column-name">Emitent</th>
                  <th className="th-al-column-name">Cond. de lucr.</th>
                  <th className="th-al-column-name">Admitent</th>
                  <th className="th-al-column-name">Sef de lucr.</th>
                  <th className="th-al-column-name">Supraveghetor</th>
                  <th className="th-al-column-name">Membru echipa</th>
                  <th className="th-al-column-name">Semnatura</th>
                </tr>
              }
            </thead>
            <tbody>
              {this.state.angaj_items.map((item) => 
                <tr key={item._id} id={"dsAl_" + item._id} className='tr-al'>
                  <td className={item.oficiul==="UN" ? 'un'
                                : item.oficiul==="FL" ? 'fl'
                                : item.oficiul==="GL" ? 'gl'
                                : item.oficiul==="RS" ? 'rs'
                                : ''}>
                    {item.oficiul}
                  </td>
                  {/* <td className={item.pt === "" ? ""
                                : 'pt'}>
                    {item.pt}
                  </td> */}
                  <td>{item.nr_tabel}</td>
                  <td>{item.name}</td>
                  <td>{item.position}</td>
                  <td>{item.gr_ts}</td>
                  <td>{item.sector}</td>
                  <td>{item.telefon_pers}</td>
                  <td>{item.telefon_serv}</td>
                  <td className={item.emitent.includes("DA") ? "da"
                                : item.emitent.includes("NU") ? "nu"
                                : ""}>
                    {item.emitent}
                  </td>
                  <td className={item.conducator.includes("DA") ? "da"
                                : item.conducator.includes("NU") ? "nu"
                                : ""}>
                    {item.conducator}
                  </td>
                  <td className={item.admitent.includes("DA") ? "da"
                                : item.admitent.includes("NU") ? "nu"
                                : ""}>
                    {item.admitent}
                  </td>
                  <td className={item.sef.includes("DA") ? "da"
                                : item.sef.includes("NU") ? "nu"
                                : ""}>
                    {item.sef}
                  </td>
                  <td className={item.supraveghetor.includes("DA") ? "da"
                                : item.supraveghetor.includes("NU") ? "nu"
                                : ""}>
                    {item.supraveghetor}
                  </td>
                  <td className={item.membru.includes("DA") ? "da"
                                : item.membru.includes("NU") ? "nu"
                                : ""}>
                    {item.membru}
                  </td>
                  {
                    item.semnatura_el
                    ? <td>DA</td>
                    : <td>NU</td>
                  }
                </tr>
              )}
            </tbody>
          </table>
        </React.Fragment>
      )
    }
}

export default ListaAngaj;