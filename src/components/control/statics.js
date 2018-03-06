import { string, func, bool } from 'prop-types';

export const displayName = 'Control';

export const propTypes = {
  type: string.isRequired,
  label: string.isRequired,
  action: func.isRequired,
  disabled: bool,
};

export const defaultProps = {
  disabled: false,
};
