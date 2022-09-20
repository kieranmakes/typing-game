import React, { useState } from "react";
import Modal from "../../components/Modal";

function test() {
  return (
    <div>
      <Modal
        modalType="Finished"
        finishedStats={[
          {
            playerId: "9PPJAdiubfF6p6UQAAAB",
            wpm: 62,
            accuracy: 96.15,
            duration: 5,
          },
          {
            playerId: "jppppppppd",
            wpm: 62,
            accuracy: 96.15,
            duration: 5,
          },
        ]}
        players={{
          "9PPJAdiubfF6p6UQAAAB": {
            displayName: "woop",
            completion: 0,
          },
          jppppppppd: {
            displayName: "Kieran",
            completion: 0,
          },
        }}
      />
    </div>
  );
}

export default test;
