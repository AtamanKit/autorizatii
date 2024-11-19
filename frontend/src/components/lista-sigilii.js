import React from 'react';
import '../styles/autorizatii.css';
import DpOficii from './dp-oficii';
import '../styles/dropdown.css';
import {Loader, Form} from 'semantic-ui-react';
// import DpPt from './dp-pt';
import {CookiesFunc} from './cookie-funk';
import NumeleDvs from './numele-dvs';
import ContextMenu from './context-sig';
import {NowDate} from './now-date';
import ErrorLoad from './errors';

const myCookies = CookiesFunc()
// console.log(myCookies)
class ListaSig extends React.Component {

    state = {
        of_items: [],
        sig_items: [],
        sig_single: {},
        starea_status: undefined,
    }

    componentDidMount(){
        if (document.location.pathname.slice(-3) === "sig") {
          this.HandleOfPt(myCookies[2])
        } else {
          this.HandleOfPt(document.location.pathname.slice(-2))
        }
    }

    // componentWillUnmount(){
    //   this.setState({pt_items: []})
    // }

    HandleOfPt = (ofPtVar) => {
      this.setState({sig_items: []})
      fetch(`http://localhost:5000/lista-sig/${ofPtVar}/`, {
        method: 'GET',
      })
      .then(res => res.json())
      .then(result => this.setState({sig_items: result.reverse()}))
      .catch(error => console.log(error));
    }

    ChOfFunc = (evt, {value}) => {
      var abrOf = value.abr
      if (value.abr === undefined) {
        abrOf = myCookies[2]
      }

      this.HandleOfPt(abrOf)
  
      this.setState({of_select: abrOf})
    }

    SigFunc = () => {
      const myToday = NowDate();
      const starea = document.getElementById('starea_' + this.state.sig_single._id)

      starea.innerHTML = 'Executat:\n' + myToday[0] + '\n' + myCookies[1];
      starea.style.background = 'rgb(68, 112, 71)';
      starea.style.color = 'rgb(0, 0, 0)';

      fetch(`http://localhost:5000/starea-sig/${this.state.sig_single._id}/`, {
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
      .catch(error => console.log(error))
    }

    ChColor = (_item) => evt => {
      this.setState({sig_single: _item})
      for (var i = 3; i < this.state.sig_items.length + 3; i++) {
        document.getElementsByTagName('tr')[i].style.background = 'rgb(230, 230, 230)';
      }
      document.getElementById("dsAl_" + _item._id).style.background = 'rgb(200, 200, 200)'
    }

    HandleReload = () => {
      document.location.reload()
    }

    // ChPtFunc = (evt, {value}) => {
    //   this.setState({pt_items: []})
    //   if (value.pt === ""){
    //     value.pt = undefined
    //   }

    //   var abrOf = this.state.of_select
    //   if (abrOf === undefined && document.location.pathname === "/lista-pt") {
    //     abrOf = myCookies[2]
    //   } else if (abrOf === undefined && document.location.pathname !== "/lista-pt") {
    //     abrOf = document.location.pathname.slice(-2)
    //   }

    //   fetch(`http://localhost:5000/lista-pt/${abrOf}/${value.pt}/`, {
    //     method: 'GET',
    //   })
    //   .then(res => res.json())
    //   .then(result => this.setState({pt_items: result}))
    //   .catch(error => console.log(error));
    // }

    render() {
      if (this.state.starea_status === "non-approved") {
        return (
          <ErrorLoad
            ErrorWarning="EROARE 406:"
            TypeOf={`Starea a fost deja modificata!\n`}
            erFunc={this.HandleReload}
            erBtn="Registru sigilii demontate"
          />
        )
      }
      return (
        <React.Fragment>
          <ContextMenu mySig={this.SigFunc}/>
          <NumeleDvs/>
          <div className="drop-oficii">
            <DpOficii myChoose = {this.ChOfFunc} />
          </div>
          {/* <div className="drop-month">
            <DpPt myPt={this.state.pt_items} ChoosePt={this.ChPtFunc}/>
          </div> */}
          <table className='centerAL'>
            <thead>
              <tr>
                <th colSpan='9'>
                  <img src='/images/sigilii.jpg' alt="header banner" className='banner'/>
                </th>
              </tr>
              <tr>
                <th colSpan='9'  className="th-al-title">
                  REGISTRU SIGILII DEMONTATE
                </th>
              </tr>
              {this.state.sig_items.length === 0
              ? <Loader size='big' active/>
              :  <tr>
                  <th className="th-al-column-name">Oficiul</th>
                  <th className="th-al-column-name">Nr.ordine</th>
                  <th className="th-al-column-name">Cont</th>
                  <th className="th-al-column-name">Adresa</th>
                  <th className="th-al-column-name">Nume, prenume</th>
                  <th className="th-al-column-name">Cauza demontarii</th>
                  <th className="th-al-column-name">Dispecer</th>
                  <th className="th-al-column-name">Executor</th>
                  <th className="th-al-column-name">Starea</th>
                </tr>
              }
            </thead>
            <tbody>
              {this.state.sig_items.map((item) => 
                <tr 
                  key={item._id} 
                  id={"dsAl_" + item._id} 
                  className='tr-al'
                  onClick={this.ChColor(item)}
                  onContextMenu={this.ChColor(item)}
                >
                  <td className={item.oficiul==="UN" ? 'un'
                                : item.oficiul==="FL" ? 'fl'
                                : item.oficiul==="GL" ? 'gl'
                                : item.oficiul==="RS" ? 'rs'
                                : ''}>
                    {item.oficiul}
                  </td>
                  <td>{item._id}</td>
                  <td>{item.cont}</td>
                  <td>{item.adresa}</td>
                  <td>{item.nume_cons}</td>
                  <td>{item.cauza_sig}</td>
                  <td className={
                    item.disp.includes("Acceptat:")
                    ? 'acceptat'
                    : ''
                  }>
                    {item.disp}
                  </td>
                  <td>{item.exec}</td>
                  <td id={"starea_" + item._id} className={
                    item.starea.includes("Nou inregistrat")
                    ? 'nou-inregistrat'
                    : item.starea.includes("Executat:")
                    ? 'executat'
                    : []
                  }>
                    {item.starea}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </React.Fragment>
      )
    }
}

export default ListaSig;