import {Board, piece_black, piece_white, PIECES, Position, Team} from "@/coregame/interfaces/interface-game";
import {MoveValidator} from "@/coregame/moves/move-game";
import {BoardManager} from "@/coregame/boardconfig/board-manager";

export class GameUtils {

    public static getPossibleMoves(board: Board, from: Position): Position[] {
        const piece = board[from.y][from.x];
        if (!piece) return [];

        const width = board[0].length;
        const height = board.length;

        return Array.from({ length: height }, (_, y) =>
            Array.from({ length: width }, (_, x) => ({ x, y }))
        ).flat()
            .filter(pos =>
                (pos.x !== from.x || pos.y !== from.y) &&
                MoveValidator.canMove(board, piece, from, pos)
            );
    }


    public static movePiece(board: Board, from: Position, to: Position): Board {
        const newBoard = BoardManager.cloneBoard(board);
        newBoard[to.y][to.x] = newBoard[from.y][from.x];
        newBoard[from.y][from.x] = null;
        return newBoard;
    }

    public static checkGameOver(board: Board): Team | null {
        const poCount = board.flat().reduce((acc, piece) => {
            if (!piece || piece.type !== PIECES.OWNER) return acc;
            return { ...acc, [piece.team]: true };
        }, { white: false, black: false } as Record<Team, boolean>);

        if (!poCount.white) return piece_black;
        if (!poCount.black) return piece_white;
        return null;
    }
}