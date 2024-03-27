export default function Heading({ main, sub }: { main: string; sub: string }) {
  return (
    <div>
      <h1 className="text-3xl font-bold text-[#02295a]">{main}</h1>
      <p className="text-base text-[#9699ab]">{sub}</p>
    </div>
  );
}
