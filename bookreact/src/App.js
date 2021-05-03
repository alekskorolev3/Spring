import React from 'react';
import TableComponent from './component/TableComponent.js';
import NavBar from './component/NavBar.js';
import AddBlock from './component/AddBlock.js';
import AddAuthorBlock from './component/AddAuthorBlock.js';
class App extends React.Component {
    constructor(props)
    {
        super(props);
        this.handleAddChange = this.handleAddChange.bind(this);
        this.handleAddAuthorChange = this.handleAddAuthorChange.bind(this);
        this.state = {
            items: [],
            isLoaded: false,
            isShowAddBlock: false,
            isShowAddAuthorBlock: false
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
    handleAddAuthorChange()
    {
        this.setState(
            {
                isShowAddAuthorBlock: !this.state.isShowAddAuthorBlock
            }
        );
    }
    render()
    {
        return (
            <div>
                <NavBar/>
                <button className="button" onClick={this.handleAddChange}>Создать книгу</button>
                <button className="button" onClick={this.handleAddAuthorChange}>Добавить автора</button>
                <TableComponent />
                <AddBlock isShow = {this.state.isShowAddBlock}/>
                <AddAuthorBlock isShow = {this.state.isShowAddAuthorBlock} />
            </div>
        );
    }
}
export default App;