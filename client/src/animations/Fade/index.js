import React, { useEffect, useState } from "react";

import "./style.sass";

const Fade = ({ show = true, type = "both", duration="1s", style = {}, children, ...props }) => {

    const [shouldRender, setRender] = useState(show);

    useEffect(() => {

        if (show) setRender(true);

    }, [show]);

    const onAnimationEnd = () => {
        if (!show) setRender(false);
    };

    const enabled = type === "both" || ( type === "in" && show ) || ( type === "out" && !show );

    return (
        shouldRender

        ? (
            <div
                {...props}
                style={{ ...style, animation: `${show ? "fadeIn" : "fadeOut"} ${enabled ? duration : "0s"}` }}
                onAnimationEnd={onAnimationEnd}
            >
                {children}
            </div>
        )

        : null
    );

};

export default Fade;