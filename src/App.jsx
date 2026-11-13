const App=()=>{
  return(
    <div className="bg-gray-100 min-h-screen flex flex-col items-center py-8 gap-12">
      <h1 className="text-4xl font-bold text-indigo-600">📸Image Gallery</h1>
      <form>
        <input className=' bg-white w-[400px] focus:outline-indigo-500' 
        placeholder="search image here" />
        <button className="bg-indigo-600">Search</button>
      </form>
      <div>
        <div className='grid lg:grid-cols-4 lg:gap-12 gap-8'>
           {
          Array(24).fill(0).map((item,index)=>(
            <div key={index} className='bg-white rounded-xl p-12 w-9/12'>
            </div>
          ))
        }
        </div>
       
      </div>
    </div>
    
  )
}
export default App;