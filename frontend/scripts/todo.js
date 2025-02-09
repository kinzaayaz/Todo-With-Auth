// Add event listener to the form
document.getElementById("todoForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    let title = document.getElementById("title").value
    let description = document.getElementById("description").value

    let form_data ={
        "title": title,
        "description": description,
        'complete':false
    }
    
    console.log("Sending data", form_data);
    await CreateTodo(form_data);
})


// Send the data to the server
async function CreateTodo(data) {
    let token = localStorage.getItem('token');
    let response = await fetch('http://localhost:8000/create_todo',{
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        }
    })

    if (response.status == 200) {
        document.getElementById("title").innerHTML = "";
        document.getElementById("description").innerHTML = "";
        window.location.reload();
    }else if (response.status ==400){
        alert("Invalid data");
    }
}


// Get the todos
async function loadTodos() {
    let token = localStorage.getItem('token');
    let response = await fetch('http://localhost:8000/get_todos',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        }
    })

    if (response.status == 200) {
        console.log("response", response);
        let results = await response.json();
        // console.log(results[0]);
        display_todo(results);
        
        return results
        
    }else if (response.status ==400){
        alert("Invalid data");
    }
}

function display_todo(array) {
    const todoTableBody = document.getElementById("todoTableBody"); // Get the table body
    todoTableBody.innerHTML = ""; // Clear the table before adding new todos

    array.forEach((todo) => {
        // Create a new table row
        const row = document.createElement("tr");

        // Create table cells
        row.innerHTML = `
            <td>${todo.title}</td>
            <td>${todo.description}</td>
            <td>${todo.complete ? "✅ Done" : "❌ Pending"}</td>
            <td>
                <button class="btn btn-primary btn-sm update-btn" data-id="${todo.id}">Update</button>
            </td>
            <td>
                <button class="btn btn-danger btn-sm delete-btn" data-id="${todo.id}">Delete</button>
            </td>
        `;

        // Append row to the table
        todoTableBody.appendChild(row);
    });

    // Attach event listeners to all buttons
    document.querySelectorAll(".update-btn").forEach(button => {
        button.addEventListener("click", function () {
            const id = this.getAttribute("data-id");
            update_todo(id);
        });
    });

    document.querySelectorAll(".delete-btn").forEach(button => {
        button.addEventListener("click", function () {
            const id = this.getAttribute("data-id");
            delete_todo(id);
        });
    });
}

// Function to remove a todo
async function delete_todo(id) {
    console.log("Deleting todo", id);
    let token = localStorage.getItem('token');
    let response = await fetch(`http://localhost:8000/delete/${id}`,{
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        }
    })

    if (response.status == 200) {
        console.log("response", response);
        let results = await response.json();
        console.log(results);
        window.location.reload();
        return results
        
    }else if (response.status ==400){
        alert("Invalid data");
    }
}

// Function to update a todo status
async function update_todo(id) {
    console.log("Deleting todo", id);
    let token = localStorage.getItem('token');
    let response = await fetch(`http://localhost:8000/update/${id}`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        }
    })

    if (response.status == 200) {
        console.log("response", response);
        let results = await response.json();
        console.log(results);
        return results
        
    }else if (response.status ==400){
        alert("Invalid data");
    }
}

// Load todos on page load
document.addEventListener("DOMContentLoaded", loadTodos);
