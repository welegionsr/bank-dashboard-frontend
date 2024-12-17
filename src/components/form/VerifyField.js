import React, { useState, useRef } from "react";
import { Form } from "react-bootstrap";

const VerifyField = ({ length = 6, onChange }) => {
    const [code, setCode] = useState(new Array(length).fill(""));
    const inputs = useRef([]);

    const handleChange = (value, index) => {
        if (/^\d$/.test(value)) { // Ensure only a single digit
            const newCode = [...code];
            newCode[index] = value;
            setCode(newCode);
            onChange(newCode.join("")); // Notify parent about the code

            // Move focus to the next field
            if (index < length - 1) {
                inputs.current[index + 1].focus();
            }
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            const newCode = [...code];
            newCode[index - 1] = ""; // Clear the previous field
            setCode(newCode);
            onChange(newCode.join("")); // Notify parent about the code

            // Move focus to the previous field
            inputs.current[index - 1].focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData("text").slice(0, length).split("");
        const newCode = [...code];
        pasteData.forEach((char, index) => {
            if (/^\d$/.test(char) && index < newCode.length) {
                newCode[index] = char;
            }
        });
        setCode(newCode);
        onChange(newCode.join("")); // Notify parent about the code

        // Focus on the next empty field after pasting
        const firstEmptyIndex = newCode.findIndex((char) => !char);
        if (firstEmptyIndex !== -1) {
            inputs.current[firstEmptyIndex].focus();
        } else {
            inputs.current[length - 1].focus();
        }
    };

    return (
        <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
            {code.map((digit, index) => (
                <Form.Control
                    key={index}
                    type="text"
                    value={digit}
                    maxLength="1"
                    onChange={(e) => handleChange(e.target.value, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onPaste={handlePaste}
                    ref={(el) => (inputs.current[index] = el)}
                    style={{
                        width: "40px",
                        height: "40px",
                        textAlign: "center",
                        fontSize: "18px",
                    }}
                />
            ))}
        </div>
    );
};

export default VerifyField;
