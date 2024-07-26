

export async function fetchData() {
  const response = await fetch("/api/todos/get");
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
}

export async function updateData(id: string, complete: boolean) {
  const response = await fetch(`/api/update/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ complete }), 
  });

  if (!response.ok) {
    throw new Error("Failed to update data");
  }

  return response.json();
}

export async function InsertData(task: string) {
  const response = await fetch("/api/todos/insert", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: task }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to fetch data");
  }

  return response.json();
}

export async function deleteData(id: string) {
  const response = await fetch(`/api/todos/delete?id=${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete data");
  }
  return response.json();
}

