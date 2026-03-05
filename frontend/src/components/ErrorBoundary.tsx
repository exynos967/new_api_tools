import { Component, ErrorInfo, ReactNode } from 'react'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  message: string
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = {
      hasError: false,
      message: '',
    }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      message: error.message || '未知运行时错误',
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('UI crashed:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
          <div className="w-full max-w-xl border border-destructive/30 bg-card rounded-xl p-6 space-y-3">
            <h1 className="text-lg font-semibold text-destructive">页面渲染失败</h1>
            <p className="text-sm text-muted-foreground">
              前端捕获到运行时异常，已阻止白屏。请刷新页面或联系管理员排查接口返回字段。
            </p>
            <pre className="text-xs bg-muted/60 rounded p-3 overflow-auto max-h-40">{this.state.message}</pre>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm hover:opacity-90 transition-opacity"
            >
              刷新页面
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
