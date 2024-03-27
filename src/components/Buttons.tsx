import { useContext } from "react";
import { AppContext } from "../App";

export default function Buttons({
  page,
  text,
  valid,
}: {
  page: number;
  text: string;
  valid: boolean;
}) {
  const context = useContext(AppContext);
  const dispatch = context.dispatch;

  return (
    <div className="w-full absolute -bottom-20 md:top-[480px] md:bottom-0 right-0">
      <div className="flex justify-between w-full md:pr-8 md:pl-8 pb-4">
        <button
          className={
            page == 0
              ? "text-[#9699ab] text-sm invisible"
              : "text-[#9699ab] text-sm p-4 md:p-0"
          }
          onClick={() => {
            dispatch({ type: "prev" });
          }}
        >
          Go Back
        </button>
        <button
          className="w-24 h-10 bg-[#02295a] rounded-lg text-white text-sm "
          onClick={() => {
            if (!valid) {
              return;
            }
            dispatch({ type: "next" });
          }}
        >
          {text}
        </button>
      </div>
    </div>
  );
}
