import React, { useState } from 'react'
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native'
import Fire from '../../Fire'
import {connect} from 'react-redux'

export default connect(state => state) ((props) => {
	const list = props.modal.list
	const task = props.task

	const [status, setStatus] = useState(task.status)

	const updateStatus = () => {
		let updatedList = toggleTask(list, task.label)
		setStatus(!status)

		const firebase = new Fire ((e) => {
			if (e) return console.log(e)

			firebase.updateList(updatedList)

			return function unsubscribe () {
				firebase.detach()
			}
		})
	}

	const toggleTask = (list, label) => {
		const tasks = list.tasks.map((task2) => {
			if (task2.label === label) task2.status = !task2.status
			return task2
		})

		list.tasks = tasks

		return list
	}

	return (
		<>
			<TouchableOpacity
				onPress = {() => updateStatus()}
				style = {styles.list}
			>
				<View
					style = {status ? styles.enabledCheckbox : styles.disabledCheckbox}
				/>
				<Text>{task.label}</Text>
			</TouchableOpacity>
		</>
	)
})

const styles = StyleSheet.create({
	list: {
		height: 50,
		width: '100%',
		backgroundColor: 'red',
	},
	enabledCheckbox: {
		width: 20,
		height: 20,
		borderBottomColor: 'grey',
		backgroundColor: 'blue',
	},
	disabledCheckbox: {
		width: 20,
		height: 20,
		borderBottomColor: 'grey',
		backgroundColor: 'green',
	},
})