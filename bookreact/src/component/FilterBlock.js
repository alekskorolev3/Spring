import React from 'react';
export default class FilterBlock extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {
            authors: [],
            genres: [],
            authorsPost: [{
                id: 0
            }],
            genrePost: '',
            isFilter: false
        }

    }
    componentDidMount()
    {
        fetch("http://localhost:8080/authors_all")
        .then(result => result.json())
        .then(
            (result) =>
            {
                this.setState(
                    {
                        authors: result
                    }
                );
                console.log(result);
            }
        )
        fetch("http://localhost:8080/genres_all")
        .then(result => result.json())
        .then(
            (result) =>
            {
                this.setState(
                    {
                        genres: result
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
    handleChange = (event) => {
        const value = event.target.value;
        this.setState({
            genrePost : value
        });
    }
    handleSelectChange = (event) => {
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
            alert(data);
        } catch(e)
        {
            console.log(e)
        }
    }
    render()
    {
        const {authors, genres} = this.state;
        return (
            <div className="wrapper-fb">
                <div className="filter-box">
                    <form>
                    <div className="text-fb">Фильтры:</div>
                    <p>
                        <label>
                        <select multiple = {true} name="authors"
                        onChange = {this.handleSelectChange}>
                            {authors.map((author) => (
                                <option value = {author.id}>{author.name}</option>
                            ))}
                        </select>
                        </label>
                    </p>
                    <p>
                        <label>
                        <select name="genre" onChange = {this.handleChange}>
                            {genres.map((genre) => (
                                <option value = {genre}>{genre}</option>
                            ))}
                        </select>
                        </label>
                    </p>
                    <button className="button" type="submit" onClick = {() => this.filterBook()}>Найти</button>
                    </form>
                </div>
            </div>
        )
    }
}