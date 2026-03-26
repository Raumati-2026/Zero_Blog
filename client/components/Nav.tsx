const user = "Ciaran"

function Nav() {
    return (
        <nav className="flex justify-between p-6 border-b-2 items-center">
            <div>
                <h2 className="text-2xl font-bold">Zero Blog</h2>
            </div>
            <div>
                {!user ? (
                    <button className="py-4 px-2 bg-black text-white rounded-xl">Login/Sign Up</button>
                ) : (
                    <div className="flex gap-2 items-center">
                        <img src="https://picsum.photos/200/300" alt="Profile" className="rounded-full h-14 w-14" />
                        <p className="font-bold text-2xl">{user}</p>
                    </div>
                )}
                
                
            </div>
        </nav>
    )
}

export default Nav