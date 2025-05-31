import React from 'react';
import {PieceProps} from "@/coregame/interfaces/interface-component-props";
import {getImgPiece, getPieceTitle} from "@/coregame/interfaces/interface-game";
import Image from 'next/image';
import './PieceComponent.scss';

export const PieceComponent: React.FC<PieceProps> = ({piece}) => {

    return (
        <div
            title={`${piece.team} ${getPieceTitle(piece)}`}
            className="piece"
        >
            <Image
                src={getImgPiece(piece)}
                alt={getPieceTitle(piece)}
                width={48}
                height={48}
                className="piece__image"
            />
        </div>
    );
};