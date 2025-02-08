console.log('register.js loaded');

document.getElementById("register").addEventListener("submit",async function(event) {
    event.preventDefault();
    
    let username = document.getElementById("username").value
    let email = document.getElementById("email").value
    let password = document.getElementById("password").value
    let confirmPasssword = document.getElementById("repeat_password").value
    
    if(password !==confirmPasssword){
        alert("Passwords do not match")
    }else{
        formdata ={
            "username": username,
            "email": email,
            "password":password,
            "repeat_password":confirmPasssword
        }
        console.log("formdata",formdata);
        
        SendData(data=formdata);
    }
})

async function SendData(data) {
    let response = await fetch('http://localhost:8000/auth/register',{
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if (response.status ==200){
        alert("User registered successfully")
        window.location.href = "login.html";
    }else{
        alert("An error occured")
    }
}