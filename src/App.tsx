import { Dispatch, Reducer, createContext, useReducer } from "react";
import background from "/assets/images/bg-sidebar-mobile.svg";
import Sidebar from "./components/Sidebar";
import FirstStep from "./components/FirstStep";
import SecondStep from "./components/SecondStep";
import ThirdStep from "./components/ThirdStep";
import FourthStep from "./components/FourthStep";
import FifthStep from "./components/FifthStep";
import "./App.css";

interface AddOn {
  name: string;
  price: number;
}

interface Plan {
  name: string;
  price: number;
}

interface Action {
  type: string;
  plan?: Plan;
  addOn?: AddOn;
}

interface Context {
  billing: string;
  addOns: Array<AddOn>;
  plan: Plan;
  dispatch: Dispatch<Action>;
}

export const AppContext = createContext<Context>({
  billing: "",
  addOns: [],
  plan: { name: "", price: 0 },
  dispatch: {} as Dispatch<Action>,
});

function App() {
  interface State {
    page: number;
    plan: Plan;
    billing: string;
    addOns: Array<AddOn>;
  }

  const initial: State = {
    page: 0,
    plan: { name: "", price: 0 },
    billing: "monthly",
    addOns: [],
  };

  const reducer: Reducer<State, Action> = (state, action) => {
    switch (action.type) {
      case "next":
        if (state.page >= 4) {
          return { ...state };
        }
        return {
          ...state,
          page: state.page + 1,
        };
      case "prev":
        if (state.page <= 0) {
          return { ...state };
        }
        return {
          ...state,
          page: state.page - 1,
        };
      case "changeBilling":
        if (state.billing == "monthly") {
          return { ...state, billing: "yearly" };
        }
        return {
          ...state,
          billing: "monthly",
        };
      case "addOn":
        if (action.addOn != undefined) {
          return { ...state, addOns: [...state.addOns, action.addOn] };
        } else {
          return { ...state };
        }
      case "removeAddOn":
        if (action.addOn != undefined) {
          return {
            ...state,
            addOns: [...state.addOns.filter((addon) => addon != action.addOn)],
          };
        } else {
          return { ...state };
        }

      case "choosePlan":
        if (action.plan != undefined) {
          return {
            ...state,
            plan: action.plan,
          };
        } else {
          return {
            ...state,
          };
        }

      default:
        console.log("Invalid action");
        return state;
    }
  };

  const steps = [0, 1, 2, 3];
  const [state, dispatch] = useReducer(reducer, initial);
  const addOns = state.addOns;
  const page = state.page;
  const billing = state.billing;
  const plan = state.plan;

  return (
    <AppContext.Provider
      value={{
        billing,
        addOns,
        plan,
        dispatch,
      }}
    >
      <div className="bg-[#f0f6ff] w-screen h-screen">
        <div
          className="md:hidden w-screen h-48 bg-no-repeat bg-cover"
          style={{ backgroundImage: `url(${background})` }}
        >
          <div className="flex gap-4 justify-evenly w-1/2 m-auto text-white pt-10">
            {steps.map((step) => (
              <div
                key={step}
                className={
                  page == step
                    ? "w-8 h-8 rounded-full text-center font-semibold bg-[#bfe2fd] ring-1 ring-[#473dff] text-black flex place-items-center justify-center"
                    : "w-8 h-8 rounded-full text-center font-semibold bg-transparent ring-1 ring-white flex place-items-center justify-center"
                }
              >
                <p>{step + 1}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="w-[92%] md:w-2/3 min-h-[50%] md:min-h-[90%] absolute top-28 md:top-1/2 left-1/2 -translate-x-1/2 md:-translate-y-1/2 p-3 md:pr-14 box-border rounded-lg mx-auto grid grid-cols-[_auto_1fr] md:gap-10 bg-white">
          <div className="hidden md:block">
            <Sidebar active={page} />
          </div>

          <div className="p-2 pt-4 md:p-8 md:relative">
            <div className={page == 0 ? "block" : "hidden"}>
              <FirstStep />
            </div>
            <div className={page == 1 ? "block" : "hidden"}>
              <SecondStep />
            </div>
            <div className={page == 2 ? "block" : "hidden"}>
              <ThirdStep />
            </div>
            <div className={page == 3 ? "block" : "hidden"}>
              <FourthStep />
            </div>
            <div className={page == 4 ? "block" : "hidden"}>
              <FifthStep />
            </div>
          </div>
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
