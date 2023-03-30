import { serverPath } from "../../config";
import { useState, useEffect } from "react";
import styles from './NewsletterForm.module.css';


type INewsletterFormProps = any;

const NewsletterForm = (props: INewsletterFormProps) => {
  const [submitting, setSubmitting] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  const handleFormSubmit = async (event: any) => {
    event.preventDefault();
    setSubmissionSuccess(false);

    const submissionCountStr = localStorage.getItem("emailSubmissions");
    let submissionCount: number = submissionCountStr
      ? JSON.parse(submissionCountStr)
      : 0;

    if (submitting || remainingTime > 0 || submissionCount > 3) {
      return;
    }

    const emailAddress = event.target[0].value;

    if (
      ! emailAddress ||
      emailAddress.length < 3 ||
      ! emailAddress.includes("@")
    ) {
      //TODO: toss up some alert thing
      alert("invalid email address");
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

      submissionCount += 1;
      localStorage.setItem("emailSubmissions", submissionCount.toString());
      setRemainingTime(10);
      setSubmissionSuccess(true);

      setTimeout(() => {
        setSubmissionSuccess(false);
      }, 5000);
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
      className="w-85 bg-gray-700 px-4 py-6 rounded shadow mx-auto"
      onSubmit={(event) => handleFormSubmit(event)}
    >
      {/* <p className="mb-4">Newsletter Signup</p> */}
      <input
        className="bg-gray-600 w-full mb-4 p-2 text-white rounded"
        type="email"
        placeholder="Email"
        required
      />
      <button
        className="bg-green-400 hover:bg-green-500 text-gray-800 px-4 py-2 rounded cursor-pointer"
        disabled={submitting || remainingTime > 0}
      >
        {submitting ? "Submitting..." : "Sign Up"}
      </button>
      {submissionSuccess && (
        <div className="mt-3 text-green-300 text-center">Great Success!</div>
      )}
    </form>
  );
};

export default NewsletterForm;
