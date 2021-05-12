import {
	Modal,
    Columns,
} from "react-bulma-components";

import Fade from "animations/Fade";

export const ModalBox = ({ show, onClose, children, fullScreen }) => {

    const classes = ["is-student-modal"];
    const contentClasses = ["hide-overflow"];

    if( fullScreen ) {
        classes.push("is-fullscreen");
        contentClasses.push("has-filled-content");
    }

    return (
		<Modal
            className={classes.join(" ")}
            onClose={onClose}
            show={show}
            closeOnBlur={true}>

            <Fade style={{ width: "100%" }} show={show} duration=".5s">
                <Modal.Content className={contentClasses.join(" ")}>
			        <Columns gap={0} className="h-100" breakpoint="desktop">
                        {children}
                    </Columns>
                </Modal.Content>
            </Fade>
        </Modal>
    )
}