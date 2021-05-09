import { useReducer } from "react";

import {
	Box,
	Button,
} from "react-bulma-components";

import { useOutsideClickDispatch } from "utils/detection";
import { ActivtyFeed, CommentForm } from "../components";

export const ActivityPanel = ({ student }) => {

	const [isActive, dispatchComment] = useReducer(
		(state, action) => action === "open"
	);

	const commentRef = useOutsideClickDispatch({
		isActive,
		dispatch: dispatchComment,
		action: "close"
	});

    return (
        <>
            <ActivtyFeed
                className="p-6 is-shadowless has-background-white-bis has-text-grey m-0 is-activity-feed"
                student={student}
            />
            <Box className="has-background-white-bis has-text-grey is-comment-box">
                {isActive
                    
                    ? (<CommentForm feedId={student.feed} ref={commentRef} />)
                    
                    : (
                        <Button
                            onClick={() => dispatchComment("open") }
                            className="is-flex-grow-1 has-text-grey is-fullwidth is-comment-button">
                            Add a comment...
                        </Button>
                    )
                }
            </Box>
        </>
    )
}