import { useState, useEffect } from "react";

// modalType: Countdown => countdown -> remove modal,
//            ReadyBtn  => ReadyBtn -> empty modal & disable background
//            Wait
//            Finished
const Modal = ({ modalType, onReady, finishedStats, players, onReset }) => {
  const [countdownValue, setCountdownValue] = useState("3");
  const [modalState, setModalState] = useState(modalType); // Countdown, Hide, ReadyBtn, Cover
  const [countdownTimerInterval, setCountdownTimerInterval] = useState();

  const handleButtonClicked = () => {
    setModalState("Cover");
    onReady();
  };

  const readyBtn = () => {
    return (
      <button
        className="bg-black px-5 py-1 pb-4 text-7xl rounded-t-lg rounded-b-[2px] border-stone-500 border-b-[10px] hover:border-b-[4px] hover:border-stone-600"
        onClick={handleButtonClicked}
      >
        Ready
      </button>
    );
  };

  useEffect(() => {
    if (modalType === "Countdown") {
      console.log(modalType, "in countdown");

      let ci = setInterval(() => {
        if (countdownValue !== 0) {
          setCountdownValue(countdownValue--);
        } else {
          setTimeout(() => {
            setModalState("Hide");
            clearInterval(countdownTimerInterval);
            setCountdownTimerInterval(null);
          }, 500);
        }
      }, 1000);
      setCountdownTimerInterval(ci);
    }
    if (modalType === "Wait") {
      clearInterval(countdownTimerInterval);
    }
  }, [modalType]);

  const countdown = () => {
    return (
      <h1 className="bg-black px-5 py-2 text-7xl rounded-lg">
        {countdownValue}
      </h1>
    );
  };

  const scoreboard = () => {
    return (
      <div className="flex flex-col items-center -mt-[20%]">
        <table className="table-auto  border-collapse border-spacing-2 text-sm text-center">
          <thead className="text-xl">
            <tr>
              <th className="px-[30px] py-[10px] border-b border-b-gray-700">
                Player
              </th>
              <th className="px-[30px]  py-[10px] border-b border-b-gray-700">
                #
              </th>
              <th className="px-[30px]  py-[10px] border-b border-b-gray-700">
                WPM
              </th>
              <th className="px-[30px]  py-[10px] border-b border-b-gray-700">
                Accuracy
              </th>
              <th className="px-[30px]  py-[10px] border-b border-b-gray-700">
                Duration
              </th>
            </tr>
          </thead>
          <tbody>
            {finishedStats.map((row, i) => {
              if (players[row.playerId]) {
                return (
                  <tr key={row.playerId}>
                    <td className="px-[30px] py-[5px] ">
                      {players[row.playerId].displayName}
                    </td>
                    <td className="px-[30px] py-[5px] ">{i + 1}</td>
                    <td className="px-[30px] py-[5px] ">{row.wpm}</td>
                    <td className="px-[30px] py-[5px] ">{row.accuracy}%</td>
                    <td className="px-[30px] py-[5px] ">{row.duration}s</td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
        <button
          onClick={onReset}
          className="bg-neutral-500 px-5 py-3 border rounded-lg border-[cyan] hover:bg-neutral-600 mt-20"
        >
          RESET GAME!
        </button>
      </div>
    );
  };

  if (modalState !== "Hide") {
    return (
      <div className="absolute h-screen w-screen opacity-[98%] bg-[gray] z-[10] ">
        <div className="flex h-screen w-screen justify-center items-center">
          {modalType === "Countdown" ? countdown() : ""}
          {modalType === "ReadyBtn" && modalState !== "Cover" ? readyBtn() : ""}
          {modalType === "ReadyBtn" && modalState === "Cover" ? (
            <div>
              <p className="p-10 bg-black opacity-40 rounded-lg">
                Waiting for other players...
              </p>
            </div>
          ) : (
            ""
          )}
          {modalType === "Wait" ? (
            <div>
              <p className="p-10 bg-black opacity-40 rounded-lg">
                Please wait for game to finish...
              </p>
            </div>
          ) : (
            ""
          )}
          {modalType === "Finished" ? scoreboard() : ""}
        </div>
      </div>
    );
  }
};

export default Modal;
