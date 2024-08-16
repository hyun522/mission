import React from 'react';
import styles from './spinner.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const index = () => (
  <div className={cx('spinner')}>
    <div className={cx('double-bounce1')}></div>
    <div className={cx('double-bounce2')}></div>
  </div>
);

export default index;
