import thanks from "/assets/images/icon-thank-you.svg";

export default function SecondStep() {
  return (
    <div className="flex flex-col gap-4 mt-16 md:mt-32 items-center text-center">
      <img src={thanks} alt="checkmark icon" className="w-16" />
      <h1>Thank you!</h1>
      <p>
        Thanks for confirming your subscription! We hope you have fun using our
        platform. If you ever need support, please feel free to email us at
        support@loremgaming.com.
      </p>
    </div>
  );
}
