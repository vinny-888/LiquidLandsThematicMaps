let items;
let currentItem = 'Hydrogen Powered Lazer Drone';
let currentIndex = 0;
let quantity = 1;
let filteredItems = [];

let cities = {"341":{"id":341,"name":"Acton","buildings":{"Fire Beer":1,"Trex Teeth":1,"Diesel":1,"Explosives":1,"Jug of Ale":1,"Glue":1,"Pig":1,"Clay":1,"Glass":1,"Coal":1,"Limestone":1,"Gold":1,"Lime":1,"Iron Ore":2,"Crude Oil":1,"Pig Iron":1,"Steel":1}},"930":{"id":930,"name":"Whenuakite","buildings":{"Coal":1,"Iron Ore":1}},"2006":{"id":2006,"name":"Doorntje","buildings":{"Uranium":50,"Titanium":50,"Copper":50}},"2213":{"id":2213,"name":"Barry","buildings":{"Terracule001":1,"Coal":1,"Limestone":1}},"3408":{"id":3408,"name":"Popanyinning","buildings":{"Wood":1,"Limestone":1,"Oats":1,"Wheat":1,"Sheep":1,"Corn":1,"Barley":1,"Coal":1,"Concrete":1,"Cotton":1,"Sand":1,"Rope":1,"Cement":1}},"3518":{"id":3518,"name":"Althorpe","buildings":{"Coal":1,"Limestone":1}},"3663":{"id":3663,"name":"Beluga","buildings":{"Copper":2,"Cobalt":2,"Aluminium Ore":2,"Coal":1,"Pigment":1,"Natural Gas":1,"Aluminium":1,"Wheat":1,"Rawhide Leather":1,"Horses":1,"Glue":1,"Limestone":1,"Lime":1,"Solvent":1,"Tin":2,"Gasoline":1,"Crude Oil":1,"Pig Iron":1,"Iron Ore":2,"Electricity":1,"Cement":1,"Sand":1,"Steel":1,"Wood":1,"Hops":1,"Paint":1,"Cardboard":1,"Pregame Pils":1,"Cows":1,"Corn":1,"Barley":1,"Home Field Advantage":1,"Terracule001":1,"Gun Powder":1,"Potassium Nitrate":1,"Sulfur":1,"Water H2O":1,"Halcyon Nebula":1,"Charcoal":1,"Saltpeter":1,"Sonic Resonance Destructor":1,"Quantum Harmonic Metal":1,"Stellar Containment Orb":1,"Radiant Syncronite":1,"Heusler Alloy":1,"Ferromanganese Cobalt":1,"Nickel Silver":1,"Aluminum Bronze":1,"Titanium Aluminide":1,"Silver Solder":1,"Manganese Bronze":1,"Zinc":1,"Manganese":1,"Silver":1,"Nickle":1,"Titanium":1}},"3845":{"id":3845,"name":"Faunsdale","buildings":{"Electricity":9}},"5028":{"id":5028,"name":"Whatstandwell","buildings":{"Rubber":1,"Pig":1,"Oxygen":1,"Natural Gas":1,"Uranium":1,"Potash":1,"Cobalt":1,"Cows":1,"Nitrogen":1,"Sheep":1,"Concrete":1,"Silicon":1,"Aluminium":1,"Wool":1,"Cement":1,"Leather Gloves":1,"Trebuchet":1,"Fertilizer":1,"Phosphor":1,"Gun Powder":1,"Crude Oil":1,"Diesel":1,"Steel Dagger":1,"Explosives":1,"BBQ":1,"Iron Ore":1,"Charcoal":1,"Steel":1,"Armor":1,"Hydrogen Powered Lazer Drone":1,"Supply Shuttle":1,"Orbital Probe":1,"Sniper":1,"Nuclear Warhead":1,"Hydrogen Fuel Cell":1,"Soul Destroyer":1,"Laser Turret":1,"Loitering Munitions":1,"Sniper Rifle":1,"Enriched Uranium":1,"Attack Helicopter":1,"ICBM":1,"Motorbike":1,"Motor Car":1,"Armored Tank":1,"Personnel Carrier":1,"Gasoline":1,"Hydrogen":1,"Military Drone":1,"Bazooka":1,"Guidance System":1,"FPV Drone":1,"Grenades":1,"RPG":1,"Combustion Engine":1,"Tires":1,"Crown of Prosperity":1,"Holy Hand Grenade":1,"Milk":1,"Jug of Ale":1,"Cheese":1,"Mug of Coffee":1,"Horses":1,"Rawhide Leather":1,"Wheat":1,"Leather Greaves":1,"Leather Jacket":1,"Leather Boots":1,"Leather Shield":1,"Eggs":1,"Studded Gloves":1,"Glass":1,"Boots of Teleportation":1,"Cloak of Invincibility":1,"Leather Helm":1,"Studded Helmet":1,"Studded Shield":1,"Fabric":1,"Wand of Eternity":1,"Loom":1,"Cotton":1,"Sword":1,"Pig Iron":1,"Coal":1,"Lime":1,"Limestone":1,"Shield of Resilience":1,"Sword of Fury":1,"Wood":1,"Glue":1,"Duct Tape":1,"Water H2O":1,"Drove of Pigs":1,"Plastic":1,"Rope":1,"Fishing Net":1,"Chum Bucket":1,"Tin":1,"Wayfarers Meal":1,"Bacon  Eggs":1,"Salt Water":1,"Cured Ham":1,"Beef Jerky":1,"Knight":1,"Corn":1,"Bacon":1,"Salt":1,"Potassium Nitrate":1,"Studded Boots":1,"Tomatoes":1,"Fish":1,"Fire Beer":1,"Trex Teeth":1,"Shark":1,"Sword of Truth":1,"Laser":1,"Electronics":1,"Electricity":1,"Taser Fists":1,"Silicon Wafer":1,"Sand":1,"Copper":1,"Defensive Shield":1,"Gold":1,"Wooden Club":1,"Chickens":1,"Drone":1,"Phosphate":1,"Sulfur":1,"Saltpeter":1,"Explosives Specialist":1,"Samurai":1,"Barbarian":1,"Military Engineer":1,"Settler":1,"Lamb Jerky":1,"Horn of the Conqueror":1,"Aluminium Ore":1,"Frickin Laser Shark":1,"Studded Jacket":1,"Omelette":1,"Studded Trousers":1,"Leather Armour":1,"Hooded Cloak":1,"Bandit":1,"Bandit Dagger":1,"Sentinel Halo Ring":1,"Harmonic Shield Chalice":1,"Catapult":1,"Cobalt Wave Plasma Cannon":1}},"5181":{"id":5181,"name":"Brushford","buildings":{"Wood":50,"Charcoal":50,"Coal":50}},"5188":{"id":5188,"name":"Dayar","buildings":{"Uranium":1}},"5477":{"id":5477,"name":"Peterborough","buildings":{"Cows":39,"Rawhide Leather":50,"Corn":36,"Milk":13,"Cheese":12}},"5528":{"id":5528,"name":"Roseworthy","buildings":{"Limestone":1,"Gallium":1}},"5840":{"id":5840,"name":"Corocito","buildings":{"Coal":1}},"5946":{"id":5946,"name":"Eardington","buildings":{"Coal":1}},"6012":{"id":6012,"name":"Bourget","buildings":{"Wood":1,"Plastic":1,"Rubber":1,"Rope":1,"Corn":1,"Cows":1,"Wooden Club":1,"Drone":1,"Leather Gloves":3,"Studded Gloves":1,"Trebuchet":1,"Leather Greaves":3,"Leather Jacket":3,"Leather Boots":3,"Studded Boots":1,"Leather Shield":3,"Studded Shield":1,"Steel Dagger":1,"Shield of Resilience":1,"Catapult":1,"Sword of Fury":1,"Coal":1,"Limestone":1,"Lime":1,"Clay":1,"Charcoal":1,"Rawhide Leather":1,"Wool":1,"Pig Iron":1,"Studded Helmet":1,"Steel":1,"Sheep":1,"Wheat":1,"Cotton":1,"Iron Ore":1,"Studded Jacket":1,"Studded Trousers":1,"Fabric":1,"Leather Helm":3,"Loom":1,"Mug of Coffee":1}},"6153":{"id":6153,"name":"Meux","buildings":{"Urantitanium Alloy":6,"Titanium Beta C":6,"Titanium Aluminide":8,"Manganese Bronze":5,"Silver Solder":5,"Gamma Shield Alloy":6,"Radiant Syncronite":6,"Crimson Oathkeeper":1,"Uranium":1,"Titanium":1,"Aluminium Ore":1,"Copper":1,"Nickle":1,"Zinc":1,"Manganese":1,"Silver":1,"Coal":1,"Limestone":15,"Iron Ore":1,"Lime":1,"Pig Iron":1,"Steel":1,"Verdant SpiritGuard":1,"Cerulean Dreamweaver":1}},"6192":{"id":6192,"name":"Yakkala","buildings":{"Zinc":50,"Manganese":50,"Coal":50}},"6306":{"id":6306,"name":"Case Trentin","buildings":{"Aluminium Ore":50,"Nickle":50,"Silver":50}},"6361":{"id":6361,"name":"Willington","buildings":{"Steel":1,"Coal":1}},"6492":{"id":6492,"name":"Gruilung","buildings":{"Electronics":13,"Silicon Wafer":22,"Plastic":17,"Copper":1,"Glass":16,"Coal":1,"Limestone":1,"Silicon":9,"Sand":13,"Aluminium Ore":1,"Lime":1}},"6494":{"id":6494,"name":"Vengurla","buildings":{"Limestone":1,"Nuclear Warhead":1,"Guidance System":1,"Enriched Uranium":1,"Electronics":1,"Steel":1,"Glass":1,"Uranium":1,"Laser":1,"Silicon":1,"Plastic":1,"Silicon Wafer":1,"Aluminium Ore":1,"Sand":1,"Coal":1,"Lime":1,"Copper":1,"Electricity":1,"Pig Iron":1,"Iron Ore":1,"Cement":1,"Nitrogen":1,"Natural Gas":1,"Crude Oil":1,"Explosives":1,"Charcoal":1,"Wood":1,"Potassium Nitrate":1,"Saltpeter":1,"Sentinel Halo Ring":1,"Hydrogen":1,"Water H2O":1}},"6503":{"id":6503,"name":"Minhe","buildings":{"Coal":3,"Iron Ore":2,"Nuclear Warhead":1,"Wood":1,"Plastic":1,"Platinum":1,"Manganese":1}},"6512":{"id":6512,"name":"Umunede","buildings":{"Titanium":50,"Nickle":50,"Aluminium Ore":50}},"6578":{"id":6578,"name":"Bena","buildings":{"Hydrogen Fuel Cell":1,"Gasoline":1,"Sword":1,"Defensive Shield":1,"Catapult":1,"Armor":1,"BBQ":1,"Ceramics":1,"Silicon Wafer":1,"Diesel":1,"Horse  Cart":1,"Tomatoes":1,"Leather Shield":1,"Leather Boots":1,"Jug of Ale":1,"Crude Oil":1,"Explosives":1,"Nuclear Warhead":1,"Electricity":1,"Gun Powder":1,"Steel":3,"Settler":1,"Drove of Pigs":1,"Phosphor":1,"Leather Helm":1,"Leather Jacket":1,"Leather Greaves":1,"Military Engineer":1,"Boots of Teleportation":1,"Coal":1,"Limestone":1,"Iron Ore":1,"Wood":1,"Natural Gas":1,"Gold":1,"Silver":1,"Rubber":1,"Copper":1,"Sand":1,"Wheat":1,"Manganese":1,"Nickle":1,"Tin":1,"Zinc":1,"Platinum":1,"Titanium":1,"Aluminium Ore":1,"Sulfur":1,"Rawhide Leather":1,"Cows":1,"Corn":1,"Wool":1,"Cotton":1,"Sheep":1,"Nitrogen":1,"Potassium Nitrate":1,"Saltpeter":1,"Charcoal":1}},"6579":{"id":6579,"name":"Holeby","buildings":{"Steel":50}},"6676":{"id":6676,"name":"Bangkok","buildings":{"Coal":1,"Wheat":1,"Lamb Jerky":1}},"6680":{"id":6680,"name":"Opatovo","buildings":{"Coal":1,"Limestone":1,"Iron Ore":1,"Wood":1,"Terracule001":1,"Natural Gas":1,"Gold":1,"Silver":1,"Cotton":1,"Rubber":1,"Sand":1,"Wheat":1,"Plastic":1,"Manganese":1,"Nickle":1,"Tin":1,"Zinc":1,"Platinum":1}},"6714":{"id":6714,"name":"Baghdad","buildings":{"Coal":1,"Limestone":1,"Iron Ore":1,"Drove of Pigs":1,"Pig Iron":2,"Glass":2,"Laser Turret":1,"Electronics":1,"Copper":1,"Silicon Wafer":1,"Silicon":1,"Lime":1,"Sand":1,"Aluminium Ore":1,"Plastic":1,"Electricity":1,"Crude Oil":1,"Steel":1,"Cement":1,"Soul Destroyer":1,"Laser":1,"Nitrogen":1,"Natural Gas":1,"Combustion Engine":1,"Oxygen":1}},"6739":{"id":6739,"name":"Shaoxing","buildings":{"Lime":50,"Pig Iron":50,"Steel":50}},"6782":{"id":6782,"name":"Adani","buildings":{"Titanium Aluminide":32}},"6789":{"id":6789,"name":"Liigvalla","buildings":{"Elysium Crest":1,"Gold":1,"Rose Gold":1,"Aluminum Bronze":1,"Tin":1,"Pewter":1,"Copper":1,"Lead":1,"Silver":1,"Vortex Drift Helm":1,"Titanium":1,"Uranium":1,"Urantitanium Alloy":1,"Astralite Shield":1,"Zinc":1,"Manganese":1,"Lithium":1,"Aluminium Lithium Alloy":1,"Silver Solder":1,"Manganese Bronze":1,"Crystal Paladin Blade":1,"Nickle":1,"Platinum":1,"White Gold":1,"Titanium Aluminide":1,"Aero Link Armor":1,"Babbitt Copper":1,"Brass":1,"Heusler Alloy":1,"Titanium Beta C":1,"Harmonic Shield Chalice":1,"Wand of Eternity":1,"Steel":1,"Pigment":1,"Cobalt":1,"Natural Gas":1,"Aluminium":1,"Celestial Serenity":1,"Radiant Syncronite":1,"Aluminium Ore":1}},"6826":{"id":6826,"name":"Chongqing","buildings":{"Wood":50}},"6831":{"id":6831,"name":"Ulverstone","buildings":{"Coal":2}},"6906":{"id":6906,"name":"Beverley","buildings":{"Wooden Club":1,"Drone":1,"Plastic":1,"Mug of Coffee":1,"Cows":1,"Corn":1,"Wheat":2,"Rawhide Leather":1,"Sheep":1,"Lamb Jerky":1,"Salt":1,"Milk":1,"Beef Jerky":1,"Limestone":1,"Lime":1,"Coal":1,"Concrete":1,"Cheese":1,"Horses":1,"Glass":1,"Settler":1,"Jug of Ale":1,"Wool":1,"Wood":1,"Steel Dagger":1,"Iron Ore":1,"Cotton":1,"Trebuchet":1,"Steel":1,"Pig Iron":1,"Water H2O":1,"Fertilizer":1,"Tomatoes":1,"Horse  Cart":1,"Rope":1,"BBQ":1,"Armor":1,"Catapult":1,"Defensive Shield":1,"Aluminium Ore":1,"Natural Gas":1,"Aluminium":1,"Pig":1,"Cured Ham":1,"Chickens":1,"Eggs":1,"Bacon  Eggs":1,"Boots of Teleportation":1,"Phosphor":1,"Charcoal":1,"Sand":1,"Phosphate":1,"Cobalt":1,"Sword of Fury":1,"Shield of Resilience":1,"Horn of the Conqueror":1,"Crown of Prosperity":1,"Gold":1,"Sword":1,"Samurai":1,"Wand of Eternity":1,"Cloak of Invincibility":1,"Omelette":1,"Potash":1,"Nitrogen":1,"Knight":1,"Barbarian":1,"Grenades":1,"Explosives":1,"Potassium Nitrate":1,"Saltpeter":1,"Bacon":1,"Drove of Pigs":1,"Holy Hand Grenade":1,"Gun Powder":1,"Sulfur":1,"Sword of Truth":1,"Rubber":1,"Studded Gloves":1,"Bandit":1,"Bandit Dagger":1,"Leather Armour":1,"Fabric":1,"Loom":1,"Hooded Cloak":1}},"6913":{"id":6913,"name":"Calgary","buildings":{"Hydrogen Powered Lazer Drone":1,"Limestone":1,"Iron Ore":1,"Pig Iron":1,"Lime":1,"Wood":1,"Natural Gas":1,"Steel":1,"Electricity":1,"Cement":1,"Sand":1,"Salt":1,"Saltpeter":1,"Gold":1,"Silver":1,"Wheat":1,"Plastic":1,"Crude Oil":1,"Water H2O":1,"Laser":1,"Electronics":1,"Nitrogen":1,"Copper":1,"Silicon Wafer":2,"Glass":1,"Silicon":1,"Aluminium Ore":1,"Coal":1,"Sword of Truth":1,"Wand of Eternity":1,"Oats":1,"Steel Dagger":1,"Explosives":1,"Charcoal":2,"Potassium Nitrate":1,"Explosives Specialist":1,"Armor":1,"Shield of Resilience":1}},"6916":{"id":6916,"name":"London","buildings":{"Natural Gas":1,"Silver":1,"Sword":1,"Steel Dagger":1,"Cows":13,"Sheep":1,"Wheat":1,"Wool":1,"Leather Boots":1,"Leather Gloves":1,"Leather Helm":1,"Cotton":1,"Charcoal":7,"Shield of Resilience":1,"Wood":14,"Coal":14,"Iron Ore":15,"Limestone":15,"Lime":14,"Pig Iron":15,"Steel":14,"Corn":13,"Armor":1,"Rawhide Leather":1,"Pigment":1,"Aluminium Ore":1}},"7017":{"id":7017,"name":"Zhongshan","buildings":{"Charcoal":15,"Explosives":15,"Potassium Nitrate":15,"Saltpeter":15,"Nitrogen":15,"Natural Gas":15,"Wood":15,"Crude Oil":15,"Electricity":15,"Cement":15}},"7552":{"id":7552,"name":"Mississauga","buildings":{"Coal":50,"Limestone":50,"Iron Ore":50}},"7554":{"id":7554,"name":"Barrington","buildings":{"Coal":3,"Limestone":1,"Iron Ore":3,"Wood":7,"Terracule001":1,"Natural Gas":1,"Gold":1,"Silver":1,"Nuclear Warhead":1,"Hydrogen Fuel Cell":1,"Soul Destroyer":1,"Laser Turret":1,"Loitering Munitions":1,"Sniper Rifle":1,"Enriched Uranium":2,"Attack Helicopter":1,"Motorbike":1,"Gasoline":1,"Wand of Eternity":1,"ICBM":1,"Gun Powder":1,"FPV Drone":1,"Guidance System":1,"Explosives":1,"Corn":1}},"7563":{"id":7563,"name":"Malta","buildings":{"Wood":1,"Saltpeter":28,"Potassium Nitrate":17,"Explosives":30,"Charcoal":1,"Nitrogen":1,"Grenades":7}},"7567":{"id":7567,"name":"Berzence","buildings":{"Wooden Club":1,"Steel Dagger":1,"Steel":1,"Pig Iron":1,"Lime":1,"Iron Ore":14,"Limestone":14,"Sword of Fury":1,"Shield of Resilience":1,"Horn of the Conqueror":1,"Coal":14,"Charcoal":1,"Wood":14}},"7571":{"id":7571,"name":"Fairview","buildings":{"FPV Drone":17,"Natural Gas":1,"Nitrogen":1,"Saltpeter":1,"Potassium Nitrate":1,"Explosives":1,"Electronics":1,"Plastic":1}},"7587":{"id":7587,"name":"Argine","buildings":{"Natural Gas":1}},"7605":{"id":7605,"name":"Frankfurt","buildings":{"Limestone":1,"Lime":1,"Coal":1,"Iron Ore":1,"Pig Iron":1,"Steel":14,"Wood":1,"Armor":1,"Gold":1,"Charcoal":14,"Crown of Prosperity":1,"Corn":1,"Cows":1,"Rawhide Leather":1,"Sword":1,"Shield of Resilience":1,"Horn of the Conqueror":1,"Cloak of Invincibility":1,"Wool":1,"Sheep":1,"Wheat":1,"Titanium Aluminide":10,"Gamma Synchronite Shield":1,"Silver Solder":9,"Manganese Bronze":9,"Radiant Syncronite":4,"Urantitanium Alloy":9,"Titanium Beta C":10,"Gamma Shield Alloy":4,"Crimson Dragons Breath":1}},"7610":{"id":7610,"name":"Rabat","buildings":{"Coal":1,"Iron Ore":1,"Wood":1,"Natural Gas":1,"Gold":1,"Silver":1,"Cotton":1,"Rubber":1,"Sand":1,"Wheat":1,"Plastic":1,"Manganese":1,"Nickle":1,"Tin":1,"Zinc":1,"Platinum":1,"Titanium":1,"Cobalt":1,"Uranium":1,"Lead":1,"Bismuth":1,"Lithium":1,"Copper":1,"Silicon":1,"Glass":1,"Oxygen":1,"Aluminium Ore":1,"Silicon Wafer":1,"Nitrogen":1,"Oats":1,"Corn":1,"Barley":1,"Salt":1,"Sulfur":1,"Phosphate":1,"Saltpeter":1,"Potash":1,"Pig":1,"Gallium":1,"Potassium Nitrate":1,"Explosives":1,"Electronics":1,"FPV Drone":1,"Water H2O":1,"Crude Oil":1,"Pig Iron":1,"Steel":1,"Cement":1,"Laser":1,"Hydrogen Fuel Cell":1,"Electricity":1,"Hydrogen":1,"Hydrogen Powered Lazer Drone":1,"Combustion Engine":1,"Soul Destroyer":1,"Enriched Uranium":1,"Guidance System":1,"Nuclear Warhead":1,"Supply Shuttle":1,"Orbital Probe":1,"ICBM":1,"Sword of Fury":19,"Shield of Resilience":19,"Limestone":1,"Lime":1,"Charcoal":1,"Horn of the Conqueror":1,"Gun Powder":1,"Holy Hand Grenade":1,"Armored Tank":1,"Armor":1,"Sniper":1,"Sniper Rifle":1,"Loitering Munitions":1}},"7615":{"id":7615,"name":"Davao","buildings":{"Coal":1,"Wood":1,"Planks":1,"Charcoal":1,"Silicon":1,"Sand":1,"Water H2O":1,"Limestone":1,"Aluminium":1,"Natural Gas":1,"Aluminium Ore":1,"Glass":1,"Lime":1,"Silicon Wafer":1,"Electronics":1,"Copper":1,"Plastic":1,"Military Drone":1,"Explosives":1,"Potassium Nitrate":1,"Saltpeter":1,"Nitrogen":2,"Gun Powder":1,"Sulfur":1,"Armored Tank":1,"Steel":1,"Pig Iron":1,"Iron Ore":1,"Crude Oil":1,"Electricity":1,"Cement":1,"Hydrogen":1,"Hydrogen Fuel Cell":1,"Laser":1,"Hydrogen Powered Lazer Drone":1,"Guidance System":1,"ICBM":1}},"7620":{"id":7620,"name":"Kuala Lumpur","buildings":{"Coal":98}},"7621":{"id":7621,"name":"Port Louis","buildings":{"Wood":50,"Charcoal":50,"Sand":50}},"7622":{"id":7622,"name":"Brussels","buildings":{"Ferromanganese Cobalt":1}},"7641":{"id":7641,"name":"Minsk","buildings":{"Coal":1,"Iron Ore":1}},"7655":{"id":7655,"name":"Tirunelveli","buildings":{"Sand":25,"Glass":25,"Copper":25,"Silicon":25,"Silicon Wafer":25,"Electronics":25}}};
const url = 'https://liquidlands.io/raw/items';
async function loadJSONData() {
    const response = await fetch(url);
    const jsonData = await response.json();
    items = convertJSON(jsonData);
    filteredItems = items;
    buildInfoTable(items);
}

