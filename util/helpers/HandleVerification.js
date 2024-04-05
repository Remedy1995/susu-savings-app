import React from "react";
import { useState } from "react";


export const HandleVerification = () => {
    const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
    const inputRefs = Array(6).fill(0).map((_, i) => React.createRef());

    const handleInputVerification = (text, index) => {
        const updatedOtpDigits = [...otpDigits];
        if (text.length > 0) {
            updatedOtpDigits[index] = text;
            // Move to the next input if available
            const nextIndex = index + 1;
            if (nextIndex < inputRefs.length && inputRefs[nextIndex]) {
                inputRefs[nextIndex].focus();
            }
        } else {
            updatedOtpDigits[index] = '';
            // Move to the previous input if available
            const prevIndex = index - 1;
            if (prevIndex >= 0 && inputRefs[prevIndex]) {
                inputRefs[prevIndex].focus();
            }
        }
        setOtpDigits(updatedOtpDigits);
    };


    return { handleInputVerification, otpDigits, inputRefs };
}
