import React from 'react'
import HomeList from '../components/Home/HomeList'
import List from './List'

import {connect} from 'react-redux'

export default connect(state => state) ((props) => {
	
	if (!props.modal.active) return <HomeList/>
	if (props.modal.active) return <List/>

})