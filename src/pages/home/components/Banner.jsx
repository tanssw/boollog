function Banner() {
    return (
        <div className="bg-gradient-to-r from-sky-500 to-blue-800 h-32 sm:h-48 lg:h-64 text-black p-4 sm:p-8 lg:p-16 rounded-lg shadow-lg flex justify-between">
            <div className="my-auto">
                <div className="text-lg sm:text-2xl font-thin text-sky-50 mb-2">Welcome to ...</div>
                <div className="text-3xl md:text-5xl font-bold text-sky-100">boooooollog</div>
            </div>
            <div className="text-white opacity-25 font-thin my-auto text-6xl sm:text-7xl 2xl:text-9xl overflow-hidden">
                .BO<span className="hidden sm:inline">0L</span>
            </div>
        </div>
    )
}

export default Banner