import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import Task from "./Task";
import { reorder, getGroupByID, updateGroup, move } from "../utils/ListAction";
import { useDispatch, useSelector } from "react-redux";
import { updateState } from "../redux/features/groupSlice";
import { Grid } from "@mui/material";

export default function DragDrop() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.groups.current);
  console.log(state)
  function onDragEnd(result) {
    const { source, destination } = result;
    let newState = state;
    
    const sourceDropID = source.droppableId;
    const desDropID = destination.droppableId;
    
    // dropped outside the list
    if (!destination) {
      return;
    }

    if (sourceDropID === desDropID) {
      const items = reorder(
        getGroupByID(state, sourceDropID)?.taskList,
        source.index,
        destination.index
      );
      newState = updateGroup(newState, items, sourceDropID);
    } else {
      const result = move(
        getGroupByID(state, sourceDropID)?.taskList,
        getGroupByID(state, desDropID)?.taskList,
        source,
        destination,
        getGroupByID(state, desDropID)?.name
      );
      newState = updateGroup(newState, result[sourceDropID], sourceDropID);
      newState = updateGroup(newState, result[desDropID], desDropID);
    }
    dispatch(updateState(newState));
  }

  function handleDelete(taskId, groupId) {
    let group = getGroupByID(state, groupId);
    let newTasks = group.taskList.filter((t) => t.id !== taskId);
    let newState = [...state];

    newState = updateGroup(newState, newTasks, groupId);
    dispatch(updateState(newState));
  }
 
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {state?.map((el, ind) => (
        <Grid className="gridCard" item xs={3} key={ind}>
          <div className="card rounded shadow-sm border-light">
            <div className="card-body p-1 text-center text-uppercase font-weight-bold text-secondary">
              {el.name}
            </div>
          </div>
          <Droppable droppableId={el.id}>
            {(provided) => (
              <div
                className="scrollable"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {el.taskList?.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Task
                          task={item}
                          group={el}
                          handleDelete={handleDelete}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </Grid>
      ))}
    </DragDropContext>
  );
}
