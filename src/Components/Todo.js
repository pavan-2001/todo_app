import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import {deleteTodo, editTodo, getAllTodo} from '../functions/api';
import Button from '@material-ui/core/Button';

export default class Todo extends React.Component{

	constructor(props) {
		super(props);
		this.state={
			todo : [], 
			update : false
		};
	}

	gettingTodos = () => {
		getAllTodo(this.props.user.displayName).then( (response) => {
			this.setState({todo : response});
		}).catch((error) => {
			console.log(error);
		});
	};

	componentDidMount() {
		this.gettingTodos();
	}

	componentWillUpdate() {
		if(this.props.update) {
			this.forceUpdate(() => {
				this.gettingTodos();
				this.props.setUpdate(false);
			});
		}
	}




	editHandler = (id, temp) => {
		const body = {
			title : temp.title,
			isCompleted : !temp.isCompleted, 
			owner : temp.owner
		};
		editTodo(id, body).then(() => {
			this.props.setUpdate(true);
		});
		//this.gettingTodos();
	};

	deleteHandler = (id) => {
		deleteTodo(id).then(() => {
			this.props.setUpdate(true);
		});
		// const result = this.state.todo.filter((temp) => {return temp.id !== id; });
		// this.setState({todo : result});
	}

	render() {
		return (
			<div>
					<div className="flex flex-col">
					<div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
						<div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
							<div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
								<table className="min-w-full divide-y divide-gray-200">
									<thead className="bg-gray-50">
										<tr>
											<th
												scope="col"
												className="px-10 py-3 text-left text-lg font-bold text-gray-600 tracking-wider"
											>
												Title
											</th>
											<th
												scope="col"
												className="px-10 py-3 text-left text-lg font-bold text-gray-600 tracking-wider"
											>
												Status
											</th>
											<th
												scope="col"
												className="px-10 py-3 text-left text-lg font-bold text-gray-600 tracking-wider"
											>
												Created-At
											</th>
											<th
												scope="col"
												className="px-10 py-3 text-left text-lg font-bold text-gray-600 tracking-wider"
											>
												Edit Status
											</th>
											<th
												scope="col"
												className="px-10 py-3 text-left text-lg font-bold text-gray-600 tracking-wider"
											>
												Delete
											</th>
										</tr>
									</thead>
									<tbody className="bg-white divide-y divide-gray-200">
										{this.state.todo.map( (temp) => (
											<tr key={temp.id}>
												<td className="px-10 py-4 whitespace-nowrap">
													<div className="flex items-center">
														<div className="ml-0">
															<div className="text-md font-bold text-gray-900">{temp.title}</div>
														</div>
													</div>
												</td>
												<td className="px-6 py-4 whitespace-nowrap">
												<div className="text-sm text-gray-500">{temp.isCompleted ? "Completed" : "Not Completed"}</div>
												</td>
												<td className="px-12 py-4 whitespace-nowrap">
												<div className="text-sm text-black-500">{temp.createdAt}</div>
												</td>
												<td className="px-6 py-4 whitespace-nowrap">
													<Button onClick={() => this.editHandler(temp.id, temp)}>change status</Button>
												</td>
												<td className="px-6 py-4 whitespace-nowrap">
													<Button onClick={() => this.deleteHandler(temp.id)}>delete</Button>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}