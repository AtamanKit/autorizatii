import React, {Component} from 'react';
import {Form} from 'semantic-ui-react';
import BurgerMenu from './burger';
import {CookiesFunc} from './cookie-funk'


// console.log(myCookies)

class Enter extends Component {
  state = {
    oficii_items: [],
    of_select: "",
    angaj_items: [],
    angaj_name: "",
    pass_item: "",
    status_log: [],
    of_status: undefined,
    name_status: undefined,
    pass_status: undefined,
    // cookie_oficiu: "",
    // cookie_angaj: "",
    // cookie_pass: "",
  }

  componentDidMount() {
    // fetch('https://api.ipify.org')
    // .then(res =>  res.text())
    // .then(result => this.setState({ip_item: result}))
    // .catch(error => console.log(error));
    
    fetch('http://localhost:5000/oficii/', {
      method: 'GET',
    })
      .then(res => res.json())
      .then(result => this.setState({oficii_items: result}))
      .catch(error => console.log(error));
    
    // this.setState({status_log: "login-page"})
    // console.log(this.myCookies)
    
    }

  OfChoose = (evt, data) => {
    // if (this.state.ip_item === "109.185.112.3" || this.state.ip_item === "37.233.58.118" 
    //     || this.state.ip_item === "46.166.46.71"){
    //   fetch(`http://localhost:5000/angajati/${data.value.abr}/`, {
    //       method: 'GET',
    //   })
    //   .then(res =>  res.json())
    //   .then(result => this.setState({angaj_items: result}))
    //   .catch(error => console.log(error));

    //   this.setState({of_select: data.value.abr})
    // } else {
    //   alert("IP gresit! Aplicatia nu va functiona!")
    // }

    fetch(`http://localhost:5000/angajati/${data.value.abr}/`, {
        method: 'GET',
    })
    .then(res =>  res.json())
    .then(result => this.setState({angaj_items: result}))
    .catch(error => console.log(error));

    this.setState({of_select: data.value.abr});

    if (data.value.abr !== undefined) {
      this.setState({of_status: true})
    } else {
      this.setState({of_status: undefined})
    }
    // console.log(data.value.abr)
  }

  NameChange = (evt, data) => {
    this.setState({angaj_name: data.value.name});
    
    if (data.value.name !== undefined) {
      this.setState({name_status: true})
    } else {
      this.setState({name_status: undefined})
    }
  }

  HandlePass = (evt, data) => {
    this.setState({pass_item: data.value})

    if (data.value !== "") {
      this.setState({pass_status: true})
    } else {
      this.setState({pass_status: undefined})
    }
  }

  HandleLogin = () => {
    if (this.state.pass_item !== "" && this.state.angaj_name !== "" && this.state.of_select !== "") {
      fetch(`http://localhost:5000/log/${this.state.of_select}/${this.state.angaj_name}/${this.state.pass_item}/`, {
        method: 'GET',
      })
      .then(res => res.json())
      .then(result => this.setState({status_log: result}))
      .catch(error => console.log(error));

      // fetch(`http://localhost:5000/dest-al/${myCookies[2]}`)
      // console.log(myCookies[2])

    } else {
      alert("Nu ati introdus unul din cimpurile obligatorii!!")
    }
    
  }

