import background from "../assets/images/bg-sidebar-desktop.svg";

export default function Sidebar({ active }: { active: number }) {
  const items = ["YOUR INFO", "SELECT PLAN", "ADD-ONS", "SUMMARY"];

  return (
    <div
      className="w-64 h-full bg-no-repeat bg-contain row-span-2"
      style={{ backgroundImage: `url(${background})` }}
    >
      <ul className="p-8">
        {items.map((item, index) => (
          <li
            key={item}
            className="flex place-items-center gap-4 mb-5 text-white"
          >
            <div
              className={
                active == index
                  ? "w-8 h-8 rounded-full text-center font-semibold bg-[#bfe2fd] ring-1 ring-[#473dff] text-black flex place-items-center justify-center"
                  : "w-8 h-8 rounded-full text-center font-semibold bg-transparent ring-1 ring-white flex place-items-center justify-center"
              }
            >
              <p>{index + 1}</p>
            </div>
            <div>
              <p className="text-xs text-[#d6d9e6]">STEP {index + 1}</p>
              <p className="text-sm font-semibold">{item}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
