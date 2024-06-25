import React, { useEffect, useState } from 'react';
import { fetchTasks, deleteTask } from '../services/api';

const TaskList = ({ onTaskDeleted }: { onTaskDeleted: () => void }) => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getTasks = async () => {
      try {
        const response = await fetchTasks();
        setTasks(response.data);
        setError(null); // Reset error state on successful fetch
      } catch (error) {
        setError('Failed to fetch tasks. Please try again later.');
        console.error('Error fetching tasks:', error);
      }
    };
    getTasks();
  }, [onTaskDeleted]);

  const handleDelete = async (id: number) => {
    try {
      await deleteTask(id);
      onTaskDeleted();
      setError(null); // Reset error state on successful delete
    } catch (error) {
      setError('Failed to delete task. Please try again later.');
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div>
      <h2>Task List</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.name} - {task.type} - {task.status}
            <button onClick={() => handleDelete(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
