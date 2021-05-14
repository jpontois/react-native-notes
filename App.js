import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Keyboard, Dimensions } from 'react-native';
import Home from './views/Home'
import {Provider} from 'react-redux'
import Store from './store/configStore'

export default function App () {
	const [keyboardStatus, toggleKeyboardStatus] = useState(false)
	const [keyboardModeHeight, setKeyboardModeHeight] = useState(false)

	useEffect(() => {
		Keyboard.addListener('keyboardDidShow', showKeyboard)
		Keyboard.addListener('keyboardDidHide', hideKeyboard)
	})

	const showKeyboard = (e) => {
		setKeyboardModeHeight(Dimensions.get('window').height - e.endCoordinates.height)
		toggleKeyboardStatus(true)
	}

	const hideKeyboard = () => toggleKeyboardStatus(false)

	return (
		<Provider store = {Store}>
			<View style={
				keyboardStatus
				? [styles.container, {height: keyboardModeHeight}]
				: [styles.container, {height: '100%'}]
			}>
				<Home/>
			</View>
		</Provider>
	)
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
	paddingTop: 15,
	paddingBottom: 15,
	height: '100%',
  }
});
