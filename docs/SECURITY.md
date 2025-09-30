# Security Guidelines

This document outlines security practices and considerations for the Elegant Nails application.

## 📋 Table of Contents

- [Security Overview](#security-overview)
- [Environment Security](#environment-security)
- [API Security](#api-security)
- [Client-Side Security](#client-side-security)
- [Data Protection](#data-protection)
- [Security Headers](#security-headers)
- [Vulnerability Reporting](#vulnerability-reporting)

## Security Overview

### Security Principles

1. **Defense in Depth**: Multiple layers of security controls
2. **Least Privilege**: Minimal access rights for users and processes
3. **Secure by Default**: Security built into the application from the start
4. **Privacy by Design**: Data protection considerations in all features

### Current Security Measures

- ✅ HTTPS enforcement in production
- ✅ Environment variable protection
- ✅ Input validation and sanitization
- ✅ XSS protection via React's built-in escaping
- ✅ CSRF protection via SameSite cookies
- ✅ Content Security Policy headers
- ✅ Secure headers (HSTS, X-Frame-Options, etc.)

## Environment Security

### API Key Management

**Never commit API keys to version control:**

```bash
# ❌ Bad - API key in code
const apiKey = "cpk_1234567890abcdef"

# ✅ Good - API key in environment variable
const apiKey = process.env.GLM_API_KEY
```

**Environment Variable Best Practices:**

```env
# .env.local (never commit this file)
GLM_API_KEY=your_actual_api_key_here
GLM_BASE_URL=https://llm.chutes.ai/v1/chat/completions
GLM_MODEL=zai-org/GLM-4.5-Air

# Database credentials (future)
DATABASE_URL=postgresql://user:password@host:port/database
DIRECT_URL=postgresql://user:password@host:port/database

# Payment keys (future)  
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

**Security Checklist:**
- [ ] `.env.local` in `.gitignore`
- [ ] Different keys for dev/staging/production
- [ ] Regular key rotation schedule
- [ ] Restricted API key permissions
- [ ] Monitoring for key usage anomalies

### Secrets Management

**Production Environment:**

```typescript
// lib/env.ts - Environment validation
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  GLM_API_KEY: z.string().min(1, 'GLM API key is required'),
  GLM_BASE_URL: z.string().url('GLM base URL must be valid'),
  GLM_MODEL: z.string().min(1, 'GLM model is required'),
})

export const env = envSchema.parse(process.env)
```

**Recommended Tools:**
- **Vercel**: Built-in secrets management
- **AWS Secrets Manager**: For AWS deployments
- **HashiCorp Vault**: For enterprise deployments
- **Docker Secrets**: For containerized deployments

## API Security

### Input Validation

**All API endpoints validate input:**

```typescript
// app/api/chat/route.ts
import { z } from 'zod'

const chatSchema = z.object({
  messages: z.array(z.object({
    role: z.enum(['user', 'assistant', 'system']),
    content: z.string().min(1).max(1000)
  })).min(1).max(10),
  systemPrompt: z.string().max(500).optional()
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = chatSchema.parse(body)
    // Process validated data
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      )
    }
    // Handle other errors
  }
}
```

### Rate Limiting

**Implement rate limiting for production:**

```typescript
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/api/chat')) {
    const ip = request.ip ?? '127.0.0.1'
    const limit = 30 // 30 requests per minute
    const windowMs = 60 * 1000 // 1 minute

    const now = Date.now()
    const record = rateLimitMap.get(ip)

    if (!record || now > record.resetTime) {
      rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs })
      return NextResponse.next()
    }

    if (record.count >= limit) {
      return NextResponse.json(
        { error: 'Rate limit exceeded' },
        { status: 429 }
      )
    }

    record.count++
    return NextResponse.next()
  }

  return NextResponse.next()
}
```

### Authentication (Future)

**When implementing user authentication:**

```typescript
// lib/auth.ts (future implementation)
import { verify } from 'jsonwebtoken'

export async function authenticateRequest(request: NextRequest) {
  const token = request.headers.get('authorization')?.replace('Bearer ', '')
  
  if (!token) {
    throw new Error('No authentication token provided')
  }

  try {
    const payload = verify(token, process.env.JWT_SECRET!)
    return payload as { userId: string; email: string }
  } catch (error) {
    throw new Error('Invalid authentication token')
  }
}
```

## Client-Side Security

### XSS Prevention

**React provides built-in XSS protection:**

```tsx
// ✅ Safe - React escapes by default
<div>{userContent}</div>

// ❌ Dangerous - bypasses React's protection
<div dangerouslySetInnerHTML={{ __html: userContent }} />

// ✅ Safe alternative for HTML content
import DOMPurify from 'dompurify'
<div dangerouslySetInnerHTML={{ 
  __html: DOMPurify.sanitize(userContent) 
}} />
```

### Input Sanitization

**Sanitize user inputs:**

```typescript
// lib/sanitize.ts
export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove HTML brackets
    .substring(0, 1000)   // Limit length
}

// Usage in forms
const handleSubmit = (data: FormData) => {
  const sanitizedData = {
    name: sanitizeInput(data.name),
    email: sanitizeInput(data.email),
    message: sanitizeInput(data.message)
  }
  // Process sanitized data
}
```

### Content Security Policy

**Configure CSP headers:**

```javascript
// next.config.js
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' *.vercel-scripts.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob: https:",
              "font-src 'self' data:",
              "connect-src 'self' *.vercel.com https://llm.chutes.ai",
              "frame-ancestors 'none'",
            ].join('; ')
          }
        ]
      }
    ]
  }
}
```

## Data Protection

### Personal Information Handling

**Customer data protection principles:**

1. **Data Minimization**: Collect only necessary information
2. **Purpose Limitation**: Use data only for stated purposes
3. **Storage Limitation**: Retain data only as long as necessary
4. **Security**: Protect data with appropriate safeguards

**Implementation example:**

```typescript
// types/customer.ts
interface CustomerData {
  // Required for booking
  name: string
  email: string
  phone: string
  
