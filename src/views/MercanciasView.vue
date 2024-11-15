<template>
    <div class="mercancias-view">
        <div class="content-grid">
            <div class="form-section">
                <MercanciaForm ref="mercanciaForm" @mercancia-added="refreshList" />
            </div>

            <div class="table-section">
                <h2>Lista de Mercancías</h2>
                <div v-if="mercanciaStore.loading" class="loading">
                    Cargando...
                </div>
                <div v-else-if="mercanciaStore.error" class="error">
                    {{ mercanciaStore.error }}
                </div>
                <div v-else class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Cliente</th>
                                <th>ID</th>
                                <th>Contenido</th>
                                <th>Dimensiones (m)</th>
                                <th>Ingreso</th>
                                <th>Salida</th>
                                <th>Bodega</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="mercancia in mercanciaStore.mercancias" :key="mercancia.id">
                                <td>{{ mercancia.cliente.id || 'N/A' }}</td>
                                <td>{{ mercancia.id || 'N/A' }}</td>
                                <td>{{ mercancia.contenido || 'N/A' }}</td>
                                <td>{{ `${mercancia.ancho}x${mercancia.alto}x${mercancia.largo}` }}</td>
                                <td>{{ formatDate(mercancia.fechaHoraIngreso) }}</td>
                                <td>{{ formatDate(mercancia.fechaHoraSalida) }}</td>
                                <td>{{ mercancia.bodega || 'N/A' }}</td>
                                <td class="actions">
                                    <button @click="handleEdit(mercancia)" class="btn btn-edit">
                                        <i class="fas fa-edit"></i> Editar
                                    </button>
                                    <button @click="handleDelete(mercancia.id)" class="btn btn-delete">
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
import { useMercanciaStore } from '../stores/mercancia'
import MercanciaForm from '../components/mercancia/MercanciaForm.vue'

const mercanciaStore = useMercanciaStore()
const mercanciaForm = ref(null)

onMounted(() => {
    refreshList()
})

const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleString()
}

const refreshList = () => {
    mercanciaStore.fetchMercancias()
}

const handleEdit = (mercancia) => {
    mercanciaForm.value.setEditingMercancia(mercancia)
}

const handleDelete = async (id) => {
    if (confirm('¿Está seguro de eliminar esta mercancía?')) {
        const success = await mercanciaStore.deleteMercancia(id)
        if (success) {
            alert('Mercancía eliminada exitosamente')
            refreshList()
        } else {
            alert('Error al eliminar la mercancía')
        }
    }
}
</script>

<style scoped>
.content-grid {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 1rem;
    align-items: start;
}

.form-section {
    position: sticky;
    top: 2rem;
    max-width: 400px;
}

.mercancias-view {
    padding: 1rem;
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
    width: 100px;
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
</style>