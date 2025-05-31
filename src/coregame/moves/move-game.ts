import { Board, Piece, PIECES, Position } from "@/coregame/interfaces/interface-game";

/**
 * The MoveValidator class contains static methods to validate piece movements on the board.
 *
 * Piece Types:
 * - DEV: Moves like a Rook (straight lines up to 3 tiles)
 * - DESIGNER: Moves like a Knight (L-shape)
 * - OWNER: Moves like a King (1 tile in any direction)
 */
export class MoveValidator {

    /**
     * Checks if the path between two positions is clear (no pieces in between).
     * Only used for DEV (Rook-like movement).
     */
    private static isPathClear(board: Board, from: Position, to: Position): boolean {
        const dx = Math.sign(to.x - from.x);
        const dy = Math.sign(to.y - from.y);
        const steps = Math.max(Math.abs(to.x - from.x), Math.abs(to.y - from.y));

        // If moving only one tile, path is always clear.
        if (steps <= 1) return true;

        // Check each tile along the path (excluding destination).
        for (let i = 1; i < steps; i++) {
            const x = from.x + dx * i;
            const y = from.y + dy * i;

            if (!this.isValidPosition(board, { x, y }) || board[y][x] !== null) {
                return false;
            }
        }

        return true;
    }

    /**
     * Validates a move by the DEV piece (moves like a chess rook and bishop combined).
     * The DEV (Rook-like movement) can move any number of squares in a straight line: vertically, horizontally, or diagonally,
     * as long as the path to the destination is clear.
     */
    private static validateDevMove(board: Board, piece: Piece, from: Position, to: Position): boolean {
        const dx = to.x - from.x;
        const dy = to.y - from.y;

        const absDx = Math.abs(dx);
        const absDy = Math.abs(dy);

        // Valid move patterns: vertical, horizontal, or diagonal
        const isValidPattern = (
            (absDx === 0 && absDy > 0 && absDy <= board.length) ||      // Vertical move
            (absDy === 0 && absDx > 0 && absDx <= board.length) ||      // Horizontal move
            (absDx === absDy && absDx > 0 && absDx <= board.length)     // Diagonal move
        );

        // Reject move if the pattern is invalid or the path is obstructed
        if (!isValidPattern || !this.isPathClear(board, from, to)) {
            return false;
        }

        const target = board[to.y][to.x];

        // A piece cannot capture another piece from the same team
        return !target || target.team !== piece.team;
    }



    /**
     * Validates a move for the DESIGNER piece (Knight-like).
     * Moves in L-shapes: 2 in one direction and 1 in the perpendicular.
     */
    private static validateDesignerMove(board: Board, piece: Piece, from: Position, to: Position): boolean {
        const absDx = Math.abs(to.x - from.x);
        const absDy = Math.abs(to.y - from.y);

        const isValidPattern = (absDx === 2 && absDy === 1) || (absDx === 1 && absDy === 2);

        if (!isValidPattern) return false;

        const target = board[to.y][to.x];
        return !target || target.team !== piece.team;
    }

    /**
     * Validates a move for the OWNER piece (King-like).
     * Can move one tile in any direction.
     */
    private static validatePoMove(board: Board, piece: Piece, from: Position, to: Position): boolean {
        const absDx = Math.abs(to.x - from.x);
        const absDy = Math.abs(to.y - from.y);

        const isValidPattern = absDx <= 1 && absDy <= 1 && (absDx > 0 || absDy > 0);

        if (!isValidPattern) return false;

        const target = board[to.y][to.x];
        return !target || target.team !== piece.team;
    }

    /**
     * Validates whether a position is within the board's boundaries.
     */
    private static isValidPosition(board: Board, pos: Position): boolean {
        return (
            board &&
            board.length > 0 &&
            board[0].length > 0 &&
            pos.x >= 0 && pos.x < board[0].length &&
            pos.y >= 0 && pos.y < board.length
        );
    }

    /**
     * General validation method that checks if a move is legal for a given piece type.
     */
    public static isValidMove(board: Board, piece: Piece, from: Position, to: Position): boolean {
        // Check if positions are valid
        if (!this.isValidPosition(board, from) || !this.isValidPosition(board, to)) {
            return false;
        }

        // No move if source and destination are the same
        if (from.x === to.x && from.y === to.y) return false;

        // Ensure the piece exists and matches the requested move
        const pieceAtFrom = board[from.y][from.x];
        if (!pieceAtFrom || pieceAtFrom.type !== piece.type || pieceAtFrom.team !== piece.team) {
            return false;
        }

        // Delegate to the correct piece-specific validator
        switch (piece.type) {
            case PIECES.DEV:
                return this.validateDevMove(board, piece, from, to);
            case PIECES.DESIGNER:
                return this.validateDesignerMove(board, piece, from, to);
            case PIECES.OWNER:
                return this.validatePoMove(board, piece, from, to);
            default:
                return false;
        }
    }

    /**
     * Alias to isValidMove; checks if a piece can move from one position to another.
     */
    public static canMove(board: Board, piece: Piece, from: Position, to: Position): boolean {
        return this.isValidMove(board, piece, from, to);
    }
}
