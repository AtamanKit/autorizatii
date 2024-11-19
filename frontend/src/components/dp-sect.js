import React from 'react';
import {Dropdown} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

class DpSect extends React.Component {
    render() {
        const mySect = this.props.mySect.map((item) =>
            (
                {
                    text: item.name,
                    value: item
                }
            )
        )

        return(
            <Dropdown
                placeholder="Seclectati sector"
                clearable
                search
                selection
                options={mySect}
                onChange={this.props.ChooseSect}
            />
        )
    }
}

export default DpSect