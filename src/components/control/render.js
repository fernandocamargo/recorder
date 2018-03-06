import React from 'react';
import classnames from 'classnames';

export default ({ type, label, click, disabled }) => (
  <li className={classnames(type, { disabled })}>
    <a href={`#/${type}`} title={label} onClick={click}>
      <span>{label}</span>
    </a>
  </li>
);
