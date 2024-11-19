import React from 'react';
import {Dropdown} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

class DpPt extends React.Component {
    render() {
        const myPt = this.props.myPt.map((item) =>
            ( 
                {
                    text: item.pt,
                    value: item
                }
            )
        )
        // console.log(myPt)
        return(
            <Dropdown
                placeholder="Seclectati PT"
                clearable
                selection
                search
                options={myPt}
                onChange={this.props.ChoosePt}
            />
        )
    }
}

export default DpPt