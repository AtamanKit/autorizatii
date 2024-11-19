import React from 'react';
// import Enter from './enter';
import AlContext from './autorizatii-context'

class Logout extends React.Component {
        componentDidMount() {
                document.cookie = "status_cookie=non-approved";
                document.cookie = "of_cookie=";
                document.cookie = "angaj_cookie="
                document.location.href="/";
                // document.cookie = ""
        }
        render(){
                return(
                        <AlContext/>
                )
        }
}

export default Logout