function toggle(){
    let table = document.getElementById('info');
    let toggle = document.getElementById('toggle');
    if(table.style.display == ''){
        table.style.display = 'none';
        toggle.innerHTML = 'Show Info';
    } else {
        table.style.display = '';
        toggle.innerHTML = 'Hide Info';
    }
    return false;
}

function buildInfoTable(items){
    let html = '<table>';
    html+= '<thead><tr><th>Item</th><th>Difficulty</th><th>Durability</th><th>Stats</th></tr></thead>';
    html+= '<tbody>';
    items.forEach((item, index)=>{
        let value = item.value1 + '<br>' + item.value2;
        html+= '<tr id="item_'+index+'" onclick="loadTree(\''+item.title+'\', '+index+')">';
        html += '<td>'+item.title+'</td>';
        html += '<td>'+item.difficulty.replace('difficulty ', '')+'</td>';
        html += '<td>'+item.durability.replace('durability ', '')+'</td>';
        html += '<td>'+value +'</td>';
        html += '</tr>';
    })
    html+= '</tbody>';
    html += '</table>';

    document.getElementById('info').innerHTML = html;
}

function buildItemTable(item){
    let html = '<table>';
    html+= '<thead><tr><th>Item</th><th>Required</th><th>Cities</th></tr></thead>';
    html+= '<tbody>';

    let children = {};
    getChildrenRecursive(item, children);
    html += buildRows(children);
    html+= '</tbody>';
    html += '</table>';

    document.getElementById('tree').innerHTML = html;
}

