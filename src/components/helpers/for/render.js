import clone from 'helpers/rendering/clone';

export default ({ each, children }) => each.map(clone(children));
