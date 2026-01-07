/**
 * Componente LoginForm
 * Formulario de inicio de sesión con Captcha Canvas Dinámico
 */

import { useState, useEffect, useRef, useCallback } from 'react'
import { Mail, Lock, Eye, EyeOff, RefreshCw } from 'lucide-react'
import { useLogin } from '@/features/auth/hooks'
import { Alert } from '@/shared/components/ui'

export const LoginForm = () => {
  const { login, isLoading, error, clearError } = useLogin()
  
  // Estados de UI
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  
  // Estados del Formulario
  const [captchaCode, setCaptchaCode] = useState('')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    captchaInput: '',
  })
  const [formErrors, setFormErrors] = useState({})

  // Referencia al elemento Canvas
  const canvasRef = useRef(null)

  /**
   * Genera un código aleatorio alfanumérico
   */
  const generateRandomString = (length) => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789' // Sin I, 1, O, 0
    let result = ''
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  }

  /**
   * Dibuja el Captcha en el Canvas
   */
  const drawCaptcha = useCallback((code) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const width = canvas.width
    const height = canvas.height

    ctx.clearRect(0, 0, width, height)
    ctx.fillStyle = '#f3f4f6'
    ctx.fillRect(0, 0, width, height)

    // Ruido
    for (let i = 0; i < 50; i++) {
      ctx.fillStyle = `rgba(0,0,0,${Math.random() * 0.2})`
      ctx.beginPath()
      ctx.arc(Math.random() * width, Math.random() * height, 1, 0, 2 * Math.PI)
      ctx.fill()
    }

    // Líneas
    for (let i = 0; i < 7; i++) {
      ctx.strokeStyle = `rgba(0,0,0,${Math.random() * 0.2})`
      ctx.beginPath()
      ctx.moveTo(Math.random() * width, Math.random() * height)
      ctx.lineTo(Math.random() * width, Math.random() * height)
      ctx.stroke()
    }

    // Texto
    ctx.font = 'bold 24px monospace'
    ctx.textBaseline = 'middle'
    const charWidth = width / (code.length + 2)
    
    for (let i = 0; i < code.length; i++) {
      const char = code[i]
      ctx.save()
      const x = (i + 1) * charWidth + (Math.random() - 0.5) * 5
      const y = height / 2 + (Math.random() - 0.5) * 10
      ctx.translate(x, y)
      ctx.rotate((Math.random() - 0.5) * 0.5)
      ctx.fillStyle = '#374151'
      ctx.fillText(char, 0, 0)
      ctx.restore()
    }
  }, [])

  /**
   * Inicializa o recarga el captcha
   */
  const refreshCaptcha = useCallback(() => {
    const newCode = generateRandomString(6)
    setCaptchaCode(newCode)
    drawCaptcha(newCode)
    setFormData(prev => ({ ...prev, captchaInput: '' }))
    setFormErrors(prev => ({ ...prev, captchaInput: '' }))
  }, [drawCaptcha])

  useEffect(() => {
    refreshCaptcha()
  }, [refreshCaptcha])

  // Manejadores
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (formErrors[name]) setFormErrors((prev) => ({ ...prev, [name]: '' }))
    if (error) clearError()
  }

  const validateForm = () => {
    const errors = {}
    if (!formData.email.trim()) errors.email = 'El email es requerido'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = 'El email no es válido'
    
    if (!formData.password) errors.password = 'La contraseña es requerida'
    
    if (!formData.captchaInput.trim()) {
      errors.captchaInput = 'Ingresa el código de seguridad'
    } else if (formData.captchaInput.toUpperCase() !== captchaCode) {
      errors.captchaInput = 'El código es incorrecto'
      refreshCaptcha()
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return
    await login({ email: formData.email, password: formData.password })
  }

  return (
    <div className="w-full animate-in fade-in duration-500">
      <form onSubmit={handleSubmit} className="space-y-5">
        
        {error && <Alert type="error" message={error} onClose={clearError} />}

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
          <div className="relative group">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors" size={18} />
            <input
              type="email"
              name="email"
              placeholder="usuario@ejemplo.com"
              value={formData.email}
              onChange={handleChange}
              disabled={isLoading}
              className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all ${
                formErrors.email ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
              }`}
            />
          </div>
          {formErrors.email && <p className="mt-1 text-xs text-red-600 font-medium">{formErrors.email}</p>}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Contraseña</label>
          <div className="relative group">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors" size={18} />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              disabled={isLoading}
              className={`w-full pl-10 pr-12 py-2.5 border rounded-lg focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all ${
                formErrors.password ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-all"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {formErrors.password && <p className="mt-1 text-xs text-red-600 font-medium">{formErrors.password}</p>}
        </div>

        {/* Remember Me */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="remember"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500 cursor-pointer"
          />
          <label htmlFor="remember" className="ml-2 text-sm text-gray-600 cursor-pointer hover:text-gray-900 select-none">
            Recordar usuario
          </label>
        </div>

        {/* Captcha Section */}
        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-3">
            <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Código de Seguridad
                </label>
                <button
                    type="button"
                    onClick={refreshCaptcha}
                    className="text-xs text-red-600 hover:text-red-700 font-medium flex items-center gap-1 hover:underline transition-all"
                >
                    <RefreshCw size={14} /> Recargar
                </button>
            </div>

            <div className="flex gap-3">
                <div className="relative overflow-hidden rounded-lg border border-gray-300 shadow-sm bg-white cursor-pointer group" onClick={refreshCaptcha}>
                    <canvas
                        ref={canvasRef}
                        width="140"
                        height="48"
                        className="block w-[140px] h-[48px]"
                        title="Click para recargar imagen"
                    />
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                       <RefreshCw size={16} className="text-gray-600" />
                    </div>
                </div>

                <input
                    type="text"
                    name="captchaInput"
                    placeholder="Escribe el código"
                    value={formData.captchaInput}
                    onChange={(e) => {
                        const val = e.target.value.toUpperCase();
                        setFormData(prev => ({...prev, captchaInput: val}));
                        if(formErrors.captchaInput) setFormErrors(prev => ({...prev, captchaInput: ''}));
                    }}
                    maxLength={6}
                    className={`flex-1 min-w-0 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none uppercase tracking-widest font-mono text-center transition-all ${
                        formErrors.captchaInput ? 'border-red-500 bg-red-50' : 'border-gray-300'
                    }`}
                />
            </div>
            {formErrors.captchaInput && <p className="text-xs text-red-600 font-medium text-center">{formErrors.captchaInput}</p>}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-medium py-3 rounded-lg shadow-lg shadow-red-600/20 transform transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
        >
          {isLoading ? 'Verificando...' : 'Ingresar al Sistema'}
        </button>
      </form>
      
      {/* Demo credentials (solo para desarrollo) */}
      {import.meta.env.DEV && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-xs font-semibold text-blue-800 mb-2">
            🔧 Credenciales de prueba (DEV):
          </p>
          <div className="text-xs text-blue-700 space-y-1">
            <p>Email: <code className="bg-blue-100 px-2 py-0.5 rounded">admin@jrecinas.acity</code></p>
            <p>Password: <code className="bg-blue-100 px-2 py-0.5 rounded">Admin123!</code></p>
            {/* Aquí usamos captchaCode en lugar de captcha */}
            <p>Captcha: <code className="bg-blue-100 px-2 py-0.5 rounded font-bold">{captchaCode}</code></p>
          </div>
        </div>
      )}
    </div>
  )
}

export default LoginForm