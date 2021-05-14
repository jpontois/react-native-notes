import React, { useState } from 'react'
import {TextInput, Image, StyleSheet, TouchableOpacity} from 'react-native'
import Fire from '../../Fire'

export default function HomeAdd () {
	const [text, onChangeText] = useState()
	const [editMode, toggleEditMode] = useState(false)

	const onSubmitEditing = () => {
		if (!text) return false

		const firebase = new Fire ((e) => {
			if (e) return console.log(e)

			firebase.addList(
				{
					label: text,
					task: []
				}
			)

			onChangeText('')

			return function unsubscribe () {
				firebase.detach()
			}
		})
	}

	return (
		<>
			<TouchableOpacity onPress = {() => toggleEditMode(true)} style = {styles.container} >
				<Image style = {styles.img} source = {require('../../assets/add-white.png')}/>

				{editMode && (
					<TextInput
					style = {editMode ? styles.input : styles.disabled}
					value = {text}
					onChangeText = {onChangeText}
					onSubmitEditing = {() => onSubmitEditing()}
					onBlur = {() => toggleEditMode(false)}
					autoFocus = {true}
					/>
				)}
			</TouchableOpacity>
		</>
	)
}

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
	disabled: {
		display: 'none',
	}
})