function getSortedKeys(obj) {
    var keys = Object.keys(obj);
    return keys.sort(function(a,b){return obj[b]-obj[a]});
}

function getCities(item){
    let citiesWithBuilding = [];
    Object.keys(cities).forEach((id)=>{
        let cityBuildings = cities[id].buildings;
        Object.keys(cityBuildings).forEach((building)=>{
            if(building == item){
                if(citiesWithBuilding.indexOf(cities[id]) == -1){
                    citiesWithBuilding.push(cities[id]);
                }
            }
        })
    })
    citiesWithBuilding.sort((a,b) => (b.buildings[item] > a.buildings[item]) ? 1 : ((a.buildings[item] > b.buildings[item]) ? -1 : 0))

    if(citiesWithBuilding.length > 5){
        citiesWithBuilding = citiesWithBuilding.slice(0,5);
    }
    let citiesHTML = '';
    citiesWithBuilding.forEach((city)=>{
        citiesHTML += `<div>${city.buildings[item]} x ${item}- <a href="https://liquidlands.io/city/${city.id}" target="_blank">${city.name}</a></div>`;
    })
    return citiesHTML;
}

function buildRows(arr){
    let html = '';
    let total_bricks = 0;
    getSortedKeys(arr).forEach((key, index)=>{
        let count = arr[key];
        let item = items.find((item)=>item.title == key);
        let composite = item.children && item.children.length > 0 ? true : false;

        let citiesHTML = getCities(item.title);

        // console.log('Found Cities with item: ', item, citiesWithBuilding);
        
        html+= '<tr class="'+(composite ? 'composite' : '')+'">';
        html += '<td onclick="loadTree(\''+item.title+'\')">'+item.title+'</td>';
        html += '<td>'+ (count * quantity) +'</td>';
        html += '<td>'+ citiesHTML +'</td>';
        total_bricks += (count * quantity);
        html += '</tr>';
    })
    document.getElementById('total_bricks').innerHTML = (total_bricks*0.7).toFixed(1) + ' bricks @ 70% - ' + (total_bricks) + ' bricks @ 100%';
    return html;
}

