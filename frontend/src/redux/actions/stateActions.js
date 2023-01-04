import axios from "axios"
import Configuration from "../../Configuration";
import * as actionDict from "../ActionDict.js"
import * as listAction from "../../utils/ListAction.js"
import { v4 } from "uuid";


export const getStates = () => async (dispatch, getState) => {
    const response = await axios.get(Configuration.TODOLIST_URL + `/State`);
    const formattedData = listAction.formatDataForDisplay(response.data)
    console.log(formattedData)
    dispatch({ type: actionDict.GET_STATE, payload: formattedData })

}

export const addState = (data) => async (dispatch, getState) => {
    const state = getState().stateStore.states;
    let { index, group } = listAction.getGroupByName(state, constants.STATUS.TO_DO);
    let newTask = {
        id: v4(),
        name: data.task,
        status: constants.STATUS.TO_DO,
        deadline: data.deadline?.$d,
    };
    let newState = [...state];
    group.taskList.unshift(newTask);
    newState[index] = group;
    dispatch({ type: actionDict.ADD_STATE, payload: newState })

}
