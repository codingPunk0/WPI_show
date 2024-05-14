import copy from "copy-to-clipboard";
import { useState } from "react";
import { IoIosCopy } from "react-icons/io";
import { FaCheck } from "react-icons/fa";

export const EachMnemonic = ({ mnemonic }) => {
  const [copied, setCopied] = useState(false);

  if (copied) {
    setTimeout(() => {
      setCopied(false);
    }, 5000);
  }

  return (
    <div className="border md:w-[60%] mx-auto p-3 md:p-5 mt-3 flex flex-row">
      <p className="flex-grow">{mnemonic}</p>

      {copied ? (
        <button
          disabled
          className="ml-3">
          <FaCheck />
        </button>
      ) : (
        <button
          onClick={() => {
            copy(mnemonic);
            setCopied(true);
          }}
          className="ml-3">
          <IoIosCopy />
        </button>
      )}
    </div>
  );
};
