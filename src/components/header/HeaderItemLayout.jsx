import { useLocation, useNavigate } from "react-router-dom";

export default function HeaderItemLayout({
    name,
    url,
    redirectionUrl,
    responsiveMode,
    onPathClick = () => {},
    onClick,
}) {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    return (
        <button
            onClick={() => {
                if (pathname === url) {
                    onPathClick();
                } else {
                    onClick?.();
                    const hasRedirectionUrl = redirectionUrl || url;
                    if (hasRedirectionUrl) navigate(hasRedirectionUrl);
                }
            }}
            className={`text-xl ${
                responsiveMode
                    ? "w-[60%] min-h-[56px] hover:bg-gray-200 text-xl transition-all rounded-full border-[1px] border-gray-500"
                    : "decoration-green-400"
            } ${
                pathname === url
                    ? "text-[#00CC69] cursor-default"
                    : `text-black ${!responsiveMode && "hover:underline"}`
            }`}
        >
            {name}
        </button>
    );
}
