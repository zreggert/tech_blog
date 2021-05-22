const createPost = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#title-input').value.trim();
    const content = document.querySelector('#content-input').value.trim();

    await fetch('/api/post', {
        method: 'POST',
        body: JSON.stringify({ title, content }),
        headers: {
            'Content-Type': 'application/json'
        },
    });
     document.location.replace('/dashboard');
};

document
    .querySelector('#create-post-form')
    .addEventListener('submit', createPost);