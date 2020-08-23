import React from "react";
import Pulse from "./Pulse";

function LoadingOverlay() {

    return (
        <div className="is-overlay has-background-primary is-flex" style={{ opacity: .9, alignItems: "center", zIndex: 100 }}>
            <Pulse color="#FFF" size="80px" />
        </div>
    )

}

export default LoadingOverlay;