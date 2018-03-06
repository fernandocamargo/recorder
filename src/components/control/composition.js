import { compose, withHandlers } from 'recompose';

import handlers from './handlers';

export default compose(withHandlers(handlers));
