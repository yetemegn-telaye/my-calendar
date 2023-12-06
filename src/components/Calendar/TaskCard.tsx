import React,{useState} from "react";
import "../../styles/TaskCard.css";


const TaskCard: React.FC<any>  = ({task,labels,onEditTask,onAddLabel}) => {
const [isEditing, setIsEditing] = useState(false);
const [editedTaskTitle, setEditedTaskTitle] = useState(task.title);
const [newTaskLabel, setNewTaskLabel] = useState("");
const [newLabelColor, setNewLabelColor] = useState("");

const handleEditClick = ()=>{
    setIsEditing(true);
}

const handleSaveClick = ()=>{
    const updatedTask = {...task, title: editedTaskTitle};
    onEditTask(task.id, updatedTask);
    setIsEditing(false);
}
const handleAddLabel = () => {
    const newLabel = {
        id: Math.floor(Math.random() * 1000),
        text: newTaskLabel,
        color: newLabelColor
    }
    onAddLabel(task.id, newLabel);
    setNewTaskLabel("");
    setNewLabelColor("");
}
 
    return(
        <div className="task-card">
            <div className="task-labels">
                {labels.map((label:any) => (
                    <span key={label.id} 
                    title={label.text} 
                    className="label-color-box"
                     style={{backgroundColor: label.color}}></span>
                ))}
                <div>
                <input type="text" value={newTaskLabel} onChange={(e)=>setNewTaskLabel(e.target.value)}/>
                <input type="color" value={newLabelColor} onChange={(e)=>setNewLabelColor(e.target.value)}/>
                <button onClick={handleAddLabel}>Add Label</button>
            </div>
            </div>
            {isEditing ? (
                <div className="edit-task">
                    <input 
                      type="text"
                        value={editedTaskTitle}
                        onChange={(e)=>setEditedTaskTitle(e.target.value)}
                    />
                    <button onClick={handleSaveClick}>Save</button>
                </div>
            ):(
                <div className="task-title">{task.title}</div>
            )}
            <button onClick={handleEditClick}>Edit</button>
        </div>
    )
}
export default TaskCard;