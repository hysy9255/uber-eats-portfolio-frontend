const CreateAccountChoiceFooter = () => {
  return (
    <section className="mt-5">
      <div className="mx-auto max-w-3xl rounded-xl bg-white/80 backdrop-blur ring-1 ring-black/10 p-4 text-center">
        <p className="text-[13px] text-slate-600">
          By continuing, you agree to Uber Eats’{" "}
          <a
            href="/legal/terms"
            className="underline decoration-slate-300 underline-offset-2 hover:text-slate-800"
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            href="/legal/privacy"
            className="underline decoration-slate-300 underline-offset-2 hover:text-slate-800"
          >
            Privacy Policy
          </a>
          . This site is protected by reCAPTCHA and the Google{" "}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noreferrer"
            className="underline decoration-slate-300 underline-offset-2 hover:text-slate-800"
          >
            Privacy Policy
          </a>{" "}
          and{" "}
          <a
            href="https://policies.google.com/terms"
            target="_blank"
            rel="noreferrer"
            className="underline decoration-slate-300 underline-offset-2 hover:text-slate-800"
          >
            Terms of Service
          </a>{" "}
          apply.
        </p>
      </div>
    </section>
  );
};

export default CreateAccountChoiceFooter;
