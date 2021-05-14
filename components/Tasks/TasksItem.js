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

	const deleteItem = () => {
		const firebase = new Fire ((e) => {
			if (e) return console.log(e)

			const newList = getNewList()
			firebase.updateList(newList)

			props.dispatch({
				type: 'toggleModal',
				value: {
					active: true,
					list: newList
				}
			})

			return function unsubscribe () {
				firebase.detach()
			}
		})

	}

	const getNewList = () => {
		let newList = list
		let newTasks = []
		list.tasks.map((val) => {
			if (val.label !== task.label) newTasks.push(val)
		})
		newList.tasks = newTasks
		return newList
	}

	return (
		<>
			<TouchableOpacity
				onPress = {
					!props.toggleDeleteMode.deleteMode
					? () => updateStatus()
					: () => deleteItem()
				}

				style = {
					!props.toggleDeleteMode.deleteMode
					? styles.item
					: [styles.item, styles.deleteMode]
				}
			>

				<View
					style = {
						status
						? [styles.checkbox, styles.done]
						: styles.checkbox
					}
				/>

				<Text style = {styles.label}>{task.label}</Text>
			</TouchableOpacity>
		</>
	)
})

const styles = StyleSheet.create({
	item: {
		height: 40,
		width: '90%',
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		marginLeft: '5%',
		marginRight: '5%',
		borderBottomWidth: 0.5,
		borderBottomColor: '#fff',
	},
	label: {
		height: 40,
		lineHeight: 40,
		marginLeft: 10,
		color: '#fff',
	},
	checkbox: {
		width: 20,
		height: 20,
		backgroundColor: 'red',
		borderRadius: 5,
	},
	done: {
		backgroundColor: 'green',
	},
	deleteMode: {
		backgroundColor: 'red'
	}
})