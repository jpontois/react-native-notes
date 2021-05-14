import React, {useState} from 'react'
import {Text, ScrollView, TextInput, TouchableOpacity, StyleSheet, Image} from 'react-native'
import TasksAdd from './TasksAdd'
import TasksItem from './TasksItem'
import Fire from '../../Fire'
import { connect } from 'react-redux'

export default connect (state => state) ((props) => {
	const list = props.modal.list

	return (
		<>
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
