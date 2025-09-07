# 🌐 My Portfolio

A modern, minimal personal portfolio designed to showcase my projects and skills. The goal is to create a fast and smooth user experience while allowing for easy content management.

---

## 🚀 Tech Stack

This project uses a powerful and modern tech stack to ensure performance and flexibility:

- **Astro**: An incredibly fast static site generator, optimized for content-driven websites. Astro minimizes unnecessary JavaScript, providing near-instant page load times.
- **Tailwind CSS**: A utility-first CSS framework that allows for rapid and intuitive UI development, ensuring responsiveness across all devices.
- **Strapi**: A powerful headless CMS hosted on a VPS at `strapi.jokholk.dev`, enabling easy content updates without touching code.
- **Nginx**: Serves and routes the Strapi application on the VPS, ensuring stable and secure operation.
- **Vercel**: Hosts and deploys the frontend with automated CI/CD for seamless updates.
- **Domain**: Accessible via [jokholk.dev](https://jokholk.dev).

---

## ✨ Key Features

- **Responsive Design**: Tailwind CSS ensures the interface looks great on desktops, tablets, and mobile devices.
- **Dynamic Content**: All content (personal info, projects, blog, etc.) is managed via Strapi, allowing updates without redeployment.
- **Fast & Performant**: Astro delivers lightning-fast performance with high Lighthouse scores.
- **CI/CD Workflow**: Vercel automates deployment for efficient updates.

---

## 🛠️ Usage

Feel free to reference this project's structure to build your own portfolio.

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/my-portfolio.git
cd my-portfolio
```

## 2. Install Dependencies

```bash
npm install
```

## 3. Configure Environment Variables

Create a `.env` file in the root directory and add the following line:

```bash
STRAPI_API_URL=https://strapi.jokholk.dev
```

## 4. Run the Project Locally

Start the development server with the following command:

```bash
npm run dev
```

Once running, open your browser and navigate to: [http://localhost:4321](http://localhost:4321)
