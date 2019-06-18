import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import {
	components as fileInputComponents,
	reducer as fileInputReducer
} from "../file-input/file-input";

const NotebookDiv = styled.div`
	position: relative;
`;

const AddComponentDiv = styled.div`
	position: relative;
`;

const ADD_COMPONENT = "ADD_COMPONENT";
const REMOVE_COMPONENT = "REMOVE_COMPONENT";

const addComponentAction = payload => ({
	type: ADD_COMPONENT,
	payload
});

const removeComponentAction = payload => ({
	type: REMOVE_COMPONENT,
	payload
});

export const reducer = (oldState, action) => {
	const state = fileInputReducer(oldState, action);
	const { type, payload } = action;
	if (type === ADD_COMPONENT) {
		const componentID = Math.random().toString(36);
		console.log("trying to add component", payload);
		return {
			...state,
			[componentID]: { type: payload.type },
			[payload.id]: {
				...state[payload.id],
				components: [
					...(state[payload.id].components || []),
					componentID
				]
			}
		};
	}
	if (type === REMOVE_COMPONENT) {
		return {
			...state,
			[payload.id]: state[payload.id].filter(
				x => x !== payload.componentID
			)
		};
	}
	return state;
};

// TODO get from const
const componentList = [...fileInputComponents];
const componentsByType = componentList.reduce((acc, component) => {
	acc[component.type] = component;
	return acc;
}, {});

const Notebook = ({
	id,
	addComponent,
	// removeComponent,
	state
}) => {
	console.log("state", state);
	// TODO make searchable
	// TODO create generic component - intersection of all
	return (
		<NotebookDiv>
			<input type="text" placeholder="Search..." />
			{(state[id] ? state[id].components : []).map(componentID => {
				console.log("componentID", componentID);
				const componentState = state[componentID];
				const Component =
					componentsByType[componentState.type].component;
				return <Component key={componentID} id={componentID} />;
			})}
			<AddComponentDiv>
				{componentList.map(component => (
					<button
						onClick={() =>
							addComponent({ type: component.type, id })
						}
						key={component.type}
					>
						{component.name}
					</button>
				))}
			</AddComponentDiv>
		</NotebookDiv>
	);
};

export const ConnectedNotebook = connect(
	state => ({ state }),
	{ addComponent: addComponentAction, removeComponent: removeComponentAction }
)(Notebook);