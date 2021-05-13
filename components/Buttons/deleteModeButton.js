import React from 'react'
import {Image, TouchableOpacity, StyleSheet} from 'react-native'
import {connect} from 'react-redux'

const deleteModeButton = (props) => {

	const toggleDeleteMode = () =>  props.dispatch({
		type: 'toggleDeleteMode',
		value: !props.toggleDeleteMode.deleteMode
	})

	return <>
		<TouchableOpacity onPress = {toggleDeleteMode} style = {styles.button} >
			<Image style = {styles.img} source = {require('../../assets/bin-white.png')}/>
		</TouchableOpacity>
	</>
}

const styles = StyleSheet.create({
	button: {
		position: 'absolute',
		top: 15,
		right: 15
	},
	img: {
		height: 20,
		width: 20,
	},
})

export default connect (state => state) (deleteModeButton)