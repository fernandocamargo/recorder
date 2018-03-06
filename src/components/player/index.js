import compose from './composition';
import * as statics from './statics';
import render from './render';

export default compose(Object.assign(render, statics));
