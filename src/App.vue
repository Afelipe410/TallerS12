<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="app-container">
    <header>
      <div class="logo-container">
        <img alt="Logo Envíos" class="logo" src="@/assets/logo.svg" width="50" height="50" />
        <h1>Andrés Felipe Giraldo Rojas 47424</h1>
      </div>

      <nav>
        <RouterLink to="/">Inicio</RouterLink>
        <RouterLink to="/clientes">Clientes</RouterLink>
        <RouterLink to="/mercancias">Mercancías</RouterLink>
        <RouterLink to="/acercade">Acerca de</RouterLink>
      </nav>
    </header>

    <main>
      <RouterView />
    </main>

    <footer>
      <p>&copy; 2024 Sistema de Gestión de Clientes y Mercancías</p>
    </footer>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

:root {
  --primary-color: #42b983;
  --secondary-color: #2c3e50;
  --background-color: #f8f9fa;
  --text-color: #2c3e50;
  --border-color: #ddd;
  --font-primary: 'Poppins', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  --font-weight-light: 300;
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: var(--font-primary);
}

body {
  line-height: 1.6;
  color: var(--text-color);
  background-color: var(--background-color);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

header {
  background-color: var(--secondary-color);
  color: white;
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.logo {
  border-radius: 8px;
  background-color: white;
  padding: 0.5rem;
  transition: transform 0.3s ease;
}

.logo:hover {
  transform: scale(1.05);
}

h1 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: var(--font-weight-semibold);
  letter-spacing: -0.025em;
}

nav {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

nav a {
  color: #ffffff;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: all 0.3s ease;
  font-weight: var(--font-weight-medium);
  letter-spacing: 0.025em;
}

nav a:hover {
  background-color: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

nav a.router-link-active {
  background-color: var(--primary-color);
  color: white;
}

main {
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  background-color: var(--background-color);
}

footer {
  background-color: var(--secondary-color);
  color: white;
  text-align: center;
  padding: 1rem;
  margin-top: auto;
  font-weight: var(--font-weight-light);
}

.btn {
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.3s ease;
  font-weight: var(--font-weight-medium);
  letter-spacing: 0.025em;
}

.btn:hover {
  background-color: #3aa876;
  transform: translateY(-2px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 1rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: var(--font-weight-medium);
  color: var(--secondary-color);
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  font-size: 1rem;
  font-family: var(--font-primary);
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px rgba(66, 185, 131, 0.1);
}

.alert {
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  font-weight: var(--font-weight-medium);
}

.alert-success {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.alert-error {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

th,
td {
  padding: 1rem;
  border-bottom: 1px solid var(--border-color);
  text-align: left;
}

th {
  background-color: #f8f9fa;
  font-weight: var(--font-weight-semibold);
  color: var(--secondary-color);
}

tr:hover {
  background-color: #f8f9fa;
}

@media (max-width: 768px) {
  header {
    flex-direction: column;
    padding: 1rem;
    gap: 1rem;
  }

  nav {
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.5rem;
  }

  nav a {
    padding: 0.5rem;
    font-size: 0.9rem;
  }

  .logo {
    width: 40px;
    height: 40px;
  }

  h1 {
    font-size: 1.2rem;
  }

  main {
    padding: 1rem;
  }

  .card {
    padding: 1rem;
  }

  table {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.router-view-enter-active {
  animation: fadeIn 0.3s ease-out;
}
</style>