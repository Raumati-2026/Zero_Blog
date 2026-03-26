function PostCard({ title, entry, date }) {
  const date_1 = new Date(date)
  const formattedDate = date_1.toLocaleDateString()

  return (
    <div className="rounded-xl border-2 p-6 shadow-lg">
      <div className="flex items-baseline justify-between">
        <h1 className="text-5xl">{title}</h1>
        <p>{formattedDate}</p>
      </div>
      <hr className="my-5 border-t-2 " />
      <p className="text-lg">{entry}</p>
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

export default PostCard
