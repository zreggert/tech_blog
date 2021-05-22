const signupHandler = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#name-input');
    const username = document.querySelector('#email-input');
    const password = document.querySelector('#pass-input');

    const response = await fetch('/api/user', {
        method: 'POST',
        body: JSON.stringify({
            name: name,
            username: username,
            password: password,
        }),
        headers: {
            'Content-Type': 'application/json'
        },
    });
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Failed to sign up.');
    }
};

document
    .querySelector('#signup-form')
    .addEventListener('submit', signupHandler);