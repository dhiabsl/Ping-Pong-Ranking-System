

// var El = `
// <tr>
// <th scope="row">${element.id_client}</th>
// <td>${element.fullnamme}</td>
// <td>${element.phone}</td>
// </tr>
// `;
const Serverlink = "http://127.0.0.1:3000/CRUD"

window.addEventListener('load',LoadData);


function getChallengers(){
  let RankOne = document.getElementById('player');
  RankOne.innerHTML ='';
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      let Result= JSON.parse(this.responseText);
          RankOne.innerHTML +=
          `
          <img src="./img/challenger.png" alt="Challenger elo">
          <h1 id="number1">${Result[0].Player_name}</h1>
          <p> ${Result[0].Pseudo} | ${Result[0].D_points}</p>
          <small>#1 Table Tennis player</small>
          `;
    }
  };
  xhttp.open("GET", Serverlink+"/Challengers", true);
  xhttp.send();
}

function getDiamonds(){
      //Players Table :
      let diamondcontainer = document.getElementById('diamonds');
      diamondcontainer.innerHTML ='';
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          let Result= JSON.parse(this.responseText);
          Result.forEach(element => {
              diamondcontainer.innerHTML +=
              `
              <li class=""><a href="#">${element.Player_name}<pre>#${element.Pseudo}</pre></a></li>
              `;
          })
        }
      };
      xhttp.open("GET", Serverlink+"/Diamonds", true);
      xhttp.send();
}

function getPlats(){
  //Players Table :
  let platcontainer = document.getElementById('plat');
  platcontainer.innerHTML ='';
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      let Result= JSON.parse(this.responseText);
      Result.forEach(element => {
          platcontainer.innerHTML +=
          `
          <li class=""><a href="#">${element.Player_name}<pre>#${element.Pseudo}</pre></a></li>
          `;
      })
    }
  };
  xhttp.open("GET", Serverlink+"/Platiniums", true);
  xhttp.send();
}

function getGolds(){
  //Players Table :
  let goldcontainer = document.getElementById('gold');
  goldcontainer.innerHTML ='';
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      let Result= JSON.parse(this.responseText);
      Result.forEach(element => {
          goldcontainer.innerHTML +=
          `
          <li class=""><a href="#">${element.Player_name} <pre>#${element.Pseudo}</pre></a></li>
          `;
      })
    }
  };
  xhttp.open("GET", Serverlink+"/Golds", true);
  xhttp.send();
}


//Getting the rank 1 from players table
function LoadData() {
    //Players Table :
    getChallengers();
    getDiamonds();
    getPlats();
    getGolds();
}