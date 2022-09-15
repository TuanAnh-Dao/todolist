import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Task from "./Task";
import { reorder, getGroupByID, updateGroup, move } from "../utils/ListAction";

export default function DragDrop({ state, setState }) {
  function onDragEnd(result) {
    const { source, destination } = result;
    let newState = [...state];
    const sourceDropID = source.droppableId;
    const desDropID = destination.droppableId;

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (sourceDropID === desDropID) {
      const items = reorder(
        getGroupByID(state, sourceDropID)?.tasks,
        source.index,
        destination.index
      );
      newState = updateGroup([...state], items, sourceDropID);
    } else {
      const result = move(
        getGroupByID(state, sourceDropID)?.tasks,
        getGroupByID(state, desDropID)?.tasks,
        source,
        destination,
        getGroupByID(state, desDropID)?.groupName
      );
      newState = updateGroup(newState, result[sourceDropID], sourceDropID);
      newState = updateGroup(newState, result[desDropID], desDropID);
    }
    setState(newState);
  }

  function handleDelete(taskId, groupId) {
    let group = getGroupByID(state, groupId);
    let newTasks = group.tasks.filter((t) => t.id !== taskId);
    let newState = [...state];

    newState = updateGroup(newState, newTasks, groupId);
    setState(newState);
  }
  console.log("drag");
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {state.map((el, ind) => (
        <div className="col-md-3 " key={ind}>
          <div className="card rounded shadow-sm border-light">
            <div className="card-body p-1 text-center text-uppercase font-weight-bold text-secondary">
              {el.groupName}
            </div>
          </div>
          <Droppable droppableId={el.groupId}>
            {(provided) => (
              <div
                className="scrollable"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {el.tasks.map((item, index) => (
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
        </div>
      ))}
    </DragDropContext>
  );
}
