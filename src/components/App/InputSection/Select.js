import { useEffect, useRef, useState } from "react";
import dropdown from "../../../../public/dropdown-96.png";
import Image from "next/image";

export default function Select({ multiple, value, onChange, options, label, label_width }) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const containerRef = useRef(null);
  const popupListRef = useRef(null);

  function clearOptions() {
    multiple ? onChange([]) : onChange(undefined);
  }

  function selectOption(option) {
    if (multiple) {
      if (value.includes(option)) {
        onChange(value.filter((o) => o !== option));
      } else {
        onChange([...value, option]);
      }
    } else {
      if (option !== value) onChange(option);
    }
  }

  function isOptionSelected(option) {
    return multiple ? value.includes(option) : option === value;
  }

  useEffect(() => {
    if (isOpen) setHighlightedIndex(0);
  }, [isOpen]);

  useEffect(() => {
    const handler = (e) => {
      if (e.target !== containerRef.current) return;
      switch (e.code) {
        case "Enter":
        case "Space":
          setIsOpen((prev) => !prev);
          if (isOpen) selectOption(options[highlightedIndex]);
          break;
        case "ArrowUp":
        case "ArrowDown": {
          if (!isOpen) {
            setIsOpen(true);
            break;
          }

          const newValue = highlightedIndex + (e.code === "ArrowDown" ? 1 : -1);
          if (newValue >= 0 && newValue < options.length) {
            setHighlightedIndex(newValue);
          }
          break;
        }
        case "Escape":
          setIsOpen(false);
          break;
      }
    };
    containerRef.current?.addEventListener("keydown", handler);

    return () => {
      containerRef.current?.removeEventListener("keydown", handler);
    };
  }, [isOpen, highlightedIndex, options]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (popupListRef.current && !popupListRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    // Attach the event listener when the component mounts
    document.addEventListener("mousedown", handleClickOutside);
    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative text-gray-400 drop-shadow-md">
      <div
        className={`absolute h-[4px] bg-white top-0 -translate-y-1/2 left-6 w-[${label_width}] z-20`}
      ></div>
      <div className="absolute text-gray-400 text-xl top-0 -translate-y-1/2 left-7 z-30 bg-transparent p-1 font-ligh">
        {label}
      </div>
      <Image
        src={dropdown}
        alt=""
        width={24}
        height={24}
        className="absolute cursor-pointer right-0 bottom-0 m-3 transition-all duration-300 ease-in-out hover:translate-y-0.5"
        onClick={() => setIsOpen((prev) => !prev)}
        onBlur={() => setIsOpen(false)}
      />
      <div
        ref={containerRef}
        tabIndex={0}
        className="w-full min-h-[100px] border-[2px] border-prm-green bg-prm-white flex gap-2 p-2 items-start rounded-[20px] z-10 pt-4"
      >
        <span className="flex-grow inline-flex gap-2 flex-wrap">
          {multiple
            ? value.map((v) => (
                <button
                  key={v.value}
                  onClick={(e) => {
                    e.stopPropagation();
                    selectOption(v);
                  }}
                  className="flex items-center border border-prm-steel rounded-full px-4 cursor-pointer bg-transparent"
                >
                  {v.label}
                  <span className="pl-2 text-xl">&times;</span>
                </button>
              ))
            : value?.label}
        </span>
        <ul
          className={`no-scrollbar absolute border-[1px] mt-1 max-h-60 border-prm-green rounded-[20px] w-full left-0 top-full bg-prm-white z-50 overflow-auto ${
            isOpen ? "" : "hidden"
          }`}
          ref={popupListRef}
        >
          {options.map((option, index) => (
            <li
              onClick={(e) => {
                e.stopPropagation();
                selectOption(option);
                setIsOpen(false);
              }}
              onMouseEnter={() => setHighlightedIndex(index)}
              key={option.value}
              className={`cursor-pointer border-b border-gray-100 p-1 pl-3 overflow-hidden ${
                isOptionSelected(option) ? "bg-prm-green/20" : ""
              } ${index === highlightedIndex ? "bg-prm-green/50" : ""}`}
            >
              {option.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
