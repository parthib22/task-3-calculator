"use client";
import React, { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [mem, setMem] = useState("");
  const [err, setErr] = useState("");
  const [line, setLine] = useState("");
  const [deg, setDeg] = useState(true);
  const addTextContent = (event: any) => {
    setInput((prev) => prev + event.target.textContent.trim());
  };
  const addValue = (event: any) => {
    setInput((prev) => prev + event.target.value.trim());
  };
  const deleteEnd = () => {
    setInput(input.slice(0, -1));
  };
  const Eval = () => {
    try {
      if (input.trim() == "") return;
      let temp = input;
      if (temp.includes("√")) temp = temp.replaceAll("³√", "cbrt");
      if (temp.includes("√")) temp = temp.replaceAll("√", "sqrt");
      if (input.includes("^"))
        temp =
          input.slice(0, input.indexOf("^")) +
          "**" +
          input.slice(input.indexOf("^") + 1);

      temp = String(eval(temp)).slice(0, 14);
      setLine(input);
      setInput(temp);
      setErr("");
    } catch (error) {
      setErr(String(error));
    }
  };
  const addMath = (event: any) => {
    setInput(
      (prev) =>
        prev +
        (event.target.value
          ? event.target.value
          : event.target.textContent
        ).trim() +
        "("
    );
  };
  const e = Math.E;
  const π = Math.PI;
  const sin = (n: number) => (deg ? Math.sin((n * π) / 180) : Math.sin(n));
  const cos = (n: number) => (deg ? Math.cos((n * π) / 180) : Math.cos(n));
  const tan = (n: number) => (deg ? Math.tan((n * π) / 180) : Math.tan(n));
  const asin = (n: number) => (deg ? (Math.asin(n) * 180) / π : Math.asin(n));
  const acos = (n: number) => (deg ? (Math.acos(n) * 180) / π : Math.acos(n));
  const atan = (n: number) => (deg ? (Math.atan(n) * 180) / π : Math.atan(n));
  const log10 = (n: number) => Math.log10(n);
  const sqrt = (n: number) => Math.sqrt(n);
  const cbrt = (n: number) => Math.cbrt(n);
  const fact: any = (n: number) => {
    if (n <= 1) return 1;
    else return n * fact(n - 1);
  };

  const size =
    input.length < 7 ? 20 : input.length < 15 ? 20 - input.length * 0.75 : 9;

  return (
    <main>
      <section id="display">
        <div id="line-display">{line}</div>
        <input
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            console.log(input);
          }}
          style={{ fontSize: `${size}vw` }}
          name="display"
          id="inputBox"
          placeholder="0"
          disabled
        />
        <div id="error-display">{err}</div>
      </section>
      <section id="button-container">
        <div id="b1">
          <div id="row">
            <button
              onClick={() => {
                setInput("");
                setLine((prev) => (prev.slice(0, 2) == "M+" ? prev : ""));
                setErr("");
              }}
              className="operator"
            >
              AC
            </button>
            <button onClick={deleteEnd} className="operator">
              DE
            </button>
            <button onClick={addTextContent} className="operator">
              %
            </button>
            <button onClick={addTextContent} className="operator">
              /
            </button>
          </div>
          <div id="row">
            <button onClick={addTextContent}>7</button>
            <button onClick={addTextContent}>8</button>
            <button onClick={addTextContent}>9</button>
            <button onClick={addTextContent} className="operator">
              *
            </button>
          </div>
          <div id="row">
            <button onClick={addTextContent}>4</button>
            <button onClick={addTextContent}>5</button>
            <button onClick={addTextContent}>6</button>
            <button onClick={addTextContent} className="operator">
              -
            </button>
          </div>
          <div id="row">
            <button onClick={addTextContent}>1</button>
            <button onClick={addTextContent}>2</button>
            <button onClick={addTextContent}>3</button>
            <button onClick={addTextContent} className="operator">
              {" "}
              +{" "}
            </button>
          </div>
          <div id="row">
            <button onClick={addTextContent}>0</button>
            <button onClick={addTextContent}>.</button>
            <button onClick={Eval} id="eq">
              {" "}
              ={" "}
            </button>
          </div>
        </div>
        <div id="b2">
          <div id="row">
            <button
              onClick={() => {
                setMem(input);
                setLine("M+ " + input);
              }}
              className="operator"
            >
              M+
            </button>
            <button
              onClick={() => setInput((prev) => prev + mem)}
              className="operator"
            >
              MR
            </button>
            <button
              onClick={() => {
                setLine((prev) => (prev.slice(0, 2) == "M+" ? "MC" : prev));
                setMem("");
              }}
              className="operator"
            >
              MC
            </button>
            <button
              onClick={() => setDeg(!deg)}
              style={
                deg
                  ? {
                      backgroundColor: "orangered",
                      color: "#000",
                      scale: 0.96,
                      fontWeight: 600,
                    }
                  : {
                      backgroundColor: "#fff",
                      scale: 0.95,
                      color: "#000",
                      fontWeight: 600,
                    }
              }
            >
              {deg ? "deg" : "rad"}
            </button>
          </div>
          <div id="row">
            <button onClick={addMath}>sin</button>
            <button onClick={addMath}>cos</button>
            <button onClick={addMath}>tan</button>
            <button onClick={addTextContent}>{"("}</button>
          </div>
          <div id="row">
            <button value="asin" onClick={addMath}>
              sin<sup>-1</sup>
            </button>
            <button value="acos" onClick={addMath}>
              cos<sup>-1</sup>
            </button>
            <button value="atan" onClick={addMath}>
              tan<sup>-1</sup>
            </button>
            <button onClick={addTextContent}>{")"}</button>
          </div>
          <div id="row">
            <button onClick={addMath}>
              log<sub>10</sub>
            </button>
            <button value="√" onClick={addMath}>
              √ x
            </button>
            <button value="³√" onClick={addMath}>
              ³√ x
            </button>
            <button value="^" onClick={addValue}>
              x<sup> n</sup>
            </button>
          </div>
          <div id="row">
            <button onClick={addTextContent}>π</button>
            <button value="fact" onClick={addMath}>
              x!
            </button>
            <button value="1/" onClick={addValue}>
              1/x
            </button>
            <button onClick={addTextContent}>e</button>
          </div>
        </div>
      </section>
    </main>
  );
}
