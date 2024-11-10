<template>
  <div class="acercade">
    <h1>Acerca de Mi Sistema</h1>
    <div class="about-content">
      <section class="about-section">
        <h2>Mi Misión</h2>
        <p>Crear, buscar, listar, actualizar y eliminar datos de clientes y de mercancías.</p>
      </section>

      <section class="about-section">
        <h2>Características Principales</h2>
        <ul>
          <li>Actualizar clientes</li>
          <li>Actualizar mercancias</li>
          <li>Eliminar clientes</li>
          <li>Eliminar mercancias</li>
        </ul>
      </section>

      <section class="about-section">
        <h2>Contacto</h2>
        <p>Para mas información, contacteme en:</p>
        <p>Email: andres.giraldo47424@ucaldas.edu.co</p>
        <p>Teléfono: 314 722 1044</p>
      </section>
    </div>
  </div>
</template>

<style scoped>
.about {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

h1 {
  text-align: center;
  color: var(--secondary-color);
  margin-bottom: 2rem;
  font-weight: var(--font-weight-bold);
}

.about-content {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.about-section {
  margin-bottom: 2rem;
}

.about-section:last-child {
  margin-bottom: 0;
}

h2 {
  color: var(--primary-color);
  margin-bottom: 1rem;
  font-weight: var(--font-weight-semibold);
}

p {
  margin-bottom: 1rem;
  color: #666;
  line-height: 1.6;
}

ul {
  list-style-type: none;
  padding-left: 0;
}

li {
  margin-bottom: 0.5rem;
  padding-left: 1.5rem;
  position: relative;
}

li::before {
  content: "•";
  color: var(--primary-color);
  position: absolute;
  left: 0;
  font-weight: bold;
}

@media (max-width: 768px) {
  .about {
    padding: 1rem;
  }

  .about-content {
    padding: 1.5rem;
  }
}
</style>