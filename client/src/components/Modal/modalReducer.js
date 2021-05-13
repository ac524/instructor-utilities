import { SET_ACTIVE_MODAL, REGISTER_MODAL } from "./actions.js";

const reducer = (state, { type, payload }) => {
	const actions = {
		[REGISTER_MODAL]: ()=>(
			{
				...state,
				modals: { ...state.modals, payload }
			}
		),
		[SET_ACTIVE_MODAL]: ()=>(
				{
				...state,
				activeKey: payload
			}
		)
			
	} 
	return actions.hasOwnProperty(type) ? actions[type]() : state;

};

export default reducer;