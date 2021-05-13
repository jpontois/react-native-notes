import React from 'react';
import { StyleSheet, View } from 'react-native';
import Home from './views/Home'
import {Provider} from 'react-redux'
import Store from './store/configStore'

export default function App () {
	return (
		<Provider store = {Store}>
			<View style={styles.container}>
				<Home/>
			</View>
		</Provider>
	)
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
	height: '100%',
	width: '100%',
  },
});
