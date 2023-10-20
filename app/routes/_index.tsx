import {
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  MagnifyingGlassIcon,
  MinusCircleIcon,
  ShieldExclamationIcon,
} from '@heroicons/react/24/outline'
import { json, type DataFunctionArgs, type MetaFunction } from '@remix-run/node'
import { Link } from '@remix-run/react'

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ]
}

export async function loader({ request }: DataFunctionArgs) {
  const url = new URL(request.url)
  if (url.searchParams.has('error')) {
    throw new Error('Oops')
  } else if (url.searchParams.has('status')) {
    const status = Number(url.searchParams.get('status'))
    throw new Response(null, { status })
  }
  return json({ id: 123 })
}

export default function Index() {
  return (
    <div>
      <h2 className="text-2xl font-semibold">{`<ErrorBoundary> examples`}</h2>

      <ul className="mt-4 flex flex-col gap-6">
        <li>
          <Link to="?error" className="flex gap-2 items-center">
            <ExclamationCircleIcon className="h-6 w-6" /> Throw Error
          </Link>
        </li>
        <li>
          <Link to="/not-found" className="flex gap-2 items-center">
            <MagnifyingGlassIcon className="h-6 w-6" />
            404 Not Found
          </Link>
        </li>
        <li>
          <Link to="?status=400" className="flex gap-2 items-center">
            <ExclamationTriangleIcon className="h-6 w-6" />
            400 Bad Request
          </Link>
        </li>
        <li>
          <Link to="?status=401" className="flex gap-2 items-center">
            <MinusCircleIcon className="h-6 w-6" /> 401 Unauthorized
          </Link>
        </li>
        <li>
          <Link to="?status=403" className="flex gap-2 items-center">
            <ShieldExclamationIcon className="h-6 w-6" /> 403 Forbidden
          </Link>
        </li>
        <li>
          <Link to="?status=405" className="flex gap-2 items-center">
            <ExclamationTriangleIcon className="h-6 w-6" /> 405 Invalid
          </Link>
        </li>
        <li>
          <Link to="show-all" className="flex gap-2 items-center">
            Show All Errors
          </Link>
        </li>
      </ul>
    </div>
  )
}
