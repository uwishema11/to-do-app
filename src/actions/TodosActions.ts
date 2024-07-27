export async function fetchData() {
  const response = await fetch('/api/todos/get');
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
}

export async function updateCompleteStatus(id: string) {
  try {
    const response = await fetch(`/api/todos/update?id=${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error('Failed to update task');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function InsertData(task: string) {
  const response = await fetch('/api/todos/insert', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title: task }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch data');
  }

  return response.json();
}

export async function deleteData(id: string) {
  const response = await fetch(`/api/todos/delete?id=${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete data');
  }
  return response.json();
}
