import heroImage from '../assets/images/hero-fashion.jpg'
import editorialSoftImage from '../assets/images/section3.jpeg'
import editorialBoldImage from '../assets/images/section3-1.jpeg'
import mosaicClayImage from '../assets/images/offer1.jpg'
import mosaicButterImage from '../assets/images/section3.jpeg'
import mosaicPearlImage from '../assets/images/section3-1.jpeg'
import galleryImage1 from '../assets/images/gallery-1.jpg'
import galleryImage2 from '../assets/images/gallery-2.jpg'
import galleryImage3 from '../assets/images/gallery-3.jpg'
import galleryImage4 from '../assets/images/gallery-4.jpg'
import galleryImage5 from '../assets/images/gallery-5.jpg'
import galleryImage6 from '../assets/images/gallery-6.jpg'
import lanaImage from '../assets/images/product-lana.svg'
import milaImage from '../assets/images/product-mila.svg'
import noraImage from '../assets/images/product-nora.svg'
import ariImage from '../assets/images/product-ari.svg'
import cleoImage from '../assets/images/product-cleo.svg'
import tiaImage from '../assets/images/product-tia.svg'
import elleImage from '../assets/images/product-elle.svg'
import veraImage from '../assets/images/product-vera.svg'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api'
const API_ORIGIN = API_BASE_URL.replace(/\/api\/?$/, '')

const mockCategories = [
  { id: 1, name: 'Sandals', slug: 'sandals', label: 'Minimal straps' },
  { id: 2, name: 'Sneakers', slug: 'sneakers', label: 'Soft streetwear' },
  { id: 3, name: 'Heels', slug: 'heels', label: 'Elevated evening' },
  { id: 4, name: 'Loafers', slug: 'loafers', label: 'Tailored ease' },
  { id: 5, name: 'Slides', slug: 'slides', label: 'Summer staples' },
  { id: 6, name: 'Flats', slug: 'flats', label: 'Quiet luxury' },
]

const mockProducts = [
  { id: 1, name: 'Lana Sculpt Heel', slug: 'lana-sculpt-heel', category: { name: 'Heels', slug: 'heels' }, price: 124, stock_quantity: 8, availability: true, featured: true, image: lanaImage, description: 'Sculpted heel with a refined satin finish.', created_at: '2026-04-20T12:00:00Z' },
  { id: 2, name: 'Mila Soft Runner', slug: 'mila-soft-runner', category: { name: 'Sneakers', slug: 'sneakers' }, price: 98, stock_quantity: 14, availability: true, featured: true, image: milaImage, description: 'Everyday runner designed for comfort and balance.', created_at: '2026-04-19T12:00:00Z' },
  { id: 3, name: 'Nora City Slingback', slug: 'nora-city-slingback', category: { name: 'Heels', slug: 'heels' }, price: 116, stock_quantity: 0, availability: false, featured: true, image: noraImage, description: 'A clean slingback with a polished city silhouette.', created_at: '2026-04-18T12:00:00Z' },
  { id: 4, name: 'Ari Weekend Loafer', slug: 'ari-weekend-loafer', category: { name: 'Loafers', slug: 'loafers' }, price: 132, stock_quantity: 5, availability: true, featured: true, image: ariImage, description: 'Tailored loafer made for dressed-down weekends.', created_at: '2026-04-17T12:00:00Z' },
  { id: 5, name: 'Cleo Summer Slide', slug: 'cleo-summer-slide', category: { name: 'Slides', slug: 'slides' }, price: 74, stock_quantity: 9, availability: true, featured: true, image: cleoImage, description: 'Minimal summer slide in a soft neutral palette.', created_at: '2026-04-16T12:00:00Z' },
  { id: 6, name: 'Tia Knit Sandal', slug: 'tia-knit-sandal', category: { name: 'Sandals', slug: 'sandals' }, price: 89, stock_quantity: 12, availability: true, featured: true, image: tiaImage, description: 'Breathable knit sandal with relaxed structure.', created_at: '2026-04-15T12:00:00Z' },
  { id: 7, name: 'Elle Canvas Sneaker', slug: 'elle-canvas-sneaker', category: { name: 'Sneakers', slug: 'sneakers' }, price: 95, stock_quantity: 0, availability: false, featured: false, image: elleImage, description: 'Lightweight sneaker with a clean canvas upper.', created_at: '2026-04-14T12:00:00Z' },
  { id: 8, name: 'Vera Minimal Mule', slug: 'vera-minimal-mule', category: { name: 'Flats', slug: 'flats' }, price: 108, stock_quantity: 11, availability: true, featured: true, image: veraImage, description: 'Streamlined mule for understated statement dressing.', created_at: '2026-04-13T12:00:00Z' },
]

export const productSizes = [37, 38, 39, 40]

