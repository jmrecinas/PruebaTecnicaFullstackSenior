import { AlertTriangle } from 'lucide-react'
import { Modal, Button } from '@/shared/components/ui'

export const DeletePedidoModal = ({ isOpen, onClose, onConfirm, pedido, isLoading }) => {
  if (!pedido) return null

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Eliminar Pedido"
      maxWidth="max-w-md"
    >
      <div className="flex flex-col items-center text-center p-4">
        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
          <AlertTriangle className="text-red-600" size={24} />
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          ¿Estás seguro de eliminar este pedido?
        </h3>
        
        <p className="text-gray-600 mb-6">
          Se eliminará permanentemente el pedido <span className="font-bold text-gray-900">{pedido.numeroPedido}</span> del cliente <span className="font-medium">{pedido.cliente}</span>. Esta acción no se puede deshacer.
        </p>

        <div className="flex gap-3 w-full">
          <Button
            variant="outline" 
            onClick={onClose}
            disabled={isLoading}
            className="flex-1"
          >
            Cancelar
          </Button>
          <Button
            className="bg-red-600 hover:bg-red-700 text-white flex-1"
            onClick={onConfirm}
            isLoading={isLoading}
          >
            Sí, eliminar
          </Button>
        </div>
      </div>
    </Modal>
  )
}