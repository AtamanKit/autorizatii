import AL from './autorizatii';
import ContextDeranj from './context-deranj'
import React, { useState } from 'react';
import {CookiesFunc} from './cookie-funk';
import Deranj from './deranjamente';
// import NumeleDvs from './numele-dvs';

// var al_state = false;
const myCookies = CookiesFunc()
class DeranjContext extends React.Component {
    state = {}
    // state = {
    //     dsAlNum: "proba",
    //     docLink: "",
    // }
    // state = {
        // of_select: undefined,
        // del_state: "",
        // ds_state: undefined,
        // al_state: undefined,
    // }

    HandleToday = () => {
        const myDate = new Date();
        const myYear = myDate.getFullYear().toString().slice(-2)
        const myMonth = ("0" + (myDate.getMonth() + 1)).slice(-2);
        const myDay = ("0" + myDate.getDate()).slice(-2);
        const myHour = ("0" + myDate.getHours()).slice(-2);
        const myMin = ("0" + myDate.getMinutes()).slice(-2);

        const myToday = myDay + "." + myMonth + "." + myYear + "\n " + myHour + ":" + myMin

        return myToday
    }

    RefreshFunc = () => {
        document.location.href = `/deranj-context`
    }

    DeranjFunc = () => {
        document.location.href = '/inreg-deranj'
    }
    
    ExecFunc = () => {
        const exec = document.getElementById("exec_" + this.state.deranjNum);

        if (exec.innerHTML === "Neexecutat") {

            exec.innerHTML = `Executat:\n${this.HandleToday()}\n${myCookies[1]}`;
            exec.style.backgroundColor = 'rgb(68, 112, 71)';
            exec.style.color = 'rgb(0, 0, 0)'

            fetch(`http://localhost:5000/deranjament/executat/${this.state.deranjNum}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    exec: exec.innerHTML,
                })
            })
        } else {
            alert("Deranjamentul este lichidat!")
        }
    }
    
    VazFunc = () => {
        const vazut = document.getElementById("vaz_" + this.state.deranjNum);
        
        if (vazut.innerHTML === "Semnatura") {
            // console.log(this.state.deranjNum)

            vazut.innerHTML = `Vazut:\n${this.HandleToday()}\n${myCookies[1]}`;
            // pregatire.style.color = '#fff';
            // pregatire.style.backgroundColor = 'rgb(35, 99, 145)';

            fetch(`http://localhost:5000/deranjament/vazut/${this.state.deranjNum}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    vazut: vazut.innerHTML,
                })
            })
        } else {
            alert("Deranjamentul a fost deja avizat!")
        }
    }

    // HandleContext = () => {
    //     console.log("test")
    // }
    HandleContext = (item, num) => evt => {
        // console.log(item._id)
        const { deranjNum } = this.state;
        this.setState({ deranjNum: item._id });

        this.ChColorTr(item, num)
    }

    HandleClick = (item, num) => evt => {
        this.ChColorTr(item, num)
    }

    ChColorTr(item, num) {
        for (var i = 3; i < num + 3; i++){
            document.getElementsByTagName('tr')[i].style.background = 'rgb(230, 230, 230)';
          }
        document.getElementById("dsAl_" + item._id).style.background = 'rgb(200, 200, 200)'
    }
    
    render() {
        return(
            <div>
                <Deranj 
                    myContext = {this.HandleContext} 
                    chColor = {this.HandleClick}
                />,
                <ContextDeranj
                    myRefresh = {this.RefreshFunc}
                    myVaz = {this.VazFunc} 
                    myExec = {this.ExecFunc}
                    myDeranj = {this.DeranjFunc}
                />
            </div>
            
        )
    }
}

export default DeranjContext;