import React from 'react';

export default class AddBlock extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {
            name: '',
            genre: '',
            authors: [],
            authorsPost: [{
                id: 1,
                name: 'Александр Солженицын'
            }]
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
    }
    async postBook()
    {
        try {

            let result = await fetch('http://localhost:8080/add', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: this.state.name,
                    genre: this.state.genre,
                    authors: this.state.authorsPost
                })
            });
            alert(this.state.name);
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
    handleChange = (event) =>
    {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name] : value,
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
    
    render()
    {
        const{authors} = this.state;
        const isShow = this.props.isShow;
        if (isShow)
        {
            return(
                <div className="container">
                    <div className="box">
                        <div className="add-block">
                            <div className="wrapper-tb">
                                <div>
                                    <form>
                                        <div className="text-fb">Создать книгу:</div>
                                            <label>
                                                <input type="text" name="name" 
                                                placeholder="Введите название" 
                                                onChange={this.handleChange}/>
                                            </label>
                                            <label>
                                                <input type="text" name="genre" 
                                                placeholder="Введите жанр" 
                                                onChange={this.handleChange}/>
                                            </label>
                                            <label>
                                                <select multiple = {true} name="authorsPost"
                                                onChange={this.handleSelectChange}>
                                                    {authors.map((author) => (
                                                        <option value = {author.id}>
                                                            {author.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </label>
                                        <button className="button" type="submit" onClick={()=>this.postBook()}>Добавить</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        else{
            return <div></div>
        }
        
    }
}