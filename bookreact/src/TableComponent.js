import React from 'react';

export default class TableComponent extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
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

    render()
    {
        const{error, isLoaded, items} = this.state;
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
                                            {
                                                <p>{author.name}</p>
                                            })}</td>
                                            <td>{item.genre}</td>
                                            <td>In progress</td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}
