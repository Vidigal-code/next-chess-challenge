import { useState, useCallback } from 'react';
import {
    GameState,
    piece_black,
    piece_color_initial,
    piece_white,
    Position
} from '@/coregame/interfaces/interface-game';
import { BoardConfig } from '@/coregame/boardconfig/board-config';
import { MoveValidator } from '@/coregame/moves/move-game';
import { GameUtils } from '@/coregame/utils/utils-game';

export const useGameState = () => {

    const [state, setState] = useState<GameState>({
        inputX: BoardConfig.minSize,
        inputY: BoardConfig.minSize,
        error: null,
        board: null,
        started: false,
        currentTurn: piece_color_initial,
        selected: null,
        winner: null
    });

    const handlePlay = useCallback(() => {
        try {
            const board = BoardConfig.createBoard(state.inputX, state.inputY);
            setState(prev => ({
                ...prev,
                error: null,
                board,
                started: true,
                currentTurn: piece_color_initial,
                selected: null,
                winner: null
            }));
        } catch (error) {
            setState(prev => ({
                ...prev,
                error: error instanceof Error ? error.message : 'An unknown error occurred'
            }));
        }
    }, [state.inputX, state.inputY]);

    const handleReset = useCallback(() => {
        setState({
            inputX: BoardConfig.minSize,
            inputY: BoardConfig.minSize,
            error: null,
            board: null,
            started: false,
            currentTurn: piece_color_initial,
            selected: null,
            winner: null
        });
    }, []);

    const handleClick = useCallback((position: Position) => {
        setState(prev => {
            const board = prev.board;
            const selected = prev.selected;
            const winner = prev.winner;

            if (!board || winner) return prev;

            const clickedPiece = board[position.y]?.[position.x];

            if (selected) {
                if (selected.x === position.x && selected.y === position.y) {
                    return { ...prev, selected: null };
                }

                const selectedPiece = board[selected.y]?.[selected.x];
                if (
                    selectedPiece &&
                    selectedPiece.team === prev.currentTurn &&
                    MoveValidator.canMove(board, selectedPiece, selected, position)
                ) {
                    const newBoard = GameUtils.movePiece(board, selected, position);
                    const newWinner = GameUtils.checkGameOver(newBoard);
                    const nextTurn = newWinner
                        ? prev.currentTurn
                        : prev.currentTurn === piece_white
                            ? piece_black
                            : piece_white;

                    return {
                        ...prev,
                        board: newBoard,
                        selected: null,
                        winner: newWinner,
                        currentTurn: nextTurn
                    };
                }
            }

            if (clickedPiece?.team === prev.currentTurn) {
                return { ...prev, selected: position };
            }

            return prev;
        });
    }, []);

    const getPossibleMoves = useCallback((position: Position): Position[] => {
        if (!state.board) return [];
        return GameUtils.getPossibleMoves(state.board, position);
    }, [state.board]);

    const setInputX = useCallback((value: number) => {
        setState(prev => ({ ...prev, inputX: value }));
    }, []);

    const setInputY = useCallback((value: number) => {
        setState(prev => ({ ...prev, inputY: value }));
    }, []);

    const getCurrentTurn = useCallback(() => state.currentTurn, [state.currentTurn]);

    return {
        ...state,
        setInputX,
        setInputY,
        handlePlay,
        handleClick,
        handleReset,
        getPossibleMoves,
        getCurrentTurn
    };
};
