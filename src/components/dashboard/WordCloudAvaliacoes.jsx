import PreposicoesENUM from "@/enum/PreposicoesENUM";
import RegexENUM from "@/enum/RegexENUM";
import { scaleLog } from "@visx/scale";
import { Text } from "@visx/text";
import Wordcloud from "@visx/wordcloud/lib/Wordcloud";
import { useEffect, useState } from "react";

export default function WordCloudAvaliacoes({ words, width, height }) {
    const [etlWords, setEtlWords] = useState([]);

    const coresDisponiveis = [
        "#00CC69",
        "#4DFFA9",
        "#185c3b",
        "#008042",
        "#268054",
    ];

    useEffect(() => {
        const treatedWords = words.reduce((acc, wordd) => {
            const treatedWord = wordd
                .replace(RegexENUM.TEXT_NUMBER_LOCALES_REPLACEABLE, "")
                .toLowerCase()
                .split(" ");

            return [...acc, ...treatedWord];
        }, []);

        const filteredWords = treatedWords.filter(
            (wordd) => !PreposicoesENUM.includes(wordd),
        );

        setEtlWords(
            filteredWords.reduce((acc, wordd) => {
                const wordExists = acc.find((w) => w.text === wordd);

                if (wordExists) {
                    wordExists.value += 1;
                    return acc;
                }

                return [...acc, { text: wordd, value: 1 }];
            }, []),
        );
    }, [words]);

    return (
        <div>
            <Wordcloud
                words={etlWords}
                width={width}
                height={height}
                fontSize={(datum) =>
                    scaleLog({
                        domain: [
                            Math.min(...etlWords.map((w) => w.value)),
                            Math.max(...etlWords.map((w) => w.value)),
                        ],
                        range: [10, 40],
                    })(datum.value)
                }
                padding={2}
                spiral="archimedean"
                rotate={0}
                random={() => 0.5}
            >
                {(cloudWords) =>
                    cloudWords.map((w, i) => (
                        <Text
                            key={i}
                            fill={coresDisponiveis[i % coresDisponiveis.length]}
                            textAnchor="middle"
                            transform={`translate(${w.x}, ${w.y}) rotate(${w.rotate})`}
                            fontSize={w.size}
                            fontFamily={w.font}
                        >
                            {w.text}
                        </Text>
                    ))
                }
            </Wordcloud>
        </div>
    );
}
