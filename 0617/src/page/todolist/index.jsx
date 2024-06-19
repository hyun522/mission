// rm -rf node_modules
import React, { useState, useEffect } from 'react';
import supabase from '../../apis/supabaseApi';
import Modal from '../../components/Modal';
import useModal from '../../hooks/useModal';
import classNames from 'classnames/bind';
import styles from './todolist.module.scss';

const cx = classNames.bind(styles);

//@TODO
//1. gpt가 짜준 코드 일단 해석후 supabase랑 연동되게 ✅
//2. css global설정✅ / css작업
//3. 모달등 추가작업✅
//새로고침을해도 checkbox 그래로 유지 되도록✅
//모달창 전체 해석✅
//4. console.log제거 등 크로스체크

//공부한거 기록

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

  const addTask = async () => {
    if (newTask.trim() === '') return;

    const { data, error } = await supabase
      .from('todolist')
      .insert([{ task: newTask, is_complete: false }])
      .select();

    if (error) {
      console.error('Error adding task:', error);
    } else {
      setTasks([...tasks, ...data]);
      setNewTask('');
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
        <h1>To-Do List</h1>
        <div className={cx('addTaskList')}>
          <input
            type='text'
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder='항목을 입력하세요.'
            className={cx('addTaskInput')}
          />
          <button onClick={addTask}>Add Task</button>
        </div>
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
