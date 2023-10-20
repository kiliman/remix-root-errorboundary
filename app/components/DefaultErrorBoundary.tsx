import {
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  MagnifyingGlassIcon,
  MinusCircleIcon,
  ShieldExclamationIcon,
} from '@heroicons/react/24/outline'

import {
  Link,
  isRouteErrorResponse,
  useRouteError,
  type ErrorResponse,
} from '@remix-run/react'

export default function ErrorBoundary() {
  const error = useRouteError()

  if (isRouteErrorResponse(error)) {
    return <CatchBoundary caught={error} />
  }

  const { message, stack } = error as Error
  console.log(stack)

  return <AppError message={message} stack={stack} />
}

function AppError({ message, stack }: { message?: string; stack?: string }) {
  return (
    <>
      <div className="m-2 rounded bg-red-100 p-4">
        <h1 className="font-bolder mb-1 inline-flex items-center gap-4 text-2xl  text-red-900">
          <ExclamationCircleIcon className="h-8 w-8" />
          {message || 'App Error'}
        </h1>
        <p className="mb-1 text-lg">
          An error has occurred processing your request. You may try again or
          contact support if the problem persists.
        </p>
      </div>
      {stack && (
        <div className="my-4 w-[95%] bg-white p-4 text-black">
          <pre className="max-w-full overflow-auto ">{stack}</pre>
        </div>
      )}
    </>
  )
}

function CatchBoundary({ caught }: { caught: ErrorResponse }) {
  let message = caught.data
  let data: any = {}
  if (/^[{[]/.test(caught.data)) {
    try {
      data = JSON.parse(caught.data)
      message = data.message
    } catch (error) {
      console.error(error)
    }
  }
  // } catch (error) {
  //   console.error(error);
  // }
  switch (caught.status) {
    case 400:
      return <BadRequest message={message} data={data} />
    case 401:
      return <Unauthorized message={message} data={data} />
    case 403:
      return <Forbidden message={message} data={data} />
    case 404:
      return <NotFound message={message} data={data} />
    case 405:
      return <Invalid message={message} data={data} />
    default:
      throw new Error(
        `Unexpected caught response with status: ${caught.status} ${caught.data}}`,
      )
  }
}

function Unauthorized({ message, data }: { message?: string; data?: any }) {
  return (
    <div className="m-2 rounded bg-purple-100 p-4">
      <h1 className="font-bolder mb-1 inline-flex items-center gap-2 text-2xl text-purple-900">
        <MinusCircleIcon className="h-8 w-8" />
        {message || 'Unauthorized'}
      </h1>
      <p className="mb-1 text-lg">
        You must be logged into access this page. Click{' '}
        <Link to="/login">here</Link> to login.
      </p>
    </div>
  )
}

function BadRequest({ message, data }: { message?: string; data?: any }) {
  return (
    <div className="m-2 rounded bg-yellow-100 p-4">
      <h1 className="font-bolder mb-1 inline-flex items-center gap-2 text-2xl  text-red-900">
        <ExclamationTriangleIcon className="h-8 w-8" />
        {message || 'Bad Request'}
      </h1>
      <p className="mb-1 text-lg">
        You made an invalid request. The following errors have occurred.
      </p>
      {data?.errors && (
        <ul>
          {Object.entries(data.errors).map(([key, value]) => (
            <li key={key}>
              <span className="font-mono font-bold">{key}:</span>{' '}
              {value as string}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function Invalid({ message, data }: { message?: string; data?: any }) {
  return (
    <div className="m-2 rounded bg-yellow-100 p-4">
      <h1 className="font-bolder mb-1 inline-flex items-center gap-2 text-2xl  text-red-900">
        <ExclamationTriangleIcon className="h-8 w-8" />
        {message || 'Invalid'}
      </h1>
      <p className="mb-1 text-lg">You made an invalid request.</p>
    </div>
  )
}

function Forbidden({ message, data }: { message?: string; data?: any }) {
  return (
    <div className="m-2 rounded bg-orange-100 p-4">
      <h1 className="font-bolder mb-1 inline-flex items-center gap-2 text-2xl  text-orange-900">
        <ShieldExclamationIcon className="h-8 w-8" />
        {message || 'Not Authorized'}
      </h1>
      <p className="mb-1 text-lg">
        You are not authorized to access this page.
      </p>
    </div>
  )
}

function NotFound({ message, data }: { message?: string; data?: any }) {
  return (
    <div className="m-2 rounded bg-blue-100 p-4">
      <h1 className="font-bolder mb-1 inline-flex items-center gap-2 text-2xl  text-blue-900">
        <MagnifyingGlassIcon className="h-8 w-8" />
        {message || 'Not Found'}
      </h1>
      <p className="mb-1 text-lg">
        The page you were looking for could not be found.
      </p>
    </div>
  )
}

export function ShowAllErrors() {
  return (
    <div className="flex flex-col gap-4">
      <AppError />
      <NotFound />
      <BadRequest />
      <Unauthorized />
      <Forbidden />
      <Invalid />
    </div>
  )
}
