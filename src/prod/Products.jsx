import { useState } from 'react'
import './Products.css'

const API_URL = 'https://api.servisoft.com'

const initialProducts = [
  { id: 1, name: 'Desenvolvimento Web', price: 500, description: 'Sites e aplicações web modernos', category: 'servico' },
  { id: 2, name: 'App Mobile', price: 1000, description: 'Aplicações para iOS e Android', category: 'servico' },
]

function Products() {
  const [products, setProducts] = useState(initialProducts)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name: '', price: '', description: '', category: 'servico', image: null })

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setForm({ ...form, image: reader.result })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const newProduct = {
      id: Date.now(),
      name: form.name,
      price: parseFloat(form.price),
      description: form.description,
      category: form.category,
      image: form.category === 'produto' ? form.image : null,
    }

    console.log('POST to', API_URL, '/products', newProduct)

    await new Promise(resolve => setTimeout(resolve, 500))

    setProducts([...products, newProduct])
    setForm({ name: '', price: '', description: '', category: 'servico', image: null })
    setShowForm(false)
    setLoading(false)
  }

  const handleDelete = async (id) => {
    console.log('DELETE to', API_URL, '/products/', id)
    await new Promise(resolve => setTimeout(resolve, 300))
    setProducts(products.filter(p => p.id !== id))
  }

  const removeImage = () => {
    setForm({ ...form, image: null })
  }

  return (
    <div className="products-container">
      <header className="products-header">
        <h1>Gestão de Produtos/Serviços</h1>
        <button className="add-button" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancelar' : '+ Adicionar'}
        </button>
      </header>

      {showForm && (
        <div className="product-form-card">
          <h2>Novo Produto/Serviço</h2>
          <form onSubmit={handleSubmit} className="product-form">
            <div className="form-row">
              <div className="form-group">
                <label>Nome</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Nome do produto/serviço"
                />
              </div>
              <div className="form-group">
                <label>Preço (€)</label>
                <input
                  type="number"
                  required
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Categoria</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value, image: e.target.value === 'produto' ? form.image : null })}
              >
                <option value="servico">Serviço</option>
                <option value="produto">Produto</option>
              </select>
            </div>

            {form.category === 'produto' && (
              <div className="form-group">
                <label>Foto do Produto</label>
                {form.image ? (
                  <div className="image-preview">
                    <img src={form.image} alt="Preview" />
                    <button type="button" className="remove-image" onClick={removeImage}>×</button>
                  </div>
                ) : (
                  <label className="file-input-label">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="file-input"
                    />
                    <span>Clique para seleccionar uma imagem</span>
                  </label>
                )}
              </div>
            )}

            <div className="form-group">
              <label>Descrição</label>
              <textarea
                required
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Descrição do produto/serviço"
                rows="3"
              />
            </div>

            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? 'A guardar...' : 'Guardar'}
            </button>
          </form>
        </div>
      )}

      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <div className="product-header">
              <span className={`category-badge ${product.category}`}>
                {product.category === 'servico' ? 'Serviço' : 'Produto'}
              </span>
              <button className="delete-button" onClick={() => handleDelete(product.id)}>
                ×
              </button>
            </div>
            {product.image && (
              <div className="product-image">
                <img src={product.image} alt={product.name} />
              </div>
            )}
            <h3 className="product-name">{product.name}</h3>
            <p className="product-description">{product.description}</p>
            <p className="product-price">{product.price}€</p>
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <p className="empty-message">Nenhum produto/serviço encontrado.</p>
      )}
    </div>
  )
}

export default Products