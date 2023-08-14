import 'animate.css'

export const IsWriting = () => {
  return (
    <div className={`flex justify-start animate__delay-1s animate__animated animate__fadeInLeftBig`}>
      <div className="inline-block m-4 ">
        <div className="bg-white   min-h-[5vh]  rounded-2xl text-black flex items-center justify-start ">
          <p className="flex-wrap max-w-[80vw] break-words p-2 text-[2vh]">Yazıyor</p>
        </div>
      </div>
    </div>
  )
}
//animate__delay-1s animate__animated animate__fadeInLeftBig
