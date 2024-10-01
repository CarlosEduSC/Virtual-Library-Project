import { useState } from 'react';
import './index.css'

interface TypeSelectProps {
    options: string[],
    onOptionSelected: (option: string) => void
}

const TypeSelect = ({ options , onOptionSelected}: TypeSelectProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string>('Selecione o tipo do usuario');

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option: string) => {
        setSelectedOption(option);
        onOptionSelected(option)
        setIsOpen(false);
    };


    return (
        <div className='type-select'>
            <label>Tipo</label>

            <div className="selected" onClick={toggleDropdown}>
                {selectedOption}

                <img className='select-arrow' alt='Selecionar o tipo do usuario' src='/images/arrow-down.png'/>
            </div>

            {isOpen && (
                <ul >
                    {options.map((option) => (
                        <li onClick={() => handleOptionClick(option)}>
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default TypeSelect