<template>
  <div class="home">
    <h1 class="welcome-title">Bienvenido al Sistema de Clientes y Mercancías</h1>
    <div class="features-grid">
      <div class="feature-card">
        <h2>Gestión de Clientes</h2>
        <p>Crear, buscar, listar, actualizar y eliminar datos de clientes</p>

        <RouterLink to="/clientes" class="btn">Ir a Clientes</RouterLink>
      </div>
      <div class="feature-card">
        <h2>Gestión de Mercancías</h2>
        <p>Crear, buscar, listar, actualizar y eliminar datos de mercancias</p>
        <RouterLink to="/mercancias" class="btn">Ir a Mercancías</RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.welcome-title {
  text-align: center;
  margin-bottom: 3rem;
  color: var(--secondary-color);
  font-size: 2.5rem;
  font-weight: var(--font-weight-bold);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 1rem;
}

.feature-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-card h2 {
  color: var(--primary-color);
  margin-bottom: 1rem;
  font-weight: var(--font-weight-semibold);
}

.feature-card p {
  margin-bottom: 1.5rem;
  color: #666;
  line-height: 1.6;
}

.btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: var(--primary-color);
  color: white;
  text-decoration: none;
  border-radius: 6px;
  transition: background-color 0.3s ease;
  font-weight: var(--font-weight-medium);
}

.btn:hover {
  background-color: #3aa876;
}

@media (max-width: 768px) {
  .welcome-title {
    font-size: 2rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }
}
</style>