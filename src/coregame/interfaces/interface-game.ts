
import developer_white from "@/pieceimg/type-developer-white.png";
import developer_black from "@/pieceimg/type-developer-black.png";
import designer_white from "@/pieceimg/type-designer-white.png";
import designer_black from "@/pieceimg/type-designer-black.png";
import owner_white from "@/pieceimg/type-owner-white.png";
import owner_black from "@/pieceimg/type-owner-black.png";

import type { StaticImageData } from 'next/image';

export const piece_white = 'white';
export const piece_black = 'black';

export const piece_color_initial = 'white';

export const select_color_designer_selected = '#705a4d';
export const select_color_default_selected = '#4d3f39';

export const black_board_color_selected = 'linear-gradient(135deg, #23262b 60%, #2e3136 100%)';
export const white_board_color_selected = 'linear-gradient(135deg, #3a3d42 60%, #575a60 100%)';

export const color_of_selected_option = '#a07046';

export const max_board = 6;
export const min_board = 12;

export type Team = typeof piece_white | typeof piece_black;

export enum PIECES {
    DEV = 'DEV',
    DESIGNER = 'DESIGNER',
    OWNER = 'OWNER'
}

export interface Piece {
    type: PIECES;
    team: Team;
}

export type Board = (Piece | null)[][];

export interface Position {
    x: number;
    y: number;
}

export interface GameState {
    inputX: number;
    inputY: number;
    error: string | null;
    board: Board | null;
    started: boolean;
    currentTurn: Team;
    selected: Position | null;
    winner: Team | null;
}

export const getImgPiece = (piece: Piece): StaticImageData => {
    switch (piece.type) {
        case PIECES.DEV:
            return piece.team === piece_white ? developer_white : developer_black;
        case PIECES.DESIGNER:
            return piece.team === piece_white ? designer_white : designer_black;
        case PIECES.OWNER:
            return piece.team === piece_white ? owner_white : owner_black;
        default:
            throw new Error("Invalid piece type");
    }
};

export const getPieceTitle = (piece: Piece): string => {
    switch (piece.type) {
        case PIECES.DEV:
            return 'Developer';
        case PIECES.DESIGNER:
            return 'Designer';
        case PIECES.OWNER:
            return 'Owner';
        default:
            return '';
    }
};
