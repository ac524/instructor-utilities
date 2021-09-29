import {
	SET_ACTIVE_MODAL,
	REGISTER_MODAL,
	DEREGISTER_MODAL,
} from "./actions.js";

const reducer = (state, { type, payload }) => {

	// payload.data

	const actions = {
		[REGISTER_MODAL]: () => ({
			...state,
			modals: {
				...state.modals,
				...payload
			}
		}),
		[SET_ACTIVE_MODAL]: ({ activeKey, props }) => {
			console.log(activeKey, props);
			return ({
				...state,
				activeKey,
				...(activeKey ? {
					modals: {
						...state.modals,
						[activeKey]: {
							...state.modals[activeKey],
							props: props || state.modals[activeKey].props
						}
					}
				} : {})
				
			})
		},
		[DEREGISTER_MODAL]: () => {
			const { [payload]: removed, ...modals } = state.modals;
			return {
				...state,
				modals,
				activeKey: state.activeKey === payload ? false : state.activeKey
			};
		}
	}; 

	return actions.hasOwnProperty(type) ? actions[type]( payload ) : state;

};

export default reducer;