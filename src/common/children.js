// This is a utility component that returns its children.
// This allows one to avoid an Array syntax when returning multiple
// children from a React component.
// One day, this can be replaced with a DOM fragment.
export default props => props.children;