function getChildrenRecursive(item, children){
    if(!children[item.title]){
        children[item.title] = 0;
    }
    children[item.title]++;
    if(item.children){
        item.children.forEach((child)=>{
            if(!children[child.title]){
                children[child.title] = 0;
            }
            children[child.title]++;
        })
    }
    return children;
}

window.addEventListener("DOMContentLoaded", async (event) => {
    await loadJSONData();
  });

  function getChildren(items, item){
    
    let children1 = [];
    let children2 = [];
    let children3 = [];
    if(item.input1){
        let child = items.find((elm)=>elm.id == item.input1.id);
        let childItem = buildItem(child, null);
        children1 = getChildren(items, childItem);
        children1.push(childItem);
    }

    if(item.input2){
        let child = items.find((elm)=>elm.id == item.input2.id);
        let childItem = buildItem(child, null);
        children2 = getChildren(items, childItem);
        children2.push(childItem);
    }

    if(item.input3){
        let child = items.find((elm)=>elm.id == item.input3.id);
        let childItem = buildItem(child, null);
        children3 = getChildren(items, childItem);
        children3.push(childItem);
    }
    let allChildren = children1.concat(children2).concat(children3)
    if(allChildren && allChildren.length > 0){
        item.children = allChildren;
    }
    return allChildren;
}

