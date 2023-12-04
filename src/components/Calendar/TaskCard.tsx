import React from "react";
import "../../styles/TaskCard.css";


const TaskCard: React.FC<any>  = ({task,labels}) => {
 
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
            <div className="task-title">{task.title}</div>
            
        </div>
    )
}
export default TaskCard;