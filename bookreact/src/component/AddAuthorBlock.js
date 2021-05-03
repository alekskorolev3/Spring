import React from 'react';

export default class AddAuthorBlock extends React.Component 
{
    constructor(props)
    {
        super(props);
        this.state = {
            name: ''
        };
    }
    handleChange = (event) =>
    {
        const target = event.target;
        const value = target.value;
        this.setState({
            name: value
        });
    }
    async postAuthor()
    {
        try
        {
            await fetch('http://localhost:8080/addAuthor', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: this.state.name
                })
            });
        }
        catch(e)
        {
            console.log(e)
        }
    }
    render()
    {
        const isShow = this.props.isShow;
        if(isShow)
        {
            return(
                <div className="container">
                    <div className="box">
                        <div className="filter-box">
                            <div className="wrapper-fb">
                                <form>
                                    <div className="text-fb">Добавить автора:</div>
                                    <label>
                                        <input type="text" placeholder="Введите название"
                                        onChange={this.handleChange}/>
                                    </label>
                                    <button className="button" type="submit" onClick={() => this.postAuthor()}>Добавить</button>
                                </form>
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