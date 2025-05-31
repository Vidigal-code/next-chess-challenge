import {Board, max_board, min_board} from "@/coregame/interfaces/interface-game";
import {BoardManager} from "@/coregame/boardconfig/board-manager";


export class BoardConfig {

    private static readonly MIN_SIZE: number = max_board;
    private static readonly MAX_SIZE: number = min_board;

    public static get minSize(): number {
        return this.MIN_SIZE;
    }

    public static get maxSize(): number {
        return this.MAX_SIZE;
    }

    public static isValidSize(size: number): boolean {
        return size >= this.MIN_SIZE && size <= this.MAX_SIZE;
    }

    public static validateDimensions(width: number, height: number): string | null {
        if (!this.isValidSize(width) || !this.isValidSize(height)) {
            return `Board dimensions must be between ${this.MIN_SIZE} and ${this.MAX_SIZE}`;
        }
        return null;
    }

    public static createBoard(width: number, height: number): Board {
        const validationError = this.validateDimensions(width, height);
        if (validationError) {
            throw new Error(validationError);
        }
        return BoardManager.createInitialBoard(width, height);
    }
}