import React from 'react';
import '../styles/autorizatii.css';
import DpOficii from './dp-oficii';
import '../styles/dropdown.css';
import DpSect from './dp-sect';
import {Checkbox, Loader} from 'semantic-ui-react';
import {CookiesFunc} from './cookie-funk';
import NumeleDvs from './numele-dvs';

var myCookies = CookiesFunc()

class Deranj extends React.Component {
  state = {
      deranj_items: [],
      sect_items: [],
      of_select: undefined,
      sect_select: undefined,
      sectOf_select: undefined,
      neex_select: false,
  }

  componentDidMount(){
    // var deranjOficiu = document.location.pathnaem.slice(-2)
    if (document.location.pathname === "/deranj-context") {
      var abrOf = myCookies[2] 
    } else {
      var abrOf = document.location.pathname.slice(-2)
    }
    // console.log(document.location.pathname.slice(-2))
    fetch(`http://localhost:5000/deranjamente/${abrOf}/`, {
      method: 'GET',
    })
      .then(res =>  res.json())
      .then(result => this.setState({deranj_items: result.reverse()}))
      .catch(error => console.log(error));
 
    if (document.location.pathname === "/deranj-context") {
      fetch(`http://localhost:5000/sectoare/${abrOf}/`, {
        method: 'GET',
      })
      .then(res => res.json())
      .then(result => this.setState({sect_items: result}))
      .catch(error => console.log(error));
    }
  }

  ChOfDeranj = (evt, data) => {
    // document.location.href = "/deranj-context"
    var abrOf = data.value.abr;
    if (data.value.abr === undefined || data.value.abr === ""){
      abrOf = myCookies[2]
    }

    fetch(`http://localhost:5000/sectoare/${abrOf}/`, {
      method: 'GET',
    })
    .then(res => res.json())
    .then(result => this.setState({sect_items: result}))
    .catch(error => console.log(error));
    
    fetch(`http://localhost:5000/deranjamente/${abrOf}/${this.state.sect_select}/${this.state.sectOf_select}/${this.state.neex_select}/`, {
      method: 'GET',
    })
    .then(res => res.json())
    .then(result => this.setState({deranj_items: result.reverse()}))
    .catch(error => console.log(error));

    this.setState({of_select: abrOf});
  }

  ChSectDeranj = (evt, data) => {
    // if (document.location.pathname === "/deranj-context") {
      if (this.state.of_select === undefined) {
        var abrOf = myCookies[2]
      } else {
        var abrOf = this.state.of_select
      }
    // } else {
    //   var abrOf = document.location.pathname.slice(-2)
    // }

    fetch(`http://localhost:5000/deranjamente/${abrOf}/${data.value.name}/${data.value.oficiul}/${this.state.neex_select}/`, {
      method: 'GET',
    })
    .then(res => res.json())
    .then(result => this.setState({deranj_items: result.reverse()}))
    .catch(error => console.log(error));

    this.setState({sect_select: data.value.name});
    this.setState({sectOf_select: data.value.oficiul});
  }

  ChNeex = (evt, data) => {
    // if (document.location.pathname === "/deranj-context") {
      if (this.state.of_select === undefined) {
        var abrOf = myCookies[2]
      } else {
        var abrOf = this.state.of_select
      }
    // } else {
    //   var abrOf = document.location.pathname.slice(-2)
    // }

    fetch(`http://localhost:5000/deranjamente/${abrOf}/${this.state.sect_select}/${this.state.sectOf_select}/${data.checked}/`, {
      method: 'GET',
    })
    .then(res => res.json())
    .then(result => this.setState({deranj_items: result.reverse()}))
    .catch(error => console.log(error));

    this.setState({neex_select: data.checked});
  }

  // ChColor = item => evt => {
  //   for (var i = 3; i < this.state.deranj_items.length; i++){
  //     document.getElementsByTagName('tr')[i].style.background = 'rgb(230, 230, 230)';
  //   }
  //   document.getElementById("dsAl_" + item._id).style.background = 'rgb(200, 200, 200)'
  // }

  render() {
    return (
      <React.Fragment>
        <div className="drop-oficii">
          <DpOficii myChoose={this.ChOfDeranj} />
        </div>
        <div className="drop-sect">
          <DpSect mySect={this.state.sect_items} ChooseSect={this.ChSectDeranj} />
        </div>
        {(document.location.pathname === "/deranj-context") || 
          (document.location.pathname !== "/deranj-context" && 
          this.state.of_select !== undefined)
          ? <div className="check">
              <Checkbox onChange={this.ChNeex} label="Neexecutat"/>
            </div>
          : []
        }
        <table className='centerAL'>
          <thead>
            <tr>
              <th colSpan='12'>
                <img src='/images/deranj_sec.jpg' alt="header banner" className='banner'/>
              </th>
            </tr>
            <tr>
              <th colSpan='12'  className="th-al-title">
                REGISTRU DERANJAMENTE
              </th>
            </tr>
            {this.state.deranj_items.length === 0
            ? <Loader size='big' active/>
            :  <tr>
                <th className="th-al-column-name">Oficiul</th>
                <th className="th-al-column-name">Nr.</th>
                <th className="th-al-column-name">Transmis</th>
                <th className="th-al-column-name">Sector</th>
                <th className="th-al-column-name">Instalatia</th>
                <th className="th-al-column-name">Fider 10kV</th>
                <th className="th-al-column-name">PT</th>
                <th className="th-al-column-name">Fider 0,4kV</th>
                <th className="th-al-column-name">Continutul</th>
                <th className="th-al-column-name">Data, ora</th>
                <th className="th-al-column-name">Responsabil</th>
                <th className="th-al-column-name">Starea</th>
              </tr>
            }
          </thead>
          <tbody>
            {this.state.deranj_items.map((item) => 
              <tr key={item._id} 
                  id={"dsAl_" + item._id} 
                  className='tr-al' 
                  onContextMenu={this.props.myContext(item, this.state.deranj_items.length)}
                  onClick={this.props.chColor(item, this.state.deranj_items.length)}
              >
                <td className={item.oficiul==="UN" ? 'un'
                              : item.oficiul==="FL" ? 'fl'
                              : item.oficiul==="GL" ? 'gl'
                              : item.oficiul==="RS" ? 'rs'
                              : ''}>
                  {item.oficiul}
                </td>
                <td>{item.nr_ordine}</td>
                <td>{item.transmis}</td>
                <td>{item.sector}</td>
                <td>{item.instalatia}</td>
                <td>{item.fid_10kv}</td>
                <td className="pt">{item.pt}</td>
                <td>{item.fid_04kv}</td>
                <td className="continutul">{item.continutul}</td>
                <td>{item.data}</td>
                <td id={"vaz_" + item._id}>{item.responsabil}</td>
                <td id={"exec_" + item._id} className={item.starea.includes("Neexecutat") ? "nou-inregistrat"
                              : "executat"}>
                  {item.starea}
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <NumeleDvs totalDoc="test"/>
      </React.Fragment>
    )
  }
}

export default Deranj;