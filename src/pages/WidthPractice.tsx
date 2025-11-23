import { CREATE_CUSTOMER_PAGE_STEPS } from "../constants/CreateCustomerPageSteps";
import profileImg from "../images/profile/profile.png";

const WidthPractice = () => {
  const steps = CREATE_CUSTOMER_PAGE_STEPS;
  const active = 1;
  const pageTitle = "Create your customer account";
  const pageDescription = "Use your phone or email to sign up";
  const layoutXPadding = "px-4";
  const layoutMaxWidth = "max-w-[1200px] mx-auto";
  const componentBoxCss =
    "bg-white border-2 border-gray-300 rounded-2xl p-6 space-y-4";
  const inputCss = "w-full border border-gray-400 rounded-lg py-2 px-3";
  const buttonCss = "rounded-full px-4 py-2 border hover:cursor-pointer";

  return (
    <div className="bg-gray-100 min-h-screen">
      <header id="main-header" className={`bg-white`}>
        <div
          className={`${layoutXPadding} ${layoutMaxWidth} py-4 flex justify-between items-center`}
        >
          <div className="text-3xl font-medium">
            <span className="">Uber </span>
            <span className="text-emerald-600">Eats</span>
          </div>
          <div className="text-md font-normal text-gray-600">Help</div>
        </div>
      </header>
      <header
        id="sub-header"
        className={`${layoutXPadding} ${layoutMaxWidth} h-15 flex items-center`}
      >
        <ol className="flex">
          {steps.map((step, index) => {
            const on = index <= active;
            return (
              <>
                <li className="text-sm flex items-center justify-center gap-2">
                  <div
                    className={`${
                      on
                        ? "bg-emerald-600 border-0 text-white"
                        : "bg-white border border-gray-300 text-gray-700"
                    } flex items-center justify-center  w-7 h-7 rounded-full`}
                  >
                    {index + 1}
                  </div>
                  <div className={`${on ? "text-black" : "text-gray-500"}`}>
                    {step}
                  </div>
                </li>
                <div></div>
                {index + 1 < steps.length && (
                  <div className="flex items-center">
                    <div className="mx-3 h-[1px] w-8 bg-slate-500" />
                  </div>
                )}
              </>
            );
          })}
        </ol>
      </header>

      <main className={`${layoutXPadding} ${layoutMaxWidth} py-10 space-y-6`}>
        <div id="page-title">
          <h1 className="font-bold text-4xl">{pageTitle}</h1>
          <p className="text-gray-700">{pageDescription}</p>
        </div>
        {/* <div id="main-contents-wrapper" className="border-2 space-y-6"> */}
        <div
          id="main-contents-wrapper"
          className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_320px] gap-6"
        >
          <div className="space-y-6">
            <div
              id="instruction-box"
              className={`${componentBoxCss} text-gray-600`}
            >
              <h2 className="">What you will need</h2>
              <ul className="py-2">
                <li>• Add a gate code or call box if needed</li>
                <li>• Pin the map as close to your entrance as possible</li>
                <li>• Save a label to switch addresses quickly</li>
              </ul>
              <h2 className="bg-gray-100 p-2 rounded-lg">
                Tip: You can add multiple addresses and switch during checkout.
              </h2>
            </div>

            <div id="input-box" className={`${componentBoxCss}`}>
              <div id="profile-photo" className="flex flex-col gap-3">
                <h2>Profile photo</h2>
                <div className="flex items-center gap-4">
                  <div className="w-25 h-25 rounded-full border border-gray-300 overflow-hidden bg-gray-100">
                    <img className="border rounded-full" src={profileImg}></img>
                  </div>
                  <label className="border px-4 py-2 font-medium rounded-full hover:bg-slate-100 cursor-pointer">
                    Upload Image
                    <input
                      className="hidden"
                      type="file"
                      onClick={(e) => console.log(e)}
                    ></input>
                  </label>
                </div>

                <p className="text-gray-500 text-xs">
                  PNG or JPG up to 2MB. Square images look best.
                </p>
              </div>
              <div id="data-inputs" className="grid grid-cols-2 gap-4">
                <div className="col-span-1">
                  <div>First name</div>
                  <input className={inputCss}></input>
                </div>
                <div className="col-span-1">
                  <div>Last name</div>
                  <input className={inputCss}></input>
                </div>
                <div className="col-span-2">
                  <div>Phone number</div>
                  <input className={inputCss}></input>
                </div>
                <div className="col-span-2">
                  <div>Email</div>
                  <input className={inputCss}></input>
                </div>
                <div className="col-span-2">
                  <div>Password</div>
                  <input className={inputCss}></input>
                </div>
                <div className="col-span-2">
                  <div>Confirm password</div>
                  <input className={inputCss}></input>
                </div>
                <label className="col-span-2 flex items-center gap-2">
                  <input className="h-4 w-4" type="checkbox"></input>
                  <span className="text-gray-700">
                    Send me deals and promotions
                  </span>
                </label>
              </div>
            </div>
          </div>
          <div
            id="instruction-box"
            className={`${componentBoxCss} text-gray-600`}
          >
            <h2 className="">What you will need</h2>

            <ul className="list-disc list-outside pl-6 space-y-2 text-slate-700">
              <li>Add a gate code or call box if needed</li>
              <li>Pin the map as close to your entrance as possible</li>
              <li>Save a label to switch addresses quickly</li>
            </ul>
            <h2 className="bg-gray-100 p-2 rounded-lg">
              Tip: You can add multiple addresses and switch during checkout.
            </h2>
          </div>
        </div>
      </main>

      <footer className={`bg-white border-2`}>
        <div
          className={`${layoutXPadding} ${layoutMaxWidth} py-4 flex justify-between`}
        >
          <div className={`${buttonCss} hover:bg-slate-50`}>Back</div>
          <div className="flex gap-3">
            <div className={`${buttonCss} hover:bg-slate-50`}>Save & exit</div>
            <div className={`${buttonCss} bg-black text-white`}>Continue</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WidthPractice;
