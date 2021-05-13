export default function toggleDeleteMode (state = {deleteMode: false}, action) {
	switch (action.type) {
		case 'toggleDeleteMode':
			return {deleteMode: action.value}
		default:
			return state
	}
}
