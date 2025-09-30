// Shared component prop types and interfaces

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'shimmer' | 'glass' | 'gradient'
export type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info'
export type CardVariant = 'default' | 'elevated' | 'bordered' | 'glass' | 'glass-strong' | 'luxury' | 'shimmer'
export type ToastVariant = 'success' | 'error' | 'warning' | 'info'

export interface BaseComponentProps {
  className?: string
  children?: React.ReactNode
}

export interface ButtonProps extends BaseComponentProps {
  variant?: ButtonVariant
  size?: Size
  disabled?: boolean
  loading?: boolean
  fullWidth?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  type?: 'button' | 'submit' | 'reset'
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string
  error?: string
  helperText?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  size?: Exclude<Size, 'xs' | 'xl'>
}

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  helperText?: string
  autoResize?: boolean
  maxLength?: number
  showCount?: boolean
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string
  error?: string
  helperText?: string
  size?: Exclude<Size, 'xs' | 'xl'>
  options: Array<{ value: string; label: string }>
}

export interface CardProps extends BaseComponentProps {
  variant?: CardVariant
  padding?: Size | 'none'
  hover?: boolean
}

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  description?: string
  children: React.ReactNode
  size?: Exclude<Size, 'xs'>
  closeOnBackdrop?: boolean
  closeOnEsc?: boolean
  className?: string
}

export interface BadgeProps extends BaseComponentProps {
  variant?: BadgeVariant
  size?: Exclude<Size, 'xl'>
  dot?: boolean
}

export interface AvatarProps {
  src?: string
  alt?: string
  fallback?: string
  size?: Size
  status?: 'online' | 'offline' | 'away' | 'busy'
  className?: string
}

export interface SkeletonProps {
  className?: string
  variant?: 'text' | 'circle' | 'rectangle'
  width?: string | number
  height?: string | number
  lines?: number
}

export interface SpinnerProps {
  size?: Exclude<Size, 'xs' | 'xl'>
  className?: string
  color?: string
}

export interface AccordionProps {
  items: AccordionItem[]
  type?: 'single' | 'multiple'
  defaultValue?: string | string[]
  className?: string
}

export interface AccordionItem {
  id: string
  trigger: React.ReactNode
  content: React.ReactNode
}

export interface ToastProps {
  id: string
  variant?: ToastVariant
  title: string
  description?: string
  duration?: number
  onClose?: () => void
}

export interface TabsProps {
  tabs: TabItem[]
  defaultValue?: string
  value?: string
  onChange?: (value: string) => void
  orientation?: 'horizontal' | 'vertical'
  className?: string
}

export interface TabItem {
  value: string
  label: string
  content: React.ReactNode
  disabled?: boolean
}

export interface TooltipProps {
  children: React.ReactNode
  content: React.ReactNode
  position?: 'top' | 'bottom' | 'left' | 'right'
  delay?: number
  className?: string
}

export interface RatingProps {
  value: number
  onChange?: (value: number) => void
  max?: number
  size?: Exclude<Size, 'xs' | 'xl'>
  readonly?: boolean
  allowHalf?: boolean
  className?: string
}

export interface FormFieldProps {
  label?: string
  error?: string
  helperText?: string
  required?: boolean
  children: React.ReactNode
  htmlFor?: string
  className?: string
}