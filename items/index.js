let items;
let currentItem = 'Hydrogen Powered Lazer Drone';
let currentIndex = 0;
let quantity = 1;
let filteredItems = [];

let cities = {"341":{"id":341,"name":"Acton","buildings":{"Fire Beer":{"count":1,"x":0,"y":0},"Trex Teeth":{"count":1,"x":-1,"y":-1},"Diesel":{"count":1,"x":0,"y":2},"Explosives":{"count":1,"x":-1,"y":1},"Jug of Ale":{"count":1,"x":1,"y":1},"Glue":{"count":1,"x":1,"y":-1},"Pig":{"count":1,"x":-1,"y":-3},"Clay":{"count":1,"x":4,"y":4},"Glass":{"count":1,"x":5,"y":3},"Coal":{"count":1,"x":5,"y":5},"Limestone":{"count":1,"x":6,"y":4},"Gold":{"count":1,"x":0,"y":-2},"Lime":{"count":1,"x":6,"y":2},"Iron Ore":{"count":2,"x":1,"y":7},"Crude Oil":{"count":1,"x":0,"y":8},"Pig Iron":{"count":1,"x":-1,"y":7},"Steel":{"count":1,"x":0,"y":6}}},"930":{"id":930,"name":"Whenuakite","buildings":{"Coal":{"count":1,"x":-1,"y":1},"Iron Ore":{"count":1,"x":-1,"y":-1}}},"2006":{"id":2006,"name":"Doorntje","buildings":{"Uranium":{"count":51,"x":8,"y":2},"Titanium":{"count":60,"x":-9,"y":1},"Borg Planet Killer":{"count":1,"x":-1,"y":-1},"Borg Module Connector":{"count":1,"x":-2,"y":0},"Borg Regeneration Matrix":{"count":1,"x":0,"y":0},"Borg Neutron Bomb":{"count":1,"x":-1,"y":-3},"Borg Temporal Ship":{"count":1,"x":-1,"y":1},"Borg Warp Core":{"count":1,"x":-2,"y":2},"Borg Energy Shroud":{"count":1,"x":0,"y":2}}},"2213":{"id":2213,"name":"Barry","buildings":{"Terracule001":{"count":1,"x":-3,"y":1},"Coal":{"count":1,"x":-3,"y":-1},"Limestone":{"count":1,"x":-2,"y":0}}},"2339":{"id":2339,"name":"Zandeken","buildings":{"Manganese Bronze":{"count":31,"x":-4,"y":-2}}},"2669":{"id":2669,"name":"Drummond","buildings":{"Sheep":{"count":1,"x":0,"y":0},"Fish":{"count":1,"x":1,"y":-1},"Wheat":{"count":1,"x":0,"y":-2},"Cows":{"count":1,"x":1,"y":1},"Chickens":{"count":1,"x":-1,"y":-3},"Horses":{"count":1,"x":-2,"y":-2},"BBQ":{"count":1,"x":-2,"y":0},"Bandit Dagger":{"count":1,"x":-4,"y":-2}}},"3408":{"id":3408,"name":"Popanyinning","buildings":{"Wood":{"count":1,"x":-6,"y":0},"Limestone":{"count":1,"x":-6,"y":2},"Oats":{"count":1,"x":5,"y":1},"Wheat":{"count":1,"x":4,"y":0},"Sheep":{"count":1,"x":4,"y":2},"Corn":{"count":1,"x":4,"y":4},"Barley":{"count":1,"x":4,"y":-2},"Coal":{"count":1,"x":-5,"y":3},"Concrete":{"count":1,"x":-4,"y":4},"Cotton":{"count":1,"x":3,"y":3},"Sand":{"count":1,"x":-2,"y":-4},"Rope":{"count":1,"x":-3,"y":3},"Cement":{"count":1,"x":-2,"y":4}}},"3518":{"id":3518,"name":"Althorpe","buildings":{"Coal":{"count":1,"x":-3,"y":1},"Limestone":{"count":1,"x":-3,"y":3}}},"3663":{"id":3663,"name":"Beluga","buildings":{"Copper":{"count":2,"x":-4,"y":-2},"Cobalt":{"count":2,"x":-3,"y":-3},"Aluminium Ore":{"count":2,"x":-3,"y":-1},"Coal":{"count":1,"x":-3,"y":1},"Pigment":{"count":1,"x":-2,"y":0},"Natural Gas":{"count":1,"x":-2,"y":-2},"Aluminium":{"count":1,"x":-4,"y":0},"Wheat":{"count":1,"x":-4,"y":2},"Rawhide Leather":{"count":1,"x":-3,"y":3},"Horses":{"count":1,"x":-2,"y":4},"Glue":{"count":1,"x":-2,"y":2},"Limestone":{"count":1,"x":0,"y":2},"Lime":{"count":1,"x":-1,"y":1},"Solvent":{"count":1,"x":-1,"y":-1},"Tin":{"count":2,"x":-2,"y":-4},"Gasoline":{"count":1,"x":-1,"y":-3},"Crude Oil":{"count":1,"x":0,"y":-2},"Pig Iron":{"count":1,"x":1,"y":-1},"Iron Ore":{"count":2,"x":1,"y":1},"Electricity":{"count":1,"x":1,"y":-3},"Cement":{"count":1,"x":2,"y":4},"Sand":{"count":1,"x":2,"y":2},"Steel":{"count":1,"x":0,"y":0},"Wood":{"count":1,"x":1,"y":3},"Hops":{"count":1,"x":2,"y":0},"Paint":{"count":1,"x":2,"y":-2},"Cardboard":{"count":1,"x":3,"y":-1},"Pregame Pils":{"count":1,"x":3,"y":1},"Cows":{"count":1,"x":-4,"y":4},"Corn":{"count":1,"x":-3,"y":5},"Barley":{"count":1,"x":0,"y":4},"Home Field Advantage":{"count":1,"x":3,"y":3},"Terracule001":{"count":1,"x":-3,"y":-5},"Gun Powder":{"count":1,"x":-4,"y":-4},"Potassium Nitrate":{"count":1,"x":-5,"y":-3},"Sulfur":{"count":1,"x":-5,"y":-5},"Water H2O":{"count":1,"x":-1,"y":5},"Halcyon Nebula":{"count":1,"x":-1,"y":3},"Charcoal":{"count":1,"x":1,"y":5},"Saltpeter":{"count":1,"x":-5,"y":-1},"Sonic Resonance Destructor":{"count":1,"x":6,"y":-2},"Quantum Harmonic Metal":{"count":1,"x":6,"y":0},"Stellar Containment Orb":{"count":1,"x":6,"y":2},"Radiant Syncronite":{"count":1,"x":6,"y":4},"Heusler Alloy":{"count":1,"x":7,"y":1},"Ferromanganese Cobalt":{"count":1,"x":7,"y":3},"Nickel Silver":{"count":1,"x":8,"y":4},"Aluminum Bronze":{"count":1,"x":8,"y":2},"Titanium Aluminide":{"count":1,"x":8,"y":0},"Silver Solder":{"count":1,"x":7,"y":5},"Manganese Bronze":{"count":1,"x":6,"y":6},"Zinc":{"count":1,"x":6,"y":8},"Manganese":{"count":1,"x":5,"y":9},"Silver":{"count":1,"x":5,"y":7},"Nickle":{"count":1,"x":5,"y":5},"Titanium":{"count":1,"x":3,"y":7},"Gamma Shield Alloy":{"count":1,"x":5,"y":1},"Titanium Beta C":{"count":1,"x":5,"y":-1},"Urantitanium Alloy":{"count":1,"x":5,"y":-3},"Uranium":{"count":1,"x":5,"y":-5},"Golden Sunshard":{"count":1,"x":5,"y":-7},"Twilight Ethercloak":{"count":1,"x":6,"y":-6},"Crimson Oathkeeper":{"count":1,"x":7,"y":-5},"Azure Galebound":{"count":1,"x":4,"y":-8}}},"5028":{"id":5028,"name":"Whatstandwell","buildings":{"Rubber":{"count":1,"x":4,"y":-8},"Oxygen":{"count":1,"x":6,"y":-6},"Natural Gas":{"count":1,"x":7,"y":-5},"Uranium":{"count":1,"x":7,"y":-3},"Potash":{"count":1,"x":8,"y":-2},"Cobalt":{"count":1,"x":8,"y":0},"Cows":{"count":1,"x":-4,"y":-6},"Nitrogen":{"count":1,"x":6,"y":-4},"Sheep":{"count":1,"x":-6,"y":-6},"Concrete":{"count":1,"x":2,"y":-6},"Silicon":{"count":1,"x":3,"y":-5},"Aluminium":{"count":1,"x":-1,"y":-7},"Wool":{"count":1,"x":-8,"y":8},"Cement":{"count":1,"x":5,"y":-5},"Leather Gloves":{"count":1,"x":-8,"y":0},"Fertilizer":{"count":1,"x":6,"y":-2},"Phosphor":{"count":1,"x":7,"y":-1},"Gun Powder":{"count":1,"x":6,"y":0},"Crude Oil":{"count":1,"x":7,"y":1},"Diesel":{"count":1,"x":8,"y":2},"Steel Dagger":{"count":1,"x":7,"y":3},"Explosives":{"count":1,"x":8,"y":4},"Iron Ore":{"count":1,"x":5,"y":7},"Charcoal":{"count":1,"x":4,"y":6},"Steel":{"count":1,"x":5,"y":5},"Armor":{"count":1,"x":6,"y":2},"Hydrogen Powered Lazer Drone":{"count":1,"x":-1,"y":1},"Supply Shuttle":{"count":1,"x":-1,"y":-1},"Orbital Probe":{"count":1,"x":0,"y":0},"Sniper":{"count":1,"x":-2,"y":0},"Nuclear Warhead":{"count":1,"x":0,"y":2},"Hydrogen Fuel Cell":{"count":1,"x":-2,"y":2},"Soul Destroyer":{"count":1,"x":-2,"y":-2},"Laser Turret":{"count":1,"x":-3,"y":1},"Loitering Munitions":{"count":1,"x":-3,"y":-1},"Sniper Rifle":{"count":1,"x":-3,"y":3},"Enriched Uranium":{"count":1,"x":-1,"y":3},"Attack Helicopter":{"count":1,"x":-3,"y":-3},"ICBM":{"count":1,"x":0,"y":-2},"Motorbike":{"count":1,"x":5,"y":1},"Motor Car":{"count":1,"x":4,"y":0},"Armored Tank":{"count":1,"x":3,"y":-1},"Personnel Carrier":{"count":1,"x":3,"y":1},"Gasoline":{"count":1,"x":2,"y":0},"Hydrogen":{"count":1,"x":2,"y":-4},"Military Drone":{"count":1,"x":-4,"y":-2},"Bazooka":{"count":1,"x":-4,"y":2},"Guidance System":{"count":1,"x":-4,"y":-4},"FPV Drone":{"count":1,"x":-5,"y":-1},"Grenades":{"count":1,"x":-4,"y":4},"RPG":{"count":1,"x":-5,"y":3},"Combustion Engine":{"count":1,"x":5,"y":-1},"Tires":{"count":1,"x":3,"y":-3},"Crown of Prosperity":{"count":1,"x":1,"y":-1},"Holy Hand Grenade":{"count":1,"x":-2,"y":-4},"Milk":{"count":1,"x":-7,"y":9},"Jug of Ale":{"count":1,"x":-5,"y":9},"Cheese":{"count":1,"x":-6,"y":8},"Mug of Coffee":{"count":1,"x":-7,"y":7},"Horses":{"count":1,"x":2,"y":8},"Wheat":{"count":1,"x":3,"y":9},"Leather Greaves":{"count":1,"x":-9,"y":1},"Leather Jacket":{"count":1,"x":-9,"y":3},"Leather Boots":{"count":1,"x":-7,"y":3},"Leather Shield":{"count":1,"x":-7,"y":1},"Eggs":{"count":1,"x":-5,"y":7},"Studded Gloves":{"count":1,"x":-9,"y":5},"Glass":{"count":1,"x":4,"y":-4},"Boots of Teleportation":{"count":1,"x":-1,"y":-5},"Cloak of Invincibility":{"count":1,"x":0,"y":-4},"Leather Helm":{"count":1,"x":-8,"y":2},"Studded Helmet":{"count":1,"x":-8,"y":4},"Studded Shield":{"count":1,"x":-8,"y":-2},"Fabric":{"count":1,"x":1,"y":7},"Wand of Eternity":{"count":1,"x":-2,"y":4},"Loom":{"count":1,"x":0,"y":8},"Cotton":{"count":1,"x":1,"y":9},"Sword":{"count":1,"x":7,"y":5},"Pig Iron":{"count":1,"x":6,"y":4},"Coal":{"count":1,"x":6,"y":6},"Lime":{"count":1,"x":7,"y":7},"Limestone":{"count":1,"x":6,"y":8},"Shield of Resilience":{"count":1,"x":5,"y":3},"Sword of Fury":{"count":1,"x":4,"y":4},"Wood":{"count":1,"x":5,"y":9},"Glue":{"count":1,"x":3,"y":7},"Duct Tape":{"count":1,"x":2,"y":6},"Water H2O":{"count":1,"x":-2,"y":8},"Drove of Pigs":{"count":1,"x":-4,"y":8},"Plastic":{"count":1,"x":4,"y":8},"Rope":{"count":1,"x":-1,"y":9},"Fishing Net":{"count":1,"x":-1,"y":5},"Chum Bucket":{"count":1,"x":0,"y":6},"Tin":{"count":1,"x":-1,"y":7},"Wayfarers Meal":{"count":1,"x":-7,"y":5},"Bacon  Eggs":{"count":1,"x":-6,"y":6},"Salt Water":{"count":1,"x":-2,"y":6},"Cured Ham":{"count":1,"x":-6,"y":-8},"Beef Jerky":{"count":1,"x":-5,"y":-7},"Knight":{"count":1,"x":-5,"y":-5},"Corn":{"count":1,"x":-3,"y":-9},"Bacon":{"count":1,"x":-4,"y":-8},"Salt":{"count":1,"x":-3,"y":5},"Potassium Nitrate":{"count":1,"x":-1,"y":-9},"Studded Boots":{"count":1,"x":-7,"y":-3},"Tomatoes":{"count":1,"x":-8,"y":6},"Fish":{"count":1,"x":-3,"y":7},"Fire Beer":{"count":1,"x":4,"y":2},"Trex Teeth":{"count":1,"x":3,"y":3},"Shark":{"count":1,"x":1,"y":5},"Sword of Truth":{"count":1,"x":-5,"y":5},"Laser":{"count":1,"x":1,"y":3},"Electronics":{"count":1,"x":2,"y":4},"Electricity":{"count":1,"x":3,"y":5},"Taser Fists":{"count":1,"x":1,"y":1},"Silicon Wafer":{"count":1,"x":2,"y":2},"Sand":{"count":1,"x":4,"y":-6},"Copper":{"count":1,"x":3,"y":-7},"Defensive Shield":{"count":1,"x":1,"y":-7},"Gold":{"count":1,"x":2,"y":-8},"Wooden Club":{"count":1,"x":0,"y":-8},"Chickens":{"count":1,"x":-5,"y":-9},"Drone":{"count":1,"x":-3,"y":-5},"Phosphate":{"count":1,"x":-2,"y":-6},"Sulfur":{"count":1,"x":-2,"y":-8},"Saltpeter":{"count":1,"x":-3,"y":-7},"Explosives Specialist":{"count":1,"x":-5,"y":-3},"Samurai":{"count":1,"x":-6,"y":-4},"Barbarian":{"count":1,"x":-8,"y":-4},"Military Engineer":{"count":1,"x":-6,"y":-2},"Settler":{"count":1,"x":-7,"y":-5},"Lamb Jerky":{"count":1,"x":-7,"y":-7},"Horn of the Conqueror":{"count":1,"x":-7,"y":-1},"Aluminium Ore":{"count":1,"x":1,"y":-5},"Frickin Laser Shark":{"count":1,"x":0,"y":4},"Studded Jacket":{"count":1,"x":-6,"y":2},"Omelette":{"count":1,"x":-6,"y":4},"Studded Trousers":{"count":1,"x":-6,"y":0},"Leather Armour":{"count":1,"x":-9,"y":-1},"Hooded Cloak":{"count":1,"x":-5,"y":1},"Bandit":{"count":1,"x":-4,"y":0},"Bandit Dagger":{"count":1,"x":-4,"y":6},"Sentinel Halo Ring":{"count":1,"x":2,"y":-2},"Harmonic Shield Chalice":{"count":1,"x":1,"y":-3},"Catapult":{"count":1,"x":0,"y":-6},"Cobalt Wave Plasma Cannon":{"count":1,"x":-1,"y":-3},"Poker Hat":{"count":1,"x":5,"y":-7},"Rawhide Leather":{"count":1,"x":5,"y":-3},"Trick or Treat Pail":{"count":1,"x":4,"y":-2}}},"5188":{"id":5188,"name":"Dayar","buildings":{"Uranium":{"count":1,"x":-1,"y":-1}}},"5390":{"id":5390,"name":"Lemo","buildings":{"Alnicomagnets":{"count":6,"x":1,"y":-1}}},"5477":{"id":5477,"name":"Peterborough","buildings":{"Cows":{"count":39,"x":-5,"y":-7},"Rawhide Leather":{"count":50,"x":-6,"y":4},"Corn":{"count":36,"x":7,"y":-5},"Milk":{"count":13,"x":-5,"y":-5},"Cheese":{"count":12,"x":4,"y":4}}},"5528":{"id":5528,"name":"Roseworthy","buildings":{"Limestone":{"count":1,"x":-1,"y":-1},"Gallium":{"count":1,"x":-2,"y":-2},"Chum Bucket":{"count":1,"x":-3,"y":-5},"Beef Jerky":{"count":1,"x":-4,"y":-4},"Lamb Jerky":{"count":1,"x":-4,"y":-6},"Aluminium":{"count":2,"x":-5,"y":-5},"Loom":{"count":1,"x":-5,"y":-3},"Wool":{"count":1,"x":-6,"y":-2},"Leather Gloves":{"count":1,"x":-5,"y":-1},"Cheese":{"count":1,"x":-4,"y":-2},"Cement":{"count":1,"x":-3,"y":-3},"Trebuchet":{"count":1,"x":-6,"y":0},"Ferromanganese Cobalt":{"count":1,"x":-6,"y":2},"Salt Water":{"count":1,"x":-7,"y":3},"Coal":{"count":1,"x":4,"y":0},"Mug of Coffee":{"count":1,"x":-2,"y":4},"Clay":{"count":1,"x":-3,"y":3},"Pigment":{"count":1,"x":3,"y":3},"Eggs":{"count":1,"x":1,"y":3},"Crown of Prosperity":{"count":1,"x":-3,"y":1},"Crude Oil":{"count":1,"x":2,"y":-2}}},"5638":{"id":5638,"name":"Wiedensahl","buildings":{"Aluminium Ore":{"count":51,"x":-7,"y":1}}},"5694":{"id":5694,"name":"Lanoraie","buildings":{"Iron Ore":{"count":51,"x":-8,"y":0}}},"5840":{"id":5840,"name":"Corocito","buildings":{"Borg Dyson Sphere":{"count":1,"x":0,"y":2},"Borg Spore Incubator":{"count":1,"x":-1,"y":1},"Rose Quartz Whisper":{"count":1,"x":0,"y":0}}},"5946":{"id":5946,"name":"Eardington","buildings":{"Coal":{"count":2,"x":-1,"y":1}}},"6012":{"id":6012,"name":"Bourget","buildings":{"Rope":{"count":2,"x":1,"y":-7},"Wooden Club":{"count":1,"x":-4,"y":-6},"Drone":{"count":1,"x":-5,"y":-3},"Leather Gloves":{"count":3,"x":-7,"y":3},"Studded Gloves":{"count":2,"x":-6,"y":6},"Trebuchet":{"count":1,"x":-3,"y":-3},"Leather Greaves":{"count":3,"x":-4,"y":0},"Leather Jacket":{"count":3,"x":-5,"y":3},"Leather Boots":{"count":3,"x":1,"y":-3},"Studded Boots":{"count":2,"x":1,"y":1},"Leather Shield":{"count":3,"x":3,"y":-3},"Studded Shield":{"count":2,"x":3,"y":1},"Catapult":{"count":1,"x":6,"y":2},"Clay":{"count":1,"x":-8,"y":-4},"Wool":{"count":1,"x":-9,"y":-1},"Studded Helmet":{"count":2,"x":-1,"y":5},"Sheep":{"count":1,"x":-9,"y":3},"Wheat":{"count":1,"x":-8,"y":8},"Studded Jacket":{"count":2,"x":-4,"y":4},"Studded Trousers":{"count":2,"x":-3,"y":1},"Fabric":{"count":1,"x":1,"y":5},"Leather Helm":{"count":3,"x":-2,"y":4},"Loom":{"count":1,"x":1,"y":3},"Mug of Coffee":{"count":1,"x":-7,"y":-3},"Cotton":{"count":2,"x":2,"y":-6}}},"6108":{"id":6108,"name":"Winterspelt","buildings":{"Manganese Bronze":{"count":30,"x":-7,"y":1}}},"6153":{"id":6153,"name":"Meux","buildings":{"Borg Neutron Bomb":{"count":1,"x":-6,"y":0},"Titanium Beta C":{"count":59,"x":-5,"y":5}}},"6192":{"id":6192,"name":"Yakkala","buildings":{"Zinc":{"count":54,"x":-9,"y":-1},"Manganese":{"count":54,"x":1,"y":-7},"Radiant Syncronite":{"count":18,"x":-1,"y":-3}}},"6193":{"id":6193,"name":"Yalegoda","buildings":{"Titanium Aluminide":{"count":58,"x":-1,"y":-3}}},"6248":{"id":6248,"name":"Reedy","buildings":{"Urantitanium Alloy":{"count":50,"x":-6,"y":2},"Copper":{"count":52,"x":1,"y":-5}}},"6298":{"id":6298,"name":"Warrenton","buildings":{"Titanium":{"count":55,"x":-8,"y":0},"Copper":{"count":51,"x":0,"y":2}}},"6306":{"id":6306,"name":"Case Trentin","buildings":{"Aluminium Ore":{"count":55,"x":-6,"y":-2},"Nickle":{"count":55,"x":-1,"y":-3},"Silver":{"count":40,"x":5,"y":-1}}},"6329":{"id":6329,"name":"Clonsilla","buildings":{"Silver Solder":{"count":31,"x":-3,"y":-1}}},"6361":{"id":6361,"name":"Willington","buildings":{"Steel":{"count":1,"x":3,"y":5},"Coal":{"count":1,"x":2,"y":4}}},"6412":{"id":6412,"name":"Calvinia","buildings":{"Limestone":{"count":51,"x":-8,"y":0}}},"6417":{"id":6417,"name":"Jinan","buildings":{}},"6472":{"id":6472,"name":"Luoyang","buildings":{}},"6473":{"id":6473,"name":"Dongguan","buildings":{}},"6474":{"id":6474,"name":"Lagos","buildings":{}},"6492":{"id":6492,"name":"Gruilung","buildings":{"Silicon Wafer":{"count":28,"x":0,"y":0},"Glass":{"count":27,"x":0,"y":4},"Plastic":{"count":25,"x":2,"y":-8},"Sand":{"count":1,"x":-1,"y":5},"Silicon":{"count":6,"x":-7,"y":-7},"Aluminium Ore":{"count":1,"x":-1,"y":7}}},"6494":{"id":6494,"name":"Vengurla","buildings":{"Limestone":{"count":1,"x":-2,"y":0},"Nuclear Warhead":{"count":1,"x":-1,"y":-1},"Guidance System":{"count":1,"x":-2,"y":-2},"Enriched Uranium":{"count":1,"x":-3,"y":-3},"Electronics":{"count":1,"x":-1,"y":-3},"Steel":{"count":1,"x":-2,"y":-4},"Glass":{"count":1,"x":-3,"y":-5},"Uranium":{"count":1,"x":0,"y":-2},"Laser":{"count":1,"x":0,"y":0},"Silicon":{"count":1,"x":-3,"y":-1},"Plastic":{"count":1,"x":-3,"y":1},"Silicon Wafer":{"count":1,"x":-2,"y":2},"Aluminium Ore":{"count":1,"x":-1,"y":3},"Sand":{"count":1,"x":-4,"y":0},"Coal":{"count":1,"x":1,"y":1},"Lime":{"count":1,"x":-4,"y":-4},"Copper":{"count":1,"x":-3,"y":3},"Electricity":{"count":1,"x":-4,"y":-2},"Pig Iron":{"count":1,"x":-1,"y":-5},"Iron Ore":{"count":1,"x":0,"y":-4},"Cement":{"count":1,"x":1,"y":-3},"Nitrogen":{"count":1,"x":2,"y":0},"Natural Gas":{"count":1,"x":2,"y":-2},"Crude Oil":{"count":1,"x":0,"y":2},"Explosives":{"count":1,"x":1,"y":3},"Charcoal":{"count":1,"x":2,"y":2},"Wood":{"count":1,"x":3,"y":1},"Potassium Nitrate":{"count":1,"x":2,"y":4},"Saltpeter":{"count":1,"x":0,"y":4},"Sentinel Halo Ring":{"count":1,"x":-1,"y":1},"Hydrogen":{"count":1,"x":1,"y":-1},"Water H2O":{"count":1,"x":1,"y":-5},"Leather Helm":{"count":1,"x":-8,"y":0},"Cotton":{"count":1,"x":-6,"y":6},"Rawhide Leather":{"count":1,"x":-5,"y":5},"Cows":{"count":1,"x":-5,"y":7},"Corn":{"count":1,"x":-4,"y":6},"Leather Boots":{"count":1,"x":-8,"y":2},"Wool":{"count":1,"x":-6,"y":4},"Sheep":{"count":1,"x":-7,"y":5},"Wheat":{"count":1,"x":-7,"y":3},"Steel Dagger":{"count":1,"x":-6,"y":-4},"Armor":{"count":1,"x":-7,"y":1}}},"6503":{"id":6503,"name":"Minhe","buildings":{"Coal":{"count":4,"x":-1,"y":1},"Iron Ore":{"count":3,"x":-2,"y":0},"Nuclear Warhead":{"count":1,"x":-2,"y":2},"Wood":{"count":1,"x":-1,"y":3},"Plastic":{"count":1,"x":-1,"y":-1},"Platinum":{"count":1,"x":0,"y":2},"Manganese":{"count":1,"x":0,"y":0},"Limestone":{"count":2,"x":-5,"y":3}}},"6508":{"id":6508,"name":"Hyderabad","buildings":{}},"6509":{"id":6509,"name":"Changsha","buildings":{}},"6512":{"id":6512,"name":"Umunede","buildings":{"Titanium":{"count":50,"x":-6,"y":-2},"Nickle":{"count":50,"x":1,"y":1},"Aluminium Ore":{"count":50,"x":-1,"y":1}}},"6554":{"id":6554,"name":"Changchun","buildings":{}},"6560":{"id":6560,"name":"Prijepolje","buildings":{"Gamma Shield Alloy":{"count":19,"x":-1,"y":-3}}},"6578":{"id":6578,"name":"Bena","buildings":{"Hydrogen Fuel Cell":{"count":1,"x":-1,"y":-1},"Gasoline":{"count":1,"x":0,"y":0},"Sword":{"count":1,"x":0,"y":-2},"Defensive Shield":{"count":1,"x":-1,"y":-3},"Catapult":{"count":1,"x":-2,"y":-2},"Armor":{"count":1,"x":-2,"y":0},"BBQ":{"count":1,"x":-1,"y":1},"Ceramics":{"count":1,"x":0,"y":2},"Silicon Wafer":{"count":1,"x":1,"y":1},"Diesel":{"count":1,"x":1,"y":-1},"Horse  Cart":{"count":1,"x":1,"y":-3},"Tomatoes":{"count":1,"x":0,"y":-4},"Leather Shield":{"count":1,"x":-1,"y":-5},"Leather Boots":{"count":1,"x":-2,"y":-4},"Jug of Ale":{"count":1,"x":-3,"y":-3},"Crude Oil":{"count":1,"x":-3,"y":-1},"Explosives":{"count":1,"x":-3,"y":1},"Nuclear Warhead":{"count":1,"x":-2,"y":2},"Electricity":{"count":1,"x":-1,"y":3},"Gun Powder":{"count":1,"x":-3,"y":-5},"Steel":{"count":1,"x":-4,"y":-4},"Settler":{"count":1,"x":-4,"y":-2},"Drove of Pigs":{"count":1,"x":-4,"y":0},"Phosphor":{"count":1,"x":-4,"y":2},"Leather Helm":{"count":1,"x":-3,"y":3},"Leather Jacket":{"count":1,"x":-2,"y":4},"Leather Greaves":{"count":1,"x":0,"y":4},"Military Engineer":{"count":1,"x":1,"y":3},"Boots of Teleportation":{"count":1,"x":2,"y":2},"Coal":{"count":1,"x":-5,"y":1},"Limestone":{"count":1,"x":-5,"y":-1},"Iron Ore":{"count":1,"x":-5,"y":-3},"Wood":{"count":1,"x":-5,"y":-5},"Natural Gas":{"count":1,"x":-4,"y":-6},"Gold":{"count":1,"x":-3,"y":-7},"Silver":{"count":1,"x":-2,"y":-6},"Rubber":{"count":1,"x":0,"y":-6},"Copper":{"count":1,"x":1,"y":-5},"Sand":{"count":1,"x":2,"y":-4},"Wheat":{"count":1,"x":2,"y":-2},"Manganese":{"count":1,"x":2,"y":0},"Nickle":{"count":1,"x":-5,"y":3},"Tin":{"count":1,"x":-4,"y":4},"Zinc":{"count":1,"x":-3,"y":5},"Platinum":{"count":1,"x":-2,"y":6},"Titanium":{"count":1,"x":-1,"y":5},"Aluminium Ore":{"count":1,"x":0,"y":6},"Sulfur":{"count":1,"x":1,"y":5},"Rawhide Leather":{"count":1,"x":2,"y":4},"Cows":{"count":1,"x":3,"y":3},"Corn":{"count":1,"x":3,"y":1},"Wool":{"count":1,"x":3,"y":-1},"Cotton":{"count":1,"x":3,"y":-3},"Sheep":{"count":1,"x":3,"y":-5},"Nitrogen":{"count":1,"x":-6,"y":-2},"Potassium Nitrate":{"count":1,"x":-6,"y":0},"Saltpeter":{"count":1,"x":-6,"y":2},"Charcoal":{"count":1,"x":-6,"y":4},"Pig Iron":{"count":1,"x":-7,"y":1},"Lime":{"count":1,"x":-7,"y":3},"Enriched Uranium":{"count":1,"x":-5,"y":5},"Uranium":{"count":1,"x":-4,"y":6},"Laser":{"count":1,"x":-6,"y":6},"Electronics":{"count":1,"x":-5,"y":7},"Plastic":{"count":1,"x":-7,"y":-1}}},"6579":{"id":6579,"name":"Holeby","buildings":{"Steel":{"count":50,"x":-4,"y":0},"Steel Dagger":{"count":2,"x":-1,"y":-5},"Armor":{"count":2,"x":-6,"y":0},"BBQ":{"count":2,"x":-7,"y":3},"Catapult":{"count":2,"x":-6,"y":6},"Horn of the Conqueror":{"count":2,"x":-4,"y":4},"Sword":{"count":2,"x":-2,"y":6},"Samurai":{"count":2,"x":0,"y":6},"Wand of Eternity":{"count":2,"x":2,"y":6},"Combustion Engine":{"count":2,"x":4,"y":4},"Knight":{"count":2,"x":6,"y":4},"Defensive Shield":{"count":2,"x":6,"y":0},"Sword of Truth":{"count":2,"x":-4,"y":-6},"Harmonic Shield Chalice":{"count":2,"x":-5,"y":-3},"Pigment":{"count":2,"x":-6,"y":-4}}},"6615":{"id":6615,"name":"Harbin","buildings":{}},"6622":{"id":6622,"name":"Mexico City","buildings":{}},"6658":{"id":6658,"name":"Hefei","buildings":{}},"6665":{"id":6665,"name":"Ho Chi Minh City","buildings":{}},"6672":{"id":6672,"name":"Foshan","buildings":{}},"6676":{"id":6676,"name":"Bangkok","buildings":{"Coal":{"count":1,"x":-1,"y":3},"Wheat":{"count":1,"x":-2,"y":-2},"Lamb Jerky":{"count":1,"x":-6,"y":-4}}},"6680":{"id":6680,"name":"Opatovo","buildings":{"Coal":{"count":1,"x":-1,"y":1},"Limestone":{"count":1,"x":-2,"y":2},"Iron Ore":{"count":1,"x":-2,"y":0},"Wood":{"count":1,"x":-1,"y":-1},"Terracule001":{"count":1,"x":0,"y":0},"Natural Gas":{"count":1,"x":0,"y":2},"Gold":{"count":1,"x":-1,"y":3},"Silver":{"count":1,"x":1,"y":3},"Cotton":{"count":1,"x":1,"y":1},"Rubber":{"count":1,"x":2,"y":2},"Sand":{"count":1,"x":2,"y":0},"Wheat":{"count":1,"x":1,"y":-1},"Plastic":{"count":1,"x":0,"y":-2},"Manganese":{"count":1,"x":-1,"y":-3},"Nickle":{"count":1,"x":-2,"y":-2},"Tin":{"count":1,"x":-3,"y":-1},"Zinc":{"count":1,"x":-3,"y":1},"Platinum":{"count":1,"x":-3,"y":3}}},"6694":{"id":6694,"name":"Ankara","buildings":{}},"6711":{"id":6711,"name":"Cairo","buildings":{}},"6713":{"id":6713,"name":"Hong Kong","buildings":{}},"6714":{"id":6714,"name":"Baghdad","buildings":{"Coal":{"count":1,"x":-1,"y":-1},"Limestone":{"count":1,"x":0,"y":-2},"Iron Ore":{"count":1,"x":0,"y":0},"Drove of Pigs":{"count":1,"x":-1,"y":1},"Pig Iron":{"count":2,"x":-2,"y":0},"Glass":{"count":2,"x":-2,"y":-2},"Laser Turret":{"count":1,"x":-3,"y":-3},"Electronics":{"count":1,"x":-3,"y":-1},"Copper":{"count":1,"x":-3,"y":1},"Silicon Wafer":{"count":1,"x":-4,"y":0},"Silicon":{"count":1,"x":-5,"y":1},"Lime":{"count":1,"x":-5,"y":3},"Sand":{"count":1,"x":-6,"y":2},"Aluminium Ore":{"count":1,"x":-4,"y":-2},"Plastic":{"count":1,"x":-5,"y":-1},"Electricity":{"count":1,"x":-4,"y":-4},"Crude Oil":{"count":1,"x":-3,"y":-5},"Steel":{"count":1,"x":-2,"y":-4},"Cement":{"count":1,"x":-2,"y":-6},"Soul Destroyer":{"count":1,"x":-5,"y":-3},"Laser":{"count":1,"x":-5,"y":-5},"Nitrogen":{"count":1,"x":-4,"y":-6},"Natural Gas":{"count":1,"x":-3,"y":-7},"Combustion Engine":{"count":1,"x":-2,"y":2},"Oxygen":{"count":1,"x":-3,"y":3}}},"6716":{"id":6716,"name":"Ilinge","buildings":{"Nickle":{"count":51,"x":-8,"y":0}}},"6739":{"id":6739,"name":"Shaoxing","buildings":{"Lime":{"count":50,"x":-9,"y":-1},"Pig Iron":{"count":50,"x":1,"y":7},"Steel":{"count":50,"x":-1,"y":1}}},"6763":{"id":6763,"name":"Progorelica","buildings":{"Shark":{"count":1,"x":1,"y":1}}},"6766":{"id":6766,"name":"Ahmedabad","buildings":{}},"6767":{"id":6767,"name":"Bengaluru","buildings":{}},"6776":{"id":6776,"name":"Alexandria","buildings":{}},"6781":{"id":6781,"name":"Chitu","buildings":{"Zinc":{"count":51,"x":-8,"y":0}}},"6782":{"id":6782,"name":"Adani","buildings":{"Titanium Aluminide":{"count":50,"x":-6,"y":-2}}},"6789":{"id":6789,"name":"Liigvalla","buildings":{"Aluminium Lithium Alloy":{"count":7,"x":-6,"y":0},"Babbitt Copper":{"count":3,"x":0,"y":4},"Heusler Alloy":{"count":8,"x":-3,"y":-3},"Astralite Shield":{"count":1,"x":-5,"y":-3},"Vortex Drift Helm":{"count":1,"x":-4,"y":-4},"Crystal Paladin Blade":{"count":1,"x":-2,"y":-4},"White Gold":{"count":4,"x":-2,"y":-2},"Elysium Crest":{"count":1,"x":-1,"y":-3},"Rose Gold":{"count":3,"x":-1,"y":-1},"Aero Link Armor":{"count":1,"x":0,"y":-2},"Aluminum Bronze":{"count":3,"x":1,"y":-1},"Pewter":{"count":3,"x":2,"y":0},"Brass":{"count":4,"x":3,"y":-1},"Titanium Beta C":{"count":4,"x":4,"y":-2},"Urantitanium Alloy":{"count":1,"x":5,"y":1},"Blazing Coronet":{"count":1,"x":1,"y":-3},"Celestial Anchor":{"count":1,"x":2,"y":-2},"Radiant Battlegear":{"count":1,"x":3,"y":-3}}},"6826":{"id":6826,"name":"Chongqing","buildings":{"Wood":{"count":50,"x":-6,"y":-2}}},"6831":{"id":6831,"name":"Ulverstone","buildings":{"Coal":{"count":2,"x":-2,"y":-2}}},"6858":{"id":6858,"name":"Delhi","buildings":{}},"6859":{"id":6859,"name":"Hangzhou","buildings":{}},"6861":{"id":6861,"name":"Guangzhou","buildings":{}},"6862":{"id":6862,"name":"Hyderabad","buildings":{}},"6863":{"id":6863,"name":"Jieyang","buildings":{}},"6888":{"id":6888,"name":"Jakarta","buildings":{}},"6889":{"id":6889,"name":"Bogota","buildings":{}},"6910":{"id":6910,"name":"Karachi","buildings":{}},"6913":{"id":6913,"name":"Calgary","buildings":{"Hydrogen Powered Lazer Drone":{"count":1,"x":8,"y":2},"Limestone":{"count":1,"x":-8,"y":-4},"Iron Ore":{"count":1,"x":-9,"y":1},"Pig Iron":{"count":1,"x":-9,"y":3},"Lime":{"count":1,"x":-8,"y":-2},"Wood":{"count":1,"x":-7,"y":-7},"Natural Gas":{"count":1,"x":-6,"y":-8},"Steel":{"count":1,"x":-9,"y":5},"Electricity":{"count":1,"x":7,"y":-1},"Cement":{"count":1,"x":-6,"y":-2},"Sand":{"count":1,"x":-7,"y":-5},"Salt":{"count":1,"x":-7,"y":-3},"Saltpeter":{"count":1,"x":-7,"y":-1},"Gold":{"count":1,"x":-4,"y":-8},"Silver":{"count":1,"x":-4,"y":-6},"Wheat":{"count":1,"x":-4,"y":0},"Plastic":{"count":1,"x":-4,"y":2},"Crude Oil":{"count":1,"x":-7,"y":3},"Water H2O":{"count":1,"x":6,"y":0},"Laser":{"count":1,"x":5,"y":3},"Electronics":{"count":1,"x":3,"y":1},"Nitrogen":{"count":1,"x":4,"y":0},"Copper":{"count":1,"x":3,"y":-1},"Silicon Wafer":{"count":2,"x":2,"y":0},"Glass":{"count":1,"x":1,"y":-1},"Silicon":{"count":1,"x":0,"y":-2},"Aluminium Ore":{"count":1,"x":0,"y":0},"Coal":{"count":1,"x":-3,"y":5},"Sword of Truth":{"count":1,"x":0,"y":6},"Wand of Eternity":{"count":1,"x":-1,"y":5},"Oats":{"count":1,"x":-6,"y":6},"Steel Dagger":{"count":1,"x":-5,"y":5},"Explosives":{"count":1,"x":-1,"y":-5},"Charcoal":{"count":2,"x":-2,"y":-6},"Potassium Nitrate":{"count":1,"x":-1,"y":-7},"Explosives Specialist":{"count":1,"x":-2,"y":-2},"Armor":{"count":1,"x":-3,"y":-3},"Shield of Resilience":{"count":1,"x":-4,"y":8}}},"6916":{"id":6916,"name":"London","buildings":{"Coal":{"count":29,"x":-8,"y":2},"Borg Hive Spore":{"count":1,"x":-4,"y":-8},"Titanium":{"count":61,"x":-1,"y":9},"Aluminium Ore":{"count":57,"x":-1,"y":1},"Borg Energy Shroud":{"count":1,"x":-9,"y":-1},"Borg Energy System":{"count":1,"x":-8,"y":0}}},"6919":{"id":6919,"name":"Istanbul","buildings":{}},"6959":{"id":6959,"name":"Lima","buildings":{}},"6961":{"id":6961,"name":"Kunming","buildings":{}},"6962":{"id":6962,"name":"Beijing","buildings":{}},"6964":{"id":6964,"name":"Chengdu","buildings":{}},"7017":{"id":7017,"name":"Zhongshan","buildings":{"Titanium Aluminide":{"count":55,"x":8,"y":-2},"Borg Module Connector":{"count":4,"x":-9,"y":3},"Borg Regeneration Matrix":{"count":2,"x":-9,"y":5},"Borg Power Node":{"count":1,"x":-8,"y":4},"Borg Neutron Bomb":{"count":1,"x":-8,"y":2},"Borg Traction Beam":{"count":1,"x":-8,"y":0},"Borg Hive Module":{"count":1,"x":-7,"y":-1},"Borg Command Room":{"count":1,"x":-7,"y":1},"Borg Gravamatric Torpedos":{"count":1,"x":-7,"y":3},"Borg High Yield Torpedos":{"count":1,"x":-7,"y":9},"Borg Disruptor Beams":{"count":1,"x":-7,"y":5},"Borg Genesis Engine":{"count":1,"x":-7,"y":7},"Borg Warp Core":{"count":1,"x":-8,"y":6},"Titanium Beta C":{"count":48,"x":-1,"y":9},"Electricity":{"count":7,"x":-6,"y":-4},"Cobalt":{"count":11,"x":1,"y":9},"Ferromanganese Cobalt":{"count":7,"x":1,"y":-5}}},"7537":{"id":7537,"name":"Cossack","buildings":{"Coal":{"count":1,"x":-1,"y":-1},"Natural Gas":{"count":1,"x":-1,"y":1},"Gold":{"count":1,"x":0,"y":0},"Uranium":{"count":1,"x":-2,"y":0},"Eggs":{"count":1,"x":-2,"y":2}}},"7552":{"id":7552,"name":"Mississauga","buildings":{"Coal":{"count":50,"x":-6,"y":-8},"Limestone":{"count":50,"x":-7,"y":-3},"Iron Ore":{"count":50,"x":7,"y":-3}}},"7554":{"id":7554,"name":"Barrington","buildings":{"Coal":{"count":4,"x":-3,"y":-7},"Limestone":{"count":1,"x":-4,"y":-6},"Iron Ore":{"count":3,"x":-4,"y":-4},"Wood":{"count":7,"x":-7,"y":-3},"Terracule001":{"count":1,"x":-8,"y":2},"Natural Gas":{"count":2,"x":-7,"y":1},"Gold":{"count":2,"x":-6,"y":0},"Silver":{"count":2,"x":-5,"y":-1},"Nuclear Warhead":{"count":1,"x":-3,"y":3},"Hydrogen Fuel Cell":{"count":1,"x":2,"y":2},"Soul Destroyer":{"count":1,"x":7,"y":1},"Laser Turret":{"count":1,"x":7,"y":3},"Loitering Munitions":{"count":1,"x":6,"y":2},"Sniper Rifle":{"count":1,"x":6,"y":4},"Enriched Uranium":{"count":2,"x":6,"y":0},"Attack Helicopter":{"count":1,"x":6,"y":-2},"Motorbike":{"count":1,"x":5,"y":-3},"Gasoline":{"count":1,"x":5,"y":-1},"Wand of Eternity":{"count":1,"x":5,"y":1},"ICBM":{"count":1,"x":5,"y":3},"Gun Powder":{"count":1,"x":5,"y":5},"FPV Drone":{"count":1,"x":5,"y":7},"Guidance System":{"count":1,"x":-4,"y":2},"Explosives":{"count":1,"x":-4,"y":4},"Corn":{"count":2,"x":-4,"y":-2},"Drone":{"count":2,"x":-7,"y":3},"Bismuth":{"count":2,"x":-6,"y":2},"Borg Mobile Shield Generator":{"count":1,"x":-5,"y":1},"Cotton":{"count":1,"x":-7,"y":5},"Rubber":{"count":1,"x":-6,"y":4},"Sand":{"count":1,"x":-5,"y":3},"Wheat":{"count":1,"x":-5,"y":5},"Plastic":{"count":1,"x":-6,"y":6},"Manganese":{"count":1,"x":-5,"y":7},"Nickle":{"count":1,"x":-4,"y":6},"Tin":{"count":1,"x":-2,"y":6},"Zinc":{"count":1,"x":-1,"y":7},"Platinum":{"count":1,"x":0,"y":6},"Titanium":{"count":1,"x":1,"y":7},"Cobalt":{"count":1,"x":2,"y":8},"Uranium":{"count":1,"x":3,"y":7},"Lead":{"count":1,"x":-2,"y":4},"Lithium":{"count":1,"x":0,"y":4},"Oxygen":{"count":1,"x":1,"y":5},"Aluminium Ore":{"count":1,"x":2,"y":6},"Copper":{"count":1,"x":3,"y":5},"Oats":{"count":1,"x":4,"y":6},"Barley":{"count":1,"x":4,"y":2},"Salt":{"count":1,"x":2,"y":4},"Sulfur":{"count":1,"x":3,"y":3},"Phosphate":{"count":1,"x":3,"y":1},"Saltpeter":{"count":1,"x":4,"y":0},"Potash":{"count":1,"x":4,"y":-2},"Pig":{"count":1,"x":4,"y":-4},"Gallium":{"count":1,"x":3,"y":-5},"Fish":{"count":1,"x":2,"y":-6},"Linseed Oil":{"count":1,"x":1,"y":-5},"Hops":{"count":1,"x":0,"y":-6},"Field of Bliss":{"count":1,"x":-1,"y":-5},"Nitrogen":{"count":1,"x":0,"y":-4},"Potassium Nitrate":{"count":1,"x":1,"y":-3},"Rope":{"count":1,"x":-1,"y":-3},"Cows":{"count":1,"x":-2,"y":-2},"Sheep":{"count":1,"x":-2,"y":0},"Planks":{"count":1,"x":-3,"y":1},"Clay":{"count":1,"x":-2,"y":2},"Wooden Club":{"count":1,"x":-1,"y":3},"Lime":{"count":1,"x":0,"y":2},"Charcoal":{"count":1,"x":1,"y":1},"Concrete":{"count":1,"x":2,"y":0},"Mug of Coffee":{"count":1,"x":3,"y":-1},"Chickens":{"count":1,"x":3,"y":-3},"Water H2O":{"count":1,"x":2,"y":-4},"Rawhide Leather":{"count":1,"x":2,"y":-2},"Silicon":{"count":1,"x":1,"y":-1},"Cured Ham":{"count":1,"x":0,"y":0},"Milk":{"count":1,"x":-1,"y":1},"Wool":{"count":1,"x":0,"y":-2}}},"7563":{"id":7563,"name":"Malta","buildings":{"Saltpeter":{"count":29,"x":-1,"y":-7},"Potassium Nitrate":{"count":23,"x":-1,"y":-5},"Explosives":{"count":27,"x":-2,"y":-2},"Grenades":{"count":8,"x":-5,"y":-1},"Holy Hand Grenade":{"count":4,"x":-1,"y":-3},"Nitrogen":{"count":3,"x":-1,"y":5}}},"7567":{"id":7567,"name":"Berzence","buildings":{"Wooden Club":{"count":1,"x":-9,"y":1},"Steel Dagger":{"count":1,"x":-7,"y":5},"Steel":{"count":1,"x":-7,"y":3},"Pig Iron":{"count":1,"x":-7,"y":1},"Lime":{"count":1,"x":-7,"y":-1},"Iron Ore":{"count":14,"x":-6,"y":0},"Limestone":{"count":14,"x":-7,"y":-3},"Sword of Fury":{"count":1,"x":-4,"y":4},"Shield of Resilience":{"count":1,"x":-3,"y":5},"Horn of the Conqueror":{"count":1,"x":-5,"y":5},"Coal":{"count":14,"x":-5,"y":-1},"Charcoal":{"count":1,"x":-4,"y":0},"Wood":{"count":14,"x":-3,"y":-1}}},"7571":{"id":7571,"name":"Fairview","buildings":{"Celestial Serenity":{"count":1,"x":-7,"y":-1},"Veil of Avalon":{"count":1,"x":-7,"y":1},"Roseate Elysium":{"count":1,"x":-7,"y":3},"Gamma Shield Alloy":{"count":12,"x":-6,"y":-4},"Radiant Syncronite":{"count":10,"x":-4,"y":-6},"Urantitanium Alloy":{"count":10,"x":-2,"y":-6},"Titanium Beta C":{"count":12,"x":-1,"y":-5},"Manganese Bronze":{"count":13,"x":1,"y":-5},"Silver Solder":{"count":12,"x":3,"y":-5},"Silver":{"count":1,"x":5,"y":-3},"Titanium Aluminide":{"count":1,"x":5,"y":-1}}},"7577":{"id":7577,"name":"Ocean View","buildings":{"Electronics":{"count":50,"x":-6,"y":-4},"FPV Drone":{"count":2,"x":-3,"y":5},"Military Drone":{"count":2,"x":-1,"y":3},"Copper":{"count":1,"x":6,"y":-2},"Plastic":{"count":1,"x":6,"y":0},"Silicon Wafer":{"count":1,"x":6,"y":2},"Explosives":{"count":1,"x":6,"y":4}}},"7587":{"id":7587,"name":"Argine","buildings":{"Natural Gas":{"count":1,"x":0,"y":0}}},"7605":{"id":7605,"name":"Frankfurt","buildings":{"Armor":{"count":2,"x":-6,"y":2},"Crown of Prosperity":{"count":1,"x":-5,"y":3},"Sword":{"count":1,"x":-5,"y":-5},"Shield of Resilience":{"count":1,"x":-5,"y":1},"Horn of the Conqueror":{"count":1,"x":-5,"y":-1},"Cloak of Invincibility":{"count":1,"x":-5,"y":-3},"Gamma Synchronite Shield":{"count":1,"x":-5,"y":-7},"Silver Solder":{"count":30,"x":3,"y":-7},"Manganese Bronze":{"count":15,"x":4,"y":-8},"Radiant Syncronite":{"count":16,"x":1,"y":-7},"Urantitanium Alloy":{"count":15,"x":0,"y":-8},"Titanium Beta C":{"count":15,"x":-1,"y":-9},"Gamma Shield Alloy":{"count":18,"x":1,"y":1},"Crimson Dragons Breath":{"count":1,"x":-4,"y":-6},"Nickel Silver":{"count":9,"x":-2,"y":-8},"Verdant Forest Whisper":{"count":1,"x":-6,"y":-8}}},"7610":{"id":7610,"name":"Rabat","buildings":{"Coal":{"count":1,"x":-6,"y":-8},"Iron Ore":{"count":1,"x":-4,"y":-8},"Wood":{"count":1,"x":-3,"y":-9},"Natural Gas":{"count":1,"x":-2,"y":-8},"Gold":{"count":1,"x":-1,"y":-9},"Silver":{"count":1,"x":0,"y":-8},"Cotton":{"count":1,"x":1,"y":-7},"Rubber":{"count":1,"x":2,"y":-8},"Sand":{"count":1,"x":3,"y":-7},"Wheat":{"count":1,"x":4,"y":-8},"Plastic":{"count":1,"x":5,"y":-7},"Manganese":{"count":1,"x":6,"y":-6},"Nickle":{"count":1,"x":6,"y":-4},"Tin":{"count":1,"x":7,"y":-3},"Zinc":{"count":1,"x":8,"y":-2},"Platinum":{"count":1,"x":8,"y":0},"Titanium":{"count":1,"x":8,"y":2},"Cobalt":{"count":1,"x":7,"y":3},"Uranium":{"count":1,"x":7,"y":5},"Lead":{"count":1,"x":7,"y":7},"Bismuth":{"count":1,"x":6,"y":8},"Lithium":{"count":1,"x":5,"y":9},"Copper":{"count":1,"x":4,"y":8},"Silicon":{"count":1,"x":-6,"y":-6},"Glass":{"count":1,"x":-6,"y":-4},"Oxygen":{"count":1,"x":3,"y":9},"Aluminium Ore":{"count":1,"x":2,"y":10},"Silicon Wafer":{"count":1,"x":-6,"y":-2},"Nitrogen":{"count":1,"x":-2,"y":-6},"Oats":{"count":1,"x":1,"y":9},"Corn":{"count":1,"x":0,"y":8},"Barley":{"count":1,"x":-1,"y":9},"Salt":{"count":1,"x":-2,"y":8},"Sulfur":{"count":1,"x":-3,"y":7},"Phosphate":{"count":1,"x":-4,"y":8},"Saltpeter":{"count":1,"x":-5,"y":9},"Potash":{"count":1,"x":-6,"y":8},"Pig":{"count":1,"x":-7,"y":9},"Gallium":{"count":1,"x":-8,"y":6},"Potassium Nitrate":{"count":1,"x":-5,"y":7},"Explosives":{"count":1,"x":-7,"y":1},"Electronics":{"count":1,"x":-6,"y":2},"FPV Drone":{"count":1,"x":-5,"y":1},"Water H2O":{"count":1,"x":-8,"y":4},"Crude Oil":{"count":1,"x":-9,"y":3},"Pig Iron":{"count":1,"x":-4,"y":-6},"Steel":{"count":1,"x":-4,"y":-4},"Cement":{"count":1,"x":3,"y":-5},"Laser":{"count":1,"x":-3,"y":1},"Hydrogen Fuel Cell":{"count":1,"x":-2,"y":0},"Electricity":{"count":1,"x":-4,"y":2},"Hydrogen":{"count":1,"x":-2,"y":2},"Hydrogen Powered Lazer Drone":{"count":1,"x":-1,"y":1},"Combustion Engine":{"count":1,"x":-8,"y":2},"Soul Destroyer":{"count":1,"x":-4,"y":0},"Enriched Uranium":{"count":1,"x":-5,"y":3},"Guidance System":{"count":1,"x":-7,"y":3},"Nuclear Warhead":{"count":1,"x":-6,"y":4},"Supply Shuttle":{"count":1,"x":-1,"y":3},"Orbital Probe":{"count":1,"x":-1,"y":-1},"ICBM":{"count":1,"x":-7,"y":5},"Sword of Fury":{"count":19,"x":-4,"y":-2},"Shield of Resilience":{"count":19,"x":-3,"y":-3},"Limestone":{"count":1,"x":-5,"y":-7},"Lime":{"count":1,"x":-5,"y":-5},"Charcoal":{"count":1,"x":-7,"y":-5},"Horn of the Conqueror":{"count":1,"x":-5,"y":-1},"Gun Powder":{"count":1,"x":-3,"y":5},"Holy Hand Grenade":{"count":1,"x":-4,"y":4},"Armored Tank":{"count":1,"x":-6,"y":0},"Armor":{"count":1,"x":-7,"y":-3},"Sniper":{"count":1,"x":-7,"y":-1},"Sniper Rifle":{"count":1,"x":-8,"y":-2},"Loitering Munitions":{"count":1,"x":-8,"y":0}}},"7615":{"id":7615,"name":"Davao","buildings":{"Coal":{"count":1,"x":-9,"y":-1},"Wood":{"count":1,"x":-8,"y":0},"Planks":{"count":1,"x":-7,"y":-1},"Charcoal":{"count":1,"x":-7,"y":1},"Silicon":{"count":9,"x":-6,"y":0},"Sand":{"count":1,"x":-9,"y":1},"Water H2O":{"count":1,"x":-6,"y":-2},"Limestone":{"count":1,"x":-9,"y":3},"Aluminium":{"count":10,"x":-5,"y":-1},"Natural Gas":{"count":1,"x":-8,"y":-2},"Aluminium Ore":{"count":1,"x":-8,"y":2},"Glass":{"count":1,"x":-7,"y":3},"Lime":{"count":1,"x":-8,"y":4},"Silicon Wafer":{"count":1,"x":-4,"y":0},"Electronics":{"count":1,"x":-3,"y":1},"Copper":{"count":1,"x":-7,"y":5},"Plastic":{"count":1,"x":-6,"y":4},"Military Drone":{"count":1,"x":-2,"y":2},"Explosives":{"count":1,"x":-3,"y":3},"Potassium Nitrate":{"count":1,"x":-4,"y":2},"Saltpeter":{"count":1,"x":-5,"y":1},"Nitrogen":{"count":6,"x":-4,"y":4},"Gun Powder":{"count":1,"x":-5,"y":3},"Sulfur":{"count":1,"x":-6,"y":2},"Armored Tank":{"count":1,"x":-2,"y":4},"Steel":{"count":1,"x":-5,"y":5},"Pig Iron":{"count":1,"x":-6,"y":6},"Iron Ore":{"count":1,"x":-8,"y":6},"Crude Oil":{"count":1,"x":-7,"y":-3},"Electricity":{"count":6,"x":-4,"y":-2},"Cement":{"count":1,"x":-5,"y":-3},"Hydrogen":{"count":1,"x":-3,"y":-1},"Hydrogen Fuel Cell":{"count":1,"x":-2,"y":-2},"Laser":{"count":1,"x":-3,"y":-3},"Hydrogen Powered Lazer Drone":{"count":1,"x":-1,"y":-3},"Guidance System":{"count":2,"x":-2,"y":0},"ICBM":{"count":1,"x":-1,"y":-1},"Barley":{"count":2,"x":-2,"y":-8},"Pregame Pils":{"count":2,"x":-1,"y":-9},"Glue":{"count":2,"x":0,"y":-8},"Horses":{"count":2,"x":2,"y":-8},"Wheat":{"count":2,"x":4,"y":-8},"Cardboard":{"count":2,"x":4,"y":-6}}},"7617":{"id":7617,"name":"Maracaibo","buildings":{"Natural Gas":{"count":18,"x":-9,"y":1},"Water H2O":{"count":6,"x":-8,"y":-4},"Rubber":{"count":10,"x":-7,"y":-5},"Sulfur":{"count":10,"x":-6,"y":4},"Gun Powder":{"count":2,"x":8,"y":-2},"Cement":{"count":5,"x":7,"y":7},"Oxygen":{"count":2,"x":6,"y":8}}},"7620":{"id":7620,"name":"Kuala Lumpur","buildings":{"Coal":{"count":97,"x":-8,"y":0},"Wood":{"count":1,"x":-7,"y":-5}}},"7621":{"id":7621,"name":"Port Louis","buildings":{"Wood":{"count":50,"x":-7,"y":-3},"Charcoal":{"count":50,"x":-7,"y":-5},"Sand":{"count":50,"x":0,"y":2}}},"7622":{"id":7622,"name":"Brussels","buildings":{"Ferromanganese Cobalt":{"count":6,"x":-9,"y":-1},"Heusler Alloy":{"count":5,"x":8,"y":-2},"Aluminum Bronze":{"count":5,"x":7,"y":3},"Quantum Harmonic Metal":{"count":2,"x":6,"y":-6},"Babbitt Copper":{"count":5,"x":6,"y":-2},"Titanium Aluminide":{"count":56,"x":-7,"y":-5}}},"7641":{"id":7641,"name":"Minsk","buildings":{"Coal":{"count":1,"x":-1,"y":1},"Iron Ore":{"count":1,"x":0,"y":0}}},"7642":{"id":7642,"name":"Hohhot","buildings":{"Tin":{"count":10,"x":8,"y":-2},"Lithium":{"count":10,"x":6,"y":6},"Lead":{"count":10,"x":5,"y":-1},"Gold":{"count":10,"x":4,"y":0},"Cobalt":{"count":10,"x":3,"y":3},"Platinum":{"count":10,"x":2,"y":-2},"Plastic":{"count":1,"x":1,"y":-7},"Aluminium Lithium Alloy":{"count":3,"x":1,"y":7},"Aluminum Bronze":{"count":3,"x":0,"y":6}}},"7653":{"id":7653,"name":"Tijuana","buildings":{"Crude Oil":{"count":6,"x":-9,"y":-1},"Lime":{"count":51,"x":7,"y":-3}}},"7655":{"id":7655,"name":"Tirunelveli","buildings":{"Titanium":{"count":52,"x":-5,"y":-9},"Aluminium Ore":{"count":58,"x":-4,"y":-6},"Nickle":{"count":40,"x":-3,"y":1}}}}
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
    html+= '<thead><tr><th>Image</th><th>Item</th><th>Difficulty</th><th>Durability</th><th>Stats</th><th>Cities</th><th>Parts</th></tr></thead>';
    html+= '<tbody>';
    arr.forEach((item, index)=>{
        let value = item.value1 + '<br>' + item.value2;
        let info = canBeBuilt(item, true);

        let citiesHTML = getCities(item.title);

        html+= '<tr id="item_'+index+'" onclick="loadTree(\''+item.title+'\', '+index+')">';
        html += '<td><img width="80px" src="'+item.img1+'">'+'</td>';
        html += '<td>'+item.title+'</td>';
        html += '<td>'+item.difficulty.replace('difficulty ', '')+'</td>';
        html += '<td>'+item.durability.replace('durability ', '')+'</td>';
        html += '<td>'+value +'</td>';
        html += '<td>'+citiesHTML +'</td>';
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
    citiesWithItem.sort((a,b) => (b.buildings[item].count > a.buildings[item].count) ? 1 : ((a.buildings[item].count > b.buildings[item].count) ? -1 : 0))

    if(citiesWithItem.length > 3){
        citiesWithItem = citiesWithItem.slice(0,3);
    }
    let citiesHTML = '';
    citiesWithItem.forEach((city)=>{
        //${item}- 
        let building = city.buildings[item];
        citiesHTML += `<div>${building.count} x <a href="https://liquidlands.io/city/${city.id}/_xy${building.x},${building.y}" target="_blank">${city.name}</a></div>`;
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

    let cantbuildElm = document.getElementById("cantbuild").checked;
    if(cantbuildElm){
        filtered = filtered.filter((item)=>!canBeBuilt(item));
    }

    if(canBuild){
        filtered = filtered.filter((item)=>canBeBuilt(item));
    }

    document.getElementById("total_items").innerHTML = filtered.length;
    document.getElementById("buildable_items").innerHTML = filtered.filter((item)=>canBeBuilt(item)).length;
    
    buildInfoTable(filtered);
}


function updateQuantity(){
    quantity = parseInt(document.getElementById('quantity').value);
    let item = items.find((it)=>it.title == currentItem)
    buildItemTable(item);
}