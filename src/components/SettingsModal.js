import React from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";

const SettingsModal = ({
  handleSettingsClick,
  selectedDirection,
  handleDirectionChange,
  spaceBarDirection,
  handleSpaceBarPress,
  backSpaceDirection,
  handleBackSpaceClick,
  skipWords,
  handleSkipWords,
  skipPencilWords,
  handleskipPencilWords,
  findFirstBlank,
  handleFindBlank,
  jumpNextClue,
  handleJumpNextClue,
  playSound,
  handlePlaySound,
  showTimer,
  handleTimerVisibility,
  showWarning,
  handleWarnings,
  showPuzzleMilestone,
  handleMilestone,
  handleResetDefault,
}) => {
  return (
    <div className="top-0 left-0 right-0 bottom-0 w-full h-[100vh] fixed z-30 mx-auto flex backdrop-blur-sm items-center justify-center">
      <div className="w-1/2  h-[auto] bg-white z-50 border-2 border-black p-4 mt-10 relative mb-10">
        <div className="w-full flex justify-between items-center p-6">
          <h2 className="font-bold text-3xl">Puzzle Settings</h2>
          <div
            className="cursor-pointer absolute right-0 top-0 p-4"
            onClick={handleSettingsClick}
          >
            <IoIosCloseCircleOutline size={22} />
          </div>
        </div>

        <div className="w-full flex  items-start h-auto">
          <div className="w-1/2 h-full bg-blue text-center p-6">
            <div>
              <h2 className="font-semibold text-sm text-left">
                After changing direction with arrow keys
              </h2>
              <div className="flex flex-col space-y-2 mt-2">
                <label className="inline-flex items-center gap-x-2 text-xs">
                  <input
                    type="radio"
                    value="Stay in the same"
                    name="Stay in the same"
                    checked={selectedDirection === "Stay in the same"}
                    onChange={handleDirectionChange}
                  />
                  <span>Stay in the same square</span>
                </label>
                <label className="inline-flex items-center gap-x-2 text-xs">
                  <input
                    type="radio"
                    value="Move in the direction"
                    name="Move in the direction"
                    checked={selectedDirection === "Move in the direction"}
                    onChange={handleDirectionChange}
                  />
                  <span>Move in the direction of the arrow</span>
                </label>
              </div>
            </div>

            <div>
              <h2 className="font-semibold text-sm text-left mt-3">
                Pressing the spacebar should
              </h2>
              <div className="flex flex-col space-y-2 mt-2">
                <label className="inline-flex items-center gap-x-2 text-xs">
                  <input
                    type="radio"
                    value="clear current"
                    name="clear current"
                    checked={spaceBarDirection === "clear current"}
                    onChange={handleSpaceBarPress}
                  />
                  <span>Clear the current square and advance</span>
                </label>
                <label className="inline-flex items-center gap-x-2 text-xs">
                  <input
                    type="radio"
                    value="toggle direction"
                    name="toggle direction"
                    checked={spaceBarDirection === "toggle direction"}
                    onChange={handleSpaceBarPress}
                  />
                  <span>Toggle between Across and Down</span>
                </label>
              </div>
            </div>

            <div>
              <h2 className="font-semibold text-sm text-left mt-3">
                At the start of a word
              </h2>
              <div className="flex flex-col space-y-2 mt-2">
                <label className="inline-flex items-center gap-x-2 text-xs">
                  <input
                    type="checkbox"
                    value="Stay in the same"
                    name="Stay in the same"
                    checked={backSpaceDirection === true}
                    onChange={handleBackSpaceClick}
                  />
                  <span>Backspace into previous word</span>
                </label>
              </div>
            </div>

            <div>
              <h2 className="font-semibold text-sm text-left mt-3">
                Within a word
              </h2>
              <div className="flex flex-col space-y-2 mt-2">
                <label className="inline-flex items-center gap-x-2 text-xs">
                  <input
                    type="checkbox"
                    value="Stay in the same"
                    name="Stay in the same"
                    checked={skipWords === true}
                    onChange={handleSkipWords}
                  />
                  <span>Skip over filled square</span>
                </label>
                <label className="inline-flex items-center gap-x-2 text-xs ml-6">
                  <input
                    type="checkbox"
                    value="Stay in the same"
                    name="Stay in the same"
                    checked={skipPencilWords === true}
                    onChange={handleskipPencilWords}
                  />
                  <span>Even penciled-in squares</span>
                </label>
              </div>
            </div>
          </div>
          <div className="w-1/2 h-full bg-blue text-center p-6 ">
            <div>
              <h2 className="font-semibold text-sm text-left">
                At the end of a word
              </h2>
              <div className="flex flex-col space-y-2 mt-2">
                <label className="inline-flex items-center gap-x-2 text-xs">
                  <input
                    type="checkbox"
                    value="Stay in the same"
                    name="Stay in the same"
                    checked={findFirstBlank === true}
                    onChange={handleFindBlank}
                  />
                  <span>Jump back to the first blank in the word</span>
                </label>
                <label className="inline-flex items-center gap-x-2 text-xs">
                  <input
                    type="checkbox"
                    value="Stay in the same"
                    name="Stay in the same"
                    checked={jumpNextClue === true}
                    onChange={handleJumpNextClue}
                  />
                  <span>Jump to next clue(if not jumping back)</span>
                </label>
              </div>
            </div>

            <div>
              <h2 className="font-semibold text-sm text-left mt-3">
                Interactions
              </h2>
              <div className="flex flex-col space-y-2 mt-2">
                <label className="inline-flex items-center gap-x-2 text-xs">
                  <input
                    type="checkbox"
                    value="Stay in the same"
                    name="Stay in the same"
                    checked={playSound === true}
                    onChange={handlePlaySound}
                  />
                  <span>Play sound on solve</span>
                </label>
                <label className="inline-flex items-center gap-x-2 text-xs">
                  <input
                    type="checkbox"
                    value="Stay in the same"
                    name="Stay in the same"
                    checked={showTimer === true}
                    onChange={handleTimerVisibility}
                  />
                  <span>Show timer</span>
                </label>

                <label className="inline-flex items-center gap-x-2 text-xs">
                  <input
                    type="checkbox"
                    value="Stay in the same"
                    name="Stay in the same"
                    checked={showWarning === true}
                    onChange={handleWarnings}
                  />
                  <span>Supress disqualification warnings</span>
                </label>

                <label className="inline-flex items-center gap-x-2 text-xs">
                  <input
                    type="checkbox"
                    value="Stay in the same"
                    name="Stay in the same"
                    checked={showPuzzleMilestone === true}
                    onChange={handleMilestone}
                  />
                  <span>Show puzzle milestone</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex justify-center gap-x-7 items-center mx-auto mt-4 pb-4">
          <button
            onClick={handleResetDefault}
            className="border-black rounded-3xl border-2 px-4 py-2 text-sm font-medium"
          >
            Restore Defaults
          </button>
          <button
            onClick={handleSettingsClick}
            className="border-black rounded-3xl border-2 px-4 py-2 text-sm font-medium bg-black text-white text-center"
          >
            Save and Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
