let tasks = [];

window.onload = function () {
	const storedTasks = localStorage.getItem('tasks');
	if (storedTasks) {
		tasks = JSON.parse(storedTasks);
		displayTasks();
	}
};

window.onbeforeunload = function () {
	localStorage.setItem('tasks', JSON.stringify(tasks));
};

let taskInputContainer = document.querySelector('.container');

function openTaskInput() {
	taskInputContainer.style.display = 'block';
}

function closeTaskInput() {
	taskInputContainer.style.display = 'none';
}

document.getElementById('openTaskInput').addEventListener('click', openTaskInput);

function addTask() {
	const taskInput = document.getElementById('taskInput');
	const taskText = taskInput.value.trim();
	if (taskText !== '') {
		tasks.push({ text: taskText, completed: false });
		displayTasks();
		taskInput.value = '';
	}
}

function deleteTask(index) {
	tasks.splice(index, 1);
	displayTasks();
}

function toggleTaskCompletion(index) {
	tasks[index].completed = !tasks[index].completed;
	displayTasks();
}

function displayTasks(filter = 'all') {
	const taskList = document.getElementById('taskList');
	taskList.innerHTML = '';
	tasks.forEach((task, index) => {
		if (filter === 'incomplete' && task.completed) return;
		const listItem = document.createElement('li');
		listItem.innerHTML = `
	<input type="checkbox" ${task.completed ? 'checked' : ''} onclick="toggleTaskCompletion(${index})">
	<span class="task-text" style="text-decoration: ${task.completed ? 'line-through' : 'none'}" onclick="toggleTaskCompletion(${index})">${task.text}</span>
	<button class="btn" onclick="deleteTask(${index})">Удалить</button>
`;
		taskList.appendChild(listItem);
	});
}

function applySort() {
	const sortSelect = document.getElementById('sortSelect');
	const selectedOption = sortSelect.value;
	displayTasks(selectedOption);
}