// useCopyToClipboard.js
import { useState } from 'react';

const useCopyToClipboard = () => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async (text: string) => {
    try {
      // Check if Clipboard API is supported
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(text);
        setCopied(true);
      } else {
        // Fallback for browsers that do not support the Clipboard API
        console.warn('Clipboard API not supported');
        // You could use a fallback approach if necessary
      }
    } catch (err) {
      console.error('Failed to copy text: ', err);
      setCopied(false);
    }

    // Reset copied status after 2 seconds
    setTimeout(() => setCopied(false), 2000);
  };

  return { copied, copyToClipboard };
};

export default useCopyToClipboard;
