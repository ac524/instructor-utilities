import React from "react";
import "./style.sass";

import Modal from 'react-bulma-components/lib/components/modal';

/**
 * @see https://tobiasahlin.com/spinkit/
 */
function LoadingPulse( { color } ) {

    const style = {};

    if(color) style['--pulse-color'] = color;

    return (
        <Modal show={true} onClose={()=>undefined} showClose={false}>
            <Modal.Content>
                <div className="spinner" style={style}>
                    <div className="double-bounce1"></div>
                    <div className="double-bounce2"></div>
                </div>
            </Modal.Content>
        </Modal>
    );

}

export default LoadingPulse;