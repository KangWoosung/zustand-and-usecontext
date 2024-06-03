/*  2024-06-03 05:24:53

ErrorBoundary component is the only one component that must be build as a class component in React^18. 

  state = { hasError: false };
*/
"use client";
import React from "react";

type ErrorBoundaryProps = {
  fallback: React.ReactNode;
  children: React.ReactNode;
};

export class ErrorBoundary extends React.Component<ErrorBoundaryProps> {
  state = { hasError: false };

  static getDerivedStateFromError(error: Error) {
    console.error(error);
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }

  // 에러를 캐치하고 에러가 발생할 때마다 추가 작업을 지정할 수 있다.
  // Error log etc.. Sentry f.e.
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error(error, errorInfo);
  }
}
