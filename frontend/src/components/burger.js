import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import '../styles/burger.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import AlContext from './autorizatii-context';
import DeranjContext from './deranj-context';
import NeprAnual from './nepr-anual';
import NeprLunar from './nepr-lunar';
import ProgAnual from './prog-anual'
import ProgLunar from './prog-lunar';
import Logout from './logout';
import InregAl from './inreg-al';
// import DestAl from './dest-al';
import AdaugPt from './adaug-pt';
import ListaPt from './lista-pt';
import ListaAngaj from './lista-angaj';
import AdaugAngaj from './adaug-angaj';
import StergAngaj from './sterg-angaj';
import StergPt from './sterg-pt';
// import InregDs from './inreg-ds';
import InregDec from './inreg-dec';
import InregSig from './inreg-sig';
import CorectAl from './corect-al';
import CorectDs from './corect-ds';
import InregDeranj from './inreg-deranj';
import {NowDate} from './now-date';
import ExportExcel from './export-excel';
import ListaSig from './lista-sigilii';

class BurgerMenu extends React.Component {
  state = {
    menu: "",
  }

  componentDidMount() {
    setInterval(this.ReloadWindow, 1000*60)
  }

  ReloadWindow() {
    const myToday = NowDate();
    if ((
          myToday[4] === "08" || myToday[4] === "20"
        ) 
          && myToday[5] === "00"
        ) {
    document.cookie = "status_cookie=non-approved";
    document.cookie = "of_cookie=";
    document.cookie = "angaj_cookie="
    document.location.href="/";

    document.location.href = "/"
    }
  }

  render () {
      return (
        <React.Fragment>
          {/* <NumeleDvs /> */}
        <Router>
          <Menu>
            <h3 className="no-link">REGISTRE</h3>
            <Link to="/"><p style={{paddingLeft: '50px'}}>Autorizatii (AL/DS)</p></Link>
            <Link to="/deranj-context"><p style={{paddingLeft: '50px'}}>Deranjamente</p></Link>
            <Link to="/lista-sig"><p style={{paddingLeft: '50px'}}>Sigilii demontate</p></Link>
            <h3 className="no-link">INREGISTRATI</h3>
            <Link to="/inreg-al"><p style={{paddingLeft: '50px'}}>Autorizatie (Dispozitie)</p></Link>
            {/* <Link to="/inreg-ds"><p style={{paddingLeft: '50px'}}>Dispozitie</p></Link> */}
            <Link to="/inreg-dec"><p style={{paddingLeft: '50px'}}>Deconectare<br />neprogramata</p></Link>
            <Link to="/inreg-deranj"><p style={{paddingLeft: '50px'}}>Deranjament</p></Link>
            <Link to="/inreg-sig"><p style={{paddingLeft: '50px'}}>Demontare sigiliu</p></Link>
            <h3 className="no-link">DECONECTARI<br />NEPROGRAMATE</h3>
            <Link to="/nepr-anual"><p style={{paddingLeft: '50px'}}>Anual (nepr.)</p></Link>
            <Link to="/nepr-lunar"><p style={{paddingLeft: '50px'}}>Lunar (nepr.)</p></Link>
            <h3 className="no-link">DECONECTARI<br />PROGRAMATE</h3>
            <Link to="/prog-anual"><p style={{paddingLeft: '50px'}}>Anual (prog.)</p></Link>
            <Link to="/prog-lunar"><p style={{paddingLeft: '50px'}}>Lunar (prog.)</p></Link>
            <h3 className="no-link">LISTE</h3>
            <Link to="/lista-pt"><p style={{paddingLeft: '50px'}}>Lista PT</p></Link>
            <Link to="/lista-angaj"><p style={{paddingLeft: '50px'}}>Angajati</p></Link>
            <h3 className="no-link">SETARI</h3>
            <Link to="/adaug-pt"><p style={{paddingLeft: '50px'}}>Adaugati PT</p></Link>
            <Link to="/sterg-pt"><p style={{paddingLeft: '50px'}}>Sergeti PT</p></Link>
            <Link to="/adaug-angaj"><p style={{paddingLeft: '50px'}}>Adaugati angajat</p></Link>
            <Link to="/sterg-angaj"><p style={{paddingLeft: '50px'}}>Stergeti angajat</p></Link>
            {/* <Link to="/dest-al"><p style={{paddingLeft: '50px'}}>Destinatie resurse</p></Link> */}
            <Link to="/excel"><h3>EXPORT EXCEL</h3></Link>
            <Link to="/logout"><h3>LOGOUT</h3></Link>
          </Menu>
            <Link to="/corect-al"></Link>
            <Link to="/corect-ds"></Link>
            <Switch>
              <Route path="/corect-ds">
                <CorectDs />
              </Route>
              <Route path="/corect-al">
                <CorectAl />
              </Route>
              <Route path="/inreg-deranj">
                <InregDeranj />
              </Route>
              <Route path="/inreg-sig">
                <InregSig/>
              </Route>
              <Route path="/lista-angaj">
                <ListaAngaj />
              </Route>
              <Route path="/lista-pt">
                <ListaPt />
              </Route>
              <Route path="/inreg-dec">
                <InregDec />
              </Route>
              {/* <Route path="/inreg-ds">
                <InregDs />
              </Route> */}
              <Route path="/inreg-al">
                <InregAl />
              </Route>
              <Route path="/sterg-angaj">
                <StergAngaj />
              </Route>
              <Route path="/adaug-angaj">
                <AdaugAngaj />
              </Route>
              <Route path="/adaug-pt">
                <AdaugPt />
              </Route>
              <Route path="/sterg-pt">
                <StergPt />
              </Route>
              {/* <Route path="/dest-al">
                <DestAl />
              </Route> */}
              <Route path="/excel">
                <ExportExcel />
              </Route>
              <Route path="/logout">
                <Logout />
              </Route>
              <Route path="/prog-lunar">
                <ProgLunar />
              </Route>
              <Route path="/prog-anual">
                <ProgAnual />
              </Route>
              <Route path="/nepr-lunar">
                <NeprLunar />
              </Route>
              <Route path="/nepr-anual">
                <NeprAnual />
              </Route>
              <Route path="/lista-sig">
                <ListaSig/>
              </Route>
              <Route path="/deranj-context">
                <DeranjContext />
              </Route>
              <Route path="/">
                <AlContext />
              </Route>
            </Switch>
        </Router>
        </React.Fragment>
        
      );
    // }
  }
}

export default BurgerMenu