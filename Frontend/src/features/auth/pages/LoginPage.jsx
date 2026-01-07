import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
 
import { useAuth } from '@/core/hooks'
import { LoginForm } from '@/features/auth/components'
import { ROUTES } from '@/config/routes.config'

const carouselImages = [
  {
    url: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2f/68/90/0d/las-mejores-mesas-y-maquinas.jpg?w=1200&h=-1&s=1',
    title: 'Sistema de pedidos',
    description: 'Gestión eficiente y control total de tus operaciones.',
  },
  {
    url: 'https://media-cdn.tripadvisor.com/media/photo-s/13/07/6b/a9/majestoso.jpg',
    title: 'Administración simple',
    description: 'Todo lo que necesitas en un solo lugar.',
  },
  {
    url: 'https://casinopeep.com/wp-content/uploads/sites/3/2020/06/atlantic.jpg',
    title: 'Seguridad garantizada',
    description: 'Tus datos protegidos con los más altos estándares.',
  },
]

export const LoginPage = () => {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    if (isAuthenticated) {
      navigate(ROUTES.DEFAULT_PRIVATE, { replace: true })
    }
  }, [isAuthenticated, navigate])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Funciones de navegación manual (solo click en dots)
  const goToSlide = (index) => setCurrentSlide(index)

  return (

    <div className="h-screen w-full flex overflow-hidden bg-white">
      
      <div className="hidden lg:flex lg:w-[55%] relative bg-gray-900 h-full">
        {carouselImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image.url}
              alt={image.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          </div>
        ))}

        <div className="absolute bottom-0 left-0 right-0 p-12 text-white z-10">
          <div className="max-w-2xl">
            <div className="mb-6 inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg">
              <p className="text-sm font-medium">Bienvenido al nuevo</p>
            </div>
            <h2 className="text-4xl font-bold mb-4">
              {carouselImages[currentSlide].title}
            </h2>
            <p className="text-lg text-gray-200 leading-relaxed">
              {carouselImages[currentSlide].description}
            </p>
          </div>
        </div>


        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                index === currentSlide ? 'w-6 bg-white' : 'w-1.5 bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="w-full lg:w-[45%] h-full overflow-y-auto relative flex flex-col justify-center items-center bg-white p-4 sm:p-8 md:p-12">
        <div className="w-full max-w-md mx-auto py-8">
          
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center mb-6 p-3 bg-red-50 rounded-full">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3588/3588592.png"
                alt="Logo"
                className="w-12 h-12"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Bienvenido de nuevo</h1>
              <p className="text-gray-500 text-sm">Ingresa tus credenciales para acceder</p>
            </div>
          </div>

          <LoginForm />

          <div className="mt-8 text-center">
            <p className="text-xs text-gray-400">
              © 2025 Sistema de Pedidos v1.0
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}

export default LoginPage