import ReactDOM from 'react-dom';
import classNames from 'classnames/bind';
import styles from './modal.module.scss';

const cx = classNames.bind(styles);

const index = ({ children }) => {
  return ReactDOM.createPortal(
    <div className={cx(`modal-overlay`)}>
      <div className={cx(`modal-content`)}>{children}</div>
    </div>,
    document.getElementById('modal'),
  );
};

export default index;