function getNonZeroNumbers(obj) {
    let results = [];
    results.push({
        key: 'durability',
        value: obj['durability']
    });
    results.push({
        key: 'difficulty',
        value: obj['difficulty']
    });
    for (let key in obj) {
        if (obj.hasOwnProperty(key) && key != 'id') {
            if (typeof obj[key] === 'number' && obj[key] !== 0 && key != 'durability' && key != 'points' && key != 'difficulty') {
                results.push({
                    key: key,
                    value: obj[key]
                });
            }
        }
    }
    return results;
}

function convertJSON(json){
    let items = [];
    let counts = [];

    json.forEach((item)=>{
        let newItem = buildItem(item, null);
        let children = getChildren(json, newItem, null, []);
        newItem.children = children;

        let difficulty = 0;
        children.forEach((child)=>{
            difficulty += parseInt(child.difficulty.split(' ')[1]);
        })

        items.push(newItem);
        counts.push(difficulty);
    })

    items.sort(function(a, b) {
        return counts[items.indexOf(b)] - counts[items.indexOf(a)];
    });

    return items;
}

let ids = [];
function buildItem(item, parent){
    let id = item.id;
    let values = getNonZeroNumbers(item);
    
    let elm = {
        "id":id,
        "title":item.title,
        "input1": item.input1,
        "input2": item.input2,
        "input3": item.input3,
        "durability": values[0] ? (values[0].key + ' ' + values[0].value) : '',
        "difficulty": values[1] ? (values[1].key + ' ' + values[1].value) : '',
        "value1": values[2] ? (values[2].value + ' ' + values[2].key) : '',
        "value2": values[3] ? (values[3].value + ' ' + values[3].key) : '',
        "img1": item.thumb.replace('/48/', '/350/'),
        "img2": item.place_thumb.replace('/48/', '/350/')
    }
   return elm;
}

