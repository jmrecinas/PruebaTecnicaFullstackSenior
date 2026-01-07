/**
 * Componente PedidoFilters
 * Filtros modernos para búsqueda y filtrado de pedidos
 */

import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Search, Filter, X, SlidersHorizontal } from 'lucide-react'
import { PEDIDO_ESTADOS_OPTIONS } from '@/config/constants'
import { Button } from '@/shared/components/ui'
import { debounce } from '@/shared/utils/helpers'

export const PedidoFilters = ({ onFilterChange, totalPedidos }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedEstado, setSelectedEstado] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  // Debounce para búsqueda
  useEffect(() => {
    const debouncedSearch = debounce(() => {
      onFilterChange({
        search: searchTerm,
        estado: selectedEstado,
      })
    }, 500)

    debouncedSearch()
  }, [searchTerm, selectedEstado])

  const handleClearFilters = () => {
    setSearchTerm('')
    setSelectedEstado('')
    onFilterChange({ search: '', estado: '' })
  }

  const hasActiveFilters = searchTerm || selectedEstado

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Búsqueda */}
        <div className="flex-1">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Buscar por número de pedido o cliente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>

        {/* Toggle filtros móvil */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="lg:hidden flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <SlidersHorizontal size={18} />
          <span className="font-medium">Filtros</span>
          {hasActiveFilters && (
            <span className="w-2 h-2 bg-primary-600 rounded-full" />
          )}
        </button>

        {/* Filtros desktop / móvil expandible */}
        <div
          className={`
            flex flex-col lg:flex-row gap-3 lg:items-center
            ${showFilters ? 'block' : 'hidden lg:flex'}
          `}
        >
          {/* Filtro por estado */}
          <div className="relative min-w-[200px]">
            <Filter
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              size={18}
            />
            <select
              value={selectedEstado}
              onChange={(e) => setSelectedEstado(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none appearance-none bg-white cursor-pointer transition-all"
            >
              <option value="">Todos los estados</option>
              {PEDIDO_ESTADOS_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Limpiar filtros */}
          {hasActiveFilters && (
            <Button
              onClick={handleClearFilters}
              variant="outline"
              size="sm"
              icon={X}
            >
              Limpiar
            </Button>
          )}

          {/* Contador */}
          <div className="hidden lg:flex items-center px-4 py-2 bg-gray-50 rounded-lg border border-gray-200">
            <span className="text-sm font-semibold text-gray-900">
              {totalPedidos}
            </span>
            <span className="text-sm text-gray-600 ml-1">
              {totalPedidos === 1 ? 'pedido' : 'pedidos'}
            </span>
          </div>
        </div>
      </div>

      {/* Contador móvil */}
      <div className="lg:hidden mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Total de pedidos:</span>
          <span className="text-sm font-bold text-gray-900">{totalPedidos}</span>
        </div>
      </div>
    </div>
  )
}

PedidoFilters.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  totalPedidos: PropTypes.number,
}

//export default PedidoFilters 