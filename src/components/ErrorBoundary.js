import React, { Component } from 'react';
import { Link } from "gatsby";

const ErrorScreen = () => {
  return (
    <div>Something went wrong <Link to="/">Home</Link></div>
  )
}

export class ErrorBoundary extends Component {
  state = {
    error: null,
    info: null,
  };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    const { onError } = this.props;

    if (typeof onError === 'function') {
      try {
        onError.call(this, error, info ? info.componentStack : '');
      } catch {} // eslint-disable-line
    }

    this.setState({ error, info });
    console.error({ error });
  }

  render() {
    const { error } = this.state;
    const {
      fallbackComponent: FallbackComponent = null,
      children,
    } = this.props;

    if (error) {
      if (this.props.fallbackComponent) {
        // $FlowFixMe
        return <FallbackComponent />;
      }

      return <ErrorScreen />;
    }

    return children;

  }
}
