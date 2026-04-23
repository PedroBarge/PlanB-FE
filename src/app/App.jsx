import { useState, useEffect } from 'react'
import './App.css'

const useDevice = () => {
  const [device, setDevice] = useState({ type: 'desktop', width: window.innerWidth })

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      let type = 'desktop'
      if (width < 768) type = 'mobile'
      else if (width < 1024) type = 'tablet'
      setDevice({ type, width })
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return device
}

function App() {
  const device = useDevice()
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const services = [
    {
      icon: '💻',
      title: 'Desenvolvimento Web',
      description: 'Sites e aplicações web modernos, rápidos e responsivos.'
    },
    {
      icon: '📱',
      title: 'Desenvolvimento Mobile',
      description: 'Apps nativos e híbridos para iOS e Android.'
    },
    {
      icon: '🎨',
      title: 'UI/UX Design',
      description: 'Interfaces intuitivas e experiências de utilizador excepcionais.'
    },
    {
      icon: '☁️',
      title: 'Consultoria Cloud',
      description: 'Arquitetura cloud, DevOps e otimização de infraestrutura.'
    }
  ]

  return (
    <div className="container">
      <nav className="nav">
        <div className={`nav-content ${device.type}`}>
          <span className="logo">ServiSoft</span>
          
          {device.type === 'mobile' ? (
            <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? '✕' : '☰'}
            </button>
          ) : (
            <div className="nav-links">
              <a href="#servicos" className="nav-link">Serviços</a>
              <a href="#sobre" className="nav-link">Sobre</a>
              <a href="#contacto" className="cta-button">Contactar</a>
            </div>
          )}

          {menuOpen && device.type === 'mobile' && (
            <div className="nav-menu-mobile">
              <a href="#servicos" className="nav-link" onClick={() => setMenuOpen(false)}>Serviços</a>
              <a href="#sobre" className="nav-link" onClick={() => setMenuOpen(false)}>Sobre</a>
              <a href="#contacto" className="cta-button" onClick={() => setMenuOpen(false)}>Contactar</a>
            </div>
          )}
        </div>
      </nav>

      <header className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Transformamos as tuas ideias em <span className="highlight">soluções digitais</span>
          </h1>
          <p className="hero-subtitle">
            Serviços de desenvolvimento web e mobile para impulsionar o teu negócio
          </p>
          <a href="#contacto" className="hero-button">Pedir Orçamento</a>
        </div>
      </header>

      <section id="servicos" className="section">
        <h2 className="section-title">Os Nossos Serviços</h2>
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <span className="service-icon">{service.icon}</span>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="sobre" className="section-alt">
        <div className="about-content">
          <h2 className="section-title">Sobre Nós</h2>
          <p className="about-text">
            Somos uma equipa de profissionais dedicados à criação de soluções digitais inovadoras.
            Com anos de experiência no mercado, ajudamos empresas a transformar a sua presença digital
            através de tecnologia de ponta e design centrado no utilizador.
          </p>
          <div className="stats-grid">
            <div className="stat">
              <span className="stat-number">50+</span>
              <span className="stat-label">Projetos Entregues</span>
            </div>
            <div className="stat">
              <span className="stat-number">30+</span>
              <span className="stat-label">Clientes Satisfeitos</span>
            </div>
            <div className="stat">
              <span className="stat-number">5+</span>
              <span className="stat-label">Anos de Experiência</span>
            </div>
          </div>
        </div>
      </section>

      <section id="contacto" className="section">
        <h2 className="section-title">Contacta-nos</h2>
        <p className="contact-subtitle">Tens um projeto em mente? Fala connosco!</p>
        
        {submitted ? (
          <div className="success-message">
            <span className="success-icon">✓</span>
            <p>Mensagem enviada com sucesso! Entraremos em contacto em breve.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
              <label className="label">Nome</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="input"
                placeholder="O teu nome"
              />
            </div>
            <div className="form-group">
              <label className="label">Email</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="input"
                placeholder="o-teu-email@exemplo.com"
              />
            </div>
            <div className="form-group">
              <label className="label">Mensagem</label>
              <textarea
                required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="textarea"
                placeholder="Conta-nos sobre o teu projeto..."
                rows="5"
              />
            </div>
            <button type="submit" className="submit-button">Enviar Mensagem</button>
          </form>
        )}
      </section>

      <footer className="footer">
        <p>&copy; 2026 ServiSoft. Todos os direitos reservados.</p>
      </footer>
    </div>
  )
}

export default App