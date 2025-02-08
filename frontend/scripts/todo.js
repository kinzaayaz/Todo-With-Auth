loadTodos()
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
        alert("Todo created successfully");
        document.getElementById("title").innerHTML = "";
        document.getElementById("description").innerHTML = "";
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
        return response.json();
        
    }else if (response.status ==400){
        alert("Invalid data");
    }
}
