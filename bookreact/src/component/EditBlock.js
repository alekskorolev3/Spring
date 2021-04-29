import React from 'react';
import TableComponent from './TableComponent.js';

export default class EditBlock extends React.Component
{
    
    render()
    {
        const isShow = this.props.isShow;
        if (isShow)
        {
            return(
                <div className="container">
                    <div className="box">
                        <div className="edit-block">
                            <div className="wrapper-tb">
                                <div>
                                    <form>
                                        <div className="text-fb">Редактировать</div>
                                        <input type="hidden" name="id"/>
                                        <label>
                                            <input type="text" name="name" placeholder="Введите название"/>
                                        </label>
                                        <label>
                                        <input type="text" name="genre" placeholder="Введите жанр"/>
                                        </label>
                                        <p>Выберите автора(-ов):</p>
                                        <label>
                                            <select multiple ngModel name="authors">
                                                <option disabled selected>Выберите автора(-ов)</option>
                                            </select>
                                        </label>
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