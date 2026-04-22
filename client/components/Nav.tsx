import { useAuth0 } from '@auth0/auth0-react'

function Nav() {
  const auth = useAuth0()
  const user = auth.user
  console.log(user)

  const logout = auth.logout
  const loginWithRedirect = auth.loginWithRedirect

  const handleSignOut = () => {
    logout()
  }

  const handleSignIn = () => {
    loginWithRedirect()
  }

  return (
    <nav className="flex items-center justify-between border-b-2 p-6">
      <div>
        <h2 className="text-2xl font-bold">Zero Blog</h2>
      </div>
      <div>
        {!user ? (
          <button
            className="rounded-xl bg-black px-2 py-4 text-white"
            onClick={handleSignIn}
          >
            Login/Sign Up
          </button>
        ) : (
          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <img
                src={user.picture}
                alt="Profile"
                className="h-14 w-14 rounded-full"
              />
              <p className="text-2xl font-thin">
                {user.given_name + ' ' + user.family_name}
              </p>
            </div>
            <button
              className="rounded-xl bg-black px-2 py-4 text-white"
              onClick={handleSignOut}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Nav
