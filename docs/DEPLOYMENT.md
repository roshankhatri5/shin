# Deployment Guide

This guide covers deployment options and configurations for the Elegant Nails application.

## 📋 Table of Contents

- [Environment Setup](#environment-setup)
- [Vercel Deployment](#vercel-deployment)
- [Docker Deployment](#docker-deployment)
- [Performance Optimization](#performance-optimization)
- [Security Considerations](#security-considerations)
- [Monitoring & Analytics](#monitoring--analytics)

## Environment Setup

### Production Environment Variables

Create a `.env.production` file with the following variables:

```env
# Next.js
NEXT_PUBLIC_APP_URL=https://your-domain.com
NODE_ENV=production

# AI Chatbot
GLM_API_KEY=your_production_api_key
GLM_BASE_URL=https://llm.chutes.ai/v1/chat/completions
GLM_MODEL=zai-org/GLM-4.5-Air

# Analytics (Optional)
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=your_analytics_id

# Database (Future)
DATABASE_URL=postgresql://user:password@host:port/database
DIRECT_URL=postgresql://user:password@host:port/database

# Email Service (Future)
RESEND_API_KEY=your_resend_key

# Payment Processing (Future)
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Image Storage (Optional)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Environment Validation

The application validates required environment variables on startup:

```typescript
// lib/env.ts
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  GLM_API_KEY: z.string().min(1, 'GLM API key is required'),
  GLM_BASE_URL: z.string().url('GLM base URL must be valid'),
  GLM_MODEL: z.string().min(1, 'GLM model is required'),
  NEXT_PUBLIC_APP_URL: z.string().url().optional(),
})

export const env = envSchema.parse(process.env)
```

## Vercel Deployment

### Automatic Deployment

1. **Connect Repository:**
   ```bash
   # Push to your Git repository
   git push origin main
   
   # Import to Vercel
   # Visit: https://vercel.com/new
   ```

2. **Configure Environment Variables:**
   ```bash
   # In Vercel Dashboard:
   # Settings > Environment Variables
   
   GLM_API_KEY=your_api_key
   GLM_BASE_URL=https://llm.chutes.ai/v1/chat/completions
   GLM_MODEL=zai-org/GLM-4.5-Air
   ```

3. **Custom Domain Setup:**
   ```bash
   # In Vercel Dashboard:
   # Settings > Domains
   # Add: your-domain.com
   ```

### Vercel Configuration

Create `vercel.json` for advanced configuration:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["iad1"],
  "functions": {
    "app/api/**/*.ts": {
      "maxDuration": 30
    }
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "Referrer-Policy",
          "value": "origin-when-cross-origin"
        }
      ]
    },
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "Access-Control-Allow-Origin",
          "value": "https://your-domain.com"
        }
      ]
    }
  ],
  "redirects": [
    {
      "source": "/old-path",
      "destination": "/new-path",
      "permanent": true
    }
  ]
}
```

### Build Optimization

```javascript
// next.config.js
const nextConfig = {
  // Experimental features
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion']
  },
  
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      }
    ],
  },
  
  // Bundle analyzer
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        path: false,
      }
    }
    return config
  },
  
  // Production optimizations
  swcMinify: true,
  compress: true,
  
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains'
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;"
          }
        ]
      }
    ]
  }
}

module.exports = nextConfig
```

## Docker Deployment

### Dockerfile

```dockerfile
# Multi-stage build for optimized production image
FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy dependency files
COPY package.json package-lock.json ./
RUN npm ci --only=production

# Rebuild the source code only when needed
FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build application
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# Production image
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built application
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

### Docker Compose

```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - GLM_API_KEY=${GLM_API_KEY}
      - GLM_BASE_URL=${GLM_BASE_URL}
      - GLM_MODEL=${GLM_MODEL}
    depends_on:
      - redis
    restart: unless-stopped

  redis:
    image: redis:alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    restart: unless-stopped

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - app
    restart: unless-stopped

volumes:
  redis_data:
```

### Deployment Commands

```bash
# Build and run with Docker
docker build -t elegant-nails .
docker run -p 3000:3000 --env-file .env.production elegant-nails

# Or with Docker Compose
docker-compose up -d

# Scale application
docker-compose up -d --scale app=3
```

## Performance Optimization

### Next.js Configuration

```javascript
// next.config.js performance settings
const nextConfig = {
  // Bundle analysis
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Optimize bundle size
    if (!dev && !isServer) {
      config.optimization.splitChunks.cacheGroups = {
        default: false,
        vendors: false,
        vendor: {
          name: 'vendor',
          chunks: 'all',
          test: /node_modules/,
        },
        common: {
          name: 'common',
          minChunks: 2,
          chunks: 'all',
          enforce: true,
        },
      }
    }
    return config
  },
  
  // Enable experimental features
  experimental: {
    serverComponentsExternalPackages: ['sharp'],
    optimizePackageImports: [
      'lucide-react',
      'framer-motion',
      'date-fns'
    ]
  },
  
  // Output optimization
  output: 'standalone',
  poweredByHeader: false,
  generateEtags: false,
}
```

### Performance Monitoring

```typescript
// lib/analytics.ts
export function trackWebVitals({ id, name, label, value }) {
  // Send to analytics service
  if (process.env.NEXT_PUBLIC_VERCEL_ANALYTICS_ID) {
    window.gtag?.('event', name, {
      event_category: label === 'web-vital' ? 'Web Vitals' : 'Next.js Metric',
      value: Math.round(name === 'CLS' ? value * 1000 : value),
      event_label: id,
      non_interaction: true,
    })
  }
}

// app/layout.tsx
import { reportWebVitals } from '@/lib/analytics'

export function reportWebVitals(metric) {
  trackWebVitals(metric)
}
```

### CDN Configuration

```javascript
// next.config.js
const nextConfig = {
  assetPrefix: process.env.NODE_ENV === 'production' 
    ? 'https://cdn.yourdomain.com' 
    : '',
  
  images: {
    loader: 'custom',
    loaderFile: './lib/image-loader.js',
  },
}

// lib/image-loader.js
export default function cloudflareLoader({ src, width, quality }) {
  const params = [`width=${width}`, `quality=${quality || 75}`, 'format=auto']
  return `https://your-domain.com/cdn-cgi/image/${params.join(',')}/${src}`
}
```

## Security Considerations

### Content Security Policy

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
          }
        ]
      }
    ]
  }
}
```

### API Security

```typescript
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // API security headers
  if (request.nextUrl.pathname.startsWith('/api/')) {
    const response = NextResponse.next()
    
    // Rate limiting headers
    response.headers.set('X-RateLimit-Limit', '100')
    response.headers.set('X-RateLimit-Remaining', '99')
    
    // Security headers
    response.headers.set('X-API-Version', '1.0')
    
    return response
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/api/:path*']
}
```

### Environment Security

```bash
# Production environment security checklist

# 1. Secure API keys
export GLM_API_KEY="$(vault kv get -field=api_key secret/glm)"

# 2. Use secrets management
kubectl create secret generic app-secrets \
  --from-literal=glm-api-key="$GLM_API_KEY" \
  --from-literal=database-url="$DATABASE_URL"

# 3. Enable audit logging
export ENABLE_AUDIT_LOGS=true

# 4. Configure HTTPS only
export FORCE_HTTPS=true
```

## Monitoring & Analytics

### Health Checks

```typescript
// app/api/health/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  const health = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '1.0.0',
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
    checks: {
      database: await checkDatabase(),
      glm_api: await checkGLMAPI(),
      memory: process.memoryUsage(),
    }
  }

  const isHealthy = Object.values(health.checks).every(
    check => typeof check === 'object' ? check.status === 'ok' : true
  )

  return NextResponse.json(health, { 
    status: isHealthy ? 200 : 503 
  })
}

async function checkDatabase() {
  try {
    // Database connection check
    return { status: 'ok', latency: '< 10ms' }
  } catch (error) {
    return { status: 'error', message: error.message }
  }
}

async function checkGLMAPI() {
  try {
    // GLM API connectivity check
    return { status: 'ok', latency: '< 100ms' }
  } catch (error) {
    return { status: 'error', message: error.message }
  }
}
```

### Error Tracking

```typescript
// lib/error-tracking.ts
export function trackError(error: Error, context?: Record<string, any>) {
  console.error('Application Error:', {
    message: error.message,
    stack: error.stack,
    context,
    timestamp: new Date().toISOString(),
    url: typeof window !== 'undefined' ? window.location.href : 'server',
  })

  // Send to error tracking service
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'exception', {
      description: error.message,
      fatal: false,
    })
  }
}

// app/error.tsx
'use client'

import { useEffect } from 'react'
import { trackError } from '@/lib/error-tracking'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    trackError(error, { digest: error.digest })
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
      <button
        onClick={reset}
        className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
      >
        Try again
      </button>
    </div>
  )
}
```

### Analytics Integration

```typescript
// lib/analytics.ts
declare global {
  interface Window {
    gtag: (...args: any[]) => void
  }
}

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID

export function pageview(url: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    })
  }
}

export function event(action: string, parameters: Record<string, any>) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, parameters)
  }
}

// Track custom events
export function trackBookingStarted(serviceId: string) {
  event('booking_started', {
    event_category: 'engagement',
    event_label: serviceId,
  })
}

export function trackChatMessage(messageType: 'user' | 'assistant') {
  event('chat_message', {
    event_category: 'engagement',
    event_label: messageType,
  })
}
```

## Backup & Recovery

### Database Backup

```bash
# Automated backup script
#!/bin/bash

# backup.sh
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups"
DB_NAME="elegant_nails"

# Create backup
pg_dump $DATABASE_URL > $BACKUP_DIR/db_backup_$DATE.sql

# Upload to cloud storage
aws s3 cp $BACKUP_DIR/db_backup_$DATE.sql s3://your-backup-bucket/

# Clean old backups (keep last 30 days)
find $BACKUP_DIR -name "db_backup_*.sql" -mtime +30 -delete

echo "Backup completed: db_backup_$DATE.sql"
```

### Recovery Procedures

```bash
# Database recovery
pg_restore --clean --no-acl --no-owner -d $DATABASE_URL backup_file.sql

# Application rollback
vercel rollback --yes

# Configuration restore
kubectl apply -f k8s/production/
```

## Troubleshooting

### Common Issues

1. **Build Failures:**
   ```bash
   # Clear Next.js cache
   rm -rf .next
   npm run build
   
   # Check dependencies
   npm audit
   npm update
   ```

2. **Performance Issues:**
   ```bash
   # Analyze bundle
   npm install -g @next/bundle-analyzer
   ANALYZE=true npm run build
   
   # Check memory usage
   node --inspect-brk=0.0.0.0:9229 .next/server.js
   ```

3. **API Connectivity:**
   ```bash
   # Test GLM API connection
   curl -X POST https://llm.chutes.ai/v1/chat/completions \
     -H "Authorization: Bearer $GLM_API_KEY" \
     -H "Content-Type: application/json" \
     -d '{"model": "zai-org/GLM-4.5-Air", "messages": [{"role": "user", "content": "test"}]}'
   ```

### Monitoring Commands

```bash
# Check application health
curl https://your-domain.com/api/health

# Monitor logs
vercel logs --app elegant-nails --follow

# Check performance
lighthouse https://your-domain.com --view
```