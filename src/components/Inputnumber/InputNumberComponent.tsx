import React, { useEffect, useState } from 'react';
import { LabeledNumberInputProps } from "@/coregame/interfaces/interface-component-props";
import { BoardConfig } from "@/coregame/boardconfig/board-config";
import './InputNumberComponent.scss';

export const InputNumberComponent: React.FC<LabeledNumberInputProps> = ({
                                                                          label,
                                                                          value,
                                                                          onChange
                                                                      }) => {

    const [inputValue, setInputValue] = useState<string>(value.toString());

    useEffect(() => {
        setInputValue(value.toString());
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        if (value === '') {
            setInputValue('');
            return;
        }

        const newValue = parseInt(value);

        if (isNaN(newValue)) {
            return;
        }

        const clampedValue = Math.max(
            BoardConfig.minSize,
            Math.min(BoardConfig.maxSize, newValue)
        );

        if (clampedValue >= BoardConfig.minSize && clampedValue <= BoardConfig.maxSize) {
            setInputValue(clampedValue.toString());
            onChange(clampedValue);
        }
    };

    return (
        <div className="input-number">
            <span className="input-number__label">
                {label}
            </span>
            <div className="input-number__wrapper">
                <input
                    type="number"
                    min={BoardConfig.minSize}
                    max={BoardConfig.maxSize}
                    value={inputValue}
                    onChange={handleChange}
                    className="input-number__field"
                />
            </div>
        </div>
    );
};