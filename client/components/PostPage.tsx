function PostPage() {
  const post_data = {
    id: 1,
    title: 'Example Post',
    entry: 'Mucho words fr fr',
    date: 'Thu Mar 26 2020 15:16:52 GMT+1300 (New Zealand Daylight Time)',
    author_name: 'test user',
    topic: 'Test topic',
  }

  const date = new Date(post_data.date)
  const formattedDate = date.toLocaleDateString()

  return (
    <div className="p-6">
      <div className="flex items-baseline justify-between">
        <h1 className="text-5xl">{post_data.title}</h1>
        <p>{formattedDate}</p>
      </div>
      <hr className="my-5 border-t-2 " />
      <p className="text-lg">{post_data.entry}</p>
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

export default PostPage
