import { serverPath } from "../../config";
import { useState, useEffect } from "react";

type INewsletterFormProps = any;

const NewsletterForm = (props: INewsletterFormProps) => {
  const [submitting, setSubmitting] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);

  const handleFormSubmit = async (event: any) => {
    event.preventDefault();

    if (submitting || remainingTime > 0) {
      return; // don't allow submission if the form is already being submitted or the user needs to wait
    }

    const emailAddress = event.target[0].value;

    if (!emailAddress) {
      //TODO: toss up some alert thing
      alert("cannot submit empty email address");
      return; // don't allow empty submissions
    }

    setSubmitting(true);

    const res = await fetch(
      `${serverPath}/api/spreadsheet/append-email?email=${emailAddress}`,
      { method: "GET" }
    );

    try {
      const { email } = await res.json();
      console.log("saved email:", email);
      setRemainingTime(9);
    } catch (error) {
      console.log("Error: ", error);
      alert(`Error: ${error}`);
      //TODO: toss up error info using error boundary thingy for whole app
    } finally {
      setSubmitting(false);
      event.target[0].value = "";
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (remainingTime > 0) {
        setRemainingTime(remainingTime - 1);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [remainingTime]);

  return (
    <form
      id="newsletter-signup"
      className="bg-gray-700 px-4 py-6 rounded shadow mx-auto w-90"
      onSubmit={(event) => handleFormSubmit(event)}
    >
      {/* <p className="mb-4">Newsletter Signup</p> */}
      <input
        className="bg-gray-600 w-full mb-4 p-2 text-white rounded"
        type="email"
        placeholder="Email"
      />
      <button
        className="bg-green-400 hover:bg-green-500 text-gray-800 px-4 py-2 rounded cursor-pointer"
        disabled={submitting || remainingTime > 0}
      >
        {submitting ? "Submitting..." : "Sign Up"}
      </button>
    </form>
  );
};

export default NewsletterForm;
