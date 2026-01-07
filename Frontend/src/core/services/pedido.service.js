/**
 * Servicio de Pedidos
 * Maneja todas las operaciones CRUD de pedidos
 */

import httpService from './http.service'
import { API_ENDPOINTS } from '@/config/api.config'
import { Pedido } from '@/core/models'

class PedidoService {
  /**
   * Obtiene todos los pedidos
   * @param {Object} params - Parámetros de filtrado y paginación
   * @returns {Promise<Array<Pedido>>} Lista de pedidos
   */
  async getAll(params = {}) {
    try {
      const response = await httpService.get(API_ENDPOINTS.PEDIDOS.BASE, {
        params,
      })

      if (response.isSuccess && Array.isArray(response.result)) {
        return response.result.map((item) => Pedido.fromJSON(item))
      }

      if (response.result && Array.isArray(response.result.data)) {
        return {
          data: response.result.data.map((item) => Pedido.fromJSON(item)),
          total: response.result.total || response.result.data.length,
          page: response.result.page || 1,
          pageSize: response.result.pageSize || response.result.data.length,
        }
      }

      return []
    } catch (error) {
      console.error('Error al obtener pedidos:', error)
      throw error
    }
  }

  /**
   * Obtiene un pedido por ID
   * @param {number} id - ID del pedido
   * @returns {Promise<Pedido>} Pedido encontrado
   */
  async getById(id) {
    try {
      if (!id) {
        throw new Error('El ID del pedido es requerido')
      }

      const response = await httpService.get(API_ENDPOINTS.PEDIDOS.BY_ID(id))
      
      // Se asume que el detalle también viene dentro de "result"
      const data = response.result || response
      return Pedido.fromJSON(data)
    } catch (error) {
      console.error(`Error al obtener pedido ${id}:`, error)
      throw error
    }
  }

  /**
   * Crea un nuevo pedido
   * @param {Pedido|Object} pedidoData - Datos del pedido
   * @returns {Promise<Pedido>} Pedido creado
   */
  async create(pedidoData) {
    try {
      const pedido = pedidoData instanceof Pedido 
        ? pedidoData 
        : new Pedido(pedidoData)

      const validation = pedido.validate()
      if (!validation.isValid) {
        const errorMessage = Object.values(validation.errors).join(', ')
        throw new Error(`Validación fallida: ${errorMessage}`)
      }

      const response = await httpService.post(
        API_ENDPOINTS.PEDIDOS.CREATE,
        pedido.toJSON()
      )

      const data = response.result || response
      return Pedido.fromJSON(data)
    } catch (error) {
      console.error('Error al crear pedido:', error)
      throw error
    }
  }

  /**
   * Actualiza un pedido existente
   * @param {number} id - ID del pedido
   * @param {Pedido|Object} pedidoData - Datos actualizados
   * @returns {Promise<Pedido>} Pedido actualizado
   */
  async update(id, pedidoData) {
    try {
      if (!id) {
        throw new Error('El ID del pedido es requerido')
      }

      const pedido = pedidoData instanceof Pedido 
        ? pedidoData 
        : new Pedido({ ...pedidoData, id })

      const validation = pedido.validate()
      if (!validation.isValid) {
        const errorMessage = Object.values(validation.errors).join(', ')
        throw new Error(`Validación fallida: ${errorMessage}`)
      }

      const response = await httpService.put(
        API_ENDPOINTS.PEDIDOS.UPDATE(id),
        pedido.toJSON()
      )

      const data = response.result || response
      return Pedido.fromJSON(data)
    } catch (error) {
      console.error(`Error al actualizar pedido ${id}:`, error)
      throw error
    }
  }

  /**
   * Elimina un pedido
   * @param {number} id - ID del pedido
   * @returns {Promise<boolean>} True si se eliminó correctamente
   */
  async delete(id) {
    try {
      if (!id) {
        throw new Error('El ID del pedido es requerido')
      }

      const response = await httpService.delete(API_ENDPOINTS.PEDIDOS.DELETE(id))
      return response.isSuccess || true
    } catch (error) {
      console.error(`Error al eliminar pedido ${id}:`, error)
      throw error
    }
  }

  /**
   * Busca pedidos por criterio
   * @param {string} query - Término de búsqueda
   * @returns {Promise<Array<Pedido>>} Pedidos encontrados
   */
  async search(query) {
    try {
      const response = await httpService.get(API_ENDPOINTS.PEDIDOS.BASE, {
        params: { search: query },
      })

      if (response.isSuccess && Array.isArray(response.result)) {
        return response.result.map((item) => Pedido.fromJSON(item))
      }

      return []
    } catch (error) {
      console.error('Error al buscar pedidos:', error)
      throw error
    }
  }

  /**
   * Filtra pedidos por estado
   * @param {string} estado - Estado del pedido
   * @returns {Promise<Array<Pedido>>} Pedidos filtrados
   */
  async filterByEstado(estado) {
    try {
      const response = await httpService.get(API_ENDPOINTS.PEDIDOS.BASE, {
        params: { estado },
      })

      if (response.isSuccess && Array.isArray(response.result)) {
        return response.result.map((item) => Pedido.fromJSON(item))
      }

      return []
    } catch (error) {
      console.error(`Error al filtrar pedidos por estado ${estado}:`, error)
      throw error
    }
  }

  /**
   * Obtiene estadísticas de pedidos (Calculado en frontend)
   * @returns {Promise<Object>} Estadísticas
   */
  async getStatistics() {
    try {
      const pedidos = await this.getAll()
      
      const stats = {
        total: pedidos.length,
        porEstado: {},
        totalMonto: 0,
        promedioMonto: 0,
      }

      pedidos.forEach((pedido) => {
        stats.porEstado[pedido.estado] = (stats.porEstado[pedido.estado] || 0) + 1
        stats.totalMonto += pedido.total
      })

      stats.promedioMonto = stats.total > 0 
        ? stats.totalMonto / stats.total 
        : 0

      return stats
    } catch (error) {
      console.error('Error al obtener estadísticas:', error)
      throw error
    }
  }

  /**
   * Valida si un número de pedido ya existe
   * @param {string} numeroPedido - Número de pedido a validar
   * @param {number} excludeId - ID a excluir de la validación (para edición)
   * @returns {Promise<boolean>} True si ya existe
   */
  async existsNumeroPedido(numeroPedido, excludeId = null) {
    try {
      const pedidos = await this.getAll()
      
      return pedidos.some(
        (p) => p.numeroPedido === numeroPedido && p.id !== excludeId
      )
    } catch (error) {
      console.error('Error al validar número de pedido:', error)
      return false
    }
  }
}

// Exportar instancia única (Singleton)
const pedidoService = new PedidoService()

export default pedidoService