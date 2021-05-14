import React from 'react'
import {Text, TouchableOpacity, StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import Fire from '../../Fire'

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

	const deleteItem = () => {
		const firebase = new Fire ((e) => {
			if (e) return console.log(e)

			firebase.deleteList(list.id)

			return function unsubscribe () {
				firebase.detach()
			}
		})
	}

	return (
		<>
			<TouchableOpacity
				style = {
					props.toggleDeleteMode.deleteMode
					? styles.item
					: [styles.item, styles.deleteMode]
				}

				onPress = {
					props.toggleDeleteMode.deleteMode
					? () => openModal()
					: () => deleteItem()
				}
			>

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
	},
	deleteMode: {
		backgroundColor: 'red'
	}
})