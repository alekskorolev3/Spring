
//import { Button } from './button.js';
import ReactMustache from 'react-mustache';
var countOfAddClicks = 0;
var countOfEditClicks = 0;
<ReactMustache template="{{authors}}"/>
class AddBlock extends React.Component
{
    render()
    {
        return(
            <div id="addBook">
                <form method = "post" action="add">
                    <p><input type = "text" name = "name" placeholder="Введите название" /></p>
                    <p><input type = "text" name = "genre" placeholder="Введите жанр" /></p>
                    <p><select multiple name="author[]">
                            {{#authors}}
                            <option>{{name}}</option>
                            {{/authors}}
                       </select>
                    </p>
                    <button type="submit">Добавить</button>
                    <button type="cancel">Отмена</button>
                </form>
            </div>
        );
    }
}
class AButton extends React.Component
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
        if (countOfAddClicks % 2 === 0)
        {
            ReactDOM.render(
                <AddBlock />,
                document.getElementById('add')
            );
        }
        else
        {
            ReactDOM.render(
                <div></div>,
                document.getElementById('add')
            );
        }
        countOfAddClicks = countOfAddClicks + 1;

    }
    render() {
        return <AButton onClick={this.handleClick}/>;
    }
}

class EditBlock extends React.Component
{
    render()
    {
        return(
            <div>
                <form method="post" action="edit">
                    <p><input type = "text" name = "name" placeholder="Введите название"/></p>
                    <p><input type = "text" name = "genre" placeholder="Введите жанр"/></p>
                    <p><input type = "text" name = "author" placeholder="Введите автора"/></p>
                    <button type="submit" name="edit">Редактировать</button>
                    <button type="submit" name="remove">Удалить</button>
                </form>

            </div>
        );
    }
}

class EButton extends React.Component
{
    render()
    {
        return(
            <button onClick={this.props.onClick} name="{{id}}">Редакт./Удалить</button>
        );
    }
}

class EditButton extends React.Component {

    handleClick()
    {
        if (countOfEditClicks % 2 === 0)
        {
            ReactDOM.render(
                <EditBlock />,
                document.getElementById('add')
            );
        }
        else
        {
            ReactDOM.render(
                <div></div>,
                document.getElementById('add')
            );
        }
        countOfEditClicks = countOfEditClicks + 1;
    }
    render() {
        return <EButton onClick={this.handleClick}/>;
    }
}
ReactDOM.render(
    <AddButton />,
    document.getElementById('root')
);

ReactDOM.render(
    <EditButton />,
    document.getElementById('edit')
);