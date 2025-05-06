
import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Algo deu errado</h2>
            <p className="text-gray-700 mb-4">
              Ocorreu um erro ao carregar a página. Por favor, tente novamente mais tarde.
            </p>
            <details className="bg-gray-100 p-4 rounded mb-4">
              <summary className="cursor-pointer font-medium">Detalhes do erro</summary>
              <p className="mt-2 text-sm font-mono break-all">
                {this.state.error?.toString()}
              </p>
            </details>
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-[#BF3B6C] text-white py-2 px-4 rounded hover:bg-[#BF3B6C]/90"
            >
              Recarregar página
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
