const loginFormHandler = async (event) => {
    event.preventDefault();

    const email = document.getElementById('email-input').value.trim();
    const password = document.getElementById('pass-input').value.trim();

    if (email && password) {
        const formInput = await fetch('/api/user/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (formInput.ok) {
            document.location.replace('/dashboard');
            console.log("success!")
        } else {
            alert('Login fail!');
        }
    }
};

document
    .querySelector('.user-form')
    .addEventListener('submit', loginFormHandler);