const API_BASE_URL =
  import.meta.env.VITE_API_URL;

const BASE_URL =
  `${API_BASE_URL}/students`;

function getHeaders() {

  const token =
    localStorage.getItem("token");

  return {

    "Content-Type":
      "application/json",

    Authorization:
      `Bearer ${token}`
  };
}

export async function fetchStudents() {

  const response = await fetch(

    BASE_URL,

    {

      method: "GET",

      headers: getHeaders()
    }
  );

  if (!response.ok) {

    throw new Error(
      "Failed to fetch students"
    );
  }

  return response.json();
}

export async function createStudent(
  student
) {

  const response = await fetch(

    BASE_URL,

    {

      method: "POST",

      headers: getHeaders(),

      body: JSON.stringify(student)
    }
  );

  if (!response.ok) {

    throw new Error(
      "Failed to create student"
    );
  }

  return response.json();
}

export async function updateStudent(
  id,
  student
) {

  const response = await fetch(

    `${BASE_URL}/${id}`,

    {

      method: "PUT",

      headers: getHeaders(),

      body: JSON.stringify(student)
    }
  );

  if (!response.ok) {

    throw new Error(
      "Failed to update student"
    );
  }

  return response.json();
}

export async function deleteStudent(
  id
) {

  const response = await fetch(

    `${BASE_URL}/${id}`,

    {

      method: "DELETE",

      headers: getHeaders()
    }
  );

  if (!response.ok) {

    throw new Error(
      "Failed to delete student"
    );
  }
}