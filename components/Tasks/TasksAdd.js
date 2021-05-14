import React, { useState } from 'react'
import {TextInput, Text, StyleSheet, TouchableOpacity, Image} from 'react-native'
import Fire from '../../Fire'
import {connect} from 'react-redux'

export default connect(state => state) ((props) => {
	const [text, onChangeText] = useState()
	const [editMode, toggleEditMode] = useState(false)
	const [duplicateAlerte, toggleDuplicateAlert] = useState(false)

	const onSubmitEditing = () => {
		if (!text) return false

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
			<TouchableOpacity style={styles.container} onPress={() => {
				toggleEditMode(true)
			}}>

				<Image style = {styles.img} source = {require('../../assets/add-white.png')}/>

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

			</TouchableOpacity>
		</>
	)
})

const styles = StyleSheet.create({
	container: {
		width: '90%',
		marginLeft: '5%',
		marginRight: '5%',
		height: 40,
		flex: 1,
		flexDirection: 'row',
	},
	img: {
		height: 20,
		width: 20,
		marginLeft: 10,
		marginTop: 15
	},
	input: {
		width: '85%',
		height: 40,
		paddingLeft: 5,
		lineHeight: 40,
		marginLeft: 10,
		borderBottomWidth: 0.5,
		borderBottomColor: '#fff',
		color: '#fff',
	},
	duplicateMode: {
		borderBottomColor: 'red',
		borderBottomWidth: 1,
	},
	disabled: {
		display: 'none',
	}
})