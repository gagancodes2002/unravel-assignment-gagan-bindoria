'use client';

import React from "react";

class ErrorBoundary extends React.Component<
    { children: React.ReactNode },
    { hasError: boolean }
> {
    constructor(props: any) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(_: Error) {
        return { hasError: true }
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('ErrorBoundary caught an error : ', error, errorInfo)
    }

    render() {
        if (this.state.hasError) {
            return (
                <div
                    className="p-4 text-red-700 bg-red-100 border rounded"
                >
                    Something went wrong. Please refresh the page
                </div>
            );
        }

        return this.props.children
    }
};

export default ErrorBoundary;