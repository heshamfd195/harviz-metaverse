import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate()
    return (
        <div className='bg-gray-800 flex flex-col items-center h-screen w-screen p-4 text-white'>
            <div className='container w-[40%] h-40 border border-white rounded-md p-4 space-y-4 flex flex-col items-center my-12 '>
                <p className='text-white text-xl font-medium '> Welcome to Harviz Metaverse !!</p>
                <button className='bg-blue-500 px-6 py-2 shadow-md shadow-gray-900 font-semibold hover:bg-blue-400 rounded-md text-2xl ' onClick={() => { navigate("/hub") }}>Enter Hub</button>
            </div>

        </div>
    )
}

export default Home