function loadTree(name, index){
    currentItem = name;
    if(index != undefined){
        currentIndex = index;
    }
    let selectedRows = Array.from(document.getElementsByClassName('selected'));
    selectedRows.forEach((elm)=>{
        elm.classList.remove('selected');
    })
    let item = items.find((it)=>it.title == name)


    if(index != undefined){
        let row = document.getElementById('item_'+index);
        row.classList.add('selected');
    }
    buildItemTable(item);
}

function filter(){
    let att = parseInt(document.getElementById('att').value);
    let def = parseInt(document.getElementById('def').value);
    let inv = parseInt(document.getElementById('inv').value);
    let tax = parseInt(document.getElementById('tax').value);
    let raid = parseInt(document.getElementById('raid').value);
    let leave = parseInt(document.getElementById('leave').value);
    let allNaN = false;
    if(Number.isNaN(att) && Number.isNaN(def) && Number.isNaN(inv) && Number.isNaN(tax) && Number.isNaN(raid) && Number.isNaN(leave)){
        allNaN = true;
    }
    let countNaN = 0;
    if(Number.isNaN(att)){
        countNaN++;
    } 
    if( Number.isNaN(def)){
        countNaN++;
    } 
    if( Number.isNaN(inv)){
        countNaN++;
    } 
    if( Number.isNaN(tax)){
        countNaN++;
    } 
    if( Number.isNaN(raid)){
        countNaN++;
    } 
    if( Number.isNaN(leave)){
        countNaN++;
    }
    filteredItems = [];//.concat(items);
    items.forEach((item)=>{
        let val1Valid = false;
        let val2Valid = false;
        //Value1
        // Attack
        if(item.value1.indexOf('attack') != -1){
            let val = parseInt(item.value1.split(' ')[0]);
            if(val >= att || allNaN){
                val1Valid = true;
            }
        }
        // defence
        if(item.value1.indexOf('defence') != -1){
            let val = parseInt(item.value1.split(' ')[0]);
            if(val >= def || allNaN){
                val1Valid = true;
            }
        }
        // Invincibility
        if(item.value1.indexOf('invincibility') != -1){
            let val = parseInt(item.value1.split(' ')[0]);
            if(val >= inv || allNaN){
                val1Valid = true;
            }
        }
        // Tax
        if(item.value1.indexOf('tax') != -1){
            let val = parseInt(item.value1.split(' ')[0]);
            if(val >= tax || allNaN){
                val1Valid = true;
            }
        }
        // Raid
        if(item.value1.indexOf('raid') != -1){
            let val = parseInt(item.value1.split(' ')[0]);
            if(val >= raid || allNaN){
                val1Valid = true;
            }
        }
        // Leave
        if(item.value1.indexOf('leave') != -1){
            let val = parseInt(item.value1.split(' ')[0]);
            if(val >= leave || allNaN){
                val1Valid = true;
            }
        }

        // Value2
         // Attack
         if(item.value2.indexOf('attack') != -1){
            let val = parseInt(item.value2.split(' ')[0]);
            if(val >= att || Number.isNaN(att)){
                val2Valid = true;
            }
        }
        // defence
        if(item.value2.indexOf('defence') != -1){
            let val = parseInt(item.value2.split(' ')[0]);
            if(val >= def || allNaN){
                val2Valid = true;
            }
        }
        // Invincibility
        if(item.value2.indexOf('invincibility') != -1){
            let val = parseInt(item.value2.split(' ')[0]);
            if(val >= inv || allNaN){
                val2Valid = true;
            }
        }
        // Tax
        if(item.value2.indexOf('tax') != -1){
            let val = parseInt(item.value2.split(' ')[0]);
            if(val >= tax || allNaN){
                val2Valid = true;
            }
        }
        // Raid
        if(item.value2.indexOf('raid') != -1){
            let val = parseInt(item.value2.split(' ')[0]);
            if(val >= raid || allNaN){
                val2Valid = true;
            }
        }
        // Leave
        if(item.value2.indexOf('leave') != -1){
            let val = parseInt(item.value2.split(' ')[0]);
            if(val >= leave || allNaN){
                val2Valid = true;
            }
        }

        if((val1Valid && item.value2 == '') || (val2Valid && item.value1 == '') 
            || (val1Valid && val2Valid) 
            || (val1Valid && countNaN == 5) || (val2Valid && countNaN == 5)){
            filteredItems.push(item);
        }
    })
    buildInfoTable(filteredItems);
}


function updateQuantity(){
    quantity = parseInt(document.getElementById('quantity').value);
    let item = items.find((it)=>it.title == currentItem)
    buildItemTable(item);
}