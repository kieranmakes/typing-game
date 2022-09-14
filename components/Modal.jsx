import { useState, useEffect } from "react";

// modalType: Countdown => countdown -> remove modal,
//            ReadyBtn  => ReadyBtn -> empty modal & disable background
const Modal = ({ modalType, onReady }) => {
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
        className="bg-black px-5 py-2 text-7xl rounded-t-lg rounded-b-md border-stone-500 border-b-[10px] hover:border-b-[4px] hover:border-stone-600"
        onClick={handleButtonClicked}
      >
        Ready
      </button>
    );
  };

  useEffect(() => {
    if (modalType === "Countdown") {
      let ci = setInterval(() => {
        if (countdownValue !== 0) {
          setCountdownValue(countdownValue--);
        } else {
          setTimeout(() => {
            setModalState("Hide");
            clearInterval(countdownTimerInterval);
            setCountdownTimerInterval(null);
            setCountdownValue(3);
          }, 2000);
        }
      }, 1000);
      setCountdownTimerInterval(ci);
    }
  }, [modalType]);

  const countdown = () => {
    return (
      <h1 className="bg-black px-5 py-2 text-7xl rounded-lg">
        {countdownValue}
      </h1>
    );
  };

  if (modalState !== "Hide") {
    return (
      <div className="absolute h-screen w-screen opacity-80 bg-[gray] z-[10] mix-blend-invert">
        <div className="flex h-screen w-screen justify-center items-center">
          {modalType === "Countdown" ? countdown() : ""}
          {modalType === "ReadyBtn" && modalState !== "Cover" ? readyBtn() : ""}
          {modalType === "ReadyBtn" && modalState === "Cover" ? (
            <div>
              <p className="p-10 bg-black opacity-40 rounded-lg">
                Waiting for other players...
              </p>
              {/* {players.forEach((player) => { */}
              {/*   return <p>player.displayName</p>; */}
              {/* })} */}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
};

export default Modal;
