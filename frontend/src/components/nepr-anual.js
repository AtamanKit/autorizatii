import React from 'react';
import '../styles/autorizatii.css';
import DpOficii from './dp-oficii';
import '../styles/dropdown.css';
import {Loader} from 'semantic-ui-react';
import { CookiesFunc } from './cookie-funk';
import NumeleDvs from './numele-dvs';

const myCookies = CookiesFunc()

class NeprAnual extends React.Component {

  state = {
      nepr_anual_items: []
  }

  HandleOF = (varOf) => {
    fetch(`http://localhost:5000/nepr-anual/${varOf}/`, {
        method: 'GET',
      })
        .then(res =>  res.json())
        .then(result => this.setState({nepr_anual_items: result}))
        .catch(error => console.log(error));
  }
    
  componentDidMount(){
    this.HandleOF(myCookies[2])
  }

  ChOfFunc = (evt, data) => {
    var abrOf = data.value.abr

    if (abrOf === undefined) {
      abrOf = myCookies[2]
    }
    this.HandleOF(abrOf)
  }

  render() {
      return (
        <React.Fragment>
          <NumeleDvs/>
          <div className="drop-oficii">
            <DpOficii myChoose = {this.ChOfFunc} />
          </div>
          {/* <div className="drop-month">
            <DpMth ChMth = {this.ChMthFunc}/>
          </div> */}
          <table className='centerAL'>
            <thead>
              <tr>
                <th colSpan='8'>
                  <img src='images/deconect.jpg' alt="header banner" className='banner'/>
                </th>
              </tr>
              <tr>
                <th colSpan='8'  className="th-al-title">
                  DECONECTARI ANUALE NEPROGRAMATE
                </th>
              </tr>
              {this.state.nepr_anual_items.length === 0
              ? <Loader size='big' active/>
              :  <tr>
                  <th className="th-al-column-name">Oficiul</th>
                  <th className="th-al-column-name">PT, Fider</th>
                  <th className="th-al-column-name">Localitate</th>
                  <th className="th-al-column-name">Nr. cons.</th>
                  <th className="th-al-column-name">Ore</th>
                  <th className="th-al-column-name">Nr. dec.</th>
                  <th className="th-al-column-name">Nr. regl.</th>
                  <th className="th-al-column-name">Compensatie</th>
                </tr>
              }
            </thead>
            <tbody>
              {this.state.nepr_anual_items.map((item) => 
                <tr key={item._id} id={"dsAl_" + item._id} className='tr-al'>
                  <td className={item.oficiul==="UN" ? 'un'
                                : item.oficiul==="FL" ? 'fl'
                                : item.oficiul==="GL" ? 'gl'
                                : item.oficiul==="RS" ? 'rs'
                                : ''}>
                    {item.oficiul}
                  </td>
                  <td className="pt">{item.pt_fider}</td>
                  <td>{item.localitate}</td>
                  <td>{item.nr_cons}</td>
                  <td>{item.ore}</td>
                  <td>{item.nr_dec}</td>
                  <td className={item.nr_regl.includes("Incadrat") ? 'executat'
                                : 'nou-inregistrat'}>
                    {item.nr_regl}
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

export default NeprAnual;