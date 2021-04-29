import React from 'react';

export default class AddBlock extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {
            name: '',
            genre: '',
            authors: [],
            authorsName : []
        };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event)
    {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        const options = target.options;
        const authorIdValue = target.authorIdValue;
        const authorNameValue = target.authorNameValue;
        var authorsValue = [];
        for (var i = 0, l = options.length; i < l; i++)
        {
            if (options[i].selected)
            {
                authorsValue.push(options[i].authorIdValue);
            }
        }
        this.setState({
            [name] : value,
            authorsName : authorsValue
        });
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
                    authors: this.state.authorsName
                })
            });
            console.log('Result: ' + result);
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
                console.log(result);
            }
        )
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
                                                <select multiple = {true} name="authorsName"
                                                onChange={this.handleChange}
                                                value={authors}>
                                                    {authors.map((author) => (
                                                        <option authorIdValue={author.id}
                                                                authorNameValue={author.name}>
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