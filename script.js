const form = document.getElementById("studentForm");
const tableBody = document.getElementById("tableBody");
const submitBtn = document.getElementById("submitBtn");

let students = JSON.parse(localStorage.getItem("students")) || [];
let editIndex = null;

// 🟢 Display all students
function renderTable() {
  tableBody.innerHTML = "";

  students.forEach((student, index) => {
    const row = `
      <tr>
        <td>${student.name}</td>
        <td>${student.rollNo}</td>
        <td>${student.department}</td>
        <td>${student.year}</td>
        <td>
          <button class="action-btn edit" onclick="editStudent(${index})">Edit</button>
          <button class="action-btn delete" onclick="deleteStudent(${index})">Delete</button>
        </td>
      </tr>
    `;
    tableBody.innerHTML += row;
  });

  localStorage.setItem("students", JSON.stringify(students));
}

// 🟡 Add or Update Student
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const student = {
    name: document.getElementById("name").value,
    rollNo: document.getElementById("rollNo").value,
    department: document.getElementById("department").value,
    year: document.getElementById("year").value,
  };

  if (editIndex === null) {
    // Create
    students.push(student);
  } else {
    // Update
    students[editIndex] = student;
    editIndex = null;
    submitBtn.textContent = "Add Student";
  }

  form.reset();
  renderTable();
});

// 🟠 Edit Student
function editStudent(index) {
  const student = students[index];
  document.getElementById("name").value = student.name;
  document.getElementById("rollNo").value = student.rollNo;
  document.getElementById("department").value = student.department;
  document.getElementById("year").value = student.year;

  editIndex = index;
  submitBtn.textContent = "Update Student";
}

// 🔴 Delete Student
function deleteStudent(index) {
  if (confirm("Are you sure you want to delete this student?")) {
    students.splice(index, 1);
    renderTable();
  }
}

// Load existing students
renderTable();
