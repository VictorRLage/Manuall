import Skeleton from "react-loading-skeleton";
import { useNavigate } from "react-router-dom";

export default function Breadcrumb({ items }) {
    const navigate = useNavigate();

    return (
        <span className="text-xl">
            {items.map(({ to, desc, loading }, i) => (
                <span
                    key={i}
                    onClick={() => {
                        to && navigate(to);
                    }}
                    className={
                        to
                            ? "text-gray-500 hover:text-gray-700 transtiion-colors cursor-pointer"
                            : "text-[#008042] font-bold"
                    }
                >
                    {loading ? (
                        <>
                            {" / "}
                            <Skeleton width={120} />
                        </>
                    ) : (
                        (i !== 0 ? " / " : "") + desc
                    )}
                </span>
            ))}
        </span>
    );
}
