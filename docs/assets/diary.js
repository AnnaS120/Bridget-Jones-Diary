let editingPostId = null;

function createPostElement(data) {
    const post = document.createElement("div");
    post.className = "post";

    // Post title
    const header = document.createElement("h2");
    header.className = "post-title";
    header.textContent = data.title;
    post.appendChild(header);

    // Post category
    const category = document.createElement("span");
    category.className = "post-category";
    category.textContent = data.category;
    post.appendChild(category);

    // Post content
    const content = document.createElement("p");
    content.className = "post-content";
    content.textContent = data.content;
    post.appendChild(content);

    // Date and time
    const time_date = document.createElement("p");
    time_date.className = "post-date";

    const date = new Date(data.created_at);

    time_date.textContent = date.toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
    });

    post.appendChild(time_date);

    // Buttons container
    const actions = document.createElement("div");
    actions.className = "post-actions";

    // Edit button
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.className = "edit-btn";
    editButton.type = "button";

    editButton.addEventListener("click", () => {
        editingPostId = data.id;

        document.getElementById("title").value = data.title;
        document.getElementById("category").value = data.category;
        document.getElementById("fieldTextarea").value = data.content;

        document.querySelector("#post-form button[type='submit']").textContent = "Update";

        document.getElementById("post-form").scrollIntoView({
            behavior: "smooth"
        });
    });

    actions.appendChild(editButton);

    // Delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete-btn";
    deleteButton.type = "button";

    deleteButton.addEventListener("click", async () => {
        if (!confirm("Are you sure you want to delete this diary entry?")) {
            return;
        }

        const response = await fetch(
            `http://localhost:3007/posts/${data.id}`,
            { method: "DELETE" }
        );

        if (response.status === 204) {
            await loadPosts();
        } else {
            alert("Could not delete diary entry.");
        }
    });

    actions.appendChild(deleteButton);

    post.appendChild(actions);

    return post;
}



// Submit a new diary entry OR update an existing one
document.getElementById("post-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    const options = {
        method: editingPostId ? "PUT" : "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: form.get("title"),
            category: form.get("category"),
            content: form.get("content"),
        })
    };

    const url = editingPostId
        ? `http://localhost:3007/posts/${editingPostId}`
        : "http://localhost:3007/posts";

    const result = await fetch(url, options);

    console.log("Request URL:", url);
    console.log("Request method:", options.method);
    console.log("Response status:", result.status);
    
    const responseData = await result.json();
    console.log("Response data:", responseData);
    
    if (result.ok) {
        e.target.reset();
        editingPostId = null;
        e.target.querySelector('button[type="submit"]').textContent = "Save";
        await loadPosts();
    } else {
        alert(JSON.stringify(responseData));}
});


// Load previous diary entries
async function loadPosts() {
    const response = await fetch("http://localhost:3007/posts");

    if (response.status === 200) {
        const posts = await response.json();

        const container = document.getElementById("posts");

        container.innerHTML = "";

        posts.forEach(p => {
            const elem = createPostElement(p);
            container.appendChild(elem);
        });

    } else {
        window.location.assign("./index.html");
    }
}

loadPosts();
