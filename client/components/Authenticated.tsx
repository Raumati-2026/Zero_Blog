import { useAuth0 } from '@auth0/auth0-react'

const useIsAuthenticated = () => {
  const auth = useAuth0()
  const isAuthenticated = auth.isAuthenticated
  return isAuthenticated
}
interface Props {
  children: React.ReactNode
}
export function IfAuthenticated(props: Props) {
  const { children } = props
  return useIsAuthenticated() ? <>{children}</> : null
}

export function IfNotAuthenticated(props: Props) {
  const { children } = props
  return !useIsAuthenticated() ? <>{children}</> : null
}