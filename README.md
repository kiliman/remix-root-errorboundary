# Remix `<ErrorBoundary>` Example

This example shows how to setup a root `<ErrorBoundary>` that will automatically
display any errors or error responses that is not caught by a lower route level
`<ErrorBoundary>`

This example uses a `<DefaultErrorBoundary>` that will render a nice UI based on
the error type, such as a thrown `Error` or a `Response` like `404 Not Found`.

The *root* route has a separate `<Document>` and `<Layout>` component, along with
the default `<App>` and `<ErrorBoundary>` exports. This is so errors will be rendered
in the same layout as your application.

The `<Document>` component is responsible for the overall `<html>` structure. The
`<Layout>` component is the `<body>` of your page.

The `<App>` renders the `<Document>` along with the `<Outlet>`, whereas the
`<ErrorBoundary>` renders the `<Document>` and the `<DefaultErrorBoundary>`.

Because of this structure, the error will be rendered inside the layout and have
the same header and styling as the rest of the application.

>NOTE: For thrown application errors, if you are in `development`, it will render
the stacktrace. On production, the stacktrace will not be present.

View on [⚡️ StackBlitz](https://stackblitz.com/github/kiliman/remix-root-errorboundary)