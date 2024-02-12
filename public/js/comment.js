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
            if (response.ok) {
                alert("Comment has been successfully added to this post!");
                location.reload();
            } else {
                const errorData = await response.json();
                alert(`Failed to add comment: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error occurred:', error);
            alert('Error occurred, failed to add comment');
        }
    } else {
        alert('Please enter a comment before submitting.');
    }
};

submitButton.addEventListener('click', addComment);