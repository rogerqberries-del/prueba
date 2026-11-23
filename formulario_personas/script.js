const STORAGE_KEY = "personas_registradas";

const form = document.getElementById("personForm");
const recordsBody = document.getElementById("recordsBody");
const emptyMessage = document.getElementById("emptyMessage");
const clearButton = document.getElementById("clearButton");

let people = loadPeople();

function loadPeople() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function savePeople() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(people));
}

function renderPeople() {
  recordsBody.innerHTML = "";
  emptyMessage.hidden = people.length > 0;

  people.forEach((person, index) => {
    const row = document.createElement("tr");

    [person.nombre, person.apellido, person.edad].forEach(value => {
      const cell = document.createElement("td");
      cell.textContent = value;
      row.appendChild(cell);
    });

    const actionCell = document.createElement("td");
    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "delete-button";
    deleteButton.textContent = "Eliminar";
    deleteButton.addEventListener("click", () => {
      people.splice(index, 1);
      savePeople();
      renderPeople();
    });
    actionCell.appendChild(deleteButton);
    row.appendChild(actionCell);
    recordsBody.appendChild(row);
  });
}

form.addEventListener("submit", event => {
  event.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const apellido = document.getElementById("apellido").value.trim();
  const edad = Number(document.getElementById("edad").value);

  if (!nombre || !apellido || !Number.isInteger(edad) || edad < 0 || edad > 120) {
    alert("Completa todos los campos con datos válidos.");
    return;
  }

  people.push({ nombre, apellido, edad });
  savePeople();
  renderPeople();
  form.reset();
  document.getElementById("nombre").focus();
});

clearButton.addEventListener("click", () => {
  if (people.length === 0) return;
  if (confirm("¿Seguro que deseas eliminar todos los registros?")) {
    people = [];
    savePeople();
    renderPeople();
  }
});

renderPeople();
