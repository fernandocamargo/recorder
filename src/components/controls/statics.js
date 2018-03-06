import { node, arrayOf, shape } from 'prop-types';

import { propTypes as Control } from 'components/control/statics';

export const displayName = 'Controls';

export const propTypes = {
  title: node.isRequired,
  controls: arrayOf(shape(Control).isRequired).isRequired,
};

export const defaultProps = {};
