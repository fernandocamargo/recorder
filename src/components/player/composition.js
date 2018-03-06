import { compose, shouldUpdate, withProps } from 'recompose';

import cache from './cache';
import props from './props';

export default compose(shouldUpdate(cache), withProps(props));
