const form = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const dateText = document.getElementById('dateText');
const datePicker = document.getElementById('datePicker');
const taskList = document.getElementById('taskList');

// Load theme
if (localStorage.getItem('theme') === 'dark') document.body.classList.add('dark');

function toggleTheme() {
    document.body.classList.toggle('dark');
    localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
}

// Sync text & picker (substitutivity)
datePicker.addEventListener('change', () => {
    dateText.value = datePicker.value;
});
dateText.addEventListener('input', () => {
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateText.value)) datePicker.value = dateText.value;
});

form.addEventListener('submit', e => {
    e.preventDefault();
    const text = taskInput.value.trim();
    if (!text) return;

    const due = dateText.value || datePicker.value || '';

    const li = document.createElement('li');
    li.innerHTML = `
    <div>
    <span>${text}</span>
    ${due ? `<div class="due">Due: ${due}</div>` : ''}
    </div>
    <div class="actions">
    <button onclick="this.parentNode.parentNode.classList.toggle('done')">✓</button>
    <button onclick="this.parentNode.parentNode.remove()">×</button>
    </div>
`;
    taskList.appendChild(li);

    taskInput.value = '';
    dateText.value = '';
    datePicker.value = '';
});