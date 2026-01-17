let students = JSON.parse(localStorage.getItem("students")) || [];
let editIndex = null;

const form = document.getElementById("studentForm");
const table = document.getElementById("studentTable");

// Display students
function renderTable() {
  table.innerHTML = "";
  students.forEach((student, index) => {
    table.innerHTML += `
      <tr>
        <td>${student.name}</td>
        <td>${student.id}</td>
        <td>${student.email}</td>
        <td>${student.contact}</td>
        <td>
          <button class="edit" onclick="editStudent(${index})">Edit</button>
          <button class="delete" onclick="deleteStudent(${index})">Delete</button>
        </td>
      </tr>
    `;
  });

  localStorage.setItem("students", JSON.stringify(students));
}

// Form submit
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const id = document.getElementById("studentId").value.trim();
  const email = document.getElementById("email").value.trim();
  const contact = document.getElementById("contact").value.trim();

  // Validation
  if (!name || !id || !email || !contact) {
    alert("All fields are required");
    return;
  }

  if (!/^[A-Za-z ]+$/.test(name)) {
    alert("Name must contain only characters");
    return;
  }

  if (contact.length < 10) {
    alert("Contact number must be at least 10 digits");
    return;
  }

  const studentData = { name, id, email, contact };

  if (editIndex === null) {
    students.push(studentData);
  } else {
    students[editIndex] = studentData;
    editIndex = null;
  }

  form.reset();
  renderTable();
});

// Edit student
function editStudent(index) {
  const student = students[index];
  document.getElementById("name").value = student.name;
  document.getElementById("studentId").value = student.id;
  document.getElementById("email").value = student.email;
  document.getElementById("contact").value = student.contact;
  editIndex = index;
}

// Delete student
function deleteStudent(index) {
  if (confirm("Are you sure you want to delete this record?")) {
    students.splice(index, 1);
    renderTable();
  }
}

// Initial load
renderTable();
