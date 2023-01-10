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
  const copyRemoveItem = { ...removed };
  const result = {};

  copyRemoveItem.status = status;
  destClone.splice(droppableDestination.index, 0, copyRemoveItem);
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};
const updateGroup = (state, tasks, groupId) => {
  const updateGroup = state.map((group) => {
    if (group.id == groupId) {
      const copyGroup = { ...group };
      copyGroup.taskList = tasks;
      return copyGroup;
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
  let formatedData = data?.map((state) => {
    let status = state.name;
    let tasks = state?.taskList?.map(function (task) {
      return { ...task, status: this };
    }, status);
    return { ...state, taskList: tasks };
  });

  return formatedData;
};
const compare = (arr1, arr2) => {
  let result =
    arr1.length == arr2.length &&
    arr1.every((element1, idx1) => {
      
      return Object.keys(element1).every((key) => {
        if(Array.isArray(element1[key])){
          return compare(element1[key], arr2[idx1][key]);
        }
        let check = element1[key] == arr2[idx1][key]
        return check; 
      });
    });
  return result;
};
export {
  reorder,
  getGroupByID,
  getGroupByName,
  updateGroup,
  move,
  formatDataForDisplay,
  compare,
};
