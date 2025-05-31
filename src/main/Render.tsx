import React, { FC } from 'react';
import { BoardComponent } from "@/components/boards/BoardComponent";
import { useGameState } from "@/main/gamestate/useGameState";
import { BoardConfig } from "@/coregame/boardconfig/board-config";
import { BoardControlComponent } from "@/components/boardcontrol/BoardControlComponent";
import { WinnerModalComponent } from "@/components/winner/WinnerModalComponent";
import './Render.scss'

const Render: FC = () => {

    const {
        board,
        selected,
        winner,
        started,
        error,
        inputX,
        inputY,
        setInputX,
        setInputY,
        handlePlay,
        handleClick,
        handleReset,
        getPossibleMoves,
        getCurrentTurn
    } = useGameState();

    const currentTurn = getCurrentTurn();

    const renderGameBoard = () => {
        if (!started || !board) return null;

        return (
            <BoardComponent
                board={board}
                selected={selected}
                onClick={(x: number, y: number) => handleClick({ x, y })}
                getPossibleMoves={(x: number, y: number) => getPossibleMoves({ x, y })}
                isDemo={false}
                CurrentTurn={currentTurn}
            />
        );
    };

    const renderDemoBoard = () => {
        if (
            inputX < BoardConfig.minSize ||
            inputY < BoardConfig.minSize
        ) return null;

        try {
            const demoBoard = BoardConfig.createBoard(inputX, inputY);
            return (
                <BoardComponent
                    board={demoBoard}
                    selected={null}
                    onClick={() => {}}
                    getPossibleMoves={() => []}
                    isDemo={true}
                    demoX={inputX}
                    demoY={inputY}
                    CurrentTurn={currentTurn}
                />
            );
        } catch (e) {
            return <div className="error-message">Error creating demo board.</div>;
        }
    };

    const renderControls = () => {
        if (started) return null;

        return (
            <>
                {renderDemoBoard()}
                <BoardControlComponent
                    inputX={inputX}
                    inputY={inputY}
                    setInputX={setInputX}
                    setInputY={setInputY}
                    handlePlay={handlePlay}
                />
                {error && <div className="error-message">{error}</div>}
            </>
        );
    };

    const renderVictoryModal = () => {
        if (!winner) return null;

        return (
            <WinnerModalComponent
                winner={winner}
                handleReset={handleReset}
                handleGoHome={handleReset}
            />
        );
    };

    return (
        <div className="render-container">
            {renderControls()}
            {renderGameBoard()}
            {renderVictoryModal()}
        </div>
    );
};

export default Render;
