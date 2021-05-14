import React, {useState} from 'react'
import {Text,TouchableOpacity, TextInput, Image, StyleSheet} from 'react-native'
import TasksList from '../components/Tasks/TasksList'
import DeleteModeButton from '../components/Buttons/deleteModeButton'
import BackButton from '../components/Buttons/backButton'
import Fire from '../Fire'
import {connect} from 'react-redux'

export default connect(state => state) ((props) => {
	const list = props.modal.list
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
			<BackButton/>
			<DeleteModeButton/>

			<TouchableOpacity style = {styles.header} onPress = {() => toggleEditMode(true)}>
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

			<TasksList/>
		</>
	)
})

const styles = StyleSheet.create({
	header: {
		height: 50,
		width: '85%',
		marginLeft: '7.5%',
		marginRight: '7.5%',
		marginBottom: 30
	},
	title: {
		height: 50,
		lineHeight: 50,
		color: '#fff',
		fontSize: 20,
		textAlign: 'center',
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