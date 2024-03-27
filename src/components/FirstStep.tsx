import Buttons from "./Buttons";
import Heading from "./Heading";
import { ChangeEvent, useEffect, useState } from "react";

export default function FirstStep() {
  const [nameIsEmpty, setNameIsEmpty] = useState(true);
  const [numberIsEmpty, setNumberIsEmpty] = useState(true);
  const [emailIsEmpty, setEmailIsEmpty] = useState(true);

  const [emailIsValid, setEmailIsValid] = useState(false);
  const [firstPageValid, setFirstPageValid] = useState(false);
  const [errors, setErrorsVisible] = useState(false);

  const useValidate = useEffect(() => {
    if (!nameIsEmpty && !numberIsEmpty && emailIsValid) {
      setFirstPageValid(true);
    } else {
      setFirstPageValid(false);
    }
  }, [emailIsValid, nameIsEmpty, numberIsEmpty]);

  function showErrors() {
    setErrorsVisible(true);
  }

  function validateName(event: ChangeEvent) {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    if (value == "") {
      setNameIsEmpty(true);
    } else {
      setNameIsEmpty(false);
    }
    useValidate;
  }

  function validateEmail(event: ChangeEvent) {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    if (value == "") {
      setEmailIsEmpty(true);
    } else {
      setEmailIsEmpty(false);
    }
    if (value.includes("@") == true) {
      setEmailIsValid(true);
    } else {
      setEmailIsValid(false);
    }
    useValidate;
  }

  function validateNumber(event: ChangeEvent) {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    if (value == "") {
      setNumberIsEmpty(true);
    } else {
      setNumberIsEmpty(false);
    }
    useValidate;
  }

  return (
    <div>
      <Heading
        main="Personal info"
        sub="Please provide your name, email address, and phone number."
      />
      <div className="flex flex-col gap-5 mt-8">
        <div>
          <label htmlFor="name" className="text-sm text-[#02295a] font-medium">
            Name
          </label>
          <label
            htmlFor="name"
            className={
              errors
                ? "text-sm text-[#ed3548] font-medium float-right"
                : "hidden"
            }
          >
            {nameIsEmpty ? "This field is required" : ""}
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="e.g. Stephen King"
            className={
              errors && nameIsEmpty
                ? "block w-full h-10 p-3 rounded-md ring-[#ed3548] ring-1 mt-1 focus:outline-0 focus:ring-[#473dff] text-[#02295a] font-semibold placeholder:font-medium"
                : "block w-full h-10 p-3 rounded-md ring-[#d6d9e6] ring-1 mt-1 focus:outline-0 focus:ring-[#473dff] text-[#02295a] font-semibold placeholder:font-medium"
            }
            onChange={validateName}
          />
        </div>
        <div>
          <label htmlFor="email" className="text-sm text-[#02295a] font-medium">
            Email Address
          </label>

          <label
            htmlFor="email"
            className={
              errors
                ? "text-sm text-[#ed3548] font-medium float-right"
                : "hidden"
            }
          >
            {emailIsEmpty ? "This field is required" : ""}
            {!emailIsValid && !emailIsEmpty ? "Enter a valid email" : ""}
          </label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="e.g. stephenking@lorem.com"
            className={
              errors && !emailIsValid
                ? "block w-full h-10 p-3 rounded-md ring-[#ed3548] ring-1 mt-1 focus:outline-0 focus:ring-[#473dff] text-[#02295a] font-semibold placeholder:font-medium"
                : "block w-full h-10 p-3 rounded-md ring-[#d6d9e6] ring-1 mt-1 focus:outline-0 focus:ring-[#473dff] text-[#02295a] font-semibold placeholder:font-medium"
            }
            onChange={validateEmail}
          />
        </div>
        <div>
          <label htmlFor="phone" className="text-sm text-[#02295a] font-medium">
            Phone Number
          </label>

          <label
            htmlFor="phone"
            className={
              errors
                ? "text-sm text-[#ed3548] font-medium float-right"
                : "hidden"
            }
          >
            {numberIsEmpty ? "This field is required" : ""}
          </label>
          <input
            type="number"
            name="phone"
            id="phone"
            placeholder="e.g. +1 234 567 890"
            className={
              errors && numberIsEmpty
                ? "block w-full h-10 p-3 rounded-md ring-[#ed3548] ring-1 mt-1 focus:outline-0 focus:ring-[#473dff] text-[#02295a] font-semibold placeholder:font-medium"
                : "block w-full h-10 p-3 rounded-md ring-[#d6d9e6] ring-1 mt-1 focus:outline-0 focus:ring-[#473dff] text-[#02295a] font-semibold placeholder:font-medium"
            }
            onChange={validateNumber}
          />
        </div>
      </div>
      <div onClick={showErrors}>
        <Buttons page={0} text="Next Step" valid={firstPageValid} />
      </div>
    </div>
  );
}
