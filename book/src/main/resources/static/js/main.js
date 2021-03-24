class AddButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div>
                <button>Создать</button>
            </div>
        );
    }
}

ReactDOM.render(
    <AddButton />,
    document.getElementById('add')
);
ReactDOM.render(
    <button>Редакт./Удалить</button>,
    document.getElementById('edit')
);