// Portal 사용의 이유
// ➡️ React 의 tree 구조에 따라서 부모 컴포넌트가 렌더링 되면 자식 컴포넌트도 그 영향을 받아서 같이 렌더링이 된다. 그래서 자식 컴포넌트 같은 경우는 쓸데없는 렌더링이 일어날 수도 있고 부모 컴포넌트의 스타일링에 제약을 받아 z-index 와 같은 후처리를 해야한다는 점도 있다.
// 이러한 DOM tree 상의 부모-자식 컴포넌트 간의 제약에서 Portal을 통해 독립적인 구조와 부모-자식 관계를 동시에 유지할 수 있기 때문에 Portal을 사용하는 것이다.

// ➡️ 또 다른 이유로는 modal이 독립적이지 않고 부모의 DOM노드 안에서 렌더링 되는 것이 의미적인 관점이나 간결한 HTMl 구조를 갖췄는지의 관점으로 보면 별로 좋지 않기 때문이다.
// 왜냐, 기본적으로 모달은 페이지 위에 표시되는 오버레이이기 때문이다. 모달은 전체페이지에 대한 오버레이이기 때문에 당연히 다른 모든 것의 위에 있다. 그래서 모달이 만약 다른 HTML 코드 안에 중첩되어 있다면, 기술적으로는 스타일링 덕분에 작동할지 몰라도 좋은 코드가 아니고 좋은 구조 또한 아니게 된다.

//그래서 뭔가 이번엔 진짜 hook 을 만들어보자라는 차원에서 React Portal을 이용하여 useModal, usePopup 이라는 훅을 제작하게 되었다.

import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames/bind';
import styles from './modal.module.scss';

const cx = classNames.bind(styles);

const index = ({ isOpen, onClose, children }) => {
  const modalRoot = document.getElementById('modal');

  if (!isOpen) return null;
  // isOpen이 false일 때 null 반환

  return ReactDOM.createPortal(
    <div className={cx(`modal-overlay`)}>
      <div className={cx(`modal-content`)}>
        <button className={cx(`modal-close`)} onClick={onClose}>
          Close
        </button>
        {children}
      </div>
    </div>,
    modalRoot,
  );
};

export default index;