  // Optional preferences
  preferredTechnician?: string
  servicePreferences?: string[]
  
  // Internal use only
  createdAt: Date
  lastVisit?: Date
}

// lib/data-protection.ts
export function hashSensitiveData(data: string): string {
  // Hash sensitive data before storage
  return crypto.createHash('sha256').update(data).digest('hex')
}

export function anonymizeCustomerData(customer: CustomerData) {
  return {
    ...customer,
    name: 'Anonymous Customer',
    email: hashSensitiveData(customer.email),
    phone: hashSensitiveData(customer.phone)
  }
}
```

### Database Security (Future)

**When implementing database:**

```sql
-- Create separate user for application
CREATE USER app_user WITH PASSWORD 'secure_random_password';

-- Grant minimal required permissions
GRANT SELECT, INSERT, UPDATE ON bookings TO app_user;
GRANT SELECT ON services TO app_user;

-- Enable row-level security
ALTER TABLE customer_data ENABLE ROW LEVEL SECURITY;

-- Create policy for data access
CREATE POLICY customer_data_policy ON customer_data
  FOR ALL TO app_user
  USING (customer_id = current_user_id());
```

## Security Headers

### HTTP Security Headers

**Implemented in production:**

```typescript
// next.config.js
const securityHeaders = [
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains; preload'
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()'
  }
]
```

### API Response Headers

```typescript
// app/api/chat/route.ts
export async function POST(request: NextRequest) {
  // Process request
  const response = NextResponse.json(data)
  
  // Add security headers
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('Cache-Control', 'no-store')
  
  return response
}
```

## Monitoring and Logging

### Security Event Logging

```typescript
// lib/security-logger.ts
interface SecurityEvent {
  type: 'auth_failure' | 'rate_limit' | 'invalid_input' | 'api_error'
  ip: string
  userAgent: string
  endpoint: string
  timestamp: Date
  details?: any
}

export function logSecurityEvent(event: SecurityEvent) {
  console.log('SECURITY_EVENT:', JSON.stringify(event))
  
  // In production, send to monitoring service
  if (process.env.NODE_ENV === 'production') {
    // Send to monitoring service (e.g., DataDog, New Relic)
  }
}

// Usage in API routes
export async function POST(request: NextRequest) {
  try {
    // Process request
  } catch (error) {
    logSecurityEvent({
      type: 'api_error',
      ip: request.ip ?? 'unknown',
      userAgent: request.headers.get('user-agent') ?? 'unknown',
      endpoint: request.nextUrl.pathname,
      timestamp: new Date(),
      details: error.message
    })
    
    throw error
  }
}
```

### Health Monitoring

```typescript
// app/api/health/route.ts
export async function GET() {
  const health = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version,
    security: {
      httpsEnforced: process.env.NODE_ENV === 'production',
      securityHeadersEnabled: true,
      apiKeysConfigured: !!process.env.GLM_API_KEY,
      environmentValidated: true
    }
  }

  return NextResponse.json(health)
}
```

## Vulnerability Reporting

### Responsible Disclosure

**If you discover a security vulnerability:**

1. **DO NOT** create a public GitHub issue
2. **DO** email security@elegantnails.com with:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact assessment
   - Suggested remediation (if any)

3. **Response Timeline:**
   - Acknowledgment: Within 24 hours
   - Initial assessment: Within 3 days
   - Regular updates: Every 5 days
   - Resolution: Depends on severity

### Security Bug Bounty

**We appreciate security research and offer:**
- Public recognition (with permission)
- Hall of fame listing
- Potential monetary rewards for critical findings

### Vulnerability Categories

**High Priority:**
- Remote code execution
- SQL injection
- Cross-site scripting (XSS)
- Authentication bypass
- Sensitive data exposure

**Medium Priority:**
- Cross-site request forgery (CSRF)
- Information disclosure
- Denial of service
- Session management issues

**Low Priority:**
- Missing security headers
- Verbose error messages
- Minor information leakage

## Security Checklist

### Development

- [ ] Environment variables properly configured
- [ ] Input validation on all endpoints
- [ ] Error handling doesn't expose sensitive data
- [ ] Dependencies regularly updated
- [ ] Security linting enabled

### Production

- [ ] HTTPS enforced
- [ ] Security headers configured
- [ ] Rate limiting implemented
- [ ] Monitoring and logging enabled
- [ ] Regular security audits scheduled

### Ongoing

- [ ] Dependency security scanning
- [ ] Regular penetration testing
- [ ] Security training for development team
- [ ] Incident response plan documented
- [ ] Backup and recovery procedures tested

## Security Resources

### Tools

- **npm audit**: Check for known vulnerabilities
- **ESLint Security Plugin**: Static security analysis
- **OWASP ZAP**: Web application security scanner
- **Snyk**: Vulnerability monitoring

### References

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Next.js Security Guidelines](https://nextjs.org/docs/advanced-features/security-headers)
- [React Security Best Practices](https://react.dev/learn/keeping-components-pure)
- [Node.js Security Checklist](https://nodejs.org/en/docs/guides/security/)

---

**Security is everyone's responsibility. If you have questions about security practices or need clarification on any of these guidelines, please reach out to the development team.**