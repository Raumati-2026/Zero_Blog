import { useState } from "react"

const defaultFormState = {
  title: 'Your Title',
  entry: 'The content of your blog',
  date: '',
  topic: 'Your topic',
}

function AddForm() {
    const [formData, setFormData] = useState(defaultFormState)

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
    }

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = event.target
        setFormData({
        ...formData,
        [name]: value,
        })
    }
    
    return (
        <div className="border-2 p-6 mt-6 rounded-xl shadow-md">
            <h2 className="mb-6 text-2xl font-bold">Add Post</h2>
            <form
            data-testid="form"
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 bg-white p-8 rounded-xl shadow-md border"
            >
            {/* Title*/}
            <div className="flex flex-col gap-2">
                <label htmlFor="title" className="font-semibold">
                Title
                </label>
                <input
                type="text"
                id="title"
                name="tile"
                value={formData.title}
                onChange={handleChange}
                className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
            </div>

            {/* Entry */}
            <div className="flex flex-col gap-2">
                <label htmlFor="entry" className="font-semibold">
                Entry/Content
                </label>
                <textarea
                id="entry"
                name="entry"
                rows={4}
                value={formData.entry}
                onChange={handleChange}
                className="border rounded-lg px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
            </div>

            {/* Date */}
            <div className="flex flex-col gap-2">
                <label htmlFor="date" className="font-semibold">
                Event Date
                </label>
                <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
            </div>

            {/* Topic */}
            <div className="flex flex-col gap-2">
                <label htmlFor="topic" className="font-semibold">
                Topic
                </label>
                <input
                type="text"
                id="topic"
                name="topic"
                value={formData.topic}
                onChange={handleChange}
                className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-2">
                <input
                type="submit"
                data-testid="submit"
                value="Submit"
                className="bg-black text-white font-semibold px-6 py-2 rounded-lg hover:bg-purple-600 transition cursor-pointer"
                />

                <button
                type="reset"
                data-testid="reset"
                className="border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-100 transition"
                >
                Reset
                </button>
            </div>
            </form>
        </div>
    )
}

export default AddForm