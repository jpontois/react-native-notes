import React, { useState } from 'react'
import {TextInput, Text, StyleSheet, Pressable} from 'react-native'
import Fire from '../../Fire'
import {connect} from 'react-redux'

export default connect(state => state) ((props) => {
	const [text, onChangeText] = useState()
	const [editMode, toggleEditMode] = useState(false)
	const [duplicateAlerte, toggleDuplicateAlert] = useState(false)

	const onSubmitEditing = () => {

		const firebase = new Fire ((e) => {
			if (e) return console.log(e)

			let list = props.modal.list

			if (isDuplicate(list.tasks, text)) {
				toggleEditMode(true)
				toggleDuplicateAlert(true)
				return function unsubscribe () {
					firebase.detach()
				}
			}

			toggleDuplicateAlert(false)

			list.tasks.push({label: text, status: false})

			firebase.updateList(list)

			onChangeText('')

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

	const isDuplicate = (tasks, label) => {
		let hasDuplicate = false
		tasks.map((task) => {
			if (task.label === label) hasDuplicate = true
		})
		return hasDuplicate
	}

	return (
		<>
			<Pressable style={styles.add} onPress={() => {
				toggleEditMode(true)
			}}/>

			{editMode && (
				<TextInput
					style = {
						editMode 
						? duplicateAlerte
							? [styles.input, styles.duplicateMode]
							: styles.input
						: styles.disabled
					}
					value = {text}
					onChangeText = {onChangeText}
					onSubmitEditing = {() => onSubmitEditing()}
					onBlur = {() => toggleEditMode(false)}
					autoFocus = {true}
				/>
			)}

			{duplicateAlerte &&
				<Text>
					Cette tâche existe déjà. Il y a déjà assez a faire comme ça !
				</Text>
			}
		</>
	)
})

const styles = StyleSheet.create({
	add: {
		height: 20,
		width: 20,
		backgroundColor: 'yellow'
	},
	input: {
		height: 20,
		width: 20,
		backgroundColor: 'red'
	},
	duplicateMode: {
		borderColor: 'yellow',
		borderStyle: 'solid',
		borderWidth: 1,
	}
})