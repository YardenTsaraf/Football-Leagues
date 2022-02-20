const leaguesApi= 'https://www.thesportsdb.com/api/v1/json/2/all_leagues.php';
let dataArr = [];
let ul, li, teamsApi, strName, teams;
let table= document.getElementById('table');

//Get Leagues Using An API:
async function getLeagues() {
    let responseLeagues = await fetch(leaguesApi);
    let leagues = await responseLeagues.json();
    let fiveLeagues = leagues.leagues.slice(0, 5); //Slice The Array
    for (let i = 0; i < 5; i++) {
        let ul = document.getElementById('leagues-list');
        let li = document.createElement("li");
        li.addEventListener('click', chooseLeague);
        li.appendChild(document.createTextNode(fiveLeagues[i].strLeague));
        ul.appendChild(li);
    }
}
getLeagues();

//Get Teams Using An API:
async function getTeams() {
    teamsApi = `https://www.thesportsdb.com/api/v1/json/2/search_all_teams.php?l=${strName}`;
    let responseTeams = await fetch(teamsApi);
    teams = await responseTeams.json();
}

//If You Choose An Option:
function chooseLeague(event) {
    document.getElementById('league-title').style.display = "grid";
    table.style.display = "table";
    table.innerHTML= ''; //Reset event
    document.getElementById('chosen-league').innerHTML = event.target.textContent;
    strName = event.target.textContent.replace(/\s+/g, '%20'); //Change The String to URL Format (replace the spaces)
    getTeams();
    let total= teams.teams.length;
    document.getElementById('total-teams').innerHTML= total;
    for(let i=0; i<total; i++) {
        let teamName= teams.teams[i].strTeam;
        let teamLogo= teams.teams[i].strTeamLogo;
        //Update Teams Name: 
        let teamTable = document.getElementById('table');
        var teamRow = document.createElement("tr");
        let teamRowName = document.createElement("td");
        teamRowName.appendChild(document.createTextNode(teamName));
        teamRow.appendChild(teamRowName);
        //Update Teams Logo: 
        let teamRowLogo = document.createElement("td");
        let teamImg= document.createElement("img");
        teamImg.src= teamLogo;
        teamRowLogo.appendChild(teamImg);
        teamTable.appendChild(teamRow);
        teamRow.appendChild(teamRowLogo);
    }
}

