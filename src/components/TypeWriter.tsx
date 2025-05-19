
import React, { useState, useEffect, useRef } from "react";

interface TypeWriterProps {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetweenTexts?: number;
  className?: string;
}

const TypeWriter: React.FC<TypeWriterProps> = ({
  texts,
  typingSpeed = 100,
  deletingSpeed = 50,
  delayBetweenTexts = 1500,
  className = "",
}) => {
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTypingPaused, setIsTypingPaused] = useState(false);
  
  // Reference to the current timeout
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const currentText = texts[currentIndex];
    
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    if (isTypingPaused) {
      // Wait before starting to delete
      timeoutRef.current = setTimeout(() => {
        setIsTypingPaused(false);
        setIsDeleting(true);
      }, delayBetweenTexts);
      return;
    }
    
    if (isDeleting) {
      if (displayText.length === 0) {
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % texts.length);
      } else {
        // Delete one character
        timeoutRef.current = setTimeout(() => {
          setDisplayText(currentText.substring(0, displayText.length - 1));
        }, deletingSpeed);
      }
    } else {
      if (displayText.length === currentText.length) {
        // Full text has been typed, pause before deleting
        setIsTypingPaused(true);
      } else {
        // Type one character
        timeoutRef.current = setTimeout(() => {
          setDisplayText(currentText.substring(0, displayText.length + 1));
        }, typingSpeed);
      }
    }
    
    // Cleanup function
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [displayText, isDeleting, currentIndex, texts, typingSpeed, deletingSpeed, delayBetweenTexts, isTypingPaused]);
  
  return (
    <span className={`${className} inline-block`}>
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

export default TypeWriter;
