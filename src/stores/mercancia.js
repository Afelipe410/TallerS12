import { defineStore } from 'pinia'
import axios from 'axios'

const API_URL = 'http://localhost:7070'

export const useMercanciaStore = defineStore('mercancia', {
    state: () => ({
        mercancias: [],
        loading: false,
        error: null
    }),

    actions: {
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
        },

        async createMercancia(mercanciaData) {
            this.loading = true
            try {
                const response = await axios.post(`${API_URL}/mercancia`, mercanciaData)
                if (response.data.message === 'ok') {
                    await this.fetchMercancias()
                    return true
                }
                return false
            } catch (error) {
                this.error = 'Error al agregar la mercancía: ' + error.message
                console.error('Error:', error)
                return false
            } finally {
                this.loading = false
            }
        },

        async deleteMercancia(id) {
            this.loading = true
            try {
                const response = await axios.delete(`${API_URL}/mercancia/${id}`)
                if (response.data.message === 'ok') {
                    await this.fetchMercancias()
                    return true
                }
                return false
            } catch (error) {
                this.error = 'Error al eliminar la mercancía'
                console.error('Error:', error)
                return false
            } finally {
                this.loading = false
            }
        },

        async updateMercancia(id, mercanciaData) {
            try {
              const response = await axios.patch(`${API_URL}/mercancia/${id}`, mercanciaData);
              if (response.data.message === 'ok') {
                await this.fetchMercancias();
                return true;
              }
              return false;
            } catch (error) {
              this.error = `Error al actualizar la mercancía: ${error.message}`;
              console.error('Error:', error);
              return false;
            }
          },

        async getMercanciaById(id) {
            this.loading = true
            try {
                const response = await axios.get(`${API_URL}/mercancia/id/${id}`)
                if (response.data.message === 'ok') {
                    return response.data.data
                }
                return null
            } catch (error) {
                this.error = 'Error al obtener la mercancía'
                console.error('Error:', error)
                return null
            } finally {
                this.loading = false
            }
        }
    }
})
