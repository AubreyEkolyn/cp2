function onClick(e) {
  e.preventDefault();
  // get form values
  let s2 = document.getElementById('selector2');
  let type2 = s2.options[s2.selectedIndex].value;

  let s = document.getElementById('selector');
  let type = s.options[s.selectedIndex].value;

  // setup URL
  let url = "https://www.dnd5eapi.co" + type2;
  console.log(url);
  // call API
  fetch(url)
    .then(function(response) {
      // make sure the request was successful
      console.log(response);
      if (response.status != 200) {
        return {
          text: "Error calling the 5e API service: " + response.statusText
        }
      }
      return response.json();
    }).then(function(json) {
      // update DOM with response
      console.log(json);
      switch(type){
        case "classes":

          updateResultClass(json);
          return;
        case "races":

          updateResultRace(json);
          return;
        case "backgrounds":

          updateResultBg(json);
          return;
      }
    });
}

function updateResultClass(json) {
  let info = "";

  info += '<h1>' + json.name + '</h1>';
  info += '<p><strong>Hit die: </strong>1d' + json.hit_die + '</p>';
  
  for(let k = 0; k < json.proficiency_choices.length; k++){
    info += '<p><strong>Choose ' + json.proficiency_choices[k].choose + ' ' + json.proficiency_choices[k].type + ' from: </strong>';
    info += json.proficiency_choices[k].from[0].name;
    for(let i = 1; i < json.proficiency_choices[k].from.length; i++){
      info += ', ' + json.proficiency_choices[k].from[i].name;
    }
    info += '</p>';
  }

  info += '<p><strong>Other proficiencies: </strong>';
  info += json.proficiencies[0].name;
  for(let i = 1; i < json.proficiencies.length; i++){
    info += ', ' + json.proficiencies[i].name;
  }
  info += '</p>';
  
  info += '<p><strong>Saving throws: </strong>';
  info += json.proficiencies[0].name;
  for(let i = 1; i < json.proficiencies.length; i++){
    info += ', ' + json.proficiencies[i].name;
  }
  info += '</p>';
  info += '<p><strong>Starting equipment:</strong></p>';
  for(let i = 0; i < json.starting_equipment.length; i++){
    info += '<p>    - ' + json.starting_equipment[i].equipment.name + " x " + json.starting_equipment[i].quantity + '</p>';
  }
  info += '<p><strong>Choose from: </strong></p>';
  for(let i = 0; i < json.starting_equipment_options.length; i++){
    info += '<p>    - Choose ' + json.starting_equipment_options[i].choose + " from: ";
    for(let j = 0; j < json.starting_equipment_options[i].from.length; j++){
      let temp = json.starting_equipment_options[i].from[j];
      if(temp.equipment_option != null)
        info += temp.equipment_option.choose + ' ' + temp.equipment_option.from.equipment_category.name + '(s), ';
        
      else if(temp.equipment != null){
        info += temp.quantity + ' ' + temp.equipment.name + '(s), ';
      }
      else {
        
      }
    }
    info += '</p>';
  }
  console.log(info);
  document.getElementById("result").innerHTML = info;
}

