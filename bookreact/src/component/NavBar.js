import React from 'react';
export default class NavBar extends React.Component
{
    render()
    {
        return(
            <div className="header-panel">
                <div className="topNav">
                    <a href="./">Домой</a>
                    <a href="./">Книги</a>
                    <a href="./">Авторы</a>
                    <a href="./">Жанр</a>
                    <a href="./">Книги/авторы/жанры</a>
                </div>
            </div>
        )
    }
}