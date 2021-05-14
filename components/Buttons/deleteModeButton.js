import React from 'react'
import {Image, Pressable, StyleSheet} from 'react-native'
import {connect} from 'react-redux'

const deleteModeButton = (props) => {

	const toggleDeleteMode = () =>  props.dispatch({
		type: 'toggleDeleteMode',
		value: !props.toggleDeleteMode.deleteMode
	})

	return <>
		<Pressable
			onPress = {toggleDeleteMode}
			style = {styles.button}
			hitSlop = {20}
		>
			<Image style = {styles.img} source = {require('../../assets/bin-white.png')}/>
		</Pressable>
	</>
}

const styles = StyleSheet.create({
	button: {
		position: 'absolute',
		top: 30,
		right: 15,
		zIndex: 9999,
	},
	img: {
		height: 20,
		width: 20,
	},
})

export default connect (state => state) (deleteModeButton)