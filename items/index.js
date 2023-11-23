let items;
let currentItem = 'Hydrogen Powered Lazer Drone';
let currentIndex = 0;
let quantity = 1;
let filteredItems = [];

let cities = {"341":{"id":341,"name":"Acton","buildings":{"Fire Beer":1,"Trex Teeth":1,"Diesel":1,"Explosives":1,"Jug of Ale":1,"Glue":1,"Pig":1,"Clay":1,"Glass":1,"Coal":1,"Limestone":1,"Gold":1,"Lime":1,"Iron Ore":2,"Crude Oil":1,"Pig Iron":1,"Steel":1}},"930":{"id":930,"name":"Whenuakite","buildings":{"Coal":1,"Iron Ore":1}},"2006":{"id":2006,"name":"Doorntje","buildings":{"Uranium":50,"Titanium":50,"Copper":50}},"2213":{"id":2213,"name":"Barry","buildings":{"Terracule001":1,"Coal":1,"Limestone":1}},"2339":{"id":2339,"name":"Zandeken","buildings":{"Manganese Bronze":29}},"2669":{"id":2669,"name":"Drummond","buildings":{"Sheep":1,"Fish":1,"Wheat":1,"Cows":1,"Chickens":1,"Horses":1,"BBQ":1,"Bandit Dagger":1}},"3408":{"id":3408,"name":"Popanyinning","buildings":{"Wood":1,"Limestone":1,"Oats":1,"Wheat":1,"Sheep":1,"Corn":1,"Barley":1,"Coal":1,"Concrete":1,"Cotton":1,"Sand":1,"Rope":1,"Cement":1}},"3518":{"id":3518,"name":"Althorpe","buildings":{"Coal":1,"Limestone":1}},"3663":{"id":3663,"name":"Beluga","buildings":{"Copper":2,"Cobalt":2,"Aluminium Ore":2,"Coal":1,"Pigment":1,"Natural Gas":1,"Aluminium":1,"Wheat":1,"Rawhide Leather":1,"Horses":1,"Glue":1,"Limestone":1,"Lime":1,"Solvent":1,"Tin":2,"Gasoline":1,"Crude Oil":1,"Pig Iron":1,"Iron Ore":2,"Electricity":1,"Cement":1,"Sand":1,"Steel":1,"Wood":1,"Hops":1,"Paint":1,"Cardboard":1,"Pregame Pils":1,"Cows":1,"Corn":1,"Barley":1,"Home Field Advantage":1,"Terracule001":1,"Gun Powder":1,"Potassium Nitrate":1,"Sulfur":1,"Water H2O":1,"Halcyon Nebula":1,"Charcoal":1,"Saltpeter":1,"Sonic Resonance Destructor":1,"Quantum Harmonic Metal":1,"Stellar Containment Orb":1,"Radiant Syncronite":1,"Heusler Alloy":1,"Ferromanganese Cobalt":1,"Nickel Silver":1,"Aluminum Bronze":1,"Titanium Aluminide":1,"Silver Solder":1,"Manganese Bronze":1,"Zinc":1,"Manganese":1,"Silver":1,"Nickle":1,"Titanium":1,"Gamma Shield Alloy":1,"Titanium Beta C":1,"Urantitanium Alloy":1,"Uranium":1,"Golden Sunshard":1,"Twilight Ethercloak":1,"Crimson Oathkeeper":1,"Azure Galebound":1}},"5028":{"id":5028,"name":"Whatstandwell","buildings":{"Rubber":1,"Oxygen":1,"Natural Gas":1,"Uranium":1,"Potash":1,"Cobalt":1,"Cows":1,"Nitrogen":1,"Sheep":1,"Concrete":1,"Silicon":1,"Aluminium":1,"Wool":1,"Cement":1,"Leather Gloves":1,"Fertilizer":1,"Phosphor":1,"Gun Powder":1,"Crude Oil":1,"Diesel":1,"Steel Dagger":1,"Explosives":1,"Iron Ore":1,"Charcoal":1,"Steel":1,"Armor":1,"Hydrogen Powered Lazer Drone":1,"Supply Shuttle":1,"Orbital Probe":1,"Sniper":1,"Nuclear Warhead":1,"Hydrogen Fuel Cell":1,"Soul Destroyer":1,"Laser Turret":1,"Loitering Munitions":1,"Sniper Rifle":1,"Enriched Uranium":1,"Attack Helicopter":1,"ICBM":1,"Motorbike":1,"Motor Car":1,"Armored Tank":1,"Personnel Carrier":1,"Gasoline":1,"Hydrogen":1,"Military Drone":1,"Bazooka":1,"Guidance System":1,"FPV Drone":1,"Grenades":1,"RPG":1,"Combustion Engine":1,"Tires":1,"Crown of Prosperity":1,"Holy Hand Grenade":1,"Milk":1,"Jug of Ale":1,"Cheese":1,"Mug of Coffee":1,"Horses":1,"Wheat":1,"Leather Greaves":1,"Leather Jacket":1,"Leather Boots":1,"Leather Shield":1,"Eggs":1,"Studded Gloves":1,"Glass":1,"Boots of Teleportation":1,"Cloak of Invincibility":1,"Leather Helm":1,"Studded Helmet":1,"Studded Shield":1,"Fabric":1,"Wand of Eternity":1,"Loom":1,"Cotton":1,"Sword":1,"Pig Iron":1,"Coal":1,"Lime":1,"Limestone":1,"Shield of Resilience":1,"Sword of Fury":1,"Wood":1,"Glue":1,"Duct Tape":1,"Water H2O":1,"Drove of Pigs":1,"Plastic":1,"Rope":1,"Fishing Net":1,"Chum Bucket":1,"Tin":1,"Wayfarers Meal":1,"Bacon  Eggs":1,"Salt Water":1,"Cured Ham":1,"Beef Jerky":1,"Knight":1,"Corn":1,"Bacon":1,"Salt":1,"Potassium Nitrate":1,"Studded Boots":1,"Tomatoes":1,"Fish":1,"Fire Beer":1,"Trex Teeth":1,"Shark":1,"Sword of Truth":1,"Laser":1,"Electronics":1,"Electricity":1,"Taser Fists":1,"Silicon Wafer":1,"Sand":1,"Copper":1,"Defensive Shield":1,"Gold":1,"Wooden Club":1,"Chickens":1,"Drone":1,"Phosphate":1,"Sulfur":1,"Saltpeter":1,"Explosives Specialist":1,"Samurai":1,"Barbarian":1,"Military Engineer":1,"Settler":1,"Lamb Jerky":1,"Horn of the Conqueror":1,"Aluminium Ore":1,"Frickin Laser Shark":1,"Studded Jacket":1,"Omelette":1,"Studded Trousers":1,"Leather Armour":1,"Hooded Cloak":1,"Bandit":1,"Bandit Dagger":1,"Sentinel Halo Ring":1,"Harmonic Shield Chalice":1,"Catapult":1,"Cobalt Wave Plasma Cannon":1,"Poker Hat":1,"Rawhide Leather":1,"Trick or Treat Pail":1}},"5188":{"id":5188,"name":"Dayar","buildings":{"Uranium":1}},"5390":{"id":5390,"name":"Lemo","buildings":{"Alnicomagnets":6}},"5477":{"id":5477,"name":"Peterborough","buildings":{"Cows":39,"Rawhide Leather":50,"Corn":36,"Milk":13,"Cheese":12}},"5528":{"id":5528,"name":"Roseworthy","buildings":{"Limestone":1,"Gallium":1,"Chum Bucket":1,"Beef Jerky":1,"Lamb Jerky":1,"Aluminium":2,"Loom":1,"Wool":1,"Leather Gloves":1,"Cheese":1,"Cement":1,"Trebuchet":1,"Ferromanganese Cobalt":1,"Salt Water":1,"Coal":1,"Mug of Coffee":1,"Clay":1,"Pigment":1,"Eggs":1,"Crown of Prosperity":1,"Crude Oil":1}},"5638":{"id":5638,"name":"Wiedensahl","buildings":{"Aluminium Ore":51}},"5694":{"id":5694,"name":"Lanoraie","buildings":{"Iron Ore":51}},"5840":{"id":5840,"name":"Corocito","buildings":{"Borg Dyson Sphere":1,"Triton Echoes":1,"Borg Spore Incubator":1}},"5946":{"id":5946,"name":"Eardington","buildings":{"Coal":1}},"6012":{"id":6012,"name":"Bourget","buildings":{"Rope":2,"Wooden Club":1,"Drone":1,"Leather Gloves":3,"Studded Gloves":2,"Trebuchet":1,"Leather Greaves":3,"Leather Jacket":3,"Leather Boots":3,"Studded Boots":2,"Leather Shield":3,"Studded Shield":2,"Catapult":1,"Clay":1,"Wool":1,"Studded Helmet":2,"Sheep":1,"Wheat":1,"Studded Jacket":2,"Studded Trousers":2,"Fabric":1,"Leather Helm":3,"Loom":1,"Mug of Coffee":1,"Cotton":2}},"6153":{"id":6153,"name":"Meux","buildings":{"Borg Energy System":1,"Borg Subspace Network":1,"Borg Hive Mind":1,"Borg Transwarp Drive":1,"Borg Planet Killer":1,"Borg Torpedos Array":1,"Borg Beams Array":1,"Borg Hive Navigational System":1,"Borg Hive Planet Killer":1,"Borg Hive Weapons System":1,"Borg Energy Shroud":1}},"6192":{"id":6192,"name":"Yakkala","buildings":{"Zinc":50,"Manganese":50,"Coal":50}},"6248":{"id":6248,"name":"Reedy","buildings":{"Urantitanium Alloy":50}},"6298":{"id":6298,"name":"Warrenton","buildings":{"Titanium":51,"Copper":51}},"6306":{"id":6306,"name":"Case Trentin","buildings":{"Aluminium Ore":50,"Nickle":50,"Silver":50}},"6329":{"id":6329,"name":"Clonsilla","buildings":{"Silver Solder":28}},"6361":{"id":6361,"name":"Willington","buildings":{"Steel":1,"Coal":1}},"6372":{"id":6372,"name":"Moscow","buildings":{}},"6412":{"id":6412,"name":"Calvinia","buildings":{"Limestone":51}},"6417":{"id":6417,"name":"Jinan","buildings":{}},"6472":{"id":6472,"name":"Luoyang","buildings":{}},"6473":{"id":6473,"name":"Dongguan","buildings":{}},"6474":{"id":6474,"name":"Lagos","buildings":{}},"6492":{"id":6492,"name":"Gruilung","buildings":{"Silicon Wafer":28,"Glass":27,"Plastic":25,"Sand":1,"Silicon":6,"Aluminium Ore":1}},"6494":{"id":6494,"name":"Vengurla","buildings":{"Limestone":1,"Nuclear Warhead":1,"Guidance System":1,"Enriched Uranium":1,"Electronics":1,"Steel":1,"Glass":1,"Uranium":1,"Laser":1,"Silicon":1,"Plastic":1,"Silicon Wafer":1,"Aluminium Ore":1,"Sand":1,"Coal":1,"Lime":1,"Copper":1,"Electricity":1,"Pig Iron":1,"Iron Ore":1,"Cement":1,"Nitrogen":1,"Natural Gas":1,"Crude Oil":1,"Explosives":1,"Charcoal":1,"Wood":1,"Potassium Nitrate":1,"Saltpeter":1,"Sentinel Halo Ring":1,"Hydrogen":1,"Water H2O":1,"Leather Helm":1,"Cotton":1,"Rawhide Leather":1,"Cows":1,"Corn":1,"Leather Boots":1,"Wool":1,"Sheep":1,"Wheat":1,"Steel Dagger":1}},"6503":{"id":6503,"name":"Minhe","buildings":{"Coal":3,"Iron Ore":2,"Nuclear Warhead":1,"Wood":1,"Plastic":1,"Platinum":1,"Manganese":1}},"6508":{"id":6508,"name":"Hyderabad","buildings":{}},"6509":{"id":6509,"name":"Changsha","buildings":{}},"6512":{"id":6512,"name":"Umunede","buildings":{"Titanium":50,"Nickle":50,"Aluminium Ore":50}},"6554":{"id":6554,"name":"Changchun","buildings":{}},"6578":{"id":6578,"name":"Bena","buildings":{"Hydrogen Fuel Cell":1,"Gasoline":1,"Sword":1,"Defensive Shield":1,"Catapult":1,"Armor":1,"BBQ":1,"Ceramics":1,"Silicon Wafer":1,"Diesel":1,"Horse  Cart":1,"Tomatoes":1,"Leather Shield":1,"Leather Boots":1,"Jug of Ale":1,"Crude Oil":1,"Explosives":1,"Nuclear Warhead":1,"Electricity":1,"Gun Powder":1,"Steel":1,"Settler":1,"Drove of Pigs":1,"Phosphor":1,"Leather Helm":1,"Leather Jacket":1,"Leather Greaves":1,"Military Engineer":1,"Boots of Teleportation":1,"Coal":1,"Limestone":1,"Iron Ore":1,"Wood":1,"Natural Gas":1,"Gold":1,"Silver":1,"Rubber":1,"Copper":1,"Sand":1,"Wheat":1,"Manganese":1,"Nickle":1,"Tin":1,"Zinc":1,"Platinum":1,"Titanium":1,"Aluminium Ore":1,"Sulfur":1,"Rawhide Leather":1,"Cows":1,"Corn":1,"Wool":1,"Cotton":1,"Sheep":1,"Nitrogen":1,"Potassium Nitrate":1,"Saltpeter":1,"Charcoal":1,"Pig Iron":1,"Lime":1,"Enriched Uranium":1,"Uranium":1,"Laser":1,"Electronics":1,"Plastic":1}},"6579":{"id":6579,"name":"Holeby","buildings":{"Steel":50,"Steel Dagger":2,"Armor":2,"BBQ":2,"Catapult":2,"Horn of the Conqueror":2,"Sword":2,"Samurai":2,"Wand of Eternity":2,"Combustion Engine":2,"Knight":2,"Defensive Shield":2,"Sword of Truth":2,"Harmonic Shield Chalice":2,"Pigment":2}},"6615":{"id":6615,"name":"Harbin","buildings":{}},"6622":{"id":6622,"name":"Mexico City","buildings":{}},"6658":{"id":6658,"name":"Hefei","buildings":{}},"6665":{"id":6665,"name":"Ho Chi Minh City","buildings":{}},"6672":{"id":6672,"name":"Foshan","buildings":{}},"6676":{"id":6676,"name":"Bangkok","buildings":{"Coal":1,"Wheat":1,"Lamb Jerky":1}},"6680":{"id":6680,"name":"Opatovo","buildings":{"Coal":1,"Limestone":1,"Iron Ore":1,"Wood":1,"Terracule001":1,"Natural Gas":1,"Gold":1,"Silver":1,"Cotton":1,"Rubber":1,"Sand":1,"Wheat":1,"Plastic":1,"Manganese":1,"Nickle":1,"Tin":1,"Zinc":1,"Platinum":1}},"6694":{"id":6694,"name":"Ankara","buildings":{}},"6711":{"id":6711,"name":"Cairo","buildings":{}},"6713":{"id":6713,"name":"Hong Kong","buildings":{}},"6714":{"id":6714,"name":"Baghdad","buildings":{"Coal":1,"Limestone":1,"Iron Ore":1,"Drove of Pigs":1,"Pig Iron":2,"Glass":2,"Laser Turret":1,"Electronics":1,"Copper":1,"Silicon Wafer":1,"Silicon":1,"Lime":1,"Sand":1,"Aluminium Ore":1,"Plastic":1,"Electricity":1,"Crude Oil":1,"Steel":1,"Cement":1,"Soul Destroyer":1,"Laser":1,"Nitrogen":1,"Natural Gas":1,"Combustion Engine":1,"Oxygen":1}},"6716":{"id":6716,"name":"Ilinge","buildings":{"Nickle":51}},"6739":{"id":6739,"name":"Shaoxing","buildings":{"Lime":50,"Pig Iron":50,"Steel":50}},"6760":{"id":6760,"name":"Nanchang","buildings":{}},"6763":{"id":6763,"name":"Progorelica","buildings":{"Shark":1}},"6766":{"id":6766,"name":"Ahmedabad","buildings":{}},"6767":{"id":6767,"name":"Bengaluru","buildings":{}},"6776":{"id":6776,"name":"Alexandria","buildings":{}},"6781":{"id":6781,"name":"Chitu","buildings":{"Zinc":51}},"6782":{"id":6782,"name":"Adani","buildings":{"Titanium Aluminide":50}},"6789":{"id":6789,"name":"Liigvalla","buildings":{"Aluminium Lithium Alloy":7,"Babbitt Copper":3,"Heusler Alloy":8,"Astralite Shield":1,"Vortex Drift Helm":1,"Crystal Paladin Blade":1,"White Gold":4,"Elysium Crest":1,"Rose Gold":3,"Aero Link Armor":1,"Aluminum Bronze":3,"Pewter":3,"Brass":4,"Titanium Beta C":4,"Urantitanium Alloy":1,"Blazing Coronet":1,"Celestial Anchor":1,"Radiant Battlegear":1}},"6826":{"id":6826,"name":"Chongqing","buildings":{"Wood":50}},"6831":{"id":6831,"name":"Ulverstone","buildings":{"Coal":2}},"6858":{"id":6858,"name":"Delhi","buildings":{}},"6859":{"id":6859,"name":"Hangzhou","buildings":{}},"6861":{"id":6861,"name":"Guangzhou","buildings":{}},"6862":{"id":6862,"name":"Hyderabad","buildings":{}},"6863":{"id":6863,"name":"Jieyang","buildings":{}},"6886":{"id":6886,"name":"Mumbai","buildings":{}},"6888":{"id":6888,"name":"Jakarta","buildings":{}},"6889":{"id":6889,"name":"Bogota","buildings":{}},"6910":{"id":6910,"name":"Karachi","buildings":{}},"6913":{"id":6913,"name":"Calgary","buildings":{"Hydrogen Powered Lazer Drone":1,"Limestone":1,"Iron Ore":1,"Pig Iron":1,"Lime":1,"Wood":1,"Natural Gas":1,"Steel":1,"Electricity":1,"Cement":1,"Sand":1,"Salt":1,"Saltpeter":1,"Gold":1,"Silver":1,"Wheat":1,"Plastic":1,"Crude Oil":1,"Water H2O":1,"Laser":1,"Electronics":1,"Nitrogen":1,"Copper":1,"Silicon Wafer":2,"Glass":1,"Silicon":1,"Aluminium Ore":1,"Coal":1,"Sword of Truth":1,"Wand of Eternity":1,"Oats":1,"Steel Dagger":1,"Explosives":1,"Charcoal":2,"Potassium Nitrate":1,"Explosives Specialist":1,"Armor":1,"Shield of Resilience":1}},"6916":{"id":6916,"name":"London","buildings":{"Natural Gas":1,"Silver":1,"Sheep":1,"Wheat":1,"Wool":1,"Cotton":1,"Charcoal":7,"Wood":14,"Coal":24,"Iron Ore":15,"Limestone":15,"Lime":14,"Pig Iron":15,"Steel":14,"Corn":13,"Cows":10,"Rawhide Leather":1,"Aluminium Ore":1,"Plastic":1}},"6919":{"id":6919,"name":"Istanbul","buildings":{}},"6959":{"id":6959,"name":"Lima","buildings":{}},"6961":{"id":6961,"name":"Kunming","buildings":{}},"6962":{"id":6962,"name":"Beijing","buildings":{}},"6964":{"id":6964,"name":"Chengdu","buildings":{}},"7017":{"id":7017,"name":"Zhongshan","buildings":{"Electricity":7,"Titanium Aluminide":50,"Borg Module Connector":1,"Borg Regeneration Matrix":1,"Borg Power Node":1,"Borg Neutron Bomb":1,"Borg Traction Beam":1,"Borg Hive Module":1,"Borg Command Room":1,"Borg Gravamatric Torpedos":1,"Borg High Yield Torpedos":1,"Borg Disruptor Beams":1,"Borg Genesis Engine":1,"Borg Warp Core":1,"Titanium Beta C":50,"Copper":28}},"7537":{"id":7537,"name":"Cossack","buildings":{"Coal":1,"Natural Gas":1,"Gold":1,"Uranium":1,"Eggs":1}},"7552":{"id":7552,"name":"Mississauga","buildings":{"Coal":50,"Limestone":50,"Iron Ore":50}},"7554":{"id":7554,"name":"Barrington","buildings":{"Coal":4,"Limestone":1,"Iron Ore":3,"Wood":7,"Terracule001":1,"Natural Gas":2,"Gold":2,"Silver":2,"Nuclear Warhead":1,"Hydrogen Fuel Cell":1,"Soul Destroyer":1,"Laser Turret":1,"Loitering Munitions":1,"Sniper Rifle":1,"Enriched Uranium":2,"Attack Helicopter":1,"Motorbike":1,"Gasoline":1,"Wand of Eternity":1,"ICBM":1,"Gun Powder":1,"FPV Drone":1,"Guidance System":1,"Explosives":1,"Corn":2,"Drone":2,"Bismuth":2,"Borg Mobile Shield Generator":1,"Cotton":1,"Rubber":1,"Sand":1,"Wheat":1,"Plastic":1,"Manganese":1,"Nickle":1,"Tin":1,"Zinc":1,"Platinum":1,"Titanium":1,"Cobalt":1,"Uranium":1,"Lead":1,"Lithium":1,"Oxygen":1,"Aluminium Ore":1,"Copper":1,"Oats":1,"Barley":1,"Salt":1,"Sulfur":1,"Phosphate":1,"Saltpeter":1,"Potash":1,"Pig":1,"Gallium":1,"Fish":1,"Linseed Oil":1,"Hops":1,"Field of Bliss":1,"Nitrogen":1,"Potassium Nitrate":1,"Rope":1,"Cows":1,"Sheep":1,"Planks":1,"Clay":1,"Wooden Club":1,"Lime":1,"Charcoal":1,"Concrete":1,"Mug of Coffee":1,"Chickens":1,"Water H2O":1,"Rawhide Leather":1,"Silicon":1,"Cured Ham":1,"Milk":1,"Wool":1}},"7563":{"id":7563,"name":"Malta","buildings":{"Saltpeter":29,"Potassium Nitrate":23,"Explosives":27,"Grenades":8,"Holy Hand Grenade":4,"Nitrogen":3}},"7567":{"id":7567,"name":"Berzence","buildings":{"Wooden Club":1,"Steel Dagger":1,"Steel":1,"Pig Iron":1,"Lime":1,"Iron Ore":14,"Limestone":14,"Sword of Fury":1,"Shield of Resilience":1,"Horn of the Conqueror":1,"Coal":14,"Charcoal":1,"Wood":14}},"7571":{"id":7571,"name":"Fairview","buildings":{"Celestial Serenity":1,"Veil of Avalon":1,"Roseate Elysium":1,"Gamma Shield Alloy":12,"Radiant Syncronite":10,"Urantitanium Alloy":10,"Titanium Beta C":12,"Manganese Bronze":13,"Silver Solder":12,"Silver":1,"Titanium Aluminide":1}},"7577":{"id":7577,"name":"Ocean View","buildings":{"Electronics":50,"FPV Drone":2,"Military Drone":2,"Copper":1,"Plastic":1,"Silicon Wafer":1,"Explosives":1}},"7587":{"id":7587,"name":"Argine","buildings":{"Natural Gas":1}},"7605":{"id":7605,"name":"Frankfurt","buildings":{"Armor":2,"Crown of Prosperity":1,"Sword":1,"Shield of Resilience":1,"Horn of the Conqueror":1,"Cloak of Invincibility":1,"Gamma Synchronite Shield":1,"Silver Solder":15,"Manganese Bronze":15,"Radiant Syncronite":16,"Urantitanium Alloy":15,"Titanium Beta C":15,"Gamma Shield Alloy":17,"Crimson Dragons Breath":1,"Nickel Silver":9,"Verdant Forest Whisper":1}},"7610":{"id":7610,"name":"Rabat","buildings":{"Coal":1,"Iron Ore":1,"Wood":1,"Natural Gas":1,"Gold":1,"Silver":1,"Cotton":1,"Rubber":1,"Sand":1,"Wheat":1,"Plastic":1,"Manganese":1,"Nickle":1,"Tin":1,"Zinc":1,"Platinum":1,"Titanium":1,"Cobalt":1,"Uranium":1,"Lead":1,"Bismuth":1,"Lithium":1,"Copper":1,"Silicon":1,"Glass":1,"Oxygen":1,"Aluminium Ore":1,"Silicon Wafer":1,"Nitrogen":1,"Oats":1,"Corn":1,"Barley":1,"Salt":1,"Sulfur":1,"Phosphate":1,"Saltpeter":1,"Potash":1,"Pig":1,"Gallium":1,"Potassium Nitrate":1,"Explosives":1,"Electronics":1,"FPV Drone":1,"Water H2O":1,"Crude Oil":1,"Pig Iron":1,"Steel":1,"Cement":1,"Laser":1,"Hydrogen Fuel Cell":1,"Electricity":1,"Hydrogen":1,"Hydrogen Powered Lazer Drone":1,"Combustion Engine":1,"Soul Destroyer":1,"Enriched Uranium":1,"Guidance System":1,"Nuclear Warhead":1,"Supply Shuttle":1,"Orbital Probe":1,"ICBM":1,"Sword of Fury":19,"Shield of Resilience":19,"Limestone":1,"Lime":1,"Charcoal":1,"Horn of the Conqueror":1,"Gun Powder":1,"Holy Hand Grenade":1,"Armored Tank":1,"Armor":1,"Sniper":1,"Sniper Rifle":1,"Loitering Munitions":1}},"7615":{"id":7615,"name":"Davao","buildings":{"Coal":1,"Wood":1,"Planks":1,"Charcoal":1,"Silicon":1,"Sand":1,"Water H2O":1,"Limestone":1,"Aluminium":10,"Natural Gas":1,"Aluminium Ore":1,"Glass":1,"Lime":1,"Silicon Wafer":1,"Electronics":1,"Copper":1,"Plastic":1,"Military Drone":1,"Explosives":1,"Potassium Nitrate":1,"Saltpeter":1,"Nitrogen":2,"Gun Powder":1,"Sulfur":1,"Armored Tank":1,"Steel":1,"Pig Iron":1,"Iron Ore":1,"Crude Oil":1,"Electricity":2,"Cement":1,"Hydrogen":1,"Hydrogen Fuel Cell":1,"Laser":1,"Hydrogen Powered Lazer Drone":1,"Guidance System":2,"ICBM":1,"Barley":2,"Pregame Pils":2,"Glue":2,"Horses":2,"Wheat":2,"Cardboard":2}},"7617":{"id":7617,"name":"Maracaibo","buildings":{"Natural Gas":18,"Water H2O":6,"Rubber":10,"Sulfur":10,"Gun Powder":2,"Cement":5,"Oxygen":2}},"7620":{"id":7620,"name":"Kuala Lumpur","buildings":{"Coal":98}},"7621":{"id":7621,"name":"Port Louis","buildings":{"Wood":50,"Charcoal":50,"Sand":50}},"7622":{"id":7622,"name":"Brussels","buildings":{"Ferromanganese Cobalt":6,"Heusler Alloy":5,"Aluminum Bronze":5,"Quantum Harmonic Metal":2,"Babbitt Copper":5,"Titanium Aluminide":51}},"7641":{"id":7641,"name":"Minsk","buildings":{"Coal":1,"Iron Ore":1}},"7642":{"id":7642,"name":"Hohhot","buildings":{"Tin":10,"Lithium":10,"Lead":10,"Gold":10,"Cobalt":10,"Platinum":10,"Plastic":1,"Aluminium Lithium Alloy":3,"Aluminum Bronze":3}},"7653":{"id":7653,"name":"Tijuana","buildings":{"Crude Oil":6}},"7655":{"id":7655,"name":"Tirunelveli","buildings":{"Titanium":50,"Aluminium Ore":50,"Nickle":50}}}
const url = 'https://liquidlands.io/raw/items';
async function loadJSONData() {
    const response = await fetch(url);
    const jsonData = await response.json();
    items = convertJSON(jsonData);
    filteredItems = [];//.concat(items);
    // buildInfoTable(items);
    filter();
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

function buildInfoTable(arr){
    let html = '<table>';
    html+= '<thead><tr><th>Image</th><th>Item</th><th>Difficulty</th><th>Durability</th><th>Stats</th><th>Parts</th></tr></thead>';
    html+= '<tbody>';
    arr.forEach((item, index)=>{
        let value = item.value1 + '<br>' + item.value2;
        let info = canBeBuilt(item, true);
        html+= '<tr id="item_'+index+'" onclick="loadTree(\''+item.title+'\', '+index+')">';
        html += '<td><img width="80px" src="'+item.img1+'">'+'</td>';
        html += '<td>'+item.title+'</td>';
        html += '<td>'+item.difficulty.replace('difficulty ', '')+'</td>';
        html += '<td>'+item.durability.replace('durability ', '')+'</td>';
        html += '<td>'+value +'</td>';
        html += '<td class="'+(info.canBuild ? 'canbuild' : 'cantbuild') + '">' + ' ' + info.complete + '/' + info.total+  '</td>';
        html += '</tr>';
    })
    html+= '</tbody>';
    html += '</table>';

    document.getElementById('info').innerHTML = html;
}

function buildItemTable(item){
    let html = '<table>';
    html+= '<thead><tr><th>Image</th><th>Item</th><th>Type</th><th>Required</th><th>Cities</th></tr></thead>';
    html+= '<tbody>';

    let children = {};
    getChildrenRecursive(item, children);
    html += buildRows(item, children);
    html+= '</tbody>';
    html += '</table>';

    document.getElementById('tree').innerHTML = html;
    document.getElementById('item_title').innerHTML = item.title;
}

function getSortedKeys(obj) {
    var keys = Object.keys(obj);
    return keys.sort(function(a,b){return obj[b]-obj[a]});
}

function canBeBuilt(item, counts){
    let canBuild = true;
    let children = {};
    getChildrenRecursive(item, children);
    let complete = 0;
    let total = Object.keys(children).length;
    Object.keys(children).forEach((key, index)=>{
        let child = items.find((item)=>item.title == key);
        if(child){
            let citiesWithItem = getCitiesWithItem(child.title);
            // let composite = item.children && item.children.length > 0 ? true : false;

            // if(composite){
            //     canBeBuilt()
            // }

            let count = Object.keys(citiesWithItem).length;
            if(count == 0){
                canBuild = false;
            } else {
                complete++;
            }
        } else {
            canBuild = false;
        }
    });

    if(counts){
        return {canBuild, total, complete};
    }else {
        return canBuild;
    }
}

function getCitiesWithItem(itemName){
    let citiesWithItem = [];
    Object.keys(cities).forEach((id)=>{
        let cityBuildings = cities[id].buildings;
        Object.keys(cityBuildings).forEach((building)=>{
            if(building == itemName){
                if(citiesWithItem.indexOf(cities[id]) == -1){
                    citiesWithItem.push(cities[id]);
                }
            }
        })
    })
    return citiesWithItem;
}

function getCities(item){
    let citiesWithItem = getCitiesWithItem(item);
    citiesWithItem.sort((a,b) => (b.buildings[item] > a.buildings[item]) ? 1 : ((a.buildings[item] > b.buildings[item]) ? -1 : 0))

    if(citiesWithItem.length > 3){
        citiesWithItem = citiesWithItem.slice(0,3);
    }
    let citiesHTML = '';
    citiesWithItem.forEach((city)=>{
        //${item}- 
        citiesHTML += `<div>${city.buildings[item]} x <a href="https://liquidlands.io/city/${city.id}" target="_blank">${city.name}</a></div>`;
    })
    return citiesHTML;
}

function buildRows(mainItem, arr){
    let html = '';
    let total_bricks = 0;
    
    let sortedKeys = getSortedKeys(arr);
    sortedKeys.forEach((key, index)=>{
        let count = arr[key];
        let item = items.find((item)=>item.title == key);

        let canBuild = canBeBuilt(item); 
        let composite = item.children && item.children.length > 0 ? true : false;

        let mainItemClass = mainItem.title == item.title;
        if(!mainItemClass && !composite){
            let citiesHTML = getCities(item.title);

            // console.log('Found Cities with item: ', item, citiesWithBuilding);
            
            html+= '<tr class="'+(composite ? 'composite' : '')+'">';
            html += '<td><img width="40px" src="'+item.img1+'">'+'</td>';
            html += '<td onclick="loadTree(\''+item.title+'\')" class="'+(canBuild ? 'canbuild' : 'cantbuild') +'"><u>'+item.title+'</u></td>';
            html += '<td>Base</td>';
            html += '<td>'+ (count * quantity) +'</td>';
            html += '<td>'+ citiesHTML +'</td>';
            total_bricks += (count * quantity);
            html += '</tr>';
        }
    })

    sortedKeys.forEach((key, index)=>{
        let count = arr[key];
        let item = items.find((item)=>item.title == key);
        let canBuild = canBeBuilt(item);
        let composite = item.children && item.children.length > 0 ? true : false;

        let mainItemClass = mainItem.title == item.title;
        if(!mainItemClass && composite){
            let citiesHTML = getCities(item.title);

            // console.log('Found Cities with item: ', item, citiesWithBuilding);
            
            html+= '<tr class="'+(composite ? 'composite' : '')+'">';
            html += '<td><img width="40px" src="'+item.img1+'">'+'</td>';
            html += '<td onclick="loadTree(\''+item.title+'\')" class="'+(canBuild ? 'canbuild' : 'cantbuild') +'"><u>'+item.title+'</u></td>';
            html += '<td>Composite</td>';
            html += '<td>'+ (count * quantity) +'</td>';
            html += '<td>'+ citiesHTML +'</td>';
            total_bricks += (count * quantity);
            html += '</tr>';
        }
    })

    sortedKeys.forEach((key, index)=>{
        let count = arr[key];
        let item = items.find((item)=>item.title == key);
        let canBuild = canBeBuilt(item);
        // let composite = item.children && item.children.length > 0 ? true : false;

        let mainItemClass = mainItem.title == item.title;
        if(mainItemClass){
            let citiesHTML = getCities(item.title);
    
            // console.log('Found Cities with item: ', item, citiesWithBuilding);
            
            html+= '<tr class="mainItem">';
            html += '<td><img width="40px" src="'+item.img1+'">'+'</td>';
            html += '<td onclick="loadTree(\''+item.title+'\')" class="'+(canBuild ? 'canbuild' : 'cantbuild') +'"><u>'+item.title+'</u></td>';
            html += '<td>Main</td>';
            html += '<td>'+ (count * quantity) +'</td>';
            html += '<td>'+ citiesHTML +'</td>';
            total_bricks += (count * quantity);
            html += '</tr>';

        }
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

  function getChildren(arr, item){
    
    let children1 = [];
    let children2 = [];
    let children3 = [];
    if(item.input1){
        let child = arr.find((elm)=>elm.id == item.input1.id);
        let childItem = buildItem(child, null);
        children1 = getChildren(arr, childItem);
        children1.push(childItem);
    }

    if(item.input2){
        let child = arr.find((elm)=>elm.id == item.input2.id);
        let childItem = buildItem(child, null);
        children2 = getChildren(arr, childItem);
        children2.push(childItem);
    }

    if(item.input3){
        let child = arr.find((elm)=>elm.id == item.input3.id);
        let childItem = buildItem(child, null);
        children3 = getChildren(arr, childItem);
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
    let arr = [];
    let counts = [];

    json.forEach((item)=>{
        let newItem = buildItem(item, null);
        let children = getChildren(json, newItem, null, []);
        newItem.children = children;

        let difficulty = 0;
        children.forEach((child)=>{
            difficulty += parseInt(child.difficulty.split(' ')[1]);
        })

        arr.push(newItem);
        counts.push(difficulty);
    })

    arr.sort(function(a, b) {
        return counts[arr.indexOf(b)] - counts[arr.indexOf(a)];
    });

    return arr;
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
    filteredItems = [];
    let name = document.getElementById('name').value.toLowerCase();
    let att = parseInt(document.getElementById('att').value);
    let def = parseInt(document.getElementById('def').value);
    let inv = parseInt(document.getElementById('inv').value);
    let tax = parseInt(document.getElementById('tax').value);
    let raid = parseInt(document.getElementById('raid').value);
    let leave = parseInt(document.getElementById('leave').value);
    let canBuild = document.getElementById('build').checked;
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
    // filteredItems = [];//.concat(items);
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
            // || (item.value1 == '' && item.value2 == '')
            || countNaN == 6
            || (val1Valid && val2Valid) 
            || (val1Valid && countNaN == 5) || (val2Valid && countNaN == 5)){
            filteredItems.push(item);
        } else {
            console.log('Filtered:', item);
        }
    })
    
    let filtered = filteredItems.filter((item)=>item.title.toLowerCase().indexOf(name) != -1);

    if(canBuild){
        filtered = filtered.filter((item)=>canBeBuilt(item));
    }
    buildInfoTable(filtered);
}


function updateQuantity(){
    quantity = parseInt(document.getElementById('quantity').value);
    let item = items.find((it)=>it.title == currentItem)
    buildItemTable(item);
}