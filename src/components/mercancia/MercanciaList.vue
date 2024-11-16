<template>
    <div class="mercancia-list card">
        <h3>Lista de Mercancías</h3>
        <div v-if="mercanciaStore.loading" class="loading-state">
            <div class="spinner"></div>
            <p>Cargando mercancías...</p>
        </div>
        <div v-else-if="mercanciaStore.error" class="alert alert-error">
            Error: {{ mercanciaStore.error }}
        </div>
        <div v-else>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Contenido</th>
                        <th>Dimensiones (m)</th>
                        <th>Bodega</th>
                        <th>Cliente</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="mercancia in mercanciaStore.mercancias" :key="mercancia.id">
                        <td>{{ mercancia.id }}</td>
                        <td>{{ mercancia.contenido }}</td>
                        <td>{{ mercancia.ancho }}x{{ mercancia.alto }}x{{ mercancia.largo }}</td>
                        <td>{{ mercancia.fechaHoraIngreso }}</td>
                        <td>{{ mercancia.fechaHoraSalida }}</td>
                        <td>{{ mercancia.bodega }}</td>
                        <td>{{ mercancia.cliente }}</td>
                        <td class="actions">
                            <button @click="editMercancia(mercancia)" class="btn btn-edit">
                                <i class="fas fa-edit"></i> Editar
                            </button>
                            <button @click="deleteMercancia(mercancia.id)" class="btn btn-delete">
                                <i class="fas fa-trash"></i> Eliminar
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div v-if="mercanciaStore.mercancias.length === 0" class="empty-state">
                No hay mercancías registradas
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useMercanciaStore } from '../../stores/mercancia'

const mercanciaStore = useMercanciaStore()

onMounted(() => {
    mercanciaStore.fetchMercancias()
})

const deleteMercancia = async (id) => {
    if (confirm('¿Está seguro de eliminar esta mercancía?')) {
        try {
            await mercanciaStore.deleteMercancia(id)
        } catch (error) {
            console.error('Error al eliminar:', error)
        }
    }
}
</script>

<style scoped>
.mercancia-list {
    background-color: white;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.mercancia-list h3 {
    color: var(--secondary-color);
    margin-bottom: 1.5rem;
    font-weight: var(--font-weight-semibold);
    font-size: 1.25rem;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 1rem;
    font-size: 0.95rem;
}

th {
    background-color: #f8f9fa;
    color: var(--secondary-color);
    font-weight: var(--font-weight-semibold);
    padding: 1rem;
    text-align: left;
    border-bottom: 2px solid var(--border-color);
}

td {
    padding: 1rem;
    border-bottom: 1px solid var(--border-color);
    color: var(--text-color);
}

tr:hover {
    background-color: #f8f9fa;
}

.actions {
    display: flex;
    gap: 0.5rem;
}

.btn {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    font-weight: var(--font-weight-medium);
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.btn-edit {
    background-color: var(--primary-color);
    color: white;
}

.btn-edit:hover {
    background-color: #3aa876;
    transform: translateY(-2px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.btn-delete {
    background-color: #dc3545;
    color: white;
}

.btn-delete:hover {
    background-color: #c82333;
    transform: translateY(-2px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.loading-state {
    text-align: center;
    padding: 2rem;
    color: var(--secondary-color);
}

.spinner {
    border: 4px solid #f3f3f3;
    border-top: 4px solid var(--primary-color);
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
    margin: 0 auto 1rem;
}

.empty-state {
    text-align: center;
    padding: 2rem;
    color: #6c757d;
    font-style: italic;
}

.alert {
    padding: 1rem;
    border-radius: 4px;
    margin-bottom: 1rem;
    font-weight: var(--font-weight-medium);
}

.alert-error {
    background-color: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

@media (max-width: 768px) {
    .mercancia-list {
        padding: 1rem;
    }

    table {
        display: block;
        overflow-x: auto;
        white-space: nowrap;
    }

    .actions {
        flex-direction: column;
    }

    .btn {
        width: 100%;
        justify-content: center;
    }

    th,
    td {
        padding: 0.75rem;
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

.mercancia-list {
    animation: fadeIn 0.3s ease-out;
}
</style>
