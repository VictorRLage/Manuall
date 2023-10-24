import { useEffect, useState } from "react";
import RegexENUM from "@/enum/RegexENUM";
import Wordcloud from "@visx/wordcloud/lib/Wordcloud";
import { Text } from "@visx/text";
import { scaleLog } from "@visx/scale";
import PreposicoesENUM from "@/enum/PreposicoesENUM";

export default function WordCloudAvaliacoes({ words, width, height }) {
    const [etlWords, setEtlWords] = useState([]);

    useEffect(() => {
        const treatedWords = words.reduce((acc, word) => {
            const treatedWord = word
                .replace(RegexENUM.TEXT_NUMBER_LOCALES_REPLACEABLE, "")
                .toLowerCase()
                .split(" ");

            return [...acc, ...treatedWord];
        }, []);

        const filteredWords = treatedWords.filter(
            (word) => !PreposicoesENUM.includes(word),
        );

        setEtlWords(
            filteredWords.reduce((acc, word) => {
                const wordExists = acc.find((w) => w.text === word);

                if (wordExists) {
                    wordExists.value += 1;
                    return acc;
                }

                return [...acc, { text: word, value: 1 }];
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
                spiral={"archimedean"}
                rotate={0}
                random={() => 0.5}
            >
                {(cloudWords) =>
                    cloudWords.map((w, i) => (
                        <Text
                            key={i}
                            fill={
                                [
                                    "#00CC69",
                                    "#4DFFA9",
                                    "rgba(17, 173, 14, 0.25)",
                                    "#008042",
                                    "#268054",
                                ][i % 5]
                            }
                            textAnchor={"middle"}
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
