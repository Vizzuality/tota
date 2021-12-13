import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  className?: string;
  children: ReactNode;
  errorMessage?: string;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
  };

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  render() {
    const { className, errorMessage = 'An unexpected error has occurred' } = this.props;

    if (this.state.hasError) {
      return <div className={className}>{errorMessage}</div>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
