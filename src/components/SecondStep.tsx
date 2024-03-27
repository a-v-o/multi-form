import Heading from "./Heading";
import arcade from "../assets/images/icon-arcade.svg";
import advanced from "../assets/images/icon-advanced.svg";
import pro from "../assets/images/icon-pro.svg";
import { useContext } from "react";
import { AppContext } from "../App";
import Buttons from "./Buttons";

interface Plan {
  src: string;
  heading: string;
  price: number;
  selected: boolean;
}

const plans = [
  { src: arcade, heading: "Arcade", price: 9, selected: false },
  { src: advanced, heading: "Advanced", price: 12, selected: false },
  { src: pro, heading: "Pro", price: 15, selected: false },
];

export default function SecondStep() {
  const context = useContext(AppContext);
  const plan = context.plan;
  const dispatch = context.dispatch;
  const monthly = context.billing == "monthly";

  function handleChange(plan: Plan) {
    dispatch({
      type: "choosePlan",
      plan: { name: plan.heading, price: plan.price },
    });
  }

  return (
    <div>
      <Heading
        main="Select your plan"
        sub="You have the option of monthly or yearly billing."
      ></Heading>
      <div className="grid md:grid-cols-3 gap-5 mt-8 text-[#02295a]">
        {plans.map((plan) => (
          <div
            key={plan.heading}
            className={
              context.plan.name == plan.heading
                ? "p-4 ring-1 ring-[#473dff] rounded-lg bg-[#f0f6ff] cursor-pointer"
                : "p-4 ring-1 ring-[#d6d9e6] rounded-lg hover:ring-[#473dff] cursor-pointer"
            }
            onClick={() => handleChange(plan)}
          >
            <div className="md:block flex items-start">
              <img
                src={plan.src}
                alt="plan.heading"
                className="md:mb-10 mt-1 mr-4 md:mr-0 md:mt-0"
              />
              <div>
                <h2 className="font-semibold">{plan.heading}</h2>
                <p className="text-[#9699ab] text-sm">
                  ${monthly ? `${plan.price}/mo` : `${plan.price * 10}/yr`}
                </p>
                {!monthly && <p className="text-sm font-bold">2 months free</p>}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center w-full mt-8 py-3 rounded-lg gap-6 place-items-center bg-[#f0f6ff]">
        <p
          className={
            monthly
              ? "font-semibold text-[#02295a]"
              : "font-semibold text-[#9699ab]"
          }
        >
          Monthly
        </p>
        <div className="w-10 h-5">
          <label
            htmlFor="plan-toggle"
            className="absolute w-10 h-5 bg-[#02295a] rounded-xl"
          >
            <input
              type="checkbox"
              id="plan-toggle"
              onChange={() => {
                dispatch({ type: "changeBilling" });
              }}
              className="peer hidden relative"
            />
            <span className="w-3 h-3 rounded-full bg-white block peer-checked:translate-x-5 mt-1 ml-1 transition"></span>
          </label>
        </div>
        <p
          className={
            monthly
              ? "font-semibold text-[#9699ab]"
              : "font-semibold text-[#02295a]"
          }
        >
          Yearly
        </p>
      </div>
      <div>
        <Buttons page={1} text="Next Step" valid={plan.name != ""} />
      </div>
    </div>
  );
}
