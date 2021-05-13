import React from 'react'
import {Text,View, StyleSheet} from 'react-native'
import TasksList from '../components/Tasks/TasksList'
import {connect} from 'react-redux'
import DeleteModeButton from '../components/Buttons/deleteModeButton'
import BackButton from '../components/Buttons/backButton'

export default connect(state => state) ((props) => {
	const list = props.modal.list

	return (
		<>
			<View>
				<BackButton/>
				<Text style = {styles.title}>{}</Text>
				<DeleteModeButton/>
			</View>
			<TasksList list = {list}/>
		</>
	)
})

const styles = StyleSheet.create({
	title: {
		height: 50,
	},
	img: {
		height: 20,
		width: 20,
	},
})