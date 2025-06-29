

const RoomCodeSection = () => {

    return (
        <section className="bg-[#1E293B] text-[#F8FAFC] w-full py-4 px-6 md:px-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 rounded-b-xl border-b-2 border-[#2DD4BF] shadow-[0_4px_20px_rgba(45,212,191,0.2)]">
            <div>
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-[#FACC15]">Room Code: <span className="tracking-widest">ABCD1234</span></h2>
            </div>
            <div className="flex gap-4 flex-wrap">
                {/* Example Players */}
                {[
                    { name: 'Ashmit', color: '#2DD4BF' },
                    { name: 'Neha', color: '#FB7185' },
                    { name: 'Karan', color: '#FACC15' },
                    { name: 'Meera', color: '#86EFAC' }
                ].map((player, idx) => (
                    <div
                        key={idx}
                        className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#0F172A] border border-[#334155]"
                    >
                        <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: player.color }}
                        ></div>
                        <span className="text-sm font-medium text-[#94A3B8]">{player.name}</span>
                    </div>
                ))}
            </div>
        </section>

    )
}

export default RoomCodeSection;