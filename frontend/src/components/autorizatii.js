import React from 'react';
import '../styles/autorizatii.css';
import DpOficii from './dp-oficii';
import '../styles/dropdown.css';
import DpMth from './dp-month';
import DpPt from './dp-pt';
import DpAngaj from './dp-angaj'
import {Loader}  from 'semantic-ui-react';
import {CookiesFunc} from './cookie-funk';
import NumeleDvs from './numele-dvs';
import {Total} from './numele-dvs';

const myCookies = CookiesFunc();
var nowDate = new Date();
var nowMonth = ("0" + (nowDate.getMonth() + 1)).slice(-2)
// console.log(nowDate.toUTCString())

class AL extends React.Component {
  state = {
    items: [],
    pt_items: [],
    angaj_items: [],
    of_select: undefined,
    mth_select: undefined,
    pt_select: undefined,
    angaj_select: undefined,
    total: undefined,
    // chColor_status: undefined,
  }
  // -----------------Working Funcions----------------------------------------
  LoadOnlyOf = (ofVar, mthVar) => {
    fetch(`http://localhost:5000/autorizatii/${ofVar}/` +
      `${mthVar}/${this.state.pt_select}/` +
      `${this.state.angaj_select}/`, {
      method: 'GET',
    })
    .then(res => res.json())
    .then(result => this.setState({items: result[0].reverse(),
                            total: result[1]
                          }))
    .catch(error => console.log(error));
  }
  
  HandleByOf = (ofVar, mthVar) => {
    fetch(`http://localhost:5000/autorizatii/${ofVar}/` +
      `${mthVar}/${this.state.pt_select}/` +
      `${this.state.angaj_select}/`, {
      method: 'GET',
    })
    .then(res => res.json())
    .then(result => this.setState({
                              items: result[0].reverse(),
                              total: result[1]
                            }))
    .catch(error => console.log(error));

    fetch(`http://localhost:5000/lista-pt/${ofVar}/${undefined}/`, {
      method: 'GET',
    })
    .then(res => res.json())
    .then(result => this.setState({pt_items: result}))
    .catch(error => console.log(error));

    fetch(`http://localhost:5000/lista-angaj/${ofVar}/${undefined}/`, {
      method: 'GET',
    })
    .then(res => res.json())
    .then(result => this.setState({angaj_items: result}))
    .catch(error => console.log(error));
  }

  HandleOfMth = (ofHandle, mthHandle) => {
    var abrOf = ofHandle;
    if (abrOf === undefined) {
      abrOf = myCookies[2]
    }

    var valueMth = mthHandle;
    if (valueMth === undefined || valueMth === "") {
      valueMth = nowMonth
    }

    return [abrOf, valueMth]
  }
  // --------------------Working Functions------------------------------

  componentDidMount(){
    if (myCookies[0] !== "approved") {
      document.location.href = "/"
    }
    if (document.location.pathname.slice(-2) === "/") {
      this.HandleByOf(myCookies[2], nowMonth)
    } else {
      this.LoadOnlyOf(document.location.pathname.slice(-2), nowMonth)
    }
  }

  ChOfFunc = (evt, data) => {
    const myOfMth = this.HandleOfMth(data.value.abr, this.state.mth_select)

    this.setState({of_select: myOfMth[0]})
    
    this.HandleByOf(myOfMth[0], myOfMth[1])
  }

  ChMthFunc = (evt, data) => {
    // console.log(data.value)
    const myOfMth = this.HandleOfMth(this.state.of_select, data.value)

    fetch(`http://localhost:5000/autorizatii/${myOfMth[0]}/` +
          `${myOfMth[1]}/${this.state.pt_select}/` +
          `${this.state.angaj_select}/`, {
        method: 'GET',
    })
    .then(res =>  res.json())
    .then(result => this.setState({items: result[0].reverse()}))
    .catch(error => console.log(error));

    this.setState({mth_select: myOfMth[1]})
  }

  ChPtFunc = (evt, {value}) => {
    const myOfMth = this.HandleOfMth(this.state.of_select, this.state.mth_select)

    var valuePt = value.pt
    if (valuePt === "") {
      valuePt = undefined
    }

    fetch(`http://localhost:5000/autorizatii/${myOfMth[0]}/` + 
    `${myOfMth[1]}/${valuePt}/` +
    `${this.state.angaj_select}/`, {
      method: 'GET',
    })
    .then(res => res.json())
    .then(result => this.setState({items: result[0].reverse()}))
    .catch(error => console.log(error));

    this.setState({pt_select: valuePt})
  }

  ChAngajFunc = (evt, {value}) => {
    const myOfMth = this.HandleOfMth(this.state.of_select, this.state.mth_select)

    var valueAngaj = value.name + " gr. " + value.gr_ts
    if (valueAngaj === "" || valueAngaj === "undefined gr. undefined") {
      valueAngaj = undefined
    }

    fetch(`http://localhost:5000/autorizatii/${myOfMth[0]}/` + 
    `${myOfMth[1]}/${this.state.pt_select}/` +
    `${valueAngaj}/`, {
      method: 'GET',
    })
    .then(res => res.json())
    .then(result => this.setState({items: result[0].reverse()}))
    .catch(error => console.log(error));

    this.setState({angaj_select: valueAngaj})
  }

  // ChColor = item => evt => {
  //   for (var i = 3; i < this.state.items.length; i++){
  //     document.getElementsByTagName('tr')[i].style.background = 'rgb(230, 230, 230)';
  //   }
  //   document.getElementById("dsAl_" + item._id).style.background = 'rgb(200, 200, 200)'
  // }
  
