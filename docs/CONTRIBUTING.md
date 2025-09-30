# Contributing Guide

Thank you for your interest in contributing to the Elegant Nails project! This guide will help you get started.

## 📋 Table of Contents

- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Code Standards](#code-standards)
- [Component Guidelines](#component-guidelines)
- [Pull Request Process](#pull-request-process)
- [Issue Guidelines](#issue-guidelines)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm
- Git
- Code editor (VS Code recommended)

### Development Setup

1. **Fork and clone the repository:**
   ```bash
   git clone https://github.com/your-username/elegant-nails.git
   cd elegant-nails
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   # Add your GLM API key and other required variables
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

## Code Standards

### TypeScript

- Use strict TypeScript configuration
- Define interfaces for all props and data structures
- Use proper type annotations
- Avoid `any` type

```typescript
// ✅ Good
interface ButtonProps {
  variant: 'primary' | 'secondary'
  children: React.ReactNode
  onClick?: () => void
}

// ❌ Bad
function Button(props: any) {
  // implementation
}
```

### React Components

- Use functional components with hooks
- Implement proper prop validation
- Include JSDoc comments for complex components
- Use proper naming conventions

```tsx
/**
 * Enhanced button component with multiple variants and animations
 * 
 * @param variant - Button style variant
 * @param children - Button content
 * @param onClick - Click handler function
 */
export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  children, 
  onClick 
}) => {
  // Implementation
}
```

### CSS and Styling

- Use Tailwind CSS utility classes
- Follow design system tokens
- Implement responsive design
- Use semantic color names

```tsx
// ✅ Good
<button className="bg-gold-500 hover:bg-gold-600 text-white px-6 py-3 rounded-full transition-colors duration-300">
  Book Now
</button>

// ❌ Bad
<button style={{ backgroundColor: '#f59e0b', padding: '12px 24px' }}>
  Book Now
</button>
```

## Component Guidelines

### File Structure

```
components/
├── ui/                 # Base UI components
│   ├── button.tsx
│   ├── card.tsx
│   └── index.ts       # Barrel exports
├── features/          # Feature-specific components
│   ├── booking/
│   ├── services/
│   └── portfolio/
└── layouts/           # Layout components
    ├── header.tsx
    └── footer.tsx
```

### Component Template

```tsx
'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface ComponentProps {
  // Define props here
  className?: string
  children?: React.ReactNode
}

/**
 * Component description
 */
export const Component: React.FC<ComponentProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        'base-styles',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

Component.displayName = 'Component'
```

### Accessibility Requirements

- Include proper ARIA labels
- Ensure keyboard navigation
- Maintain color contrast ratios
- Support screen readers

```tsx
<button
  aria-label="Close modal"
  className="..."
  onClick={onClose}
>
  <X className="w-4 h-4" />
</button>
```

## Pull Request Process

### Before Submitting

1. **Run tests and linting:**
   ```bash
   npm run lint
   npm run type-check
   npm run build
   ```

2. **Test your changes:**
   - Test on multiple screen sizes
   - Verify accessibility
   - Check performance impact

### PR Guidelines

1. **Create a descriptive title:**
   ```
   feat: add enhanced input component with validation
   fix: resolve mobile navigation accessibility issue
   docs: update component library documentation
   ```

2. **Fill out the PR template:**
   ```markdown
   ## Description
   Brief description of changes

   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Documentation update
   - [ ] Performance improvement

   ## Testing
   - [ ] Tested on desktop
   - [ ] Tested on mobile
   - [ ] Accessibility verified

   ## Screenshots
   (If applicable)
   ```

3. **Keep PRs focused:**
   - One feature or fix per PR
   - Include related tests and documentation
   - Keep changes under 500 lines when possible

### Review Process

1. Automated checks must pass
2. Code review from maintainers
3. Manual testing verification
4. Documentation updates included

## Issue Guidelines

### Bug Reports

Use the bug report template:

```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
- Browser: [e.g. Chrome 91]
- Device: [e.g. iPhone 12]
- OS: [e.g. iOS 14.6]
```

### Feature Requests

```markdown
**Feature Description**
Clear description of the feature you'd like to see.

**Use Case**
Explain why this feature would be valuable.

**Proposed Solution**
If you have ideas on implementation.

**Alternatives Considered**
Other solutions you've thought about.
```

## Development Workflow

### Git Workflow

1. **Create feature branch:**
   ```bash
   git checkout -b feature/component-name
   ```

2. **Make commits with conventional format:**
   ```bash
   git commit -m "feat: add new component"
   git commit -m "fix: resolve styling issue"
   git commit -m "docs: update README"
   ```

3. **Push and create PR:**
   ```bash
   git push origin feature/component-name
   ```

### Commit Message Format

```
type(scope): subject

body

footer
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting changes
- `refactor`: Code restructuring
- `test`: Adding tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(ui): add enhanced input component with validation

- Add floating label animation
- Include error state styling
- Support for various input types
- Implement accessibility features

Closes #123
```

## Code Review Guidelines

### For Authors

- Write clear, self-documenting code
- Include comprehensive commit messages
- Test thoroughly before submitting
- Respond promptly to feedback

### For Reviewers

- Be constructive and specific
- Focus on code quality and standards
- Verify functionality and performance
- Check accessibility compliance

## Testing Guidelines

### Component Testing

```tsx
// Button.test.tsx
import { render, fireEvent, screen } from '@testing-library/react'
import { Button } from './button'

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('handles click events', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('applies correct variant styles', () => {
    render(<Button variant="secondary">Click me</Button>)
    expect(screen.getByRole('button')).toHaveClass('bg-blush')
  })
})
```

### Manual Testing Checklist

- [ ] Component renders correctly
- [ ] All variants/states work
- [ ] Responsive design functions
- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] Performance is acceptable

## Documentation Standards

### Component Documentation

Every component should include:

1. **JSDoc comments:**
   ```tsx
   /**
    * Enhanced input field with validation and animations
    * 
    * @param label - Input label text
    * @param error - Error message to display
    * @param variant - Visual style variant
    * @example
    * <EnhancedInput 
    *   label="Email" 
    *   variant="luxury"
    *   error="Required field" 
    * />
    */
   ```

2. **README section in component library docs**
3. **Usage examples**
4. **Props interface documentation**

### API Documentation

Document all API endpoints:

```typescript
/**
 * Chat API endpoint for AI-powered customer service
 * 
 * @route POST /api/chat
 * @param messages - Array of conversation messages
 * @param systemPrompt - Optional system prompt override
 * @returns AI-generated response message
 * @throws {400} When messages array is invalid
 * @throws {500} When GLM API is unavailable
 */
```

## Release Process

### Version Numbering

Follow semantic versioning (semver):
- `MAJOR.MINOR.PATCH`
- Major: Breaking changes
- Minor: New features
- Patch: Bug fixes

### Release Checklist

1. Update version in package.json
2. Update CHANGELOG.md
3. Create release notes
4. Tag release in Git
5. Deploy to production
6. Announce release

## Getting Help

### Resources

- [Component Library Documentation](./COMPONENT_LIBRARY.md)
- [API Documentation](./API_DOCUMENTATION.md)
- [Deployment Guide](./DEPLOYMENT.md)

### Communication

- Create issues for bugs and features
- Join discussions in PR comments
- Ask questions in issue discussions

### Development Tips

1. **Use TypeScript strictly** - it catches errors early
2. **Follow the design system** - maintains consistency
3. **Test on multiple devices** - ensures compatibility
4. **Document as you go** - helps future contributors
5. **Keep accessibility in mind** - makes the app inclusive

Thank you for contributing to Elegant Nails! 🎨💅✨