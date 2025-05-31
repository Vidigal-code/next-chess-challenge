import {Board, Piece, Piece as PieceType, Position, Team} from "@/coregame/interfaces/interface-game";

export interface BoardComponentProps {
    board: Board | null;
    selected: Position | null;
    onClick: (x: number, y: number) => void;
    getPossibleMoves: (x: number, y: number) => Position[];
    isDemo: boolean;
    demoX?: number;
    demoY?: number;
    CurrentTurn: Team;
}

export interface ControlsBarProps {
    inputX: number;
    inputY: number;
    setInputX: (value: number) => void;
    setInputY: (value: number) => void;
    handlePlay: () => void;
}

export interface LabeledNumberInputProps {
    label: string;
    value: number;
    onChange: (value: number) => void;
}

export interface PieceProps {
    piece: PieceType;
}

export interface SquareProps {
    x: number;
    y: number;
    piece: Piece | null;
    isSelected: boolean;
    isPossibleMove?: boolean;
    showCoordX?: boolean;
    showCoordY?: boolean;
    onClick: () => void;
    totalRows: number;
}

export interface VictoryModalProps {
    winner: Team;
    handleReset: () => void;
    handleGoHome: () => void;
}