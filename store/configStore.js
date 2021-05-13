import  {createStore, combineReducers} from 'redux'
import toggleDeleteMode from './reducers/deleteMode'
import modal from './reducers/modal'

export default createStore(combineReducers({
	toggleDeleteMode,
	modal
}))