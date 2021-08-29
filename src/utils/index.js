// import moment from 'moment';

// export function fromNow(timestamp) {
//   const date = new Date(+timestamp);
//   return moment(date).fromNow();
// }

export function copy(command) {
  const input = document.createElement('input');
  input.value = command;
  document.body.appendChild(input);
  input.select();
  document.execCommand('Copy');
  input.className = 'input';
  input.style.display = 'none';
}

export function formatName(name) {
  let _name = name;
  if (_name && _name.startsWith('@') && _name.indexOf('/') > 0) {
    // @cloudscope-cli/component-test ->
    // @cloudscope-cli_component-test
    const nameArray = _name.split('/');
    _name = nameArray.join('_').replace('@', '');
  }
  return _name;
}

export default {};