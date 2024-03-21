
import { createElem } from './helpers.js';

export function createTodoApp(
  container,
  title,
  user,
  list = [],
  {
    onSubmitClick,
    onDoneClick,
    onDeleteClick
  }
) {

  const hendlers = { onDone: onDoneClick, onDelete: onDeleteClick }

  const appTitle = createElem('h2', [], title);
  const appForm = createElem('form', ['input-group', 'mb-3']);
  const input = createElem('input', ['form-control']);
  const buttonWrapper = createElem('div', ['input-group-append']);
  const addButton = createElem('button', ['btn', 'btn-primary'], 'Добавить дело');
  appForm.append(input);
  appForm.append(buttonWrapper);
  buttonWrapper.append(addButton);

  input.placeholder = 'Введите название нового дела';
  addButton.disabled = true;

  input.addEventListener('input', () => {
    input.value ? addButton.disabled = false : addButton.disabled = true;
  })

  const todoListElement = createElem('ul', ['list-group']);

  container.append(appTitle);
  container.append(appForm);
  container.append(todoListElement);

  list.forEach(elem => {
    const item = createTodoElement(elem, hendlers);
    todoListElement.append(item);
  })

  appForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const item = await onSubmitClick(user, input.value);

    const newItem = createTodoElement(item, hendlers);
    todoListElement.append(newItem);

    input.value = '';
    addButton.disabled = true;
  })
}

export function createTodoElement(obj, { onDone, onDelete }) {

  const item = createElem('li', ['list-group-item', 'd-flex', 'justify-content-between', 'align-items-center'], obj.name);
  const buttonGroup = createElem('div', ['btn-group', 'btn-group-sm']);
  const doneButton = createElem('button', ['btn', 'btn-success'], 'Готово');
  const deleteButton = createElem('button', ['btn', 'btn-danger'], 'Удалить');

  obj.done ? item.classList.add('list-group-item-success') : obj.done;

  doneButton.addEventListener('click', () => {
    item.classList.toggle('list-group-item-success');
    onDone(obj, obj.user);
  })

  deleteButton.addEventListener('click', () => {
    confirm('Вы уверены?') ? onDelete(item, obj) : item;
  })

  buttonGroup.append(doneButton);
  buttonGroup.append(deleteButton);
  item.append(buttonGroup);

  return item;
}