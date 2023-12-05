import React, { createContext, useContext, useState, ReactNode } from "react";

interface Task {
  id: number;
  title: string;
  labelIds: number[]; 
  date: Date;
}

interface TaskContextType {
  tasks: Task[];
  addTask: (newTask: Task) => void;
  updateTask: (taskId: number, updatedTask: Task) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTaskContext = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};

interface TaskProviderProps {
  children: ReactNode;
}

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
    const storedTasks = localStorage.getItem("tasks");
    const initialTasks = storedTasks ? JSON.parse(storedTasks) : [];
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const addTask = (newTask: Task) => {
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const updateTask = (taskId: number, updatedTask: Task) => {
    const updatedTasks = tasks.map((task)=>
        task.id === taskId ? updatedTask : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask }}>
      {children}
    </TaskContext.Provider>
  );
};
