import React from 'react';
import '../styles/autorizatii.css';
import DpOficii from './dp-oficii';
import '../styles/dropdown.css';
import {Loader, Form} from 'semantic-ui-react';
import DpPt from './dp-pt';
import {CookiesFunc} from './cookie-funk';
import NumeleDvs from './numele-dvs';

const myCookies = CookiesFunc()
// console.log(myCookies)
class ListaPt extends React.Component {

    state = {
        of_items: [],
        pt_items: [],
    }

    componentDidMount(){
        if (document.location.pathname.slice(-2) === "pt") {
          this.HandleOfPt(myCookies[2])
        } else {
          this.HandleOfPt(document.location.pathname.slice(-2))
        }
    }

    // componentWillUnmount(){
    //   this.setState({pt_items: []})
    // }

    HandleOfPt = (ofPtVar) => {
      this.setState({pt_items: []})
      fetch(`http://localhost:5000/lista-pt/${ofPtVar}/${undefined}/`, {
        method: 'GET',
      })
      .then(res => res.json())
      .then(result => this.setState({pt_items: result}))
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

    ChPtFunc = (evt, {value}) => {
      this.setState({pt_items: []})
      if (value.pt === ""){
        value.pt = undefined
      }

      var abrOf = this.state.of_select
      if (abrOf === undefined && document.location.pathname === "/lista-pt") {
        abrOf = myCookies[2]
      } else if (abrOf === undefined && document.location.pathname !== "/lista-pt") {
        abrOf = document.location.pathname.slice(-2)
      }

      fetch(`http://localhost:5000/lista-pt/${abrOf}/${value.pt}/`, {
        method: 'GET',
      })
      .then(res => res.json())
      .then(result => this.setState({pt_items: result}))
      .catch(error => console.log(error));
    }

    render() {
      // console.log(this.state.pt_items.length)
      return (
        <React.Fragment>
          <NumeleDvs/>
          <div className="drop-oficii">
            <DpOficii myChoose = {this.ChOfFunc} />
          </div>
          <div className="drop-month">
            <DpPt myPt={this.state.pt_items} ChoosePt={this.ChPtFunc}/>
          </div>
          <table className='centerAL'>
            <thead>
              <tr>
                <th colSpan='8'>
                  <img src='/images/eulian.jpg' alt="header banner" className='banner'/>
                </th>
              </tr>
              <tr>
                <th colSpan='8'  className="th-al-title">
                  LISTA PT
                </th>
              </tr>
              {this.state.pt_items.length === 0
              ? <Loader size='big' active/>
              :  <tr>
                  <th className="th-al-column-name">Oficiul</th>
                  <th className="th-al-column-name">PT</th>
                  <th className="th-al-column-name">Localitatea</th>
                  <th className="th-al-column-name">Sector</th>
                  <th className="th-al-column-name">Balanta</th>
                  <th className="th-al-column-name">Cons. casnici, nr.</th>
                  <th className="th-al-column-name">Cons. non-casnici, nr.</th>
                </tr>
              }
            </thead>
            <tbody>
              {this.state.pt_items.map((item) => 
                <tr key={item._id} id={"dsAl_" + item._id} className='tr-al'>
                  <td className={item.oficiul==="UN" ? 'un'
                                : item.oficiul==="FL" ? 'fl'
                                : item.oficiul==="GL" ? 'gl'
                                : item.oficiul==="RS" ? 'rs'
                                : ''}>
                    {item.oficiul}
                  </td>
                  <td className={item.pt === "" ? ""
                                : 'pt'}>
                    {item.pt}
                  </td>
                  <td>{item.localitatea}</td>
                  <td>{item.sector}</td>
                  <td>{item.balanta}</td>
                  <td>{item.total_cas}</td>
                  <td>{item.total_non_cas}</td>
                </tr>
              )}
            </tbody>
          </table>
        </React.Fragment>
      )
    }
}

export default ListaPt;