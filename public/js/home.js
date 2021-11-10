const deleteButton = document.querySelectorAll('button[data-action="delete"]')

for (let i = 0; i < deleteButton.length; i++) {
    deleteButton[i].addEventListener('click', () => {
        const taskId = deleteButton[i].dataset.taskid;
        deleteTodo(taskId);
    })
}

const deleteTodo = (taskId) => {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4) {
            // Typical action to be performed when the document is ready:
            location.reload();
        }
    };
    xhttp.open("DELETE", "/api/task", true);
    xhttp.send(JSON.stringify(taskId)); //siusti galima tik stringa arba streama

};

const modal = document.getElementById("myModal");

// Get the button that opens the modal
const updateButton = document.querySelectorAll('button[data-action="update"]')
for (let i = 0; i < updateButton.length; i++) {
    updateButton[i].addEventListener('click', () => {
        const taskId = updateButton[i].dataset.taskid;
        getTodo(taskId);
        modal.style.display = "block";
        console.log(updateButton)
    })
};

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

const getTodo = (taskId) => {
    console.log(taskId)
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4) {
            // Typical action to be performed when the document is ready:
            console.log(xhttp.responseText);
            const responseData = JSON.parse(xhttp.responseText);
            updateForm(responseData);
        }
    };
    xhttp.open("GET", "/api/task?id=" + taskId, true);
    xhttp.send(JSON.stringify(taskId)); //siusti galima tik stringa arba streama
};

const updateForm = (responseData) => {
    const fromText = document.querySelector('#text');
    //atnaujinti interfeisa
    fromText.value = responseData.text;
    const id = document.querySelector('#id');
    id.value = responseData.id;
    console.log(responseData)
}

const updateModalButton = document.querySelector('form button');
updateModalButton.addEventListener('click', (e) => {
    e.preventDefault();
    sendTodo();
    console.log('bandau siusti');
})

const textModal = document.querySelector('#text');
const statusModal = document.getElementById("status");
const idModal = document.getElementById('id');

const sendTodo = () => {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4) {
            // Typical action to be performed when the document is ready:
            console.log(xhttp.responseText);
            const responseData = JSON.parse(xhttp.responseText);
            updateForm(responseData);
        }
    };
    xhttp.open("PUT", "/api/task?id=" + idModal.value, true);
    xhttp.send(JSON.stringify({ text: textModal.value, status: statusModal.value })); //siusti galima tik stringa arba streama
};