import type { LinksFunction } from '@remix-run/node'
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from '@remix-run/react'
import DefaultErrorBoundary from '~/components/DefaultErrorBoundary'
import tailwindCss from '~/styles/tailwind.css'

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: tailwindCss },
]

function Document({
  children,
  title,
}: {
  children?: React.ReactNode
  title?: string
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {title ? <title>{title}</title> : null}
        <Meta />
        <Links />
      </head>
      <body>
        <Layout>{children}</Layout>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}

function Layout({ children }: { children?: React.ReactNode }) {
  return (
    <div>
      <div className="flex bg-[#212121] items-center">
        <Link to="/">
          <img src="/images/remix-logo.png" className="h-24" alt="Remix Logo" />
        </Link>
        <h1 className="text-gray-50 text-3xl font-semibold">
          Remix Sample App
        </h1>
      </div>
      <div className="p-8">{children}</div>
    </div>
  )
}

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  )
}

export function ErrorBoundary() {
  const error = useRouteError()
  let title: string
  if (isRouteErrorResponse(error)) {
    title = `Error ${error.status} - ${error.statusText}`
  } else {
    const { message } = error as Error
    title = `Application Error - ${message}`
  }

  return (
    <Document title={title}>
      <DefaultErrorBoundary />
    </Document>
  )
}
