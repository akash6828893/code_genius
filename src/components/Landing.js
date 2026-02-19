import React, { useEffect, useState, useCallback } from "react";
import CodeEditorWindow from "./CodeEditorWindow";
import axios from "axios";
import { classnames } from "../utils/general";
import { languageOptions } from "../constants/languageOptions";
import { getDefaultCode } from "../constants/defaultCode";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { defineTheme } from "../lib/defineTheme";
import useKeyPress from "../hooks/useKeyPress";
import useMediaQuery from "../hooks/useMediaQuery";
import OutputWindow from "./OutputWindow";
import CustomInput from "./CustomInput";
import OutputDetails from "./OutputDetails";
import ThemeDropdown from "./ThemeDropdown";
import LanguagesDropdown from "./LanguagesDropdown";
import { HiMiniPlay } from "react-icons/hi2";


const Landing = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [code, setCode] = useState(getDefaultCode("javascript"));
  const [customInput, setCustomInput] = useState("");
  const [outputDetails, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState(null);
  const [theme, setTheme] = useState("cobalt");
  const [language, setLanguage] = useState(languageOptions[0]);

  const enterPress = useKeyPress("Enter");
  const ctrlPress = useKeyPress("Control");

  const onSelectChange = (sl) => {
    console.log("selected Option...", sl);
    setLanguage(sl);
    setCode(getDefaultCode(sl.value));
  };

  const onChange = (action, data) => {
    switch (action) {
      case "code": {
        setCode(data);
        break;
      }
      default: {
        console.warn("case not handled!", action, data);
      }
    }
  };

  const showSuccessToast = useCallback((msg) => {
    toast.success(msg || `Compiled Successfully!`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }, []);

  const showErrorToast = useCallback((msg, timer) => {
    toast.error(msg || `Something went wrong! Please try again.`, {
      position: "top-right",
      autoClose: timer ? timer : 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }, []);

  const checkStatus = useCallback(async (token) => {
    const options = {
      method: "GET",
      url: process.env.REACT_APP_RAPID_API_URL + "/" + token,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      },
    };
    try {
      let response = await axios.request(options);
      let statusId = response.data.status?.id;

      // Processed - we have a result
      if (statusId === 1 || statusId === 2) {
        // still processing
        setTimeout(() => {
          checkStatus(token);
        }, 2000);
        return;
      } else {
        setProcessing(false);
        setOutputDetails(response.data);
        showSuccessToast(`Compiled Successfully!`);
        console.log("response.data", response.data);
        return;
      }
    } catch (err) {
      console.log("err", err);
      setProcessing(false);
      showErrorToast();
    }
  }, [showSuccessToast, showErrorToast]);

  const handleCompile = useCallback(() => {
    setProcessing(true);
    const formData = {
      language_id: language.id,
      // encode source code in base64
      source_code: btoa(code),
      stdin: btoa(customInput),
    };
    const options = {
      method: "POST",
      url: process.env.REACT_APP_RAPID_API_URL,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      },
      data: formData,
    };

    axios
      .request(options)
      .then(function (response) {
        console.log("res.data", response.data);
        const token = response.data.token;
        checkStatus(token);
      })
      .catch((err) => {
        let error = err.response ? err.response.data : err;
        // get error status
        let status = err.response.status;
        console.log("status", status);
        if (status === 429) {
          console.log("too many requests", status);

          showErrorToast(
            `Quota of 100 requests exceeded for the Day! Please read the blog on freeCodeCamp to learn how to setup your own RAPID API Judge0!`,
            10000
          );
        }
        setProcessing(false);
        console.log("catch block...", error);
      });
  }, [code, customInput, language, checkStatus, showErrorToast]);

  useEffect(() => {
    if (enterPress && ctrlPress) {
      console.log("enterPress", enterPress);
      console.log("ctrlPress", ctrlPress);
      handleCompile();
    }
  }, [ctrlPress, enterPress, handleCompile]);

  function handleThemeChange(th) {
    const theme = th;
    console.log("theme...", theme);

    if (["light", "vs-dark"].includes(theme.value)) {
      setTheme(theme);
    } else {
      defineTheme(theme.value).then((_) => setTheme(theme));
    }
  }
  useEffect(() => {
    defineTheme("oceanic-next").then((_) =>
      setTheme({ value: "oceanic-next", label: "Oceanic Next" })
    );
  }, []);


  return (
    <div className="w-screen h-screen overflow-hidden relative">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="h-16 w-full flex justify-start items-center bg-[#386AF6] p-4 rounded-b-md text-white text-2xl font-bold">CodeGenius</div>
      <div className="w-full px-3 py-3 max-w-full overflow-hidden">
        <div className="flex flex-row gap-2 w-full max-w-full justify-start items-center">
          <div className="w-[35%] max-w-[16rem]">
            <LanguagesDropdown onSelectChange={onSelectChange} />
          </div>
          <div className="w-[35%] max-w-[16rem]">
            <ThemeDropdown handleThemeChange={handleThemeChange} theme={theme} />
          </div>
          <button
                onClick={handleCompile}
                disabled={!code}
                className={classnames(
                  "z-10 h-12 min-w-20 rounded-xl text-base bg-[#386AF6] text-white px-6 flex items-center justify-center gap-1 font-semibold hover:shadow-lg transition duration-200",
                  !code ? "opacity-50" : ""
                )}
          >
            <HiMiniPlay className="w-4 h-4 rotate-180" />
                {processing ? "Processing..." : "Run"}
              </button>
        </div>
      </div>
       {isMobile ? (
        <div className="flex flex-col h-[calc(100vh-12rem)] w-full max-w-full overflow-hidden">
          <div className="flex-shrink-0 h-[35vh] px-3 mb-3 overflow-hidden max-w-full">
            <CodeEditorWindow
              code={code}
              onChange={onChange}
              language={language?.value}
              theme={theme.value}
            />
          </div>
          <div className="flex-1 overflow-y-auto overflow-x-hidden px-3 pb-4 max-w-full">
            <div className="space-y-3 w-full max-w-full">
              <div className="w-full max-w-full overflow-hidden">
                <CustomInput
                  customInput={customInput}
                  setCustomInput={setCustomInput}
                />
              </div>
              
              <div className="w-full max-w-full overflow-hidden">
                <OutputWindow outputDetails={outputDetails} />
              </div>
              
              {outputDetails && (
                <div className="w-full max-w-full overflow-hidden">
                  <OutputDetails outputDetails={outputDetails} />
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-full px-3 h-full py-1 overflow-hidden">
          <div className="flex flex-row gap-3 items-start w-full max-w-full h-full overflow-hidden">
            <div className="flex flex-col h-4/5 flex-1 min-w-0 max-w-[70%] overflow-hidden">
              <CodeEditorWindow
                code={code}
                onChange={onChange}
                language={language?.value}
                theme={theme.value}
              />
            </div>

            <div className="flex flex-shrink-0 w-[30%] min-w-0 max-w-[30%] flex-col gap-3 overflow-hidden">
              <div className="w-full max-w-full overflow-hidden">
                <OutputWindow outputDetails={outputDetails} />
              </div>
              
              <div className="w-full max-w-full overflow-hidden">
                <CustomInput
                  customInput={customInput}
                  setCustomInput={setCustomInput}
                />
              </div>
              {outputDetails && (
                <div className="w-full max-w-full overflow-hidden">
                  <OutputDetails outputDetails={outputDetails} />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Landing;
