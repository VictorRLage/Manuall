import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid";

export default function AprovacaoDesfazer({ desfazer }) {
    return (
        <button
            onClick={desfazer}
            className="flex fixed bg-[#209D61] hover:bg-[rgb(44,191,120)] transition-colors text-white pt-4 pb-4 pr-5 pl-5 right-[50px] bottom-[50px] rounded-xl items-center"
        >
            <ArrowUturnLeftIcon className="h-6 mr-2" />{" "}
            <span className="mt-1 text-lg">Desfazer última decisão</span>
        </button>
    );
}
