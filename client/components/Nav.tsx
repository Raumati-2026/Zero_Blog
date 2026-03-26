import { useAuth0 } from "@auth0/auth0-react"

function Nav() {
    const auth = useAuth0()
    const user = auth.user
    const logout = auth.logout
    const loginWithRedirect = auth.loginWithRedirect

    const handleSignOut = () => {
        logout()
    }

    const handleSignIn = () => {
        loginWithRedirect()
    }

    return (
        <nav className="flex justify-between p-6 border-b-2 items-center">
            <div>
                <h2 className="text-2xl font-bold">Zero Blog</h2>
            </div>
            <div>
                {!user ? (
                    <button className="py-4 px-2 bg-black text-white rounded-xl" onClick={handleSignIn}>Login/Sign Up</button>
                ) : (
                    <div className="flex gap-6">
                        <div className="flex gap-2 items-center">
                            <img src={user.picture} alt="Profile" className="rounded-full h-14 w-14" />
                            <p className="font-thin text-2xl">{user.given_name + ' ' + user.family_name}</p>
                        </div>
                        <button className="py-4 px-2 bg-black text-white rounded-xl" onClick={handleSignOut}>Logout</button>
                    </div>
                )}
                
                
            </div>
        </nav>
    )
}

export default Nav