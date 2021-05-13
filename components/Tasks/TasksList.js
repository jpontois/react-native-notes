import React from 'react'
import {Text} from 'react-native'
import TasksAdd from './TasksAdd'
import TasksItem from './TasksItem'
import { connect } from 'react-redux'

export default connect (state => state) ((props) => {
	console.log(props)

	const list = props.list
	return (
		<>
			<Text>{list.label}</Text>

			{list.length !== 0 && list.tasks && list.tasks.map((task) => (
				<TasksItem
					key = {list.id + task.label}
					list = {list}
					task = {task}
				/>
			))}

			<TasksAdd/>
		</>
	)
})