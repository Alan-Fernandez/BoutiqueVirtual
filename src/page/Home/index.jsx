import { useState } from "react"

import Card from "../../Components/Card"
import Layout from "../../Components/Layout"

function Home() {
  return (
      <Layout>
        <h1 className='text-4xl font-bold'>Home</h1>
          <Card/>
      </Layout>
  )
}

export default Home