const mockHomeContent = {
  hero: {
    image: heroImage,
    eyebrow: 'Spring / Summer 2026',
    title: 'Comfort in Every Step.',
    text: 'Massoud Center is a contemporary footwear destination offering a wide range of stylish and comfortable shoes for every occasion. Combining quality craftsmanship with modern design, the brand focuses on delivering products that support both confidence and everyday comfort. .',
  },
  editorials: [
    { image: editorialSoftImage, eyebrow: 'Style that moves', title: 'You first', productSlug: 'cleo-summer-slide' },
    { image: editorialBoldImage, eyebrow: 'Step into the extraordinary', title: 'Statement forms, airy finish', productSlug: 'mila-soft-runner' },
  ],
  mosaic: {
    clay: mosaicClayImage,
    butter: mosaicButterImage,
    pearl: mosaicPearlImage,
  },
  notes: [
    { title: 'Free shipping', text: 'Complimentary delivery on every order over $120 with easy doorstep returns.' },
    { title: 'Curated comfort', text: 'Thoughtfully selected silhouettes that blend statement styling with all-day wear.' },
    { title: 'Gift ready', text: 'Every purchase arrives wrapped in our signature monochrome packaging.' },
  ],
  gallery: [
    { label: 'Studio Drop', image: galleryImage1 },
    { label: 'Urban Steps', image: galleryImage2 },
    { label: 'Soft Neutrals', image: galleryImage3 },
    { label: 'Golden Hour', image: galleryImage4 },
    { label: 'Street Edit', image: galleryImage5 },
    { label: 'Weekend Ease', image: galleryImage6 },
  ],
}

function getToken() {
  return window.localStorage.getItem('revone_token')
}

function clearStoredAuth() {
  window.localStorage.removeItem('revone_token')
  window.localStorage.removeItem('revone_user')
}

function normalizeMediaUrl(value, fallback = '') {
  if (!value) return fallback
  if (/^https?:\/\//i.test(value)) return value
  if (value.startsWith('/')) return `${API_ORIGIN}${value}`
  return `${API_ORIGIN}/${value}`
}

async function apiFetch(path, options = {}) {
  const token = getToken()
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  }

  if (token && options.includeAuth !== false) {
    headers.Authorization = `Bearer ${token}`
  }

  let response

  try {
    response = await fetch(`${API_BASE_URL}${path}`, { ...options, headers })
  } catch {
    throw new Error('Could not reach the backend API. Make sure Django is running and the frontend origin is allowed.')
  }

  if (response.status === 401 || response.status === 403) {
    const error = await response.json().catch(() => ({ detail: 'Request failed' }))
    const message = error.detail || 'Request failed'

    if (message.toLowerCase().includes('invalid or expired token')) {
      clearStoredAuth()

      if (options.includeAuth !== false && !options.requireAuth) {
        return apiFetch(path, { ...options, includeAuth: false })
      }
    }

    throw new Error(message)
  }

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Request failed' }))
    throw new Error(error.detail || 'Request failed')
  }
  return response.json()
}

function mapProduct(product) {
  const fallbackProduct = mockProducts.find((item) => item.slug === product.slug || item.id === product.id)
  const normalizedPrice = Number(product.price ?? fallbackProduct?.price ?? 0)
  const normalizedCategory =
    typeof product.category === 'string'
      ? product.category
      : product.category?.name || fallbackProduct?.category?.name || 'Uncategorized'

  return {
    ...product,
    image: normalizeMediaUrl(product.image, fallbackProduct?.image || lanaImage),
    price: Number.isFinite(normalizedPrice) ? normalizedPrice : 0,
    available: product.availability ?? product.stock_quantity > 0,
    isNew: Boolean(product.featured),
    category: normalizedCategory,
  }
}

function unwrapListResponse(data) {
  if (Array.isArray(data)) {
    return data
  }

  if (data && Array.isArray(data.results)) {
    return data.results
  }

  return []
}

export async function getProducts(params = {}) {
  const query = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') query.set(key, value)
  })
  const data = await apiFetch(`/catalog/products/${query.toString() ? `?${query}` : ''}`)
  const list = unwrapListResponse(data)
  return list.map(mapProduct)
}

export async function getFeaturedProducts() {
  const products = await getProducts()
  return products.filter((product) => product.featured || product.isNew).slice(0, 8)
}

export async function getCategories() {
  const data = await apiFetch('/catalog/categories/')
  return unwrapListResponse(data).map((category) => ({
    ...category,
    image: normalizeMediaUrl(category.image),
    label: category.description || category.name,
  }))
}

export async function getHomeContent() {
  return mockHomeContent
}

export async function getProductById(idOrSlug) {
  const data = await apiFetch(`/catalog/products/${idOrSlug}/`)
  return mapProduct(data)
}

export async function getRelatedProducts(product, limit = 4) {
  const products = await getProducts()

  return products
    .filter((item) => item.id !== product.id)
    .sort((a, b) => {
      const aScore = Number(a.category === product.category) + Number(a.available)
      const bScore = Number(b.category === product.category) + Number(b.available)
      return bScore - aScore || a.id - b.id
    })
    .slice(0, limit)
}

export async function login(credentials) {
  const data = await apiFetch('/auth/login/', { method: 'POST', body: JSON.stringify(credentials) })
  window.localStorage.setItem('revone_token', data.token)
  window.localStorage.setItem('revone_user', JSON.stringify(data.user))
  return data
}

export async function register(payload) {
  return apiFetch('/auth/register/', { method: 'POST', body: JSON.stringify(payload) })
}

export async function getProfile() {
  return apiFetch('/auth/profile/', { requireAuth: true })
}

export async function updateProfile(payload) {
  return apiFetch('/auth/profile/', { method: 'PUT', body: JSON.stringify(payload), requireAuth: true })
}

export async function getAddresses() {
  return apiFetch('/auth/addresses/', { requireAuth: true })
}

export async function submitContact(payload) {
  return apiFetch('/contact/', { method: 'POST', body: JSON.stringify(payload) })
}
