import { array, element } from 'prop-types';

export const displayName = 'Helpers/For';

export const propTypes = {
  each: array.isRequired,
  children: element.isRequired,
};

export const defaultProps = {};
