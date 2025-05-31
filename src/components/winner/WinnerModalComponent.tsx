import React from 'react';
import {VictoryModalProps} from "@/coregame/interfaces/interface-component-props";
import './WinnerModalComponent.scss';

export const WinnerModalComponent: React.FC<VictoryModalProps> = ({
                                                                      winner,
                                                                      handleReset,
                                                                      handleGoHome
                                                                  }) => {
    return (
        <div className="winner-main">
            <div className="winner-modal">
                <div className="winner-header">
                    <div className="winner-icon">
                        <svg
                            className="star-icon"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                        </svg>
                    </div>

                    <h2 className="winner-title">
                        {`${winner} pieces won!`}
                    </h2>
                </div>

                <div className="winner-actions">
                    <button
                        onClick={handleGoHome}
                        className="btn btn-secondary"
                    >
                        Go Back To Home
                    </button>

                    <button
                        onClick={handleReset}
                        className="btn btn-primary"
                    >
                        Start New Match
                    </button>
                </div>
            </div>
        </div>
    );
};