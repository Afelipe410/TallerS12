import { defineStore } from 'pinia'
import axios from 'axios'

const API_URL = 'http://localhost:7070'

export const useApiStore = defineStore('api', {
    state: () => ({
        clientes: [],
        mercancias: [],
        loading: false,
        error: null
    }),

    actions: {
        async fetchClientes() {
            this.loading = true
            try {
                const response = await axios.get(`${API_URL}/cliente`)
                this.clientes = response.data.data
                this.error = null
            } catch (error) {
                this.error = 'Error al cargar los clientes'
                console.error('Error:', error)
            } finally {
                this.loading = false
            }
        },

        async fetchMercancias() {
            this.loading = true
            try {
                const response = await axios.get(`${API_URL}/mercancia`)
                this.mercancias = response.data.data
                this.error = null
            } catch (error) {
                this.error = 'Error al cargar las mercancías'
                console.error('Error:', error)
            } finally {
                this.loading = false
            }
        }
    }
})