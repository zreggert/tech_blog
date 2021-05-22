const loginFormHandler = async (event) => {
    event.preventDefault();

    const username = document.getElementById('email-input').value.trim();
    const password = document.getElementById('pass-input').value.trim();

    
    const response = await fetch('/api/user/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/dashboard');
        console.log("success!")
    } else {
        alert('Login fail!');
    }
    
};

document
    .querySelector('#login-form')
    .addEventListener('submit', loginFormHandler);