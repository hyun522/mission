import classNames from 'classnames';
import styles from '../../page/todolist/todolist.module.scss';
import supabase from '../../apis/supabaseApi';

const cx = classNames.bind(styles);

const TitleAndAddTask = ({ tasks, setTasks, newTask, setNewTask }) => {
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

  return (
    <>
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
    </>
  );
};

export default TitleAndAddTask;
