import React, {useState} from 'react'
import {Text, ScrollView, TextInput, TouchableOpacity, StyleSheet, Image} from 'react-native'
import TasksAdd from './TasksAdd'
import TasksItem from './TasksItem'
import Fire from '../../Fire'
import { connect } from 'react-redux'

export default connect (state => state) ((props) => {
	const list = props.list
	const [text, onChangeText] = useState(list.label)
	const [editMode, toggleEditMode] = useState(false)

	const onSubmitEditing = () => {
		if (!text) return false

		const firebase = new Fire ((e) => {
			if (e) return console.log(e)

			let newList = props.modal.list

			newList.label = text

			firebase.updateList(newList)

			props.dispatch({
				type: 'toggleModal',
				value: {
					active: true,
					list: list
				}
			})

			return function unsubscribe () {
				firebase.detach()
			}
		})
	}

	return (
		<>
			<TouchableOpacity onPress = {() => toggleEditMode(true)}>
				{
					!editMode
					? (
						<>
							<Text style = {styles.title}>
								{list.label}
							</Text>
						</>
					)
					: (
						<TextInput
							style = {
								editMode 
								? styles.input
								: styles.disabled
							}
							value = {text}
							onChangeText = {onChangeText}
							onSubmitEditing = {() => onSubmitEditing()}
							onBlur = {() => toggleEditMode(false)}
							autoFocus = {true}
						/>
					)
				}
			</TouchableOpacity>

			<ScrollView>
				{list.length !== 0 && list.tasks && list.tasks.map((task) => (
					<TasksItem
						key = {list.id + task.label}
						list = {list}
						task = {task}
					/>
				))}

				<TasksAdd/>
			</ScrollView>

		</>
	)
})

const styles = StyleSheet.create({
	title: {
		width: '85%',
		marginLeft: '7.5%',
		marginRight: '7.5%',
		height: 50,
		lineHeight: 50,
		color: '#fff',
		fontSize: 20,
		textAlign: 'center',
		marginBottom: 30
	},
	img: {
		height: 20,
		width: 20,
		marginLeft: 10,
		marginRight: 10,
		marginTop: 15
	},
	input: {
		width: '90%',
		marginLeft: '5%',
		marginRight: '5%',
		marginBottom: 30,
		height: 50,
		paddingLeft: 5,
		lineHeight: 50,
		borderBottomWidth: 0.5,
		borderBottomColor: '#fff',
		color: '#fff',
		fontSize: 20,
		textAlign: 'center',
	},
	disabled: {
		display: 'none',
	}
})