import { Outlet } from 'react-router'
import Nav from './Nav.tsx'
import Footer from './Footer.tsx'
import { Post } from './Post.tsx'

function App() {
  return (
    <>
      <Nav />
      <Outlet />
      <Post></Post>
      <Footer />
    </>
  )
}

export default App
