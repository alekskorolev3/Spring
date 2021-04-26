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
                <ul>
                    {items.map(item => (
                        <li>{item.id}  
                             {item.name}  
                             {item.genre}
                             {item.authors.map(author => (
                                 <li>{author.name}</li>
                             ))} 
                        </li>
                    ))}
                </ul>
            )
        }
    }
}
