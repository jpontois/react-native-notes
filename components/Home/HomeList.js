import React, { useEffect, useState } from 'react'
import {Text, ScrollView, StyleSheet} from 'react-native'
import Fire from '../../Fire'
import HomeItem from './HomeItem'
import HomeAdd from './HomeAdd'
import DeleteModeButton from '../Buttons/deleteModeButton'
import {connect} from 'react-redux'

export default connect(state => state) ((props) => {
	const [lists, setLists] = useState([])

	useEffect(() => {
		const firebase = new Fire((e) => {
			if (e) return alert('An error occured')
			
			firebase.getLists(lists => {
				setLists(lists)
			})

			return function unsubscribe () {
				firebase.detach()
			}
		})
	}, [])

		return (
			<>
				<Text style = {styles.title}>DODOLIST</Text>
				<DeleteModeButton style = {styles.deleteModeButton}/>
				
				<ScrollView>
					{ lists.map((item) => {
						return (
							<HomeItem
								key = {item.id}
								list = {item}
							/>
						)
					})}
					
					<HomeAdd/>
				</ScrollView>

			</>
		)
})

const styles = StyleSheet.create({
	title: {
		width: '100%',
		height: 50,
		lineHeight: 50,
		color: '#fff',
		fontSize: 20,
		textAlign: 'center',
		marginBottom: 30
	}
})