  render() {
    var myCookies = CookiesFunc();

    // Constants for semantic UI
    const myOficii = this.state.oficii_items.map((item) =>
      (
        {
          text: item.name,
          value: item,
        }
      )
    )
    const myAngaj = this.state.angaj_items.map((item) =>
    (
      {
        text: item.name,
        value: item,
      }
    )
    )
    // console.log(myAngaj)
    // const myCookies = CookiesFunc()
    // console.log(myCookies)

    if (this.state.status_log.length === 0 && myCookies[0] !== "approved") {
      return (
        <React.Fragment>
          {/* {console.log(this.state.status_log)} */}
          <img src="images/ataman_enter.png" alt="Loc pentru logo" className="logo"/>
          <h1 className="bir_disp">BIROUL DISPECERULUI</h1>
          <Form className="form-enter">
            <Form.Field>
              <h1 className="logare-text">Logare in aplicatie:</h1>
            </Form.Field>
            {/* <Form.Field required>
              <label className="obligatoriu">Toate cimpurile sint obligatorii</label>
            </Form.Field> */}
            <Form.Field required>
              {
                this.state.of_status
                ? []
                : <label className="obligatoriu">Obligatoriu</label>
              }
              <Form.Select
                  fluid
                  // label='Oficiu'
                  options={myOficii}
                  placeholder='Oficiu'
                  search
                  clearable
                  onChange={this.OfChoose}
                />
              </Form.Field>
              <Form.Field required>
                {
                  this.state.name_status
                  ? []
                  : <label className="obligatoriu">Obligatoriu</label>
                }
                <Form.Select
                  fluid
                  // label='Nume P.'
                  options={myAngaj}
                  placeholder='Nume P.'
                  search
                  clearable
                  onChange={this.NameChange}
                  // value="{this.state.cookie_angaj}"
                />
              </Form.Field>
            <Form.Field required>
              {
                this.state.pass_status
                ? []
                : <label className="obligatoriu">Obligatoriu</label>
              }
              <Form.Input fluid placeholder="Introduceti parola unica" onChange={this.HandlePass} type="password" />
            </Form.Field>
            <Form.Field>
              <button className="login" onClick={this.HandleLogin}>Login</button>
            </Form.Field>
          </Form>
        </React.Fragment>
    )} else if (this.state.status_log.status === "approved" && myCookies[0]  !== "approved") {
        document.cookie = `status_cookie=approved`;
        document.cookie = `of_cookie=${this.state.of_select}`;
        document.cookie = `angaj_cookie=${this.state.angaj_name}`;
        document.cookie = `position=${this.state.status_log.position}`
      return (
          <BurgerMenu />
    )} else if (myCookies[0] === "approved") {
    return (
        <BurgerMenu />
    )} else {
        return (
          <React.Fragment>
            <img src="images/ataman_enter.png" alt="Loc pentru logo" className="logo"/>
            <h1 className="bir_disp">BIROUL DISPECERULUI</h1>
            <Form className="form-enter">
              <Form.Field>
                <h1 className="logare-text">Logare in aplicatie:</h1>
                {/* <Form.Field required>
                <label className="obligatoriu">Toate cimpurile sint obligatorii</label>
                </Form.Field> */}
                <h3 className="no-pass">Nu corespunde numele angajatului cu parola!</h3>
              </Form.Field>
              <Form.Field required>
              {
                this.state.of_status
                ? []
                : <label className="obligatoriu">Obligatoriu</label>
              }
                <Form.Select
                  fluid
                  // label='Oficiu'
                  options={myOficii}
                  placeholder='Oficiu'
                  search
                  clearable
                  onChange={this.OfChoose}
                />
              </Form.Field>
              <Form.Field required>
                {
                  this.state.name_status
                  ? []
                  : <label className="obligatoriu">Obligatoriu</label>
                }
                <Form.Select
                  fluid
                  // label='Nume P.'
                  options={myAngaj}
                  placeholder='Nume P.'
                  search
                  clearable
                  onChange={this.NameChange}
                  // value="{this.state.cookie_angaj}"
                />
              </Form.Field>
              <Form.Field required>
                {
                  this.state.pass_status
                  ? []
                  : <label className="obligatoriu">Obligatoriu</label>
                }
                <Form.Input fluid placeholder="Introduceti parola unica" onChange={this.HandlePass} type="password" />
              </Form.Field>
              <Form.Field>
                <button className="login" onClick={this.HandleLogin}>Login</button>
              </Form.Field>
            </Form>
          </React.Fragment>
        )
    }
    
  }
}

export default Enter
