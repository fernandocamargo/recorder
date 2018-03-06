import React from 'react';

import For from 'components/helpers/for';
import Control from 'components/control';

export default ({ title, controls }) => (
  <footer className="controls">
    <nav>
      <h4>{title}</h4>
      <ul>
        <For each={controls}>
          <Control />
        </For>
      </ul>
    </nav>
  </footer>
);
