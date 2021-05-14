import React from 'react'
import {Image, TouchableOpacity, StyleSheet} from 'react-native'
import {connect} from 'react-redux'

export default connect (state => state) ((props) => {

	const getBack = () => (
		props.dispatch({
			type: 'toggleModal',
			value: {
				active: false
			}
		})
	)

	return <>
		<TouchableOpacity onPress = {getBack} style = {styles.button}>
			<Image style = {styles.img} source = {require('../../assets/arrow-left-white.png')}/>
		</TouchableOpacity>
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
