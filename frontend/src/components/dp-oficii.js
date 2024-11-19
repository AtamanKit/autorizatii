import React from 'react';
import {Dropdown} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
// import '../styles/dp-oficii.css';

class DpOficii extends React.Component {
    state = {
        oficii_items: []
    }

    componentDidMount() {
        fetch('http://localhost:5000/oficii/', {
            method: 'GET',
          })
            .then(res =>  res.json())
            .then(result => this.setState({oficii_items: result}))
            .catch(error => console.log(error));
    }

    // myChoose = (event, data) => {
    //     console.log(data.value.name)
    // }  
    
    render() {
        const myOficii = this.state.oficii_items.map((item) =>
            (
                {
                    text: item.name,
                    value: item,
                }
            )
        )
        return(
            <Dropdown
                placeholder="Selectati oficiu"
                search
                clearable
                selection
                options={myOficii}
                onChange={this.props.myChoose}
            />
        );
    }
}

export default DpOficii