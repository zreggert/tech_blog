const logoutHandler = async () => {
    const response = await fetch('/api/user/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    if (response.ok) {
        document.location.replace('/');
    } else {
        alert("Failure to log out.");
    }
};

document.querySelector('#logout').addEventListener('click', logoutHandler);