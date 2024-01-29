import React, { useState } from "react";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";

function Search() {
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [resultsRefs, setResultsRefs] = useState([]);
  const [term, setTerm] = useState("");

  const search = (value) => {
    setTerm(value);

    // if (value) {
    //   axios
    //     .get("https://tallpad.test/search", { params: { term: value } })
    //     .then((response) => {
    //       setResults(response.data);
    //       setResultsRefs([]);
    //     });
    // } else {
    //   setResults([]);
    //   setResultsRefs([]);
    // }
  };

  const navigateResults = (event) => {
    switch (event.code) {
      case "ArrowDown":
        setSelectedIndex((prevIndex) =>
          prevIndex === results.length - 1 ? 0 : prevIndex + 1
        );
        break;
      case "ArrowUp":
        setSelectedIndex((prevIndex) =>
          prevIndex === 0 ? results.length - 1 : prevIndex - 1
        );
        break;
      default:
        break;
    }

    resultsRefs[selectedIndex]?.scrollIntoView({ block: "nearest" });
  };

  const onTermKeydown = (event) => {
    if (["ArrowUp", "ArrowDown"].includes(event.code)) {
      event.preventDefault();
    }
  };

  const onSubmit = () => {
    if (results.length > 0) {
      window.location = results[selectedIndex].url;
    }
  };

  return (
    <div>
      <button onClick={() => setIsOpen(true)} className="inline">
        Search <SearchTwoToneIcon />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex mt-10 justify-center items-start">
          <div className="fixed inset-0 bg-black bg-opacity-70"></div>

          <div className="flex flex-col overflow-hidden z-0 w-full max-w-2xl bg-white  rounded-lg mx-4 max-h-[80vh] mt-[10vh] relative">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onSubmit();
              }}
              className="relative flex items-center"
            >
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-700"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
              <input
                onKeyDown={onTermKeydown}
                onInput={(e) => search(e.target.value)}
                className="w-full py-4 pl-12 border-b border-gray-100 outline-none placeholder-gray-400"
                type="text"
                placeholder="Search..."
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex items-center px-3 py-1.5 uppercase font-semibold tracking-wider text-gray-700 rounded-md border border-gray-200 focus:outline-none focus:border-gray-300 text-xxs "
                  type="button"
                >
                  X
                </button>
              </div>
            </form>

            <div className="overflow-auto">
              {results.length > 0 ? (
                <ul className="divide-y divide-gray-100">
                  {results.map((item, index) => (
                    <li
                      key={index}
                      ref={(el) => (resultsRefs[index] = el)}
                      onMouseMove={() => setSelectedIndex(index)}
                      className={`flex items-center px-4 py-2.5 relative ${
                        selectedIndex === index ? "bg-gray-100" : ""
                      }`}
                    >
                      <img
                        src={item.featured_image}
                        alt={item.title}
                        className="w-16 h-16 rounded-full object-cover border-white border-2 shrink-0 bg-gray-200"
                      />
                      <a href={item.url}>
                        <span className="absolute inset-0"></span>
                      </a>
                      <div className="ml-3">
                        <div className="font-semibold text-gray-600">
                          {item.title}
                        </div>
                        <div className="text-xs text-gray-600 mt-1">
                          {item.category}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="p-10 text-lg text-center text-gray-400">
                  No results...
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Search;
