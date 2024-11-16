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
                <input v-model.number="form.ancho" type="number" step="0.1" min="0" required>
            </div>

            <div class="form-group">
                <label>Alto (m):</label>
                <input v-model.number="form.alto" type="number" step="0.1" min="0" required>
            </div>

            <div class="form-group">
                <label>Largo (m):</label>
                <input v-model.number="form.largo" type="number" step="0.1" min="0" required>
            </div>

            <div class="form-group">
                <label>Bodega:</label>
                <input v-model="form.bodega" type="text" required>
            </div>

            <div class="form-group">
                <label>Fecha y Hora de Ingreso:</label>
                <input v-model="form.fechaHoraIngreso" type="datetime-local" required>
            </div>

            <div class="form-group">
                <label>Fecha y Hora de Salida:</label>
                <input v-model="form.fechaHoraSalida" type="datetime-local" required>
            </div>

            <div class="form-group">
                <label>Cliente:</label>
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
    fechaHoraIngreso: '',
    fechaHoraSalida: '',
    cliente: ''
}

const form = ref({ ...initialForm })
const editMode = ref(false)
const editingId = ref(null)

const formatDateForBackend = (dateString) => {
    if (!dateString) return null

    return dateString + ':00'
}

const handleSubmit = async () => {
    try {
        const formData = {
            ...form.value,
            fechaHoraIngreso: formatDateForBackend(form.value.fechaHoraIngreso),
            fechaHoraSalida: formatDateForBackend(form.value.fechaHoraSalida)
        }

        if (formData.ancho <= 0 || formData.alto <= 0 || formData.largo <= 0) {
            alert('Las dimensiones deben ser números positivos')
            return
        }

        let success
        if (editMode.value) {
            success = await mercanciaStore.updateMercancia(editingId.value, formData)
        } else {
            success = await mercanciaStore.createMercancia(formData)
        }

        if (success) {
            emit('mercancia-added')
            resetForm()
            alert(editMode.value ? 'Mercancía actualizada exitosamente' : 'Mercancía creada exitosamente')
        } else {
            alert('Error al procesar la operación')
        }
    } catch (error) {
        console.error('Error:', error)
        alert('Error al procesar la solicitud: ' + error.message)
    }
}

const resetForm = () => {
    form.value = { ...initialForm }
    editMode.value = false
    editingId.value = null
}

const formatDateForForm = (dateString) => {
    if (!dateString) return ''

    if (dateString.includes(' ')) {
        const [datePart, timePart] = dateString.split(' ')
        const timeWithoutSeconds = timePart.split(':').slice(0, 2).join(':')
        return `${datePart}T${timeWithoutSeconds}`
    }

    return dateString.split(':').slice(0, 2).join(':')
}

const setEditingMercancia = (mercancia) => {
    form.value = {
        ...mercancia,
        fechaHoraIngreso: formatDateForForm(mercancia.fechaHoraIngreso),
        fechaHoraSalida: formatDateForForm(mercancia.fechaHoraSalida)
    }
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
    cursor: pointer;
    font-weight: var(--font-weight-medium);
    transition: all 0.3s ease;
}

.btn-primary {
    background-color: var(--primary-color);
    color: white;
}

.btn-secondary {
    background-color: #6c757d;
    color: white;
}

.btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>