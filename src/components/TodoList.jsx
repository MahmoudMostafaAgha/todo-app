import React, { useState } from 'react';
import TaskItem from './taskItem';
import Swal from 'sweetalert2';

const TodoList = () => {
    const [tasks, setTasks] = useState([]);
    const [addNewTask, setAddNewTask] = useState('');
    const [newTask, setNewTask] = useState('');
    const [editingIndex, setEditingIndex] = useState(null);
    const [filter, setFilter] = useState('all');

    const filteredTasks = tasks.filter((task) => {
        if (filter === 'completed') return task.completed;
        if (filter === 'notCompleted') return !task.completed;
        return true;
    });

    const handleTaskSubmit = (e) => {
        e.preventDefault();

        if (addNewTask.trim() === '') {
            Swal.fire({
                icon: 'warning',
                title: 'warning',
                text: 'Task cannot be empty!',
            });
            return;
        }

        setTasks([...tasks, { text: addNewTask, completed: false }]);
        setAddNewTask('');
        setError('');
    };
    const handleEditingTask = (e) => {
        e.preventDefault();

        if (editingIndex !== null) {
            const updatedTasks = [...tasks];
            updatedTasks[editingIndex].text = newTask;
            setTasks(updatedTasks);
            setEditingIndex(null);
            setNewTask('');
        }
    };

    const handleTaskDelete = (index) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                const updatedTasks = [...tasks];
                updatedTasks.splice(index, 1);
                setTasks(updatedTasks);
                Swal.fire(
                    'Deleted!',
                    'Your task has been deleted.',
                    'success'
                );
            }
        });
    };

    const handleTaskToggle = (index) => {
        const updatedTasks = [...tasks];
        updatedTasks[index].completed = !updatedTasks[index].completed;
        setTasks(updatedTasks);
    };

    const handleTaskEdit = (index) => {
        setNewTask(tasks[index].text);
        setEditingIndex(index);
    };

    const handleAddTaskInputChange = (e) => {
        setAddNewTask(e.target.value);
    };

    const handleTaskInputChange = (e) => {
        setNewTask(e.target.value);
    };

    const handleFilterChange = (selectedFilter) => {
        setFilter(selectedFilter);
    };

    return (
        <div className=" mt-8 rounded">
            <form onSubmit={handleTaskSubmit} className="mb-4 to-do-form">
                <input
                    type="text"
                    value={addNewTask}
                    onChange={handleAddTaskInputChange}
                    className=" p-2  task-input"
                    placeholder='Add your task here!'
                />
                <button type="submit" className="ml-2 bg-blue-500 text-white p-2 rounded submit-btn">
                    Add task
                </button>
            </form>

            <div className="mb-4 filter-btns">
                <button
                    onClick={() => handleFilterChange('all')}
                    className={`mr-2  filter-btn p-2 rounded ${filter === 'all' ? 'bg-black text-white' : ''}`}
                >
                    All
                </button>
                <button
                    onClick={() => handleFilterChange('completed')}
                    className={`mr-2  filter-btn p-2 rounded ${filter === 'completed' ? 'bg-black text-white' : ''}`}
                >
                    Completed
                </button>
                <button
                    onClick={() => handleFilterChange('notCompleted')}
                    className={`filter-btn  p-2 rounded ${filter === 'notCompleted' ? 'bg-black text-white' : ''}`}
                >
                    Not Completed
                </button>
            </div>
            <div className="container">

                <ul className='all-tasks row'>
                    {filteredTasks.map((task, index) => (
                        <TaskItem
                            key={index}
                            task={task}
                            index={index}
                            editingIndex={editingIndex}
                            handleTaskToggle={handleTaskToggle}
                            handleTaskEdit={handleTaskEdit}
                            handleTaskDelete={handleTaskDelete}
                            handleTaskInputChange={handleTaskInputChange}
                            newTask={newTask}
                            handleEditingTask={handleEditingTask}
                        />
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default TodoList;
