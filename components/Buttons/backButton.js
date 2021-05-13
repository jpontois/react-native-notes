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
		<TouchableOpacity onPress = {getBack}>
			<Image style = {styles.img} source = {require('../../assets/arrow-left-white.png')}/>
		</TouchableOpacity>
	</>
})

const styles = StyleSheet.create({
	img: {
		height: 20,
		width: 20,
	},
})
