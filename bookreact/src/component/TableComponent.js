import React from 'react';
import EditBlock from './EditBlock.js';
import FilterBlock from './FilterBlock.js';
export default class TableComponent extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            isShow: false,
            items: [],
            _id: 0,
            _name: '',
            _genre: '',
            authors: []
        };
        this.handleClick = this.handleClick.bind(this);
    }
    
    componentDidMount()
    {
        fetch("http://localhost:8080/books_all")
        .then(result => result.json())
        .then(
            (result) =>
            {
                this.setState(
                    {
                        isLoaded: true,
                        items: result
                    }
                );
                console.log(result);
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        )
    }
    handleClick = (event) =>
    {
        let book = {
            id: 0,
            name: '',
            genre: ''
        };
        book = JSON.parse(event.target.value);
        this.setState({
            isShow : !this.state.isShow,
            _id : book.id,
            _name: book.name,
            _genre: book.genre
        });
        
    }
    render()
    {
        const{error, isLoaded, items, isShow, _id, _name, _genre} = this.state;
        if (error)
        {
            return <p>Error {error.message}</p>
        }
        else if (!isLoaded)
        {
            return <p>Loading...</p>
        }
        else 
        {
            return(
                
                <div className="container">
                    <div className="box">
                        <div className="wrapper-tb">
                            <div className="table-box">
                                <table className="main-table">
                                    <tr>
                                        <th>Книга</th>
                                        <th>Автор</th>
                                        <th>Жанр</th>
                                        <th>Действие</th>
                                    </tr>
                                    {items.map((item) =>
                                    (
                                        <tr>
                                            <td>{item.name}</td>
                                            <td>{item.authors.map((author) =>
                                            (
                                                <p>{author.name}</p>
                                            ))}</td>
                                            <td>{item.genre}</td>
                                            <td><button className="button" onClick={this.handleClick} 
                                                value = {JSON.stringify(item)}>Редакт./Удалить</button></td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                        </div>
                        <FilterBlock />
                    </div>
                    <EditBlock isShow={isShow} id={_id} name={_name} genre={_genre}/>
                </div>
            )
        }

    }
}
