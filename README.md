
📚 EduSphere – World of Learning

EduSphere is a modern Learning Management System (LMS) built using the **MERN Stack** and designed with a **Microservices Architecture**.

It provides a scalable, modular, and production-ready platform for students and instructors to interact, learn, and grow.

---

 🚀 Overview

EduSphere is a full-stack educational platform that allows:

* 🎓 Students to enroll in courses, track progress, and manage learning
* 👨‍🏫 Instructors to create and manage courses
* 🔐 Secure authentication with JWT & role-based access
* 🛒 Course purchasing and cart management
* 📊 Dashboard insights and profile management

The system is built using a **microservices architecture**, making it scalable and easy to maintain.

---

 🛠 Tech Stack
 🌐 Frontend

* React.js
* Tailwind CSS
* React Icons
* Axios

🖥 Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

 🔐 Authentication & Security

* JWT (Access + Refresh Tokens)
* Role-Based Authorization
* Zod Validation
* Password Hashing (bcrypt)

### 🐳 DevOps & Deployment

* Docker
* Docker Compose
* Microservices Architecture

---

 🏗 Architecture

EduSphere follows a **Microservices Architecture**, where each core functionality is separated into independent services.

🔹 Services

* **Auth Service** → User authentication & role management
* **Course Service** → Course creation & management
* **Enrollment Service** → Course enrollment & tracking
* **Payment Service** → Course purchasing logic
* **User Service** → Profile & dashboard management

Each service:

* Has its own controller, routes, and database logic
* Communicates via REST APIs
* Can be scaled independently

---

 🎨 UI Features

* Modern dark-themed responsive navbar
* Company introduction banner
* Horizontal profile identity section
* Clean dashboard layout
* Professional color contrast using Tailwind

---

🔒 Security Features

* JWT Access + Refresh Token implementation
* Role-based API access (Student / Instructor / Admin)
* Request validation using Zod
* Centralized error handling
* Logging using Winston

---

 📂 Project Structure (Simplified)

```
/frontend
  /components
  /pages
  /services

/backend
  /auth-service
  /course-service
  /enrollment-service
  /payment-service
```

---

📈 Why Microservices?

* Independent deployment
* Better scalability
* Fault isolation
* Cleaner separation of concerns
* Industry-level architecture design

---

💡 Future Enhancements

* Real-time notifications
* Live classes integration
* Video streaming optimization
* AI-powered course recommendations
* Certificate generation

---

👨‍💻 Author

Developed as a full-stack MERN microservices project focused on building a scalable, production-grade LMS platform.

---

