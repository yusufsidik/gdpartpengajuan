import { useState } from "react";

async function copyToClipboard(text) {
    const cleanText = String(text ?? "");

    // 1. Coba cara modern (HTTPS / localhost)
    if (navigator.clipboard && window.isSecureContext) {
        return await navigator.clipboard.writeText(cleanText);
    }

    // 2. Fallback untuk HTTP (pakai trik lama)
    return new Promise((resolve, reject) => {
        const textArea = document.createElement("textarea");
        textArea.value = cleanText;
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            const success = document.execCommand('copy');
            document.body.removeChild(textArea);
            if (success) resolve();
            else reject();
        } catch (err) {
            document.body.removeChild(textArea);
            reject(err);
        }
    });
}

export function Copyable({ children, value, className = "" }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        const textToCopy = value ?? children;
        if (!textToCopy) return;

        try {
            await copyToClipboard(textToCopy);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch (err) {
            console.error("Gagal copy:", err);
            alert("Gagal copy, browser tidak mengizinkan");
        }
    };

    return (
        <div
            onClick={handleCopy}
            className={`cursor-pointer hover:bg-base-200 hover:text-blue-500 transition relative ${className}`}
            title="Klik untuk copy"
        >
            {children}
            {copied && (
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded z-10">
                    Copied!
                </span>
            )}
        </div>
    );
}