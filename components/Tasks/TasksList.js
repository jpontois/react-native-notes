import React from 'react'
import {Text, ScrollView, StyleSheet} from 'react-native'
import TasksAdd from './TasksAdd'
import TasksItem from './TasksItem'
import { connect } from 'react-redux'

export default connect (state => state) ((props) => {
	const list = props.list
	return (
		<>
			<Text style = {styles.title}>{list.label}</Text>

			<ScrollView>
				{list.length !== 0 && list.tasks && list.tasks.map((task) => (
					<TasksItem
						key = {list.id + task.label}
						list = {list}
						task = {task}
					/>
				))}

				<TasksAdd/>
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