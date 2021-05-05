import React from 'react';
import EditBlock from './EditBlock.js';
export default class TableComponent extends React.Component{
    filterBooks= [];
    constructor(props)
    {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            isShow: false,
            isFilter: false,
            items: [],
            _id: 0,
            _name: '',
            _genre: '',
            authors: [],
            authorsFilter: [],
            genresFilter: [],
            authorsPost: [{
                id: 0
            }],
            genrePost: '',
            itemsFilter: []
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
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        )
        fetch("http://localhost:8080/authors_all")
        .then(result => result.json())
        .then(
            (result) =>
            {
                this.setState(
                    {
                        authorsFilter: result
                    }
                );
            }
        )
        fetch("http://localhost:8080/genres_all")
        .then(result => result.json())
        .then(
            (result) =>
            {
                this.setState(
                    {
                        genresFilter: result
                    }
                );
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        )
    }
    
    async filterBook()
    {
        try {
            let result = await fetch('http://localhost:8080/filter', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    genre: this.state.genrePost,
                    authors: this.state.authorsPost
                })
            });
            let data = await result.json();
            this.setState({
                items: data
            });
        } catch(e)
        {
            console.log(e)
        }
    }
    handleChangeFilter = (event) => {
        const value = event.target.value;
        this.setState({
            genrePost : value
        });
        event.preventDefault();
    }
    handleSelectChangeFilter = (event) => {
        const target = event.target;
        const options = target.selectedOptions;
        let authors = [];
        for (let i = 0, l = options.length; i < l; i++)
        {
            authors.push({id: options[i].value});
        }
        this.setState({
            authorsPost: authors
        });
        event.preventDefault();
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
        event.preventDefault();
    }
    handleClickButton = (event) => {
        event.preventDefault();
       this.filterBook();
       }
    render()
    {
        let{error, isLoaded, items, isShow, _id, _name, _genre, authorsFilter, genresFilter, itemsFilter} = this.state;
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
                        <div className="wrapper-fb">
                            <div className="filter-box">
                                <form>
                                <div className="text-fb">Фильтры:</div>
                                <p>
                                    <label>
                                    <select multiple = {true} name="authors"
                                    onChange = {this.handleSelectChangeFilter}>
                                        {authorsFilter.map((author) => (
                                            <option value = {author.id}>{author.name}</option>
                                        ))}
                                    </select>
                                    </label>
                                </p>
                                <p>
                                    <label>
                                    <select name="genre" onChange = {this.handleChangeFilter}>
                                        {genresFilter.map((genre) => (
                                            <option value = {genre}>{genre}</option>
                                        ))}
                                    </select>
                                    </label>
                                </p>
                                <button className="button" type="submit" onClick = {this.handleClickButton}>Найти</button>
                                </form>
                            </div>
                         </div>
                    </div>
                    <EditBlock isShow={isShow} id={_id} name={_name} genre={_genre}/>
                </div>
            )
        }

    }
}
