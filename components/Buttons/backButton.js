import React from 'react'
import {Image, Pressable, StyleSheet} from 'react-native'
import {connect} from 'react-redux'

export default connect (state => state) ((props) => {

	const getBack = () => {
		props.dispatch({
			type: 'toggleDeleteMode',
			value: false
		})

		props.dispatch({
			type: 'toggleModal',
			value: {
				active: false
			}
		})
	}

	return <>
		<Pressable
			onPress = {getBack}
			style = {styles.button}
			hitSlop = {20}
		>
			<Image style = {styles.img} source = {require('../../assets/arrow-left-white.png')}/>
		</Pressable>
	</>
})

const styles = StyleSheet.create({
	button: {
		position: 'absolute',
		top: 30,
		left: 15,
		zIndex: 9999
	},
	img: {
		height: 20,
		width: 20,
	},
})
