import React from 'react';
import logo from './logo.svg';
import './App.css';
import CalenderGrid from './components/Calendar/CalenderGrid';
import { TaskProvider } from './context/TaskContext';
import { LabelProvider } from './context/LabelContext';

function App() {
  return (
    <TaskProvider>
      <LabelProvider>
      <CalenderGrid />
      </LabelProvider>
    </TaskProvider>
  );
}

export default App;
