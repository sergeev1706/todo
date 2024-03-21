
export async function getTodoList(owner) {
  return getData(owner);
}

export async function createTodoItem(owner, name) {
  const arr = getData(owner);
  const item = { owner: owner, name: name, id: Date.now() }
  arr.push(item);
  setData(owner, arr);
  return item;
}

export async function switchTodoItemDone(todoItem) {
  const arr = getData(todoItem.owner);
  arr.map(e => e.id === todoItem.id ? e.done = !e.done : e);
  setData(todoItem.owner, arr);
}

export async function deleteTodoItem(element, todoItem) {
  element.remove()
  const arr = getData(todoItem.owner).filter(e => e.id !== todoItem.id)
  setData(todoItem.owner, arr);
}

function getData(owner) {
  let result = localStorage.getItem(owner);
  return result ? JSON.parse(result) : [];
}

function setData(owner, arr) {
  localStorage.setItem(owner, JSON.stringify(arr));
}