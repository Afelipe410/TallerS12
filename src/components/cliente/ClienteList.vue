<template>
    <div class="cliente-list">
        <h3>Lista de Clientes</h3>
        <div v-if="clienteStore.loading">Cargando...</div>
        <div v-else-if="clienteStore.error">Error: {{ clienteStore.error }}</div>
        <div v-else>
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
                        <td>
                            <button @click="editCliente(cliente)">Editar</button>
                            <button @click="deleteCliente(cliente.id)">Eliminar</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useClienteStore } from '../../stores/cliente'

const clienteStore = useClienteStore()

onMounted(() => {
    clienteStore.fetchClientes()
})

const editCliente = (cliente) => {
    
}

const deleteCliente = async (id) => {
    if (confirm('¿Está seguro de eliminar este cliente?')) {
        try {
            await clienteStore.deleteCliente(id)
        } catch (error) {
            console.error('Error al eliminar:', error)
        }
    }
}
</script>

<style scoped>
.cliente-list {
    margin-top: 2rem;
}

table {
    width: 100%;
    border-collapse: collapse;
}

th,
td {
    padding: 0.5rem;
    border: 1px solid #ddd;
    text-align: left;
}

th {
    background-color: #f5f5f5;
}

button {
    margin-right: 0.5rem;
    padding: 0.25rem 0.5rem;
    border: none;
    border-radius: 4px;
    background-color: #42b983;
    color: white;
    cursor: pointer;
}

button:last-child {
    background-color: #ff4444;
}
</style>