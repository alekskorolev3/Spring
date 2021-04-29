import React from 'react';
import TableComponent from './component/TableComponent.js';
import NavBar from './component/NavBar.js';
import AddBlock from './component/AddBlock.js';
import EditBlock from './component/EditBlock.js';

class App extends React.Component {
    constructor(props)
    {
        super(props);
        this.handleAddChange = this.handleAddChange.bind(this);
        this.handleEditChange = this.handleEditChange.bind(this);
        this.state = {
            items: [],
            isLoaded: false,
            isShowAddBlock: false,
            isShowEditBlock: false
        }
    }
    handleAddChange()
    {
        this.setState(
            {
                isShowAddBlock: !this.state.isShowAddBlock
            }
        );
    }
    handleEditChange()
    {
        this.setState(
            {
                isShowEditBlock: !this.state.isShowEditBlock
            }
        );
    }
    render()
    {
        return (
            <div>
                <NavBar/>
                <button className="button" onClick={this.handleAddChange}>Создать книгу</button>
                <button className="button" onClick={this.handleEditChange}>Редактировать книгу</button>
                <TableComponent />
                <AddBlock isShow = {this.state.isShowAddBlock}/>
                <EditBlock isShow = {this.state.isShowEditBlock}/>
            </div>
        );
    }
}
export default App;