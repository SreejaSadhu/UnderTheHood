import { useEffect, useState } from "react";

interface EncryptedTextProps {
    text: string;
    interval?: number;
    className?: string;
}

const chars = "-_~`!@#$%^&*()+=[]{}|;:,.<>?/";

export default function EncryptedText({
    text,
    interval = 50,
    className = ""
}: EncryptedTextProps) {
    const [displayText, setDisplayText] = useState("");
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        let iteration = 0;
        const timer = setInterval(() => {
            setDisplayText(
                text
                    .split("")
                    .map((letter, index) => {
                        if (index < iteration) {
                            return text[index];
                        }
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join("")
            );

            if (iteration >= text.length) {
                clearInterval(timer);
            }

            iteration += 1 / 3;
        }, interval);

        return () => clearInterval(timer);
    }, [text, interval]);

    return (
        <span className={className}>
            {displayText}
        </span>
    );
}
