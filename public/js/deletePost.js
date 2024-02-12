const deleteBtn = document.querySelectorAll('.delete-button');

/**
 * Deletes a post from the server.
 * @param {number} blogId - The ID of the post to be deleted.
 * @returns {Promise<void>} - A promise that resolves when the post is successfully deleted.
 */
const deletePost = async (blogId) => {
    const response = await fetch(`api/post/${blogId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    })
    if (response.ok) {
        alert("Post successfully deleted!");
    } else {
        alert('Error occurred, failed to delete post')
    }
}

for (let i = 0; i < deleteBtn.length; i++) {
    deleteBtn[i].addEventListener('click', () => {
        const blogId = deleteBtn[i].dataset.blogid;
        deletePost(blogId)
    }
    )
}