import _ from "lodash";
const reorder = (list, startIndex, endesDropIDex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endesDropIDex, 0, removed);
  return result;
};

const move = (
  source,
  destination,
  droppableSource,
  droppableDestination,
  status
) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);
  const result = {};

  removed.status = status;
  destClone.splice(droppableDestination.index, 0, removed);
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};
const updateGroup = (state, tasks, groupId) => {
  const updateGroup = _.map(state, (group) => {
    if (group.id == groupId) {
      group.taskList = tasks;
    }
    return group;
  });

  return updateGroup;
};
const getGroupByID = (state, groupID) => {
  
  return state.find((group) => group.id == groupID);
};
const getGroupByName = (state, groupName) => {
  let index = state.findIndex((group) => group.name == groupName);
  
  return { index: index, group: state[index] };
};

const formatDataForDisplay = (data) => {
  let formatedData = data?.map((state)=>{
    let status = state.name;
    let tasks = state?.taskList?.map(function(task){
      return {...task, status: this}
    }, status)
    return {...state, 'taskList': tasks};
  })
  
  return formatedData;
}

export { reorder, getGroupByID, getGroupByName, updateGroup, move, formatDataForDisplay };
