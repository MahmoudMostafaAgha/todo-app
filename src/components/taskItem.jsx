import React from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';

const TaskItem = ({
    task,
    index,
    editingIndex,
    handleTaskToggle,
    handleTaskEdit,
    handleTaskDelete,
    handleTaskInputChange,
    newTask,
    handleEditingTask,
}) => {
    return (
        <li className={`task col-md-3 ${task.completed ? 'completed' : ''}`}>
            <div className='task-details'>
                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleTaskToggle(index)}
                />

                {editingIndex === index ? (
                    <input
                        type="text"
                        value={newTask}
                        onChange={handleTaskInputChange}
                        className="edit-input p-2 "
                    />
                ) : (
                    <span className={`ml-2 ${task.completed ? 'line-through ' : ''}`}>
                        {task.text}
                    </span>
                )}
            </div>
            <div className="d-flex">
                {editingIndex === index ? (
                    <button
                        onClick={handleEditingTask}
                        className="edit-button"
                    >
                        Save
                    </button>
                ) : (
                    <>
                        <button
                            onClick={() => handleTaskEdit(index)}
                            className="edit-button"
                        >
                            <AiOutlineEdit />
                        </button>
                        <button
                            onClick={() => handleTaskDelete(index)}
                            className="delete-button"
                        >
                            <AiOutlineDelete />
                        </button>
                    </>
                )}
            </div>
        </li>
    );
};

export default TaskItem;
