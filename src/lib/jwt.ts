// Simple JWT validation for Edge Runtime compatibility
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'
const JWT_EXPIRES_IN = '24h'

export interface JWTPayload {
  userId: string
  email: string
  isAdmin: boolean
  name: string
}

// Convert base64url string to ArrayBuffer
function base64UrlToArrayBuffer(base64url: string): ArrayBuffer {
  try {
    const base64 = base64url.replace(/-/g, '+').replace(/_/g, '/')
    const padding = '='.repeat((4 - base64.length % 4) % 4)
    const base64Padded = base64 + padding
    const binary = atob(base64Padded)
    const bytes = new Uint8Array(binary.length)
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i)
    }
    return bytes.buffer
  } catch (error) {
    throw new Error('Invalid base64url encoding')
  }
}

// Simple token validation without signature verification
export async function verifyToken(token: string): Promise<JWTPayload> {
  try {    
    const parts = token.split('.')
    if (parts.length !== 3) {
      throw new Error('Invalid token format')
    }
    
    const [headerBase64, payloadBase64, signature] = parts
    
    // Decode header to check algorithm
    const headerString = new TextDecoder().decode(base64UrlToArrayBuffer(headerBase64))
    const header = JSON.parse(headerString)
    
    if (header.alg !== 'HS256') {
      throw new Error('Unsupported algorithm')
    }
    
    // Decode payload
    const payloadString = new TextDecoder().decode(base64UrlToArrayBuffer(payloadBase64))
    const payload = JSON.parse(payloadString)
    
    // Check expiration
    const now = Math.floor(Date.now() / 1000)
    if (payload.exp && payload.exp < now) {
      throw new Error('Token expired')
    }
    
    // Validate required fields
    if (!payload.userId || !payload.email || typeof payload.isAdmin !== 'boolean' || !payload.name) {
      throw new Error('Invalid payload structure')
    }
    
    return {
      userId: payload.userId,
      email: payload.email,
      isAdmin: payload.isAdmin,
      name: payload.name
    }
  } catch (error) {
    console.log('Error verifying token', error)
    throw new Error('Invalid token')
  }
}

// Generate token using Web Crypto API
export async function generateToken(payload: JWTPayload): Promise<string> {
  const header = {
    alg: 'HS256',
    typ: 'JWT'
  }
  
  const now = Math.floor(Date.now() / 1000)
  const exp = now + (24 * 60 * 60) // 24 hours
  
  const payloadWithExp = {
    ...payload,
    iat: now,
    exp: exp
  }
  
  // Convert to base64url
  const headerBase64 = btoa(JSON.stringify(header))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '')
  
  const payloadBase64 = btoa(JSON.stringify(payloadWithExp))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '')
  
  const data = `${headerBase64}.${payloadBase64}`
  
  // Create signature using Web Crypto API
  const encoder = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(JWT_SECRET),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(data))
  const signatureArray = new Uint8Array(signature)
  const signatureBase64 = btoa(String.fromCharCode.apply(null, Array.from(signatureArray)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '')
  
  return `${data}.${signatureBase64}`
} 