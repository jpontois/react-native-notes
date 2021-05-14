import React from 'react'
import {Text, TouchableOpacity, StyleSheet} from 'react-native'
import {connect} from 'react-redux'

export default connect (state => state) ((props) => {

	const list = props.list

	const openModal = () => {
		props.dispatch({
			type: 'toggleModal',
			value: {
				active: true,
				list: list
			}
		})
	}

	return (
		<>
			<TouchableOpacity style = {styles.item} onPress = {() => openModal()}>
				<Text style = {styles.label} >{list.label}</Text>
			</TouchableOpacity>
		</>
	)
})

const styles = StyleSheet.create({
	item: {
		height: 40,
		width: '90%',
		marginLeft: '5%',
		marginRight: '5%',
		borderBottomWidth: 0.5,
		borderBottomColor: '#fff',
	},
	label: {
		color: '#fff',
		height: 40,
		lineHeight: 40,
		width: '100%'
	}
})