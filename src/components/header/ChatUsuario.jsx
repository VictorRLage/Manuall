export default function ChatUsuario({ chat }) {
    return chat.mensagens.map(({ anexo, horario, selfSender, mensagem }, i) => (
        <div
            key={i}
            className={`w-full px-3 py-1 flex ${
                selfSender ? "justify-end" : "justify-start"
            }`}
        >
            {!selfSender && (
                <div
                    className="w-2 h-3 bg-[#c0e8c0]"
                    style={{
                        clipPath: "polygon(100% 0, 0 0, 100% 100%)",
                    }}
                />
            )}
            <div
                className={`max-w-[80%] p-2 rounded-lg ${
                    selfSender
                        ? "bg-[#5faf88] rounded-tr-none"
                        : "bg-[#c0e8c0] rounded-tl-none"
                }`}
            >
                {mensagem}
            </div>
            {selfSender && (
                <div
                    className="w-2 h-3 bg-[#5faf88]"
                    style={{
                        clipPath: "polygon(0 0, 100% 0, 0 100%)",
                    }}
                />
            )}
        </div>
    ));
}
