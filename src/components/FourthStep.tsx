import Heading from "./Heading";
import { AppContext } from "../App";
import { useContext } from "react";
import Buttons from "./Buttons";

export default function SecondStep() {
  const context = useContext(AppContext);
  const dispatch = context.dispatch;
  const monthly = context.billing === "monthly";
  const price = context.plan.price;
  let total = 0;
  context.addOns.map((addOn) => {
    total += addOn.price;
  });
  total += price;

  return (
    <div>
      <Heading
        main="Finishing up"
        sub="Double-check everything looks OK before confirming."
      ></Heading>
      <div className="bg-[#fafbff] p-4 divide-y-2 mt-8 rounded-lg divide-[#d6d9e6]">
        <div className="flex justify-between pb-4">
          <div>
            <h2 className="text-[#02295a] font-bold">
              {context.plan.name} ({context.billing[0].toUpperCase()}
              {context.billing.slice(1)})
            </h2>
            <a
              className="text-sm text-[#9699ab] underline hover:text-[#473dff]"
              onClick={() => dispatch({ type: "prev" })}
            >
              Change
            </a>
          </div>
          <p className="font-bold text-[#02295a]">
            +${monthly ? `${price}/mo` : `${price * 10}/yr`}
          </p>
        </div>
        <div>
          {context.addOns.map((addOn) => {
            return (
              <div key={addOn.name} className="flex justify-between pt-4">
                <h2 className="text-sm text-[#9699ab]">{addOn.name}</h2>
                <p className="text-[#02295a] font-medium text-sm">
                  +${monthly ? `${addOn.price}/mo` : `${addOn.price * 10}/yr`}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex justify-between place-items-center mt-4 pl-4 pr-4">
        <p className="text-[#9699ab] text-sm">
          Total (per {monthly ? "month" : "year"})
        </p>
        <p className="text-[#473dff] text-xl font-bold">
          +${monthly ? total : total * 10}/{monthly ? "mo" : "yr"}{" "}
        </p>
      </div>
      <div>
        <Buttons page={1} text="Submit" valid={true} />
      </div>
    </div>
  );
}
