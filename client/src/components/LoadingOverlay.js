import React from "react";
import Pulse from "./Pulse";

function LoadingOverlay() {

    return (
        <div className="is-overlay has-background-primary is-flex" style={{ alignItems: "center", zIndex: 100, position: "fixed" }}>
            <Pulse color="#FFF" size="80px" />
        </div>
    )

}

export default LoadingOverlay;