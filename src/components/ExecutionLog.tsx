import React, { useEffect, useState } from 'react';
import { fetchExecutionLogs } from '../services/api';

const ExecutionLog = () => {
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    const getLogs = async () => {
      const response = await fetchExecutionLogs();
      setLogs(response.data);
    };
    getLogs();
  }, []);

  return (
    <div>
      <h2>Execution Logs</h2>
      <ul>
        {logs.map((log) => (
          <li key={log.id}>
            Task ID: {log.taskId}, Scheduled Execution: {log.executionTime}, Actual Execution: {log.actualExecutionTime}, Status: {log.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExecutionLog;
