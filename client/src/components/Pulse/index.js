import "./style.sass";

/**
 * @param {*} param0 
 * @see https://tobiasahlin.com/spinkit/
 */
const Pulse = ( { className, color, size } ) => {

    const style = {};

    if( size ) style["--pulse-size"] = size;
    if( color ) style["--pulse-color"] = color;

    return (
        <div className={"spinner" + (className ? " "+className : "")} style={style}>
            <div className="double-bounce1"></div>
            <div className="double-bounce2"></div>
        </div>
    )
}

export default Pulse;