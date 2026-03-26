import PostCard from "./PostCard"
import AddForm from "./AddForm"
import { useAuth0 } from "@auth0/auth0-react"

function Home() {
    const auth = useAuth0()
    const user = auth.user
    return (
        <main className="p-6">
            <h1 className="text-6xl font-bold">Welcome to Zero Blog</h1>

            {user && <AddForm/>}

            <h2 className="text-6xl mt-6 font-bold">Blogs</h2>

            <div className="shadow-xl p-6 mt-6 border-2 rounded-xl grid gap-6 grid-col-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <PostCard/>
                <PostCard/>
                <PostCard/>
                <PostCard/>
            </div>
        </main>
    )
}

export default Home