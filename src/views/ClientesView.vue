<template>
    <div class="clientes-view">
        <div class="content-grid">
            <!-- Formulario -->
            <div class="form-section">
                <ClienteForm ref="clienteForm" @cliente-added="refreshList" />
            </div>

            <!-- Tabla -->
            <div class="table-section">
                <h2>Lista de Clientes</h2>
                <div v-if="clienteStore.loading" class="loading">
                    Cargando...
                </div>
                <div v-else-if="clienteStore.error" class="error">
                    {{ clienteStore.error }}
                </div>
                <div v-else class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Dirección</th>
                                <th>Teléfono</th>
                                <th>Ciudad</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="cliente in clienteStore.clientes" :key="cliente.id">
                                <td>{{ cliente.id }}</td>
                                <td>{{ cliente.nombre }}</td>
                                <td>{{ cliente.direccion }}</td>
                                <td>{{ cliente.telefono }}</td>
                                <td>{{ cliente.ciudad }}</td>
                                <td class="actions">
                                    <button @click="handleEdit(cliente)" class="btn btn-edit">
                                        <i class="fas fa-edit"></i> Editar
                                    </button>
                                    <button @click="handleDelete(cliente.id)" class="btn btn-delete">
                                        <i class="fas fa-trash"></i> Eliminar
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useClienteStore } from '../stores/cliente'
import ClienteForm from '../components/cliente/ClienteForm.vue'

const clienteStore = useClienteStore()
const clienteForm = ref(null)

onMounted(() => {
    refreshList()
})

const refreshList = () => {
    clienteStore.fetchClientes()
}

const handleEdit = (cliente) => {
    clienteForm.value.setEditingCliente(cliente)
}

const handleDelete = async (id) => {
    if (confirm('¿Está seguro de eliminar este cliente?')) {
        const success = await clienteStore.deleteCliente(id)
        if (success) {
            alert('Cliente eliminado exitosamente')
            refreshList()
        } else {
            alert('Error al eliminar el cliente')
        }
    }
}
</script>

<style scoped>
.content-grid {
    display: grid;
    grid-template-columns: 350px 1fr;
    gap: 2rem;
    align-items: start;
}

.form-section {
    position: sticky;
    top: 2rem;
}

.clientes-view {
    padding: 2rem;
}

h2 {
    color: var(--secondary-color);
    margin-bottom: 2rem;
    font-weight: var(--font-weight-semibold);
}

.table-container {
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    overflow: hidden;
}

table {
    width: 100%;
    border-collapse: collapse;
}

th,
td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid var(--border-color);
}

th {
    background-color: #f8f9fa;
    font-weight: var(--font-weight-semibold);
    color: var(--secondary-color);
}

tr:hover {
    background-color: #f8f9fa;
}

.loading,
.error {
    text-align: center;
    padding: 2rem;
    color: var(--secondary-color);
}

.error {
    color: #dc3545;
}

.btn-delete {
    background-color: #dc3545;
    color: white;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.btn-delete:hover {
    background-color: #c82333;
    transform: translateY(-2px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>