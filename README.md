# Blog Management System API

## 📝 Description
The **Blog Management System API** is a backend application designed to handle the full lifecycle of blog content. Built with Node.js, Express, and MongoDB, it allows authorized users to share information through posts while ensuring data integrity through strict schema validation. It features a complete CRUD (Create, Read, Update, and Delete) implementation and administrative safeguards.

## 🔐 Credentials & Security

### 1. Environment Configuration
Create a `.env` file in the root directory (as seen in **image_99bc99.png**) to store your sensitive credentials:

---

### 2. User Authentication

* **Public Access**: None. All routes are protected via JWT.
* **User Role**: Can Create, Read, and Update blog posts.
* **Admin Role**: Required for the **Delete** operation to prevent accidental data loss.

---

### 🚀 API Reference (CRUD)

| Method | Endpoint | Description | Permission |
| :--- | :--- | :--- | :--- |
| **POST** | `/blogs/create` | Create a new blog post | Authenticated |
| **GET** | `/blogs/all` | Retrieve all blog posts | Authenticated |
| **GET** | `/blogs/specific/:id` | Retrieve a single blog post | Authenticated |
| **PATCH** | `/blogs/update/:id` | Update title, content, or info | Authenticated] |
| **DELETE** | `/blogs/delete/:id` | Permanently remove from DB | **Admin Only** |


## 📊 Data Model
The API enforces the following structure for every blog post based on your schema:

* **`title`**: (String) The heading of the post. Automatically trimmed of whitespace.
* **`content`**: (String) The main body/text of the post.
* **`authorInformation`**: (String) Details regarding the author (Name/Bio).
* **`creationDate`**: (Date) Timestamp of when the post was first saved.

---

## 🛠️ Tech Stack
* **Runtime**: Node.js
* **Framework**: Express.js
* **Database**: MongoDB (via Mongoose)
* **Security**: JSON Web Tokens (JWT) & Bcrypt
