import {Board, piece_black, piece_white, PIECES, Team} from "@/coregame/interfaces/interface-game";
import {BoardConfig} from "@/coregame/boardconfig/board-config";

interface PiecePosition {
    type: PIECES;
    offsetFromRight?: number;
    offsetFromLeft?: number;
}

interface TeamPositions {
    black: PiecePosition[];
    white: PiecePosition[];
}

export class BoardManager {

    private static readonly INITIAL_POSITIONS: TeamPositions = {
        black: [
            { type: PIECES.OWNER, offsetFromRight: 0 },
            { type: PIECES.DEV, offsetFromRight: 1 },
            { type: PIECES.DESIGNER, offsetFromRight: 2 }
        ],
        white: [
            { type: PIECES.OWNER, offsetFromLeft: 0 },
            { type: PIECES.DEV, offsetFromLeft: 1 },
            { type: PIECES.DESIGNER, offsetFromLeft: 2 }
        ]
    };

    public static createInitialBoard(width: number, height: number): Board {
        const board: Board = Array.from(
            { length: height },
            () => Array(width).fill(null)
        );

        if (width >= BoardConfig.minSize && height >= BoardConfig.minSize) {
            this.initializeTeam(board, piece_black, 0);
            this.initializeTeam(board, piece_white, height - 1);
        }

        return board;
    }

    private static initializeTeam(board: Board, team: Team, row: number): void {
        const positions = this.INITIAL_POSITIONS[team];
        const width = board[0].length;

        positions.forEach((position: PiecePosition) => {
            const x = team === piece_black
                ? width - 1 - (position.offsetFromRight ?? 0)
                : (position.offsetFromLeft ?? 0);

            if (x >= 0 && x < width) {
                board[row][x] = { type: position.type, team };
            }
        });
    }

    public static cloneBoard(board: Board): Board {
        return board.map(row =>
            row.map(cell => cell ? { ...cell } : null)
        );
    }
}