/**
 * Página de Lista de Pedidos
 * Vista principal con filtros, búsqueda y acciones
 */

import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, LayoutGrid, LayoutList, RefreshCw, FileSpreadsheet } from 'lucide-react'
import { usePedidos, useDeletePedido } from '@/core/hooks/usePedidos'
import { Button, Alert } from '@/shared/components/ui'
import { PedidoList, PedidoFilters, PedidoTable, DeletePedidoModal } from '@/features/pedidos/components'
import { ROUTES } from '@/config/routes.config'

// Importamos nuestra nueva función helper para Excel
import { downloadExcel } from '@/shared/utils/helpers'

export const PedidosPage = () => {
  const navigate = useNavigate()
  const [viewMode, setViewMode] = useState('grid')
  const [filters, setFilters] = useState({
    search: '',
    estado: '',
  })
  
  const [pedidoToDelete, setPedidoToDelete] = useState(null)

  const { data: pedidos, isLoading, error, refetch } = usePedidos()
  const deleteMutation = useDeletePedido()

  // Filtrar pedidos
  const filteredPedidos = useMemo(() => {
    if (!pedidos) return []

    let filtered = [...pedidos]

    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filtered = filtered.filter(
        (p) =>
          p.numeroPedido.toLowerCase().includes(searchLower) ||
          p.cliente.toLowerCase().includes(searchLower)
      )
    }

    if (filters.estado) {
      filtered = filtered.filter((p) => p.estado === filters.estado)
    }

    return filtered
  }, [pedidos, filters])

  // Handlers
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
  }

  const handleDeleteClick = (pedido) => {
    setPedidoToDelete(pedido)
  }

  const handleConfirmDelete = async () => {
    if (pedidoToDelete) {
      try {
        await deleteMutation.mutateAsync(pedidoToDelete.id)
        setPedidoToDelete(null) 
      } catch (error) {
        console.error("Error al eliminar:", error)
      }
    }
  }

  const handleCloseDeleteModal = () => {
    setPedidoToDelete(null)
  }

  const handleEdit = (pedido) => {
    navigate(ROUTES.PRIVATE.PEDIDOS_EDITAR.path.replace(':id', pedido.id))
  }

  // --- FUNCIÓN DE EXPORTAR A EXCEL ---
  const handleExport = () => {
    if (filteredPedidos.length === 0) {
      alert('No hay pedidos para exportar')
      return
    }

    // 1. Mapear datos (Preparamos los datos con los nombres de columnas para el Excel)
    const dataToExport = filteredPedidos.map((p) => ({
      "N° Pedido": p.numeroPedido,
      "Cliente": p.cliente,
      "Fecha": p.fecha, 
      "Total (S/)": p.total,
      "Estado": p.estado,
    }))

    // 2. Definir nombre del archivo
    const fileName = `Reporte_Pedidos_${new Date().toISOString().split('T')[0]}.xlsx`

    // 3. Llamar al helper reutilizable
    downloadExcel(dataToExport, fileName, "Pedidos")
  }

  return (
    <>
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Gestión de Pedidos
            </h1>
            <p className="text-gray-600">
              Administra y controla todos tus pedidos de forma eficiente
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              icon={RefreshCw}
              onClick={() => refetch()}
              disabled={isLoading}
              className="hidden sm:inline-flex"
            >
              Actualizar
            </Button>

            <Button
              variant="outline"
              icon={FileSpreadsheet} 
              onClick={handleExport}
              disabled={isLoading || filteredPedidos.length === 0}
              className="hidden sm:inline-flex"
            >
              Exportar Excel
            </Button>

            <Button
              icon={Plus}
              onClick={() => navigate(ROUTES.PRIVATE.PEDIDOS_CREAR.path)}
            >
              Nuevo Pedido
            </Button>
          </div>
        </div>

        {/* Estadísticas rápidas */}
        {!isLoading && pedidos && (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
              <div className="text-sm font-medium text-blue-600 mb-1">Total Pedidos</div>
              <div className="text-2xl font-bold text-blue-900">{pedidos.length}</div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
              <div className="text-sm font-medium text-purple-600 mb-1">Registrados</div>
              <div className="text-2xl font-bold text-purple-900">
                {pedidos.filter((p) => p.estado === 'Registrado').length}
              </div>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-4 border border-amber-200">
              <div className="text-sm font-medium text-amber-600 mb-1">Procesando</div>
              <div className="text-2xl font-bold text-amber-900">
                {pedidos.filter((p) => p.estado === 'Procesando').length}
              </div>
            </div>
            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-4 border border-indigo-200">
              <div className="text-sm font-medium text-indigo-600 mb-1">Enviado</div>
              <div className="text-2xl font-bold text-indigo-900">
                {pedidos.filter((p) => p.estado === 'Enviado').length}
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
              <div className="text-sm font-medium text-green-600 mb-1">Entregado</div>
              <div className="text-2xl font-bold text-green-900">
                {pedidos.filter((p) => p.estado === 'Entregado').length}
              </div>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-4 border border-red-200">
              <div className="text-sm font-medium text-red-600 mb-1">Cancelado</div>
              <div className="text-2xl font-bold text-red-900">
                {pedidos.filter((p) => p.estado === 'Cancelado').length}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Error state */}
      {error && (
        <Alert
          type="error"
          title="Error al cargar pedidos"
          message={error.message || 'No se pudieron cargar los pedidos'}
          className="mb-6"
        />
      )}

      {/* Filtros */}
      <PedidoFilters
        onFilterChange={handleFilterChange}
        totalPedidos={filteredPedidos.length}
      />

      {/* Selector de vista */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          {filters.search && (
            <span>
              Buscando: <span className="font-semibold">{filters.search}</span>
            </span>
          )}
          {filters.estado && (
            <span>
              • Estado: <span className="font-semibold">{filters.estado}</span>
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-md transition-colors ${
              viewMode === 'grid'
                ? 'bg-white text-primary-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
            title="Vista de tarjetas"
          >
            <LayoutGrid size={18} />
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`p-2 rounded-md transition-colors ${
              viewMode === 'table'
                ? 'bg-white text-primary-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
            title="Vista de tabla"
          >
            <LayoutList size={18} />
          </button>
        </div>
      </div>

      {/* Lista o Tabla de pedidos */}
      {viewMode === 'grid' ? (
        <PedidoList
          pedidos={filteredPedidos}
          isLoading={isLoading}
          onDelete={handleDeleteClick}
          onEdit={handleEdit}
        />
      ) : (
        <PedidoTable
          pedidos={filteredPedidos}
          isLoading={isLoading}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
        />
      )}

      {/* Acciones flotantes móvil */}
      <div className="fixed bottom-6 right-6 sm:hidden">
        <Button
          icon={Plus}
          onClick={() => navigate(ROUTES.PRIVATE.PEDIDOS_CREAR.path)}
          className="rounded-full shadow-lg w-14 h-14 !p-0"
        >
          <span className="sr-only">Nuevo Pedido</span>
        </Button>
      </div>

      {/* MODAL DE CONFIRMACIÓN */}
      <DeletePedidoModal
        isOpen={!!pedidoToDelete}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        pedido={pedidoToDelete}
        isLoading={deleteMutation.isLoading}
      />
    </>
  )
}

export default PedidosPage