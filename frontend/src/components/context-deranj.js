import React from 'react';
import '../styles/context-autorizatii.css';
import {Menu, Icon, Dropdown} from 'semantic-ui-react';

class ContextDeranj extends React.Component {
    state = {
        visible: false,
    };

    componentDidMount() {
        document.addEventListener('contextmenu', this._handleContextMenu);
        document.addEventListener('click', this._handleClick);
        document.addEventListener('scroll', this._handleScroll);
    };

    componentWillUnmount() {
      document.removeEventListener('contextmenu', this._handleContextMenu);
      document.removeEventListener('click', this._handleClick);
      document.removeEventListener('scroll', this._handleScroll);
    }
    
    _handleContextMenu = (event) => {
        if (
            event.target.tagName === 'TD'
            && window.getSelection().isCollapsed
            ) {
                event.preventDefault();
                
                this.setState({ visible: true });
                
                const clickX = event.clientX;
                const clickY = event.clientY;
                const screenW = window.innerWidth;
                const screenH = window.innerHeight;
                const rootW = this.root.offsetWidth;
                const rootH = this.root.offsetHeight;
                
                const right = (screenW - clickX) > rootW;
                const left = !right;
                const top = (screenH - clickY) > rootH;
                const bottom = !top;
                
                if (right) {
                    this.root.style.left = `${clickX + 5}px`;
                }
                
                if (left) {
                    this.root.style.left = `${clickX - rootW - 5}px`;
                }
                
                if (top) {
                    this.root.style.top = `${clickY + 5}px`;
                }
                
                if (bottom) {
                    this.root.style.top = `${clickY - rootH - 5}px`;
                }
            }
    };

    _handleClick = (event) => {
        const { visible } = this.state;
        const wasOutside = !(event.target.contains === this.root);
        
        if (wasOutside && visible) this.setState({ visible: false, });
    };

    _handleScroll = () => {
        const { visible } = this.state;
        
        if (visible) this.setState({ visible: false, });
    };

    handleItemClick = (e, { name }) => this.setState({ activeItem: name });
    
    render() {
        const { visible } = this.state;
        const { activeItem } = this.state
        
        return(visible || null) && 
            <div ref={ref => {this.root = ref}} className="contextMenu">
                <Menu vertical size='large'>
                    <Menu.Item
                        name='refresh'
                        active={activeItem === 'refresh'}
                        onClick={this.props.myRefresh}
                    >
                        Reload
                        <Icon name='refresh' />
                    </Menu.Item>
                    <Menu.Item>
                        Editare deranjament
                        <Icon name='edit' />
                            <Menu.Menu>
                                <Menu.Item
                                    onClick={this.props.myVaz}
                                >
                                    Am vazut
                                    <Icon name='eye' />
                                </Menu.Item>
                                <Menu.Item
                                    onClick={this.props.myExec}
                                >
                                    Am executat
                                    <Icon name='pencil alternate' />
                                </Menu.Item>
                            </Menu.Menu>
                    </Menu.Item>
                    <Dropdown item text='Inregistrati'>
                        <Dropdown.Menu>
                            <Dropdown.Item
                                text='Deranjament'
                                onClick={this.props.myDeranj}
                            />
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu>
            </div>
    };
}
export default ContextDeranj;