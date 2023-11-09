import { defer } from "@/utils/functions";

export default function CustomInputMask({
    mask,
    maskIdentifierCharacter,
    onBlur,
    value,
    onChange,
    mainElement: { id, style, className, placeholder },
}) {
    const change = async ({ target }) => {
        let oldValue = value;
        let newValue = target.value;

        let moveTextCursorTo;

        if (newValue.length < oldValue.length) {
            for (let i = 0; i < newValue.length; i++) {
                if (newValue[i] !== oldValue[i]) {
                    if (oldValue[i] === maskIdentifierCharacter) {
                        newValue =
                            oldValue.substring(0, i) +
                            maskIdentifierCharacter +
                            oldValue.substring(i + 1);
                    }
                    moveTextCursorTo = i;
                }
            }
        } else if (newValue.length > oldValue.length) {
            for (let i = 0; i < newValue.length; i++) {
                if (newValue[i] !== oldValue[i]) {
                    newValue =
                        oldValue.substring(0, i) +
                        newValue[i] +
                        oldValue.substring(i + 1);

                    console.log(newValue);
                    moveTextCursorTo = i + 1;
                }
            }
        }

        console.log(oldValue);
        console.log(newValue);

        onChange(newValue);
        await defer();
        if (moveTextCursorTo) {
            target.selectionStart = target.selectionEnd = moveTextCursorTo;
        }
    };

    return (
        <input
            id={id}
            style={style}
            className={className}
            placeholder={placeholder}
            onBlur={onBlur}
            value={value}
            onChange={change}
        />
    );
}
