import React from 'react';
import '../styles/numele-dvs.css';
import {CookiesFunc} from './cookie-funk'

const myCookies= CookiesFunc();

class NumeleDvs extends React.Component {
    render() {
        // const divStyle = {
        //     color: 'rgb(255, 255, 255)',
        //     width: '100px',
        // }
        return(
            <div className="numDvs">
                Numele dvs. este:
                <h2>{myCookies[1]}</h2>
            </div>
        )
    }
};

export class Total extends React.Component {
    render() {
        return <p className="total">Total: {this.props.totalDoc}</p>
    }
}

export default NumeleDvs;