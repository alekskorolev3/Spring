
//import { Button } from './button.js';
class Button extends React.Component
{
    render()
    {
        return(
            <button onClick={this.props.onClick}>Создать</button>
        );
    }
}
class AddButton extends React.Component {

    handleClick()
    {
        alert("Hello");
    }
    render() {
        return <Button onClick={this.handleClick}/>;
    }
}
ReactDOM.render(
    <AddButton/>,
    document.getElementById('root')
);