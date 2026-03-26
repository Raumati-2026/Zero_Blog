import { useParams } from 'react-router'
import { usePostId } from '../hooks/useFruits'

function PostPage() {
  const { id } = useParams()
  const { data, isPending, isError, error, isSuccess } = usePostId(id)

  if (isPending) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error: {error.message}</div>
  }

  const date = new Date(data.date)
  const formattedDate = date.toLocaleDateString()

  if (isSuccess) {
    return (
      <div className="p-6">
        <div className="flex items-baseline justify-between">
          <h1 className="text-5xl">{data.title}</h1>
          <p>{formattedDate}</p>
        </div>
        <hr className="my-5 border-t-2 " />
        <p className="text-lg">{data.entry}</p>
        <hr className="my-5 border-t-2 " />
        <div className="flex items-center gap-4">
          <img
            className="w-20 rounded-full"
            alt="pfp"
            src="https://i.pinimg.com/736x/9e/83/75/9e837528f01cf3f42119c5aeeed1b336.jpg"
          ></img>
          <p>Robert</p>
        </div>
      </div>
    )
  }
}

export default PostPage
