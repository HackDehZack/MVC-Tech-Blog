const submitButton = document.getElementById('add-comment');

const addComment = async () => {
    const commentField = document.getElementById('blog-comment');
    const blogId = submitButton.dataset.blogid;

    if (commentField.value) {
        try {
            const response = await fetch(`/api/post/${blogId}`, {
                method: 'POST',
                body: JSON.stringify({
                    comment: commentField.value
                }),
                headers: { 'Content-Type': 'application/json' }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            try {
                const responseData = await response.json();
                alert("Comment has been successfully added to this post!");
                location.reload();
            } catch (e) {
                alert('The server did not return a JSON response.');
            }
        } catch (e) {
            console.error('Error occurred:', e);
            alert('Error occurred, failed to add comment. Check the console for more information.');
        }
    } else {
        alert('Please enter a comment before submitting.');
    }
};

submitButton.addEventListener('click', addComment);