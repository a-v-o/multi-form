import { useContext } from "react";
import Heading from "./Heading";
import { AppContext } from "../App";
import Buttons from "./Buttons";

interface AddOn {
  name: string;
  heading: string;
  description: string;
  price: number;
  selected: boolean;
}

const addOns = [
  {
    name: "online",
    heading: "Online Service",
    description: "Access to multiplayer games",
    price: 1,
    selected: false,
  },
  {
    name: "storage",
    heading: "Larger storage",
    description: "Extra 1TB of cloud save",
    price: 2,
    selected: false,
  },
  {
    name: "profile",
    heading: "Customizable Profile",
    description: "Access to multiplayer games",
    price: 2,
    selected: false,
  },
];

export default function ThirdStep() {
  const context = useContext(AppContext);
  const monthly = context.billing == "monthly";
  const dispatch = context.dispatch;

  function handleChange(addOn: AddOn) {
    if (addOn.selected == false) {
      addOn.selected = true;
      dispatch({
        type: "addOn",
        addOn: { name: addOn.heading, price: addOn.price },
      });
    } else {
      addOn.selected = false;
      dispatch({
        type: "removeAddOn",
        addOn: { name: addOn.heading, price: addOn.price },
      });
    }
  }

  return (
    <div>
      <Heading
        main="Pick add-ons"
        sub="Add-ons help enhance your gaming experience."
      ></Heading>
      <div className="flex flex-col gap-4 mt-7">
        {addOns.map((addOn) => {
          return (
            <label key={addOn.heading} htmlFor={addOn.name}>
              <div
                className={
                  addOn.selected
                    ? "flex place-items-center ring-1 ring-[#473dff] p-4 rounded-lg bg-[#f0f6ff]"
                    : "flex place-items-center ring-1 ring-[#d6d9e6] hover:ring-[#473dff] p-4 rounded-lg"
                }
              >
                <input
                  type="checkbox"
                  name={addOn.name}
                  id={addOn.name}
                  onChange={() => handleChange(addOn)}
                  className="w-4 h-4 mr-4 ring-1 ring-[#d6d9e6] rounded-sm appearance-none checked:appearance-auto checked:ring-0 accent-[#473dff]"
                />
                <div>
                  <h2 className="text-[#02295a] font-bold">{addOn.heading} </h2>
                  <p className="text-[#9699ab] text-sm">{addOn.description} </p>
                </div>
                <p className="ml-auto text-[#473dff]">
                  +${monthly ? `${addOn.price}/mo` : `${addOn.price * 10}/yr`}
                </p>
              </div>
            </label>
          );
        })}
      </div>
      <div>
        <Buttons page={1} text="Next Step" valid={true} />
      </div>
    </div>
  );
}
