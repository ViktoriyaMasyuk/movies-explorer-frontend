import './FilterCheckbox.css';
import React from 'react';

function FilterCheckbox() {
    return (
        <div className='checkbox'>
            <label className='checkbox__label'>
                <input className='checkbox__input' id="checkbox" type="checkbox"></input>
                <div className="checkbox__checkmark"></div>
                <div className="checkbox__body">Короткометражки</div>
            </label>
        </div>
    );
};
export default FilterCheckbox;