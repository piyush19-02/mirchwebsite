
import logo from "../../images/logo.png";
function Front() {
  return (
    <div>
      <section className="py-10  bg-gradient-to-r from-red-800 via-red-500 to-yellow-600  items-center">
  <div className="max-w-7xl mx-auto   py-20 grid grid-cols-1 md:flex  gap-20 items-center">
    <div className="flex justify-between relative">
      <div
        className=" rounded-3xl p-"
      >
        <img
          src= {logo}
          alt="Hero"
          className="rounded-2xl shadow-2xl shadow-red-950 p-1 w-[580px] md:w-[550px]"
        />
      </div>
    </div>
   
    <div data-aos="slide-up" className="text-white" >
      <h1 className="  drop-shadow-xl font-serif leading-tight text-[3rem] ml-5 md:ml-0 md:text-[8rem]" >
       <span className="text-blue-400 drop-shadow-xl"> Shri  </span><span className=""> Ganesh </span><span className="text-yellow-300"> Masala </span><span className="text-green-500"> Udhyog</span>
      </h1>



  
    </div>

  
    

  </div>
</section>

    </div>
  )
}

export default Front
