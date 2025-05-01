// components/Modal.tsx
interface ModalProps {
    isOpen: boolean
    onClose: () => void
    title?: string
    children?: React.ReactNode
  }
  
  export default function GameModal({
    isOpen,
    onClose,
    title,
    children,
  }: ModalProps) {
    if (!isOpen) return null
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative animate-fade-in">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-black cursor-pointer"
          >
            ✕
          </button>
          <h2 className={`text-xl text-text font-bold mb-4 ${title ? 'flex' : 'hidden'}`}>{title}</h2>
          <div>{children}</div>
        </div>
      </div>
    )
  }
  