import React from 'react';
import {Dropdown} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

class DpAngaj extends React.Component {
    render() {
        const myAngaj = this.props.myAngaj.map((item) =>
            ( 
                {
                    text: item.name  + " gr. " + item.gr_ts,
                    value: item
                }
            )
        )
        // console.log(myPt)
        return(
            <Dropdown
                placeholder="Sef de lucrari"
                clearable
                selection
                search
                options={myAngaj}
                onChange={this.props.ChooseAngaj}
            />
        )
    }
}

export default DpAngaj