function updateResultRace(json) {
  let info = "";

  info += '<h1>' + json.name + '</h1>';

  info += '<p><strong>Speed: </strong>' + json.speed + '</p>';

  info += '<p><strong>Ability score increases: </strong>';
  for(let k = 0; k < json.ability_bonuses.length; k++){
    info += json.ability_bonuses[k].ability_score.name + ' +' + json.ability_bonuses[k].bonus + ', ';
  }
  info += '</p>';

  info += '<p><strong>Alignment: </strong>' + json.alignment + '</p>';

  info += '<p><strong>Age: </strong>' + json.age + '</p>';

  info += '<p><strong>Size: </strong>' + json.size + '. ' + json.size_description + '</p>';
  
  info += '<p><strong>Starting proficiencies: </strong>';
  for(let k = 0; k < json.starting_proficiencies.length; k++){
    info += json.starting_proficiencies[k].name + ', ';
  }
  info += '</p>';

  if(json.starting_proficiency_options != null){
    info += '<p><strong>Starting proficiency options: </strong>choose ' + json.starting_proficiency_options.choose + ' from: ';
    for(let k = 0; k < json.starting_proficiency_options.from.length; k++){
      info += json.starting_proficiency_options.from[k].name + ', ';
    }
    info += '</p>';
  }
  
  info += '<p><strong>Languages: </strong>';
  for(let i = 0; i < json.languages.length; i++){
    info += json.languages[i].name + ', ';
  }
  info += '</p>';
  info += '<p>' + json.language_desc + '</p>';

  info += '<p><strong>Traits: </strong>';
  for(let i = 0; i < json.traits.length; i++){
    let trait = json.traits[i]
    
    info += trait.name + ', ';
  }
  info += '</p>';
  
  info += '<p><strong>Subraces: </strong>';
  for(let i = 0; i < json.subraces.length; i++){
    let trait = json.subraces[i]
    
    info += trait.name + ', ';
  }
  info += '</p>';


  console.log(info);


  document.getElementById('result').innerHTML = info;
}

function updateResultBg(json) {
  let info = "";
  info += '<h1>' + json.name + '</h1>';
  info += '<p><strong>Proficiencies: </strong>';
  for(let k = 0; k < json.starting_proficiencies.length; k++){
    info += json.starting_proficiencies[k].name + ', ';
  }
  info += '</p>';
  
  info += '<p><strong>Choose ' + json.language_options.choose + ' languages from: </strong>';
  for(let k = 0; k < json.language_options.from.length; k++){
    info += json.language_options.from[k].name + ', ';
  }
  info += '</p>';

  info += '<p><strong>Starting equipment:</strong></p>';
  for(let i = 0; i < json.starting_equipment.length; i++){
    info += '<p>    - ' + json.starting_equipment[i].equipment.name + " x " + json.starting_equipment[i].quantity + '</p>';
  }
  info += '<p><strong>Choose from: </strong></p>';
  for(let i = 0; i < json.starting_equipment_options.length; i++){
    info += '<p>    - Choose ' + json.starting_equipment_options[i].choose + " from: ";
    for(let j = 0; j < json.starting_equipment_options[i].from.length; j++){
      let temp = json.starting_equipment_options[i].from[j];
      info += temp.equipment_category.name + ', ';
    }
    info += '</p>';
  }
  info += '<br><p><strong>' + json.feature.name + '</strong></p>';
  info += json.feature.desc;



  console.log(info);
  document.getElementById('result').innerHTML = info;
}

function updateResultSpell(json) {
  let info  = "";


  
  document.getElementById('result').innerHTML = info;
}

function onChange(e){
  e.preventDefault();
  console.log("Main selector changed");
  // get form values
  let s = document.getElementById('selector');
  let type = s.options[s.selectedIndex].value;

  if(type === ""){
    return;
  }
  // setup URL
  let url = "https://www.dnd5eapi.co/api/" + type;
  console.log(url)
  
  // call API
  fetch(url)
    .then(function(response) {
      // make sure the request was successful
      console.log(response);
      if (response.status != 200) {
        return {
          text: "Error calling the 5e API service: " + response.statusText
        }
      }
      return response.json();
    }).then(function(json) {
      // update DOM with response
      console.log(json);
      updateSelector(json);
    });
}

function updateSelector(info){
  let entries = info.results;
  console.log(entries);
  let options = "";
  if(entries[0].url != null){
    console.log("bg");
    for(let i = 0; i < entries.length;  i++){
      options += '<option value="' + entries[i].url + '">' + entries[i].name + '</option>';
    }
  }
  else{
    
    for(let i = 0; i < entries.length;  i++){
      options += '<option value="/api/backgrounds/' + entries[i].index + '">' + entries[i].name + '</option>';
    }
  }
  
  document.getElementById("selector2").innerHTML = options;
}

document.getElementById('find').addEventListener('click', onClick);

document.getElementById('selector').addEventListener('change', onChange)
