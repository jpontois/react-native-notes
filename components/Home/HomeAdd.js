import React, { useState } from 'react'
import {TextInput, Image, StyleSheet, Pressable} from 'react-native'
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
					tasks: []
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
			<Pressable onPress = {() => toggleEditMode(true)} style = {styles.container} >
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
			</Pressable>
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
		marginLeft: 10,
		borderBottomWidth: 0.5,
		borderBottomColor: '#fff',
		color: '#fff',
	},
	disabled: {
		display: 'none',
	}
})