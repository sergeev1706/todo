
export async function getTodoList(owner) {
  const response = await fetch(`http://localhost:3000/api/todos?owner=${owner}`);
  return await response.json();
}

export async function createTodoItem(owner, name) {
  const response = await fetch(`http://localhost:3000/api/todos`, {
    method: 'POST',
    body: JSON.stringify({
      name: name,
      owner: owner
    }),
    headers: { 'Content-Type': 'application/json' }
  })
  return await response.json();
}

export async function switchTodoItemDone(todoItem) {
  todoItem.done = !todoItem.done;
  const response = await fetch(`http://localhost:3000/api/todos/${todoItem.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      done: todoItem.done,
    }),
  })
  return await response.json();
}

export async function deleteTodoItem(element, todoItem) {
  element.remove();
  const response = await fetch(`http://localhost:3000/api/todos/${todoItem.id}`, {
    method: 'DELETE',
  })
  return await response.json();
}
