import React, { useEffect, useRef, useState } from "react";
import CrosswordGrid from "./CrosswordGrid";

const HeroComponent = ({ data, updateGrid, Clues }) => {
  const firstValueAcross = Clues[0].Across["1"];
  const firstValueDown = Clues[0].Down["1"];
  const [activeClue, setActiveClue] = useState({
    name: "A",
    key: "1",
    value: firstValueAcross,
  });

  const [adjacentClue, setAdjacentClue] = useState({
    name: "",
    key: "",
    value: "",
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeGrid, setActiveGrid] = useState({
    rgrid: 0,
    cgrid: 1,
  });

  const across = Clues[0].Across;
  const down = Clues[0].Down;

  useEffect(() => {
    if (adjacentClue.name === activeClue.name) {
      setAdjacentClue({
        name: activeClue.name === "A" ? "D" : "A",
        key: "1",
        value: activeClue.name === "A" ? firstValueDown : firstValueAcross,
      });
    }

    if (activeClue.name === "A") {
      if (activeClue.key === 1 || activeClue.key === "1") {
        setCurrentIndex(0);
      } else {
        setCurrentIndex(activeClue.key - 4);
      }
      if (down.hasOwnProperty(activeClue.key)) {
        setAdjacentClue({
          name: "D",
          key: activeClue.key,
          value: down[activeClue.key],
        });
      }
      return;
    }

    if (activeClue.name === "D") {
      if (activeClue.key === 5) {
        setCurrentIndex(0);
      } else {
        setCurrentIndex(activeClue.key);
      }
      if (across.hasOwnProperty(activeClue.key)) {
        setAdjacentClue({
          name: "A",
          key: activeClue.key,
          value: across[activeClue.key],
        });
      }
      return;
    }
  }, [
    activeClue,
    Clues,
    adjacentClue.name,
    firstValueAcross,
    firstValueDown,
    across,
    down,
    currentIndex,
  ]);

  const getAcrossKey = (rowIndex) => {
    switch (rowIndex) {
      case 0:
        return 1;
        break;
      case 1:
        return 5;
        break;
      case 2:
        return 6;
        break;
      case 3:
        return 7;
        break;
      case 4:
        return 8;
        break;

      default:
        return 1;
        break;
    }
  };

  const handleOnGridClick = (rowIndex, colIndex, currentIndex) => {
    if (activeClue.name === "A") {
      setCurrentIndex(rowIndex);
      let key = getAcrossKey(rowIndex);

      setActiveClue({
        name: "A",
        key: key,
        value: across[key],
      });
    } else {
      setCurrentIndex(colIndex);
      setActiveClue({
        name: "D",
        key: colIndex === 0 ? 5 : colIndex,
        value: down[colIndex === 0 ? 5 : colIndex],
      });
    }

    handleFocus(rowIndex, colIndex);

    // console.log(rowIndex, colIndex, currentIndex);
  };

  const handleFocus = (rowIndex, colIndex) => {
    setActiveGrid({
      rgrid: rowIndex,
      cgrid: colIndex,
    });
  };

  const handleClueClick = (name, key, value) => {
    setActiveClue({
      name,
      key: Number(key),
      value,
    });

    if (name === "D") {
      if (Number(key) === 5) {
        setActiveGrid({
          rgrid: 1,
          cgrid: 0,
        });
      } else {
        setActiveGrid({
          rgrid: 0,
          cgrid: Number(key),
        });
      }
    }

    if (name === "A") {
      if (Number(key) === 1) {
        setActiveGrid({
          rgrid: 0,
          cgrid: 1,
        });
      } else {
        setActiveGrid({
          rgrid: key - 4,
          cgrid: 0,
        });
      }
    }
  };

  const handleKeyPress = (e) => {
    const { rgrid, cgrid } = activeGrid;
    console.log(e.key);
    if (e.key === "Backspace") {
      updateGrid(rgrid, cgrid, "");
    }
    // if (data[rgrid][cgrid] !== "") {
    if (e.code === `Key${e.key.toUpperCase()}`) {
      // console.log(`You pressed ${e.key}`, rgrid, cgrid);
      updateGrid(rgrid, cgrid, e.key);
      nextFocus();
    }
    // }

    let key;
    // console.log(Number(e.key));
    switch (e.key) {
      case "ArrowUp":
        if (rgrid === 1 && cgrid === 0) {
          return;
        }
        if (rgrid > 0) {
          setActiveGrid({ rgrid: rgrid - 1, cgrid });
        }
        setActiveClue({
          name: "D",
          key: cgrid === 0 ? 5 : cgrid,
          value: down[cgrid === 0 ? 5 : cgrid],
        });

        break;
      case "ArrowDown":
        if (rgrid === 3 && cgrid === 4) {
          return;
        }
        if (rgrid < data.length - 1) {
          setActiveGrid({ rgrid: rgrid + 1, cgrid });
        }
        setActiveClue({
          name: "D",
          key: cgrid === 0 ? 5 : cgrid,
          value: down[cgrid === 0 ? 5 : cgrid],
        });

        break;
      case "ArrowLeft":
        if (rgrid === 0 && cgrid === 1) {
          return;
        }
        if (cgrid > 0) {
          setActiveGrid({ rgrid, cgrid: cgrid - 1 });
        }

        key = getAcrossKey(rgrid);
        setActiveClue({
          name: "A",
          key: key,
          value: across[key],
        });

        break;
      case "ArrowRight":
        if (rgrid === 4 && cgrid === 3) {
          return;
        }
        if (cgrid < data[rgrid].length - 1) {
          setActiveGrid({ rgrid, cgrid: cgrid + 1 });
        }
        key = getAcrossKey(rgrid);
        setActiveClue({
          name: "A",
          key: key,
          value: across[key],
        });
        break;
      default:
        break;
    }
  };

  const findNextEmptyCellRow = (currentRow, currentCol) => {
    for (let row = currentRow; row < data.length; row++) {
      for (
        let col = row === currentRow ? currentCol + 1 : 0;
        col < data.length;
        col++
      ) {
        if (data[row][col] === "") {
          return { row, col };
        }
      }
    }
  };

  const findNextEmptyCellCol = (currentRow, currentCol) => {
    console.log(
      "Current row and column",
      currentRow,
      currentCol,
      data[0].length,
      data.length
    );
    // for (let col = currentCol; col < data[0].length; col++) {
    //   for (let row = currentRow; row < data.length; row++) {
    //     console.log(row, col, data[row][col]);
    //     if (data[row][col] === "") {
    //       console.log("the empty grid is", row, col);
    //       return { row, col }; // Return the position of the empty cell
    //     }
    //   }
    // }

    //Search in the current col down

    for (let row = currentRow; row < data.length; row++) {
      if (currentRow > 0) {
      }
      if (row === data.length && currentCol !== 0) {
        row = 0;
      }
    }
  };

  const nextFocus = () => {
    const hasBlankSpaces = data.some((row) => row.includes(""));
    if (!hasBlankSpaces) {
      return;
    }
    // console.log(hasBlankSpaces);
    const { rgrid, cgrid } = activeGrid;
    // console.log("the length of the data is", rgrid, cgrid, data.length);
    if (activeClue.name === "D") {
      if (rgrid === 3 && cgrid === 4) {
        if (data[1][0] === "") {
          setActiveGrid({ rgrid: 1, cgrid: 0 });
          handleOnGridClick(1, 0);
          return;
        }

        const { row, col } = findNextEmptyCellCol(1, 0);
        setActiveGrid({ rgrid: row, cgrid: col });
        handleOnGridClick(row, col);
        return;
      }

      if (rgrid < data.length - 1) {
        if (data[rgrid + 1][cgrid] === "") {
          setActiveGrid({ rgrid: rgrid + 1, cgrid });
          handleOnGridClick(rgrid + 1, cgrid);
          return;
        }
        const value = findNextEmptyCellCol(rgrid + 1, cgrid);
        console.log(value);
        // const { row, col } = findNextEmptyCellCol(rgrid + 1, cgrid);
        // setActiveGrid({ rgrid: row, cgrid: col });
        // handleOnGridClick(row, col);
        return;
      }

      if (rgrid === data.length - 1 && cgrid < data.length - 1) {
        if (data[0][cgrid + 1] === "") {
          setActiveGrid({ rgrid: 0, cgrid: cgrid + 1 });
          handleOnGridClick(0, cgrid + 1);
          return;
        }
        const { row, col } = findNextEmptyCellCol(0, cgrid + 1);
        setActiveGrid({ rgrid: row, cgrid: col });
        handleOnGridClick(row, col);
        return;
      }
    }

    if (activeClue.name === "A") {
      if (rgrid === 4 && cgrid === 3) {
        setActiveGrid({ rgrid: 0, cgrid: 1 });
        handleOnGridClick(0, 1);
      }
      if (cgrid < data[rgrid].length - 1) {
        setActiveGrid({ rgrid, cgrid: cgrid + 1 });
        handleOnGridClick(rgrid, cgrid + 1);
      }
      if (cgrid === 4 && rgrid < 4) {
        setActiveGrid({ rgrid: rgrid + 1, cgrid: 0 });
        handleOnGridClick(rgrid + 1, 0);
      }
    }
  };

  return (
    <div className=" w-full h-auto flex flex-col lg:flex-row gap-6 mt-5 justify-between">
      <div className="flex-col justify-center items-center gap-6 min-w-[680px] mx-auto">
        <div className="text-center font-bold max-w-[480px]">
          <span>{activeClue.key}</span>
          <span>{activeClue.name}</span>
          <span className="ml-2"> {activeClue.value}</span>
        </div>
        <CrosswordGrid
          data={data}
          updateGrid={updateGrid}
          activeClue={activeClue}
          currentIndex={currentIndex}
          handleOnGridClick={handleOnGridClick}
          activeGrid={activeGrid}
          handleKeyPress={handleKeyPress}
          handleFocus={handleFocus}
          nextFocus={nextFocus}
        />
      </div>

      {Clues.map((clue, index) => (
        <div
          className="flex gap-4 justify-between border-2 w-full mx-auto lg:w-[50%]  "
          key={index}
        >
          <div className=" w-[50%]">
            <h3 className="mb-2 text-xl font-bold border-b-2 p-3">Across</h3>
            <ul>
              {Object.entries(clue.Across).map(([key, value]) => (
                <li
                  onClick={() => handleClueClick("A", key, value)}
                  name="A"
                  key={key}
                  className={`leading-8 lg:leading-10 flex cursor-pointer ${
                    activeClue.value === value ? "border-4" : ""
                  } ${adjacentClue.value === value ? "border-2" : ""}`}
                >
                  <strong className="mr-3 ml-2">{key} </strong>
                  <p>{value}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-[50%]">
            <h3 className="mb-2 text-xl font-bold border-b-2 p-3">Down</h3>
            <ul>
              {Object.entries(clue.Down).map(([key, value]) => (
                <li
                  onClick={() => handleClueClick("D", key, value)}
                  key={key}
                  className={`leading-8 lg:leading-10 flex cursor-pointer ${
                    activeClue.value === value ? "border-4" : ""
                  } ${adjacentClue.value === value ? "border-2" : ""}`}
                >
                  <strong className="mr-3 ml-2">{key} </strong>
                  <p>{value}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HeroComponent;
