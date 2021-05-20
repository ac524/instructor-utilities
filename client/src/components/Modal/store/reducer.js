import { SET_ACTIVE_MODAL, REGISTER_MODAL, DEREGISTER_MODAL } from "./actions.js";

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
		[DEREGISTER_MODAL]: () => {
			const {
				[payload]: removed,
				...modals
			} = state.modals;

			return {
				...state,
				modals,
				activeKey: state.activeKey === payload ? false : state.activeKey
			};
		}
	}; 

	return actions.hasOwnProperty(type) ? actions[type]() : state;

};

export default reducer;