import React from 'react';
import {PieceComponent} from "@/components/piece/PieceComponent";
import {SquareProps} from "@/coregame/interfaces/interface-component-props";
import {
    black_board_color_selected, color_of_selected_option,
    PIECES,
    select_color_default_selected,
    select_color_designer_selected,
    white_board_color_selected
} from "@/coregame/interfaces/interface-game";
import './SquareBoardComponent.scss';

export const SquareBoardComponent: React.FC<SquareProps> = ({
                                                                x,
                                                                y,
                                                                piece,
                                                                isSelected,
                                                                isPossibleMove,
                                                                showCoordX,
                                                                showCoordY,
                                                                onClick,
                                                                totalRows
                                                            }) => {
    const isDark = (x + y) % 2 === 1;

    const background = isDark
        ? black_board_color_selected
        : white_board_color_selected;

    const getColor = piece?.type == PIECES.DESIGNER ?
        select_color_designer_selected : select_color_default_selected;

    const selectedOverlay = isSelected ? getColor : 'transparent';

    const displayY = totalRows - y;

    return (
        <div
            onClick={onClick}
            className={`square-board 
            ${isDark ? 'square-board--dark' : 'square-board--light'}
            ${isSelected ? 'square-board--selected' : ''} 
            ${isPossibleMove ? 'square-board--possible-move' : ''}`}
            style={{
                background,
            }}
        >
            {isSelected && (
                <div
                    className="square-board__selected-overlay"
                    style={{
                        background: selectedOverlay,
                    }}
                />
            )}

            {showCoordX && (
                <span className="square-board__coord-x">
                    {String.fromCharCode(65 + x)}
                </span>
            )}

            {showCoordY && (
                <span className="square-board__coord-y">
                    {displayY}
                </span>
            )}

            {piece && <PieceComponent piece={piece}/>}

            {isPossibleMove && (
                <span
                    className="square-board__move-indicator"
                    style={{
                        background: color_of_selected_option,
                    }}
                />
            )}
        </div>
    );
};