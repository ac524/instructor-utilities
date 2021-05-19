import { SET_ACTIVE_MODAL, REGISTER_MODAL, DEREGISTER_MODAL } from "../modalActions/index.js";

const reducer = (state, { type, payload }) => {

	const actions = {
		[REGISTER_MODAL]: () => ({
			...state,
			modals: { ...state.modals, ...payload }
		}),
		[SET_ACTIVE_MODAL]: () => ({
			...state,
			activeKey: payload
		}),
		[DEREGISTER_MODAL]: () => ({
			...state,
			modals: {
				...Object.fromEntries(
					Object.entries(state.modals).filter(([key, value]) => key !== payload)
					)
			},
			activeKey: false
		})
	}; 

	return actions.hasOwnProperty(type) ? actions[type]() : state;

};

export default reducer;