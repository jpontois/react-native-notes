export default function modal (state = {active: false}, action) {
	switch (action.type) {
		case 'toggleModal':
			return {
				active: action.value.active,
				list: action.value.list
			}
		default:
			return state
	}
}
