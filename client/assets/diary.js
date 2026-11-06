function createPostElement(data) {
    const post = document.createElement("div");
    post.className = "post";

    // Post title
    const header = document.createElement("h2");
    header.textContent = data.title;
    post.appendChild(header);

    // Post category
    const category = document.createElement("p");
    category.textContent = data.category;
    post.appendChild(category);

    // Post content
    const content = document.createElement("p");
    content.textContent = data.content;
    post.appendChild(content);

    // const time_date = document.createElement("p");
    // content.textContent = data.created_at;
    // post.appendChild(time_date)

    const time_date = document.createElement("p");
    time_date.textContent = data.created_at;
    post.appendChild(time_date);

    return post;
}


// Submit a new diary entry
document.getElementById("post-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    const options = {
        method: "POST",
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

    const result = await fetch("http://localhost:3007/posts", options);

    if (result.status === 201) {
        e.target.reset();
        await loadPosts();
    } else {
        alert("Your diary entry could not be saved. Please try again.");
    }
});


// Load previous diary entries
async function loadPosts() {
    const response = await fetch("http://localhost:3007/posts")

    if (response.status === 200) {
        const posts = await response.json();

        const container = document.getElementById("posts");

        container.innerHTML = "";

        posts.forEach(p => {
            const elem = createPostElement(p);
            container.appendChild(elem);
        });

    } else {
        window.location.assign("./board.html");
    }
}

loadPosts();
