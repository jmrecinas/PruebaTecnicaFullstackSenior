/**
 * Modelo de Pedido
 * Define la estructura y validaciones de un pedido
 */

import { PEDIDO_ESTADOS } from '@/config/constants'

// Función auxiliar para obtener la fecha LOCAL en formato YYYY-MM-DD
// Evita el error de que a partir de las 7pm (Perú) te ponga el día siguiente
const getLocalDateString = (dateString = null) => {
  const date = dateString ? new Date(dateString) : new Date();
  
  // Si la fecha es inválida, retornar hoy
  if (isNaN(date.getTime())) return new Date().toISOString().split('T')[0];

  // Ajustar la fecha a la zona horaria local antes de convertir a string
  const offset = date.getTimezoneOffset() * 60000; // offset en milisegundos
  const localDate = new Date(date.getTime() - offset);
  
  return localDate.toISOString().split('T')[0];
}

export class Pedido {
  constructor(data = {}) {
    this.id = data.id || null
    this.numeroPedido = data.numeroPedido || ''
    this.cliente = data.cliente || ''
    
    // CORRECCIÓN: Usamos la función local para inicializar
    this.fecha = data.fecha || getLocalDateString()
    
    this.total = data.total || 0
    this.estado = data.estado || PEDIDO_ESTADOS.REGISTRADO
  }

  // Validar pedido
  validate() {
    const errors = {}

    if (!this.numeroPedido || this.numeroPedido.trim() === '') {
      errors.numeroPedido = 'El número de pedido es requerido'
    }

    if (!this.cliente || this.cliente.trim() === '') {
      errors.cliente = 'El nombre del cliente es requerido'
    } else if (this.cliente.trim().length < 3) {
      errors.cliente = 'El nombre del cliente debe tener al menos 3 caracteres'
    }

    if (!this.fecha) {
      errors.fecha = 'La fecha es requerida'
    }

    if (this.total <= 0) {
      errors.total = 'El total debe ser mayor a 0'
    }

    if (!this.estado || !Object.values(PEDIDO_ESTADOS).includes(this.estado)) {
      errors.estado = 'El estado no es válido'
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    }
  }

  // Convertir a objeto plano para enviar al backend
  toJSON() {
    return {
      id: this.id,
      numeroPedido: this.numeroPedido.trim(),
      clienteNombre: this.cliente.trim(),
      // Enviamos la fecha tal cual está en el input (YYYY-MM-DD)
      fechaPedido: this.fecha, 
      total: parseFloat(this.total),
      estado: this.estado,
    }
  }

  // Crear instancia desde respuesta del servidor
  static fromJSON(json) {
    // Detectar qué campo de fecha viene (fechaPedido o fecha)
    const rawFecha = json.fechaPedido || json.fecha;
    
    // Convertir a YYYY-MM-DD simple
    let fechaLimpia = '';
    if (rawFecha) {
        // Si viene con hora (T), cortamos.
        fechaLimpia = String(rawFecha).split('T')[0]; 
    } else {
        fechaLimpia = getLocalDateString();
    }

    return new Pedido({
      id: json.id,
      numeroPedido: json.numeroPedido,
      cliente: json.clienteNombre || json.cliente,
      fecha: fechaLimpia,
      total: json.total,
      estado: json.estado,
    })
  }

  // Métodos de estado
  isCompleted() { return this.estado === PEDIDO_ESTADOS.ENTREGADO }
  isCancelled() { return this.estado === PEDIDO_ESTADOS.CANCELADO }
  canBeEdited() { return !this.isCompleted() && !this.isCancelled() }
  canBeDeleted() { return true }
}

export class PedidoFormData {
  constructor(pedido = null) {
    if (pedido instanceof Pedido) {
      this.numeroPedido = pedido.numeroPedido
      this.cliente = pedido.cliente
      this.fecha = pedido.fecha // Ya viene limpia desde fromJSON
      this.total = pedido.total
      this.estado = pedido.estado
    } else {
      this.numeroPedido = ''
      this.cliente = ''
      this.fecha = getLocalDateString() // Fecha de hoy en hora local
      this.total = ''
      this.estado = PEDIDO_ESTADOS.REGISTRADO
    }
  }

  toPedido(id = null) {
    return new Pedido({
      id,
      numeroPedido: this.numeroPedido,
      cliente: this.cliente,
      fecha: this.fecha,
      total: parseFloat(this.total) || 0,
      estado: this.estado,
    })
  }
}