import { useState } from 'react';
import './index.css'

interface SelectProps {
    label?: string
    placeholder?: string
    options: string[]
    onOptionSelected: (option: string) => void
}

const Select = ({label = "", placeholder = "", options , onOptionSelected}: SelectProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string>(placeholder);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option: string) => {
        setSelectedOption(option);
        onOptionSelected(option)
        setIsOpen(false);
    };


    return (
        <div className='select'>
            <label>{label}</label>

            <div className="selected" onClick={toggleDropdown}>
                {selectedOption}

                <img className='select-arrow' alt='Selecione uma das opções' src='/images/arrow-down.png'/>
            </div>

            {isOpen && (
                <ul >
                    {options.map((option) => (
                        <li key={option} onClick={() => handleOptionClick(option)}>
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default Select