  render() {
    // const dateNow = new Date()
    // console.log(this.state.items)
    return (
      <React.Fragment>
        <div className="drop-oficii">
          <DpOficii myChoose = {this.ChOfFunc} />
        </div>
        <div className="drop-month">
          <DpMth ChMth = {this.ChMthFunc}/>
        </div>
        <div className="drop-pt">
          <DpPt myPt={this.state.pt_items} ChoosePt={this.ChPtFunc}/>
        </div>
        <div className="drop-angaj">
          <DpAngaj myAngaj={this.state.angaj_items} ChooseAngaj={this.ChAngajFunc}/>
        </div>
        <table className='centerAL'>
          <thead>
            <tr>
              <th colSpan='18'>
                <img src='images/bn_react_bw.jpg' alt="header banner" className='banner'/>
                {/* <img src="images/ataman_enter.png" alt="Loc pentru logo" className="logo-inreg"/> */}
              </th>
            </tr>
            <tr>
              <th colSpan='18'  className="th-al-title">
                REGISTRU AUTORIZATII (DISPOZITII)
              </th>
            </tr>
            {this.state.items.length === 0
            ? <Loader size='big' active/>
            : <tr>
                <th className="th-al-column-name">Oficiul</th>
                {/* <th className="th-al-column-name">Nr.DS</th> */}
                <th className="th-al-column-name">Nr.AL/DS</th>
                <th className="th-al-column-name">Plan</th>
                <th className="th-al-column-name">Instalatia</th>
                <th className="th-al-column-name">PT</th>
                <th className="th-al-column-name">Nr.Fider</th>
                <th className="th-al-column-name">Localitatea</th>
                <th className="th-al-column-name">Lucrarile efectuate</th>
                <th className="th-al-column-name">Sef de lucrari</th>
                <th className="th-al-column-name">Membrii formatiei</th>
                <th className="th-al-column-name">Emitent AL/DS</th>
                <th className="th-al-column-name">Masurile tehn.</th>
                <th className="th-al-column-name">Semnatura instructaj</th>
                <th className="th-al-column-name">Starea AL/DS</th>
                <th className="th-al-column-name">Pregatire (data, ora)</th>
                <th className="th-al-column-name">Admitere (data, ora)</th>
                <th className="th-al-column-name">Terminare (data, ora)</th>
                {/* <th className="th-al-column-name">Link</th> */}
              </tr>
            }
          </thead>
          <tbody>
            {this.state.items.map((item) =>
              // {chColor = {
              //       item: item,
              //       num: this.state.items.length
              //     };}
              <tr key={item._id} 
                  id={"dsAl_" + item._id}
                  className='tr-al' 
                  onContextMenu={this.props.myContext(
                                                      item, 
                                                      this.state.items.length,
                                                      this.state.mth_select
                                                      )
                                } 
                  onDoubleClick={this.props.goLink(item)}
                  onClick={this.props.chColor(item, this.state.items.length)}
              >
                <td id={"oficiul_" + item._id} className={item.oficiul==="UN" ? 'un'
                              : item.oficiul==="FL" ? 'fl'
                              : item.oficiul==="GL" ? 'gl'
                              : item.oficiul==="RS" ? 'rs'
                              : ''}>
                  {item.oficiul}
                </td>
                {/* <td>{item.nr_ds}</td> */}
                <td>{item.nr_al}</td>
                <td className={
                                item.cu_dec.includes("Dispozitie")
                                ? "dispozitie"
                                : []
                              }
                >
                  {item.cu_dec}
                </td>
                <td>{item.instalatia}</td>
                <td className="pt">{item.pt}</td>
                <td>{item.fid_nr}</td>
                <td>{item.localitatea}</td>
                <td>{item.lucrarile}</td>
                <td className="sef">{item.sef}</td>
                <td>{item.mem_ech}</td>
                <td id={"em_" + item._id}>{item.emitent}</td>
                <td>{item.mas_teh}</td>
                <td>{item.semnatura}</td>
                <td id={"starea_" + item._id} className={item.starea.includes("Nou inregistrat") ? 'nou-inregistrat' 
                              :item.starea.includes("Acceptat:") ? 'acceptat'
                              :item.starea.includes("Refuz:") ? 'terminat'
                              : ''}>
                  {item.starea}
                </td>
                <td id={"preg_" + item._id} className={item.pregatire.includes("--") ? 'terminat'
                              : item.pregatire.includes("Pregatire:") ? 'pregatire'
                              : item.pregatire.includes("Cerere") ? 'nou-inregistrat'
                              : item.pregatire.includes("Nu s-a lucrat") ? "nu-lucrat"
                              : ''}>
                  {item.pregatire}
                </td>
                <td id={"adm_" + item._id} className={item.admitere.includes("--") ? 'terminat'
                              : item.admitere.includes("Admitere:") ? 'admitere' 
                              : item.admitere.includes("Cerere") ? 'nou-inregistrat'
                              : item.admitere.includes("Nu s-a lucrat") ? 'nu-lucrat'
                              : ''}>
                  {item.admitere}
                </td>
                <td id={"term_" + item._id} className={item.terminare.includes("--") ? 'terminat' 
                              : item.terminare.includes("Cerere") ? 'nou-inregistrat'
                              : item.terminare.includes("Nu s-a lucrat") ? 'nu-lucrat'
                              : item.terminare.includes("Intrerupere:") ? 'intrerupere'
                              : ''}>
                  {item.terminare}
                </td>
                {/* {
                  item.link !== ""
                  ? <td className="link-al">DA</td>
                  : <td className="link-al">NU</td>
                } */}
              </tr>
            )}
          </tbody>
        </table>
      <NumeleDvs />
      <Total totalDoc={this.state.total} />
      {/* console.log() */}
      </React.Fragment>
    )
  }
}

export default AL;
