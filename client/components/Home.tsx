import PostCard from './PostCard'
import AddForm from './AddForm'
import { useAuth0 } from '@auth0/auth0-react'
import { usePosts } from '../hooks/useFruits'

function Home() {
  const auth = useAuth0()
  const user = auth.user

  //custom get all post hook
  const { data, isPending, isError, error, isSuccess } = usePosts()

  if (isPending) {
    return (
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
    )
  }

  if (isError) {
    return <div>{error.message}</div>
  }

  if (isSuccess) {
    return (
      <main className="p-6">
        <h1 className="text-6xl font-bold">Welcome to Zero Blog</h1>

        {user && <AddForm />}

        <h2 className="mt-6 text-6xl font-bold">Blogs</h2>

        <div className="grid-col-1 mt-6 grid gap-6 rounded-xl border-2 p-6 shadow-xl md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data?.map((post) => (
            <PostCard
              title={post.title}
              entry={post.entry}
              date={post.date}
              key={post.id}
            />
          ))}
        </div>
      </main>
    )
  }
}

export default Home
