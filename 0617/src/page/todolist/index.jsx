import React, { useState, useEffect } from 'react';
import supabase from '@/apis/supabaseApi';
import Modal from '@/components/common/Modal';
import useModal from '@/hooks/useModal';
import TitleAndAddTask from '@/components/Todolist/TitleAndAddTask';
import classNames from 'classnames/bind';
import styles from './todolist.module.scss';

const cx = classNames.bind(styles);

function todolist() {
  const {
    isOpen: isOpenEditModal,
    openModal: openEditModal,
    closeModal: closeEditModal,
  } = useModal();
  const {
    isOpen: isOpenDeleteModal,
    openModal: openDeleteModal,
    closeModal: closeDeleteModal,
  } = useModal();

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [deletingTaskId, setDeletingTaskId] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const { data, error } = await supabase
      .from('todolist')
      .select('*')
      .order('id', { ascending: true });

    if (error) {
      console.error('Error fetching tasks:', error);
    } else {
      setTasks(data);
    }
  };

  const toggleComplete = async (id, isComplete) => {
    const { error } = await supabase
      .from('todolist')
      .update({ is_complete: !isComplete })
      .eq('id', id);

    if (error) {
      console.error('Error updating task status:', error);
    } else {
      fetchTasks();
    }
  };

  const deleteTask = async (id) => {
    const { error } = await supabase.from('todolist').delete().eq('id', id);
    if (error) {
      console.error('Error deleting task:', error);
    } else {
      fetchTasks();
      closeDeleteModal();
    }
  };

  const startEditing = (task) => {
    setEditingTaskId(task.id);
    setEditingText(task.task);
    openEditModal();
  };

  const cancelEditing = () => {
    setEditingTaskId(null);
    setEditingText('');
    closeEditModal();
  };

  const saveTask = async (id) => {
    if (editingText.trim() === '') return;

    const { error } = await supabase
      .from('todolist')
      .update({ task: editingText })
      .eq('id', id);
    if (error) {
      console.error('Error updating task:', error);
    } else {
      fetchTasks();
      cancelEditing();
    }
  };

  const openDeleteModalWithTaskId = (id) => {
    setDeletingTaskId(id);
    openDeleteModal();
  };

  return (
    <div className={cx('bg')}>
      <div className={cx('todolistContent')}>
        <TitleAndAddTask
          newTask={newTask}
          setNewTask={setNewTask}
          tasks={tasks}
          setTasks={setTasks}
        />
        <ul className={cx('taskListUi')}>
          {tasks.map((task) => (
            <li key={task.id} className={cx('taskListLi')}>
              <input
                type='checkbox'
                checked={task.is_complete}
                onClick={() => toggleComplete(task.id, task.is_complete)}
                className={cx('taskListInput')}
                readOnly
              />
              <span
                style={{
                  textDecoration: task.is_complete ? 'line-through' : 'none',
                }}
                className={cx('taskListSpan')}
              >
                {task.task}
              </span>
              <button onClick={() => startEditing(task)}>Edit</button>
              <button onClick={() => openDeleteModalWithTaskId(task.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
      {isOpenEditModal && (
        <Modal>
          <h2>Edit Task</h2>
          <input
            type='text'
            value={editingText}
            onChange={(e) => setEditingText(e.target.value)}
          />
          <button onClick={() => saveTask(editingTaskId)}>Save</button>
          <button onClick={cancelEditing}>Cancel</button>
        </Modal>
      )}
      {isOpenDeleteModal && (
        <Modal>
          <h2>Delete Task</h2>
          <button onClick={() => deleteTask(deletingTaskId)}>yes</button>
          <button onClick={closeDeleteModal}>no</button>
        </Modal>
      )}
    </div>
  );
}

export default todolist;
