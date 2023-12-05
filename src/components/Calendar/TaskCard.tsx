import React from "react";
import "../../styles/TaskCard.css";


const TaskCard: React.FC<any>  = ({task,labels,onEditTask}) => {
const [isEditing, setIsEditing] = React.useState(false);
const [editedTaskTitle, setEditedTaskTitle] = React.useState(task.title);

const handleEditClick = ()=>{
    setIsEditing(true);
}

const handleSaveClick = ()=>{
    const updatedTask = {...task, title: editedTaskTitle};
    onEditTask(task.id, updatedTask);
    setIsEditing(false);
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