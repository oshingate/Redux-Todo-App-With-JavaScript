let store = Redux.createStore(reducer);
let { data } = store.getState();

let input = document.querySelector('#input');
let root = document.querySelector('.root');

input.addEventListener('keyup', (event) => {
  if (event.keyCode === 13) {
    store.dispatch({ type: 'addTodo', title: event.target.value });
    // handleAddTodo(event.target);
  }
});

//store subscribe function

store.subscribe(() => {
  let { data } = store.getState();

  createUI(data);
});

//reducer function

function reducer(state, action) {
  switch (action.type) {
    //case to add todo
    case 'addTodo':
      let singleTodo = {
        isCompleted: false,
        title: action.title,
      };

      state.data.push(singleTodo);

      return { data: state.data };

    //handle isChecked
    case 'isChecked':
      state.data[action.indexOfTodo].isCompleted = action.value;
      return { data: state.data };

    //handle remove todo
    case 'removeTodo':
      state.data.splice(action.indexOfTodo, 1);
      return { data: state.data };
    //default case
    default:
      return { data: [{ isCompleted: false, title: 'hello' }] };
  }
}

//create UI

createUI = (data) => {
  root.innerHTML = '';
  input.value = '';
  console.log('ui', data);

  data.forEach((eachTodo, i) => {
    let singleTodo = document.createElement('div');
    singleTodo.classList.add('todo', 'flex', 'jsb');
    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = eachTodo.isCompleted;
    checkbox.addEventListener('change', (event) => {
      store.dispatch({
        type: 'isChecked',
        value: event.target.checked,
        indexOfTodo: i,
      });
    });
    let span = document.createElement('span');
    span.innerText = eachTodo.title;
    let button = document.createElement('button');
    button.innerText = 'X';
    button.classList.add('btn-pri');

    button.addEventListener('click', () => {
      store.dispatch({
        type: 'removeTodo',
        indexOfTodo: i,
      });
    });

    singleTodo.append(checkbox, span, button);
    root.append(singleTodo);
  });
};

createUI(data);
