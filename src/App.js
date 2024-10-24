import React, { useState } from "react";
import { FaTrash, FaPlus } from "react-icons/fa";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [subTask, setSubTask] = useState('');
  const [mainTask, setMainTask] = useState('');
  const [expandedIndex, setExpandedIndex] = useState(null); // Track which main task is expanded

  // Function to add a new main task
  const addTask = (e) => {
    e.preventDefault();
    if (mainTask.trim() !== '') {
      setTasks([...tasks, { title: mainTask, completed: false, subtasks: [] }]);
      setMainTask('');
    }
  };

  // Function to add a subtask
  const addSubTask = (index) => {
    if (subTask.trim() !== '') {
      const newTasks = [...tasks];
      newTasks[index].subtasks.push({ title: subTask, completed: false });
      setTasks(newTasks);
      setSubTask(''); // Clear the subTask input after adding
      setExpandedIndex(null); // Close the expanded index after adding the subtask
    }
  };

  // Function to toggle completion of a main task
  const toggleTaskCompletion = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  // Function to delete a main task
  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  // Function to delete a subtask
  const deleteSubTask = (mainIndex, subIndex) => {
    const newTasks = [...tasks];
    newTasks[mainIndex].subtasks.splice(subIndex, 1);
    setTasks(newTasks);
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <form onSubmit={addTask}>
        <input
          type="text"
          value={mainTask}
          onChange={(e) => setMainTask(e.target.value)}
          placeholder="Add Main Task"
        />
        <button type="submit" disabled={mainTask.trim() === ''}>Add Main Task</button>
      </form>

      {tasks.map((taskItem, index) => (
        <div key={index} className="task-container">
          <div className="task">
            <input
              type="checkbox"
              checked={taskItem.completed}
              onChange={() => toggleTaskCompletion(index)}
            />
            <span className={taskItem.completed ? 'completed' : ''}>
              {taskItem.title}
            </span>
            <button 
              onClick={() => deleteTask(index)} 
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'red' }} // Red color for delete icon
            >
              <FaTrash />
            </button>
            <button 
              onClick={() => setExpandedIndex(expandedIndex === index ? null : index)} 
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'green' }} // Green color for plus icon
            >
              <FaPlus />
            </button>
          </div>

          {expandedIndex === index && ( // Check if the current task is expanded
            <>
              <form onSubmit={(e) => { e.preventDefault(); addSubTask(index); }}>
                <input
                  type="text"
                  value={subTask}
                  onChange={(e) => setSubTask(e.target.value)}
                  placeholder="Add Subtask"
                />
                <button type="submit" disabled={subTask.trim() === ''}>Add Subtask</button>
              </form>
              <ul>
                {taskItem.subtasks.map((subtaskItem, subIndex) => (
                  <li key={subIndex}>
                    <input
                      type="checkbox"
                      checked={subtaskItem.completed}
                      onChange={() => {
                        const newTasks = [...tasks];
                        newTasks[index].subtasks[subIndex].completed = !newTasks[index].subtasks[subIndex].completed;
                        setTasks(newTasks);
                      }}
                    />
                    <span className={subtaskItem.completed ? 'completed' : ''}>
                      {subtaskItem.title}
                    </span>
                    <FaTrash 
                      style={{ cursor: 'pointer', marginLeft: '10px', color: 'red' }} 
                      onClick={() => deleteSubTask(index, subIndex)} 
                    />
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default App;
