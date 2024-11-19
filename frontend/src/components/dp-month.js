import React from 'react';
import {Dropdown} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

class DpMth extends React.Component {
    state = {
        month_items: [],
        monthNow: "",
    }

    componentDidMount() {
        const myDate = new Date();
        var myMonth = myDate.getMonth();

        const months = [
            {key: 1, text: "Ianuarie", value: "01"},
            {key: 2, text: "Februarie", value: "02"},
            {key: 3, text: "Martie", value: "03"},
            {key: 4, text: "Aprilie", value: "04"},
            {key: 5, text: "Mai", value: "05"},
            {key: 6, text: "Iunie", value: "06"},
            {key: 7, text: "Iulie", value: "07"},
            {key: 8, text: "August", value: "08"},
            {key: 9, text: "Septembrie", value: "09"},
            {key: 10, text: "Octombrie", value: "10"},
            {key: 11, text: "Noiembrie", value: "11"},
            {key: 12, text: "Decembrie", value: "12"},
        ];

        this.setState({month_items: months})
        this.setState({monthNow: months[myMonth].text})    
    }
    

    render(){
        
        return(
            <Dropdown
                placeholder = {this.state.monthNow}
                clearable
                search
                selection
                options = {this.state.month_items}
                onChange = {this.props.ChMth}
            />
        )
    }
}
export default DpMth;