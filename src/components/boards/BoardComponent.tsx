import React from 'react';
import {SquareBoardComponent} from '@/components/square/SquareBoardComponent';
import {BoardComponentProps} from "@/coregame/interfaces/interface-component-props";
import './BoardComponent.scss';

export const BoardComponent: React.FC<BoardComponentProps> = ({
                                                                  board,
                                                                  selected,
                                                                  onClick,
                                                                  getPossibleMoves,
                                                                  isDemo,
                                                                  demoX,
                                                                  demoY,
                                                                  CurrentTurn
                                                              }) => {
    if (!board) {
        return (
            <div className="board-empty">
                <h2>Select the board size to start with!</h2>
            </div>
        );
    }

    const height = board.length;

    const possibleMoves = selected ? getPossibleMoves(selected.x, selected.y) : [];

    const possibleMoveSet = new Set(
        possibleMoves.map(move => `${move.x},${move.y}`)
    );

    return (
        <div className={`board-container ${isDemo ? 'board-demo' : ''}`}>
            <h1 className="board-title">
                {isDemo ? 'Board Preview' : 'Chess Challenge'}
            </h1>

            <div className="board-wrapper">
                {board.map((row, y) => (
                    <div key={y} className="board-row">
                        {row.map((piece, x) => (
                            <SquareBoardComponent
                                key={`${x}-${y}`}
                                x={x}
                                y={y}
                                piece={piece}
                                isSelected={selected?.x === x && selected?.y === y}
                                isPossibleMove={possibleMoveSet.has(`${x},${y}`)}
                                showCoordX={y === height - 1}
                                showCoordY={x === 0}
                                onClick={() => onClick(x, y)}
                                totalRows={height}
                            />
                        ))}
                    </div>
                ))}
            </div>

            {!isDemo && (
                <div className="board-info">
                    {`The move is for the ${CurrentTurn} player`}
                </div>
            )}

            {isDemo && (
                <div className="board-info">
                    {demoX && demoY ? `${demoX}x${demoY} board` : 'Adjust dimensions using the controls below'}
                </div>
            )}
        </div>
    );
};