import React, { useState } from 'react';

const DashboardWidgets = () => {
  const [tasks, setTasks] = useState([
    { text: 'Short task goes here...', completed: false },
    { text: 'Short task goes here...', completed: false },
    { text: 'Short task goes here...', completed: true },
    { text: 'Short task goes here...', completed: false },
    { text: 'Short task goes here...', completed: false },
  ]);

  const [newTask, setNewTask] = useState('');

  const handleAddTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const handleToggleTask = (index) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };

  const handleRemoveTask = (index) => {
    const updated = [...tasks];
    updated.splice(index, 1);
    setTasks(updated);
  };

  return (
    <div className="container-fluid pt-4 px-4">
      <div className="row g-4">
        {/* Messages */}
        <div className="col-sm-12 col-md-6 col-xl-4">
          <div className="h-100 bg-secondary rounded p-4">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <h6 className="mb-0">Messages</h6>
              <a href="#">Show All</a>
            </div>
            {[...Array(4)].map((_, i) => (
              <div className="d-flex align-items-center border-bottom py-3" key={i}>
                <img
                  className="rounded-circle flex-shrink-0"
                  src="img/user.jpg"
                  alt="user"
                  style={{ width: 40, height: 40 }}
                />
                <div className="w-100 ms-3">
                  <div className="d-flex w-100 justify-content-between">
                    <h6 className="mb-0">Jhon Doe</h6>
                    <small>15 minutes ago</small>
                  </div>
                  <span>Short message goes here...</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Calendar */}
        <div className="col-sm-12 col-md-6 col-xl-4">
          <div className="h-100 bg-secondary rounded p-4">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h6 className="mb-0">Calendar</h6>
              <a href="#">Show All</a>
            </div>
            <div id="calendar" style={{ minHeight: 200, color: '#ccc' }}>
              <p>[ Calendar component goes here ]</p>
            </div>
          </div>
        </div>

        {/* To-Do List */}
        <div className="col-sm-12 col-md-6 col-xl-4">
          <div className="h-100 bg-secondary rounded p-4">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h6 className="mb-0">To Do List</h6>
              <a href="#">Show All</a>
            </div>
            <div className="d-flex mb-2">
              <input
                className="form-control bg-dark border-0"
                type="text"
                placeholder="Enter task"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
              />
              <button type="button" className="btn btn-primary ms-2" onClick={handleAddTask}>
                Add
              </button>
            </div>
            {tasks.map((task, index) => (
              <div className="d-flex align-items-center border-bottom py-2" key={index}>
                <input
                  className="form-check-input m-0"
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggleTask(index)}
                />
                <div className="w-100 ms-3">
                  <div className="d-flex w-100 align-items-center justify-content-between">
                    <span>
                      {task.completed ? <del>{task.text}</del> : task.text}
                    </span>
                    <button
                      className={`btn btn-sm ${task.completed ? 'text-primary' : ''}`}
                      onClick={() => handleRemoveTask(index)}
                    >
                      <i className="fa fa-times"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardWidgets;
