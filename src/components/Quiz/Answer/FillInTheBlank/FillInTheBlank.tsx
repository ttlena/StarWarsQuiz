import React, { useState, useEffect } from "react";
import { IAnswer } from "../../../../typings/quiz/IAnswer";
import css from "./FillInTheBlank.module.css";

interface IProps {
    questionText: string;
    answerList: IAnswer[];
    onClickNext: (
        wasCorrect: boolean,
        onCorrect: number,
        onFalse: number
    ) => void;
}

export const FillInTheBlank = ({
    questionText,
    answerList,
    onClickNext,
}: IProps) => {
    const disabledValue: IAnswer = {
        text: "",
        isRight: false,
        image: "",
    };
    const [splittedQuestionText, setQuestionValue] = useState(Array<string>());
    const [options, setOptions] = useState(new Map<string, IAnswer>());
    const [selectedAnswer, setSelectedAnswer] = useState(disabledValue);
    const [submitted, setSubmitted] = useState(false);
    const [boxColor, setBoxColor] = useState("");

    useEffect(() => {
        const separator = "(options)";
        const result = questionText.split(separator);
        setQuestionValue(result);
        let varOptions: Map<string, IAnswer> = new Map();
        answerList.forEach((answer) => {
            varOptions.set(answer.text, answer);
        });
        setOptions(varOptions);
    }, [questionText, answerList]);

    function clickSubmit() {
        setBoxColor(selectedAnswer.isRight ? css.right : css.false);
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            onClickNext(selectedAnswer.isRight, 5, -5);
            setSelectedAnswer(disabledValue);
        }, 2000);
    }

    function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
        const selectedOption = options.get(event.target.value);
        if (selectedOption !== undefined) {
            setSelectedAnswer(selectedOption);
        }
    }

    return (
        <>
            <div
                className={`${css.box} ${submitted ? css.disabled : ""} ${
                    submitted ? boxColor : css.hidden
                }`}
            >
                {splittedQuestionText[0]}
                <span>
                    <select
                        className={`${css.select} ${css.starjedi}`}
                        onChange={(e) => handleSelectChange(e)}
                        value={selectedAnswer.text}
                    >
                        <option disabled value={""}>
                            --Wähle Antwortmöglichkeit--
                        </option>
                        {answerList.map((answer) => (
                            <option
                                value={answer.text}
                                key={answer.text}
                                className={css.answer}
                            >
                                {answer.text}
                            </option>
                        ))}
                    </select>
                </span>
                {splittedQuestionText[1]}
            </div>
            <button
                onClick={clickSubmit}
                className={`${css.ok_button} ${css.starjedi} ${
                    submitted || selectedAnswer.text == "" ? css.disabled : ""
                }`}
            >
                Fertig
            </button>
        </>
    );
};
