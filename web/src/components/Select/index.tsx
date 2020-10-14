import React, { SelectHTMLAttributes } from 'react';
import './styles.css';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  name: string;
  options: Array<{
    value: string,
    label: string;
  }>;
}

const Select: React.FC<SelectProps> = ({ label, name, options, ...rest }) => {
  return (
    <div className="select-block">
      <label htmlFor={ name }> { label } </label>
      <select id={ name } value="" { ...rest }>
        <option value="" disabled hidden>
          Selecione uma opção
        </option>
        {
          options.map(item => {
            return (
              <option key={ item.value } value={ item.value }>
                { item.label }
              </option>
            );
          })
        }
      </select>
    </div>
  );
};

export default Select;