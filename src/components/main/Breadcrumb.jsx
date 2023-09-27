import { useNavigate } from "react-router-dom";

export default function Breadcrumb({ items }) {
    const navigate = useNavigate();

    return (
        <span className="text-xl">
            {items.map(({ to, desc }, i) => (
                <span
                    onClick={() => {
                        to && navigate(to);
                    }}
                    className={
                        to
                            ? "text-gray-500 cursor-pointer"
                            : "text-[#008042] font-bold"
                    }
                >
                    {i !== 0 && " / "}{desc}
                </span>
            ))}
        </span>
    );
}
