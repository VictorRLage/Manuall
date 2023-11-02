export default function InfoCard({ img, children }) {
    return (
        <div className="w-80 h-120 rounded-3xl drop-shadow-xl bg-white">
            <div className="h-[60%] flex items-center justify-center">
                <img src={img} alt="" />
            </div>
            <div className="h-[40%] px-6 text-center text-gray-900 flex items-center justify-center">
                <span className="text-2xl font-medium">{children}</span>
            </div>
        </div>
    );
}
