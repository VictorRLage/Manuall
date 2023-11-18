import ChevronArrow from "@/assets/icons/ChevronArrow.svg";
import { useData } from "@/data/CreateContext";
import { StarIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

export default function PrestadorAvaliacoes({ avaliacoes }) {
    const { windowWidth } = useData();

    const getNext = (currentIndex) => {
        const nextIndex = currentIndex + 1;
        return nextIndex === avaliacoes.length ? 0 : nextIndex;
    };

    const [animationStart, setAnimationStart] = useState(false);
    const [assessments, setAssessments] = useState([0, getNext(0)]);
    const [canUserChange, setCanUserChange] = useState(true);

    const nextAssessment = () => {
        setCanUserChange(false);
        setAnimationStart(true);

        setTimeout(() => {
            setAnimationStart(false);
            setCanUserChange(true);
            setAssessments([assessments[1], getNext(assessments[1])]);
        }, 500);
    };

    return (
        <div className="w-full h-[500px] mt-8 min700:px-32 min500:px-16 px-8 flex flex-col">
            <h2 className="text-3xl font-semibold text-gray-900 flex items-center gap-1">
                Avaliações
                <StarIcon className="w-6 h-6 text-yellow-500" />
            </h2>
            <div
                className="min1000:w-[800px] min800:w-[600px] min450:w-[400px] w-[330px] h-[350px] relative flex items-center"
                style={{ perspective: "1000px" }}
            >
                <button
                    onClick={() => {
                        canUserChange && nextAssessment();
                    }}
                    className="rotate-180 w-12 h-12 bg-no-repeat z-[60] absolute self-center cursor-pointer flex right-4 bg-gray-100 hover:bg-gray-200 transition-all rounded-full items-center justify-center"
                    style={{
                        backgroundImage: `url(${ChevronArrow})`,
                        backgroundSize: "80%",
                        backgroundPosition: "1px 5px",
                    }}
                />
                {assessments?.map((item, i) => (
                    <div
                        className={`bg-white min800:w-[500px] w-[300px] h-[300px] drop-shadow-lg rounded-2xl absolute ${
                            i === 0 ? "z-50" : "z-40 opacity-40"
                        }`}
                        style={{
                            transform: `translateX(${
                                i === 0
                                    ? "0"
                                    : windowWidth > 1000
                                    ? "200px"
                                    : windowWidth > 450
                                    ? "50px"
                                    : "20px"
                            }) translateY(${
                                i === 0 ? "0" : "25px"
                            }) translateZ(${i === 0 ? "0" : "50px"})`,
                            animation: `${
                                animationStart
                                    ? i === 0
                                        ? "slide_left 500ms forwards"
                                        : windowWidth > 1000
                                        ? "come_in 500ms forwards"
                                        : windowWidth > 450
                                        ? "come_in_shorter 500ms forwards"
                                        : "come_in_shortest 500ms forwards"
                                    : ""
                            }`,
                        }}
                        key={i}
                    >
                        <div className="p-4 flex justify-between text-lg font-medium">
                            {avaliacoes[item].nome}
                            <div className="flex gap-1 justify-center items-center border-2 border-yellow-500 px-2 bg-yellow-100 rounded-lg text-black">
                                {avaliacoes[item].nota}
                                <StarIcon className="w-6 h-6 text-yellow-500" />
                            </div>
                        </div>
                        <div className="pb-4 px-4">
                            <div>{avaliacoes[item].descricao}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
