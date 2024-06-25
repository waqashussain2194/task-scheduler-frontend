import React, { useState } from 'react';
import { createTask, updateTask } from '../services/api';
import '../styles/taskFormStyles.css';

interface TaskFormProps {
  task?: any;
  onSave: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ task, onSave }) => {
  const [name, setName] = useState(task?.name || '');
  const [type, setType] = useState(task?.type || 'one-time');
  const [executionTime, setExecutionTime] = useState(task?.executionTime || '');
  const [status, setStatus] = useState(task?.status || 'pending');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const taskData = { name, type, executionTime, status };

    try {
      if (task) {
        await updateTask(task.id, taskData);
      } else {
        await createTask(taskData);
      }
      setError(null); // Reset error state on successful save
      onSave();
    } catch (error) {
      setError('Failed to save task. Please try again later.');
      console.error('Error saving task:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      {error && <p className="error-message">{error}</p>}
      <div className="form-group">
        <label className="form-label">Name</label>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
          className="form-input" 
        />
      </div>
      <div className="form-group">
        <label className="form-label">Type</label>
        <select 
          value={type} 
          onChange={(e) => setType(e.target.value)} 
          className="form-select"
        >
          <option value="one-time">One-Time</option>
          <option value="recurring">Recurring</option>
        </select>
      </div>
      {type === 'one-time' && (
        <div className="form-group">
          <label className="form-label">Execution Time</label>
          <input 
            type="datetime-local" 
            value={executionTime} 
            onChange={(e) => setExecutionTime(e.target.value)} 
            required 
            className="form-input" 
          />
        </div>
      )}
      <button 
        type="submit" 
        className="form-button"
      >
        Save
      </button>
    </form>
  );
};

export default TaskForm;
