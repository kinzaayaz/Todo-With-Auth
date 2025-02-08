console.log('login.js loaded');

document.getElementById("login").addEventListener("submit",async function(event) {
    event.preventDefault();

    let email = document.getElementById("email").value
    let password = document.getElementById("password").value
    
    let form_data ={
        "email":email,
        "password": password
    }
    console.log("formdata",form_data);

    // send the form data
    SendData(data=form_data);
})

async function SendData(data) {
    let response = await fetch('http://localhost:8000/auth/login', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.status === 200) {
        let results = await response.json();  // ✅ Await the response JSON
                
        // Store the token
        localStorage.setItem('token', results.access_token);  // ✅ Fix this line

        // Redirect to the TODO page
        // alert("Login successful");
        window.location.href = "todo.html";
    } else if (response.status === 400) {
        alert("Invalid email or password");
    }
}
