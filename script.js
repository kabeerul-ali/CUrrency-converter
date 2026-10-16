//urls
let baseurl =
  "https://v6.exchangerate-api.com/v6/6d01a17f07e406dcd44ab4ff/latest/USD";
let flagapi = "https://flagsapi.com/BE/flat/64.png";
//access all node
let selectfrom = document.querySelector("#from");
let selectto = document.querySelector("#to");
let imgfrom = document.querySelector(".imgl");
let imgto = document.querySelector(".imgr");
let inputto = document.querySelector("#toinput");
let inputfrom = document.querySelector("#frominput");
let swap = document.querySelector("#swap");
let updatedate = document.querySelector("#date");
let exchangerate = document.querySelector("#rate");
let countries = countryList;
let exchange = document.querySelector("#exchange");
let dropdowns = document.querySelectorAll(".selectors select");

//addallselector options
for (const select of dropdowns) {
  for (const country in countries) {
    const option = document.createElement("option");
    option.value = country;
    option.innerText = country;
    option.setAttribute("id", country);
    if (select.name == "from" && country == "INR") {
      option.selected = "selected";
    } else if (select.name == "to" && country == "USD") {
      option.selected = "selected";
    }
    select.append(option);
  }

  select.addEventListener("change", (evt) => {
    updateflag(evt.target);
  });
}

//update flage value
function updateflag(node) {
  let code = node.value;
  let getcode = countries[code];
  let img = node.parentNode.querySelector("img");
  let newimgurl = `https://flagsapi.com/${getcode}/flat/64.png`;
  img.setAttribute("src", newimgurl);
}
function upadatedate(date) {
  updatedate.innerText = "Last update: " + date;
}

(async function setdate() {
  let response = await fetch(baseurl);
  let data = await response.json();

  upadatedate(data.time_last_update_utc);
})();

//exchange work

exchange.addEventListener("click", async () => {
  let to = selectto.value;
  let from = selectfrom.value;
  let money = inputfrom.value;
  let msg = exchangerate;
  //console.log(to ,from,money,msg)
  let getratedata = await fetch(
    `https://v6.exchangerate-api.com/v6/6d01a17f07e406dcd44ab4ff/latest/${from}`,
  );
  let getrate = await getratedata.json();
  let data = getrate.conversion_rates;
  let torate = data[to];
  let fromrate = data[from];
  let result = money * torate;
  inputto.value = result;
  //print echange rate
  msg.innerText = `1 ${from} = ${torate} ${to}`;
  //during chabge in output
  inputto.addEventListener("input", (evt) => {
    let resultin = evt.target.value / torate;
    inputfrom.value = resultin;
  });
  //during hnage live
  inputfrom.addEventListener("input", (evt) => {
    let resultin = evt.target.value * torate;
    inputto.value = resultin;
  });
});

swap.addEventListener("click", () => {
  //swap flag also
  let temp = selectfrom.value;
  selectfrom.value = selectto.value;
  imgfrom.setAttribute(
    "src",
    `https://flagsapi.com/${countries[selectfrom.value]}/flat/64.png`,
  );
  selectto.value = temp;
  imgto.setAttribute(
    "src",
    `https://flagsapi.com/${countries[selectto.value]}/flat/64.png`,
  );

  //swap value also
  let tt=inputfrom.value;
  inputfrom.value=inputto.value;
  inputto.value=tt;

  //change flage
});
