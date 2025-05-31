import React, {useEffect, useState} from "react";
import { ControlsBarProps } from "@/coregame/interfaces/interface-component-props";
import { InputNumberComponent } from "@/components/inputnumber/InputNumberComponent";
import './BoardControlComponent.scss';

export const BoardControlComponent: React.FC<ControlsBarProps> = ({
                                                                      inputX,
                                                                      inputY,
                                                                      setInputX,
                                                                      setInputY,
                                                                      handlePlay
                                                                  }) => {

    const [windowWidth, setWindowWidth] = useState(768);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        setWindowWidth(window.innerWidth);

        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (!isMounted) {
        return null;
    }

    const isMobile = windowWidth <= 768;

    return (
        <div className={`board-control ${isMobile ? 'board-control--mobile' : ''}`}>
            <div
                className="scale-container"
                style={{
                    marginRight: isMobile ? `${inputX * 2}px` : '0'
                }}
            >
                <span className="scale-label">Scale</span>

                <div className={`input-group ${isMobile ? 'input-group--mobile' : ''}`}>
                    <InputNumberComponent
                        label="X"
                        value={inputX}
                        onChange={setInputX}
                    />

                    <InputNumberComponent
                        label="Y"
                        value={inputY}
                        onChange={setInputY}
                    />

                    <button
                        onClick={handlePlay}
                        className="confirm-btn">
                        <svg
                            className="confirm-icon"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            <button
                onClick={handlePlay}
                className={`play-btn ${isMobile ? 'play-btn--mobile' : ''}`}
            >
                Play
            </button>
        </div>
    );
};