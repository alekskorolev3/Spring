import React from 'react';

export default class EditBlock extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            authors: [],
            id: this.props.id,
            name: '',
            genre: '',
            authorsPost: [{
                id: 1,
                name: 'Александр Солженицын'
            }]
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
    }
    handleChange = (event) => 
    {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            [name]: value,
            id: this.props.id
        });
        event.preventDefault();
    }
    handleSelectChange = (event) =>
    {
        const target = event.target;
        const name = target.name;
        const options = target.selectedOptions;
        let authors = [];
        for (var i = 0, l = options.length; i < l; i++) 
        {
            authors.push({id: options[i].value, name: options[i].value});
        }
        this.setState({
            [name]: authors
        });
    }
    async editBook()
    {
        try {

            let result = await fetch('http://localhost:8080/edit', {
                method: 'put',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: this.state.id,
                    name: this.state.name,
                    genre: this.state.genre,
                    authors: this.state.authorsPost
                })
            });
        } catch(e)
        {
            console.log(e)
        }
    }
    async deleteBook()
    {
        try {

            let result = await fetch(`http://localhost:8080/delete/${this.props.id}`, {
                method: 'delete',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: this.props.id,
                })
            });
        } catch(e)
        {
            console.log(e)
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
            }
        )
    }
    render()
    {
        const name = this.props.name;
        const genre = this.props.genre;
        let isShow = this.props.isShow;
        if (isShow)
        {
            const {authors} = this.state;
            return(
                <div className="container">
                    <div className="box">
                        <div className="edit-block">
                            <div className="wrapper-tb">
                                <div>
                                    <form>
                                        <div className="text-fb">Редактировать</div>
                                        <label>
                                            <input type="text" name="name" 
                                            placeholder="Введите название"
                                            //value={name}
                                            onChange = {this.handleChange}/>
                                        </label>
                                        <label>
                                            <input type="text" name="genre" 
                                            placeholder="Введите жанр"
                                            //value = {genre}
                                            onChange = {this.handleChange}/>
                                        </label>
                                        <p>Выберите автора(-ов):</p>
                                        <label>
                                            <select multiple = {true} name="authorsPost"
                                                    onChange = {this.handleSelectChange}>
                                                {authors.map((author) => (
                                                    <option value = {author.id}>
                                                        {author.name}
                                                    </option>
                                                    ))}
                                            </select>
                                        </label>
                                        <button type="submit" className="button"
                                        onClick={()=>this.editBook()}>Редактировать</button>
                                        <button type="submit" className="button"
                                        onClick={()=>this.deleteBook()}>Удалить</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        else
        {
            return <div></div>
        }
        
    }
}