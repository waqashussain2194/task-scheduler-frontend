import React, { useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import ExecutionLog from './components/ExecutionLog';
import './styles/appStyles.css';

const App = () => {
  const [update, setUpdate] = useState(false);

  const handleTaskCreated = () => {
    setUpdate(!update);
  };

  const handleTaskDeleted = () => {
    setUpdate(!update);
  };

  return (
    <div className="center-container">
      <h1>Task Scheduler</h1>
      <TaskForm onSave={handleTaskCreated} />
      <TaskList onTaskDeleted={handleTaskDeleted} />
      <ExecutionLog />
    </div>
  );
};

export default App;
