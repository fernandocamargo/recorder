import { compose, lifecycle, withStateHandlers, withProps } from 'recompose';

import initialState from './initial-state';
import * as reducers from './reducers';
import props from './props';
import events from './events';

export default compose(
  withStateHandlers(initialState, reducers),
  withProps(props),
  lifecycle(events),
);
