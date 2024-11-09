<template>
    <div class="mercancia-form card">
        <h3>{{ editMode ? 'Editar Mercancía' : 'Nueva Mercancía' }}</h3>
        <form @submit.prevent="handleSubmit">
            <div class="form-group">
                <label>Contenido:</label>
                <input v-model="form.contenido" type="text" required>
            </div>

            <div class="form-group">
                <label>Ancho (m):</label>
                <input v-model.number="form.ancho" type="number" step="0.1" required>
            </div>

            <div class="form-group">
                <label>Alto (m):</label>
                <input v-model.number="form.alto" type="number" step="0.1" required>
            </div>

            <div class="form-group">
                <label>Largo (m):</label>
                <input v-model.number="form.largo" type="number" step="0.1" required>
            </div>

            <div class="form-group">
                <label>Bodega:</label>
                <input v-model="form.bodega" type="text" required>
            </div>

            <div class="form-group">
                <label>Cliente ID:</label>
                <input v-model="form.cliente" type="text" required>
            </div>

            <div class="form-actions">
                <button type="submit" class="btn btn-primary">
                    {{ editMode ? 'Actualizar' : 'Crear' }}
                </button>
                <button type="button" class="btn btn-secondary" @click="resetForm">
                    Cancelar
                </button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue'
import { useMercanciaStore } from '../../stores/mercancia'

const emit = defineEmits(['mercancia-added'])
const mercanciaStore = useMercanciaStore()

const initialForm = {
    contenido: '',
    ancho: 0,
    alto: 0,
    largo: 0,
    bodega: '',
    cliente: ''
}

const form = ref({ ...initialForm })
const editMode = ref(false)
const editingId = ref(null)

const handleSubmit = async () => {
    try {
        if (editMode.value) {
            await mercanciaStore.updateMercancia(editingId.value, form.value)
        } else {
            await mercanciaStore.createMercancia(form.value)
        }
        emit('mercancia-added')
        resetForm()
    } catch (error) {
        console.error('Error:', error)
    }
}

const resetForm = () => {
    form.value = { ...initialForm }
    editMode.value = false
    editingId.value = null
}

const setEditingMercancia = (mercancia) => {
    form.value = { ...mercancia }
    editMode.value = true
    editingId.value = mercancia.id
}

defineExpose({ setEditingMercancia })
</script>

<style scoped>
.mercancia-form {
    background-color: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 2rem;
}

.mercancia-form h3 {
    color: var(--secondary-color);
    margin-bottom: 1.5rem;
    font-weight: var(--font-weight-semibold);
    font-size: 1.25rem;
}

.form-group {
    margin-bottom: 1.5rem;
}

.form-group label {
    display: block;
    margin-bottom: 0.5rem;
    color: var(--secondary-color);
    font-weight: var(--font-weight-medium);
}

.form-group input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    font-size: 1rem;
    font-family: var(--font-primary);
    transition: all 0.3s ease;
}

.form-group input:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(66, 185, 131, 0.1);
}

.form-actions {
    display: flex;
    gap: 1rem;
    margin-top: 2rem;
}

.btn {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 4px;
    font-weight: var(--font-weight-medium);
    cursor: pointer;
    transition: all 0.3s ease;
}

.btn-primary {
    background-color: var(--primary-color);
    color: white;
}

.btn-primary:hover {
    background-color: #3aa876;
    transform: translateY(-2px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.btn-secondary {
    background-color: #6c757d;
    color: white;
}

.btn-secondary:hover {
    background-color: #5a6268;
    transform: translateY(-2px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
    .mercancia-form {
        padding: 1.5rem;
    }

    .form-actions {
        flex-direction: column;
    }

    .btn {
        width: 100%;
    }
}

@keyframes slideDown {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.mercancia-form {
    animation: slideDown 0.3s ease-out;
}
</style>