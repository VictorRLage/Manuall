export default function AprovacaoCardGridSection({ label, value }) {
    return (
        <>
            <span className="justify-self-end">{label}:</span>
            <span className="font-bold">{value}</span>
        </>
    );
}
