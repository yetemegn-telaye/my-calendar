import React from "react";
import "../../styles/TaskCard.css";

interface TaskCardProps {
    id: number;
    title: string;
    labels: Label[];
}

interface Label {
    id: number;
    text: string;
    color: string;
}

const TaskCard: React.FC<any>  = ({task,setTask,index, allTasks,date}) => {
    return(
        <div className="task-card">
            <div className="task-labels">
                {task.labels.map((label: any) => (
                    <span key={label.id} title={label.text} className="label-color-box" style={{backgroundColor: label.color}}></span>
                ))}
                
            </div>
            <div className="task-title">{task.title}</div>
        </div>
    )
}
export default TaskCard;