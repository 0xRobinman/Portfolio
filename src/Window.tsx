import React, { ReactNode } from "react"
import './Window.css'
/**
 * Linux style window to cotnain elements
 */
interface WindowProps {
    children: ReactNode;
}
const ItemWindow: React.FC<WindowProps> = ({ children }) => {
    return(
        <div className="window">
            <div className="titlebar">
                <div className="min"></div>
                <div className="max"></div>
                <div className="exit"></div>
            </div>
            <div className="contents">
                {children}
            </div>
        </div>
    )
}

export default ItemWindow;