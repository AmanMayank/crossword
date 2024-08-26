import React, { useEffect, useRef, useState } from "react";
import { RxTriangleDown } from "react-icons/rx";
import { FaDotCircle } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";

const CrosswordCell = React.forwardRef(
  (
    {
      value,
      // isFocused,
      onFocus,
      updateGrid,
      rowIndex,
      colIndex,
      activeClue,
      currentIndex,
      handleOnGridClick,
      activeGrid,
      nextFocus,
      isRebus,
      onBlur,
      getWidth,
      helperData,
    },
    ref
  ) => {
    const [fontSize, setFontSize] = useState(24);
    const [revealedCell, setRevealedCell] = useState(false);

    useEffect(() => {
      const calculateFontSize = () => {
        const maxFontSize = 24; // Maximum font size in pixels
        const minFontSize = 5; // Minimum font size in pixels
        const maxLength = 12; // Maximum text length before scaling down
        const length = value.length;
        let tempFontSize = maxFontSize;

        // Adjust the base font size depending on the length of the text
        if (length < 5) {
          tempFontSize = maxFontSize;
        } else if (length <= maxLength) {
          tempFontSize = maxFontSize - length - 7; // Scale down as length increases
        } else {
          tempFontSize = minFontSize;
        }

        // Ensure font size stays within min and max bounds
        const newFontSize = Math.max(
          minFontSize,
          Math.min(tempFontSize, maxFontSize)
        );

        if (rowIndex === 0 && colIndex === 1) {
          console.log(newFontSize);
        }

        setFontSize(`${newFontSize}px`);
      };

      calculateFontSize();
    }, [value]);

    const getClueNumber = () => {
      if (rowIndex === 0) {
        return colIndex;
      } else if (colIndex === 0) {
        return rowIndex + 4;
      } else {
        return;
      }
    };

    const inputRef = useRef(null);

    const [current, setCurrent] = useState(false);

    useEffect(() => {
      if (activeGrid.rgrid === rowIndex && activeGrid.cgrid === colIndex) {
        setCurrent(true);
      } else {
        setCurrent(false);
      }

      if (helperData[rowIndex][colIndex] === "#") {
        setRevealedCell(true);
      } else {
        setRevealedCell(false);
      }
    }, [activeGrid.rgrid, activeGrid.cgrid, rowIndex, colIndex, helperData]);

    const backgroundColor = () => {
      if (value === "$") {
        return "bg-black z-10";
      } else if (
        activeGrid.rgrid === rowIndex &&
        activeGrid.cgrid === colIndex
      ) {
        return "bg-yellow-200";
      } else if (
        (activeClue.name === "A" && Number(currentIndex) === rowIndex) ||
        (activeClue.name !== "A" && Number(currentIndex) === colIndex)
      ) {
        return "bg-blue-200";
      } else {
        return "";
      }
    };

    const textAlignment = () => {
      if (value.length > 1) {
        const value = fontSize.split("px")[0];
        console.log("fontsize==", value, "equality check", value > 8);
        if (value > 8) {
          return "pt-10 pb-2";
        } else {
          return "pt-12 pb-2";
        }
      }
      return "";
    };

    const width = `${Math.max(64, value.length * 10)}px`;
    const rebusCheck = isRebus && current;
    rebusCheck && inputRef?.current?.focus();

    return (
      <>
        {rebusCheck ? (
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={value}
              className="h-16 box-border text-center fixed bg-white z-20  px-2 caret-black border-2 text-xl"
              style={{ width: `${width}`, transition: "width 0.2s ease" }}
              onChange={(e) => {
                updateGrid(rowIndex, colIndex, e.target.value);
              }}
            />
            <input
              className="w-16 h-16 border-2 px-2 text-[24px] invisible box-border"
              disabled
            />
          </div>
        ) : (
          <div className="relative">
            <span className="absolute p-1 text-xs font-bold">
              {getClueNumber()}
            </span>
            {revealedCell && (
              <span className="absolute text-xs font-bold right-0">
                <GoDotFill style={{ color: "white", backgroundColor: "red" }} />
              </span>
            )}
            <input
              ref={ref}
              disabled={value === "$" ? true : false}
              type="text"
              onBlur={onBlur}
              value={value || ""}
              onFocus={onFocus}
              className={`box-border w-16 h-16 text-center border-2 caret-transparent px-2
                 ${backgroundColor()}
                 ${textAlignment()}
                `}
              onChange={(e) => {
                if (isRebus) {
                  updateGrid(rowIndex, colIndex, e.target.value);
                }
              }}
              onClick={(e) =>
                handleOnGridClick(rowIndex, colIndex, currentIndex)
              }
              style={{
                fontSize: fontSize,
              }}
            />
          </div>
        )}
      </>
    );
  }
);
export default CrosswordCell;
