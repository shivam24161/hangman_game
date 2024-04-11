import { Button } from "@mui/material";
import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { useState } from "react";
import IMG1 from "./assests/1.png";
import IMG2 from "./assests/2.png";
import IMG3 from "./assests/3.png";
import IMG4 from "./assests/4.png";
import IMG5 from "./assests/5.png";
import IMG6 from "./assests/6.png";
import IMG7 from "./assests/7.png";
const letters = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];
const animalNames = [
  "tiger",
  "lion",
  "dog",
  "cat",
  "horse",
  "rabbit",
  "leopard",
  "cheetah",
  "camel",
  "elephant",
  "fox",
  "deer",
  "cow",
  "rat",
];
const hint = [
  "largest living cat",
  "king of jungle",
  "faithful and family friendly",
  "sound like meow",
  "used in racing",
  "White in color and have soft skin",
  "member of cat family",
  "fastest land animal",
  "ship of desert",
  "world largest animal",
  "angoor khatte hain",
  "have long ears",
  "they give milk",
  "lives in our house in the holes",
];
const hangmanImages = [IMG1, IMG2, IMG3, IMG4, IMG5, IMG6, IMG7];
const Component = () => {
  const [name, setname] = useState([]);
  const [new1, setnew1] = useState([]);
  const [images, setImages] = useState(0);
  const [flag, setflag] = useState(false);
  const [lifeLeft, setLifeleft] = useState(6);
  const [displayBtn, setdisplayBtn] = useState("block");
  const [themediv, setthemediv] = useState("none");
  const [open, setOpen] = useState(false);
  const [hintletter, sethintletter] = useState();
  const [msg, setmsg] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  // Users click on alphabet
  const getvalue = (e) => {
    let value = e.target.value;
    console.log(value);
    let idd = e.target;
    idd.setAttribute("disabled", true);
    idd.style.backgroundColor = "grey";
    const indices = [];
    if (!flag) {
      if (name[0].includes(value)) {
        let b = name[0].indexOf(value);
        while (b !== -1) {
          indices.push(b);
          b = name[0].indexOf(value, b + 1);
        }
        indices.map((i) => {
          new1[i] = value;
          setnew1([...new1]);
          return null;
        });
      } else {
        if (images < 6) {
          setImages(images + 1);
          setLifeleft(lifeLeft - 1);
        }
        if (images === 6) {
          reset();
          setOpen(true);
        }
      }
    }
    func();
  };
  // Getting random animal name / User starts the game
  function getRandomItem(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    const item = arr[randomIndex].split("");
    setname([item]);
    setdisplayBtn("none");
    setthemediv("flex");
    const hint1 = hint[randomIndex].toUpperCase();
    sethintletter(hint1);
  }
  // Reset game
  const reset = () => {
    setdisplayBtn("block");
    setthemediv("none");
    setImages(0);
    setLifeleft(6);
    setnew1([]);
    setname([]);
    var a = document.querySelectorAll(".btn");
    for (let i = 0; i < a.length; i++) {
      a[i].removeAttribute("disabled");
      a[i].style.backgroundColor = "olive";
    }
  };
  const theme = {
    width: "3vw",
    fontSize: "2vw",
  };
  const theme1 = {
    display: displayBtn,
  };
  const theme2 = {
    display: themediv,
  };
  React.useEffect(() => {
    const arr1 = JSON.stringify(new1);
    const arr2 = JSON.stringify(name[0]);
    const result = arr1 === arr2;
    if (result) {
      setflag(true);
    } else {
      setflag(false);
    }
  }, [new1, name]);
  const func = () => {
    const arr1 = JSON.stringify(new1);
    const arr2 = JSON.stringify(name[0]);
    const result = arr1 === arr2;
    if (result) {
      setflag(true);
      setOpen(true);
      setmsg(true);
      reset();
    } else {
      setflag(false);
    }
  };

  return (
    <>
      <div className="main_div">
        <div>
          <h1>Hangman Game</h1>
          <h4 className="heading">Guess the animal Name</h4>
          <h3>Chance Left: {lifeLeft}</h3>
          <button
            onClick={() => getRandomItem(animalNames)}
            className="startbtn"
            style={theme1}
          >
            Click here to Play game
          </button>
          <div className="inputdiv" style={theme2}>
            {name.map((i) => {
              return (
                <>
                  {i.map((j, index) => {
                    return (
                      <div key={index}>
                        <input
                          readOnly
                          type="text"
                          style={theme}
                          id={"input" + index}
                          value={new1[index]}
                          className="input"
                        ></input>
                      </div>
                    );
                  })}
                </>
              );
            })}
          </div>
          <div class="letter_div" style={theme2}>
            {letters.map((i, ind) => {
              var a = i.toUpperCase();
              return (
                <div key={ind}>
                  <button value={i} onClick={getvalue} className="btn" id={i}>
                    {a}
                  </button>
                </div>
              );
            })}
          </div>
          <div style={theme2}>
            <h1>Hint : {hintletter}</h1>
          </div>
          <div style={theme2}>
            <Button variant="contained" id="reset" onClick={reset}>
              Reset the game
            </Button>
          </div>
        </div>
        <div>
          <img src={hangmanImages[images]} alt="img" />
        </div>
      </div>
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            {msg ? (
              <h1>😎😄 You , Have Won the game! 😎😄</h1>
            ) : (
              <h1>😓 Oh No ! You loose... 😓</h1>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};
export default Component;
