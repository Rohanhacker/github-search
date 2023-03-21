// `pages/_app.js`
import "../styles/globals.css"
import { AppProps } from "next/app"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ErrorBoundary } from "react-error-boundary"
import Link from "next/link"

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient()
  return (
    <ErrorBoundary
      FallbackComponent={() => (
        <div>
          error boundary
          <div className="text-blue">
            <Link href="/">back to home page</Link>
          </div>
        </div>
      )}
    >
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </ErrorBoundary>
  )
}
