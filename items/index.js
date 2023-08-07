let template = 'deborah';
const urlParams = new URLSearchParams(window.location.search);
let itemId = urlParams.get('id');
if(itemId){
    itemId = parseInt(itemId);
    document.getElementById('item_name').innerHTML = categories[itemId-1000];
} else {
    itemId = null;
    document.getElementById('item_name').innerHTML = '';
}

OrgChart.templates[template].field_0 = `
    <text data-width="125" data-text-overflow="ellipsis" style="font-size: 13px;" fill="#ffffff" x="15" y="20" text-anchor="start">{val}</text>
`;
OrgChart.templates[template].field_1 = `
    <text width="105" text-overflow="ellipsis" style="font-size: 12px;" fill="#bbbbbb" x="15" y="33" text-anchor="start">{val}</text>
`;
OrgChart.templates[template].durability = `
    <text width="105" text-overflow="ellipsis" style="font-size: 10px;font-weight: bold;" fill="#55ffe8" x="140" y="123" text-anchor="end">{val}</text>
`;
OrgChart.templates[template].difficulty = `
    <text width="105" text-overflow="ellipsis" style="font-size: 10px;font-weight: bold;" fill="#55ffe8" x="140" y="138" text-anchor="end">{val}</text>
`;
OrgChart.templates[template].value_1 = `
    <text width="105" text-overflow="ellipsis" style="font-size: 10px;font-weight: bold;" fill="#e2960a" x="10" y="123" text-anchor="start">{val}</text>
`;
OrgChart.templates[template].value_2 = `
    <text width="105" text-overflow="ellipsis" style="font-size: 10px;font-weight: bold;" fill="#e2960a" x="10" y="138" text-anchor="start" rx="15" ry="15">{val}</text>
`;

OrgChart.templates[template].img_0 = `
    <clipPath id="{randId}">
    <rect fill="#ffffff" stroke="#002c41" stroke-width="1" x="5" y="5" rx="15" ry="15" width="140" height="140"></rect>
    </clipPath>
    <image style="cursor: pointer;" preserveAspectRatio="xMidYMid slice" clip-path="url(#{randId})" xlink:href="{val}" x="5" y="5"  width="140" height="140"></image>
    <rect class="topCorner" x="5" y="5" height="50" width="140" fill="#002c41" opacity="0.75" rx="15" ry="15"></rect>
    <rect class="bottomCorner"x="5" y="95" height="50" width="140" fill="#002c41" opacity="0.75" rx="15" ry="15"></rect>
    `;
OrgChart.templates[template].img_1 = `
    <image style="cursor: pointer;" preserveAspectRatio="xMidYMid slice" clip-path="url(#shape)" xlink:href="{val}" x="110" y="5"  width="35" height="35"></image>
    <path d="M132,3 a13,13 0 0 1 15,15" fill="#00000000" stroke="#039be5" stroke-width="4.5" />
    `;
OrgChart.templates.invisibleGroup.padding = [20, 0, 0, 0];
OrgChart.templates.group.node = '<rect rx="50" ry="50" x="0" y="0" height="{h}" width="{w}" fill="#11181d" stroke-width="0"></rect>';
// OrgChart.templates[template].field_number_children = '<circle cx="50" cy="50" r="15" fill="#F57C00"></circle><text fill="#ffffff" x="50" y="50" text-anchor="middle">{val}</text>';

const categories = [
    "Animals",
    "Clothing",
    "Energy",
    "Food and Drink",
    "Materials",
    "Metals",
    "Minerals and Gasses",
    "Skills",
    "Technology",
    "Weapons",
];

// title
const mappings = {
    'Coal':'Minerals and Gasses',
    'Limestone':'Minerals and Gasses',
    'Lime':'Minerals and Gasses',
    'Iron Ore':'Minerals and Gasses',
    'Pig Iron':'Metals',
    'Steel':'Metals',
    'Wood':'Materials',
    'Steel Dagger':'Weapons',
    'Wooden Club':'Weapons',
    'Clay':'Minerals and Gasses',
    'Terracule001':'Energy',
    'Wand of Eternity':'Weapons',
    'Bazooka':'Weapons',
    'Planks':'Materials',
    'Concrete':'Materials',
    'Glass': 'Technology',
    'Charcoal':'Materials',
    'BBQ':'Food and Drink',
    'Crude Oil':'Energy',
    'Natural Gas':'Energy',
    'Gold':'Metals',
    'Silver':'Metals',
    'Cotton':'Clothing',
    'Rubber':'Materials',
    'Sand':'Minerals and Gasses',
    'Wheat':'Food and Drink',
    'Plastic':'Materials',
    'Catapult':'Weapons',
    'Armored Tank':'Weapons',
    'Trebuchet':'Weapons',
    'Aluminium Ore':'Minerals and Gasses',
    'Cement':'Materials',
    'Copper':'Metals',
    'Sword of Truth':'Weapons',
    'Manganese':'Metals',
    'Nickle':'Metals',
    'Tin':'Metals',
    'Zinc':'Metals',
    'Platinum':'Metals',
    'Titanium':'Metals',
    'Cobalt':'Metals',
    'Uranium':'Metals',
    'Lead':'Metals',
    'Bismuth':'Metals',
    'Lithium':'Metals',
    'Oxygen':'Minerals and Gasses',
    'Mug of Coffee':'Food and Drink',
    'Jug of Ale':'Food and Drink',
    'Silicon':'Materials',
    'Horses':'Animals',
    'Oats':'Food and Drink',
    'Corn':'Food and Drink',
    'Barley':'Food and Drink',
    'Salt':'Minerals and Gasses',
    'Settler':'Skills',
    'Barbarian':'Skills',
    'Knight':'Skills',
    'ICBM':'Weapons',
    'Cows':'Animals',
    'Sheep':'Animals',
    'Chickens':'Animals',
    'Pigs':'Animals',
    'Water H2O':'Food and Drink',
    'Rawhide Leather':'Clothing',
    'Leather Shield':'Clothing',
    'Armor':'Clothing',
    'Fertilizer':'Materials',
    'Sulfur':'Materials',
    'Phosphate':'Materials',
    'Saltpeter':'Minerals and Gasses',
    'Aluminium':'Metals',
    'Potassium Nitrate':'Materials',
    'Wool':'Clothing',
    'Leather Boots':'Clothing',
    'Leather Gloves':'Clothing',
    'Leather Greaves':'Clothing',
    'Leather Jacket':'Clothing',
    'Leather Helm':'Clothing',
    'Potash':'Minerals and Gasses',
    'Nitrogen':'Minerals and Gasses',
    'Beef Jerky':'Food and Drink',
    'Pig':'Animals',
    'Silicon Wafer':'Technology',
    'Lamb Jerky':'Food and Drink',
    'Electronics':'Technology',
    'Cured Ham':'Food and Drink',
    'Gun Powder':'Weapons',
    'Rope':'Materials',
    'Enriched Uranium':'Energy',
    'Guidance System':'Technology',
    'Sword':'Weapons',
    'Eggs':'Food and Drink',
    'Explosives':'Weapons',
    'Tomatoes':'Food and Drink',
    'Milk':'Food and Drink',
    'Cheese':'Food and Drink',
    'Omelette':'Food and Drink',
    'Electricity':'Energy',
    'Laser':'Technology',
    'Horse  Cart':'Technology',
    'Combustion Engine':'Technology',
    'Hydrogen':'Minerals and Gasses',
    'Grenades':'Weapons',
    'RPG':'Weapons',
    'Nuclear Warhead':'Weapons',
    'Diesel': 'Energy',
    'Drone': 'Weapons',
    'Laser Turret': 'Weapons',
    'Assault Rifle': 'Weapons',
    'FPV Drone': 'Technology',
    'Military Drone': 'Weapons',
    'Military Engineer': 'Skills',
    'Explosives Specialist': 'Skills',
    'Gasoline': 'Energy',
    'Samurai': 'Skills',
    'Motor Car': 'Technology',
    'Sniper Rifle': 'Weapons',
    'Navy Seal': 'Skills',
    'Attack Helicopter': 'Weapons',
    'Sniper': 'Skills',
    'Loitering Munitions': 'Weapons',
    'Tires':'Technology',
    'Defensive Shield':'Technology',
    'Taser Fists':'Weapons',
    'Soul Destroyer':'Weapons',
    'Hydrogen Fuel Cell':'Technology',
    'Phosphor':'Minerals and Gasses',
    'Gallium':'Metals',
    'Ceramics':'Technology',
    'Motorbike':'Technology',
    'Personnel Carrier':'Weapons',
    'Hydrogen Powered Lazer Drone':'Weapons',
    'Supply Shuttle':'Weapons',
    'Orbital Probe':'Weapons',
    'Sword of Fury':'Weapons',
    'Shield of Resilience':'Clothing',
    'Horn of the Conqueror':'Clothing',
    'Crown of Prosperity':'Clothing',
    'Cloak of Invincibility':'Clothing',
    'Boots of Teleportation':'Clothing'
};

var chart = new OrgChart(document.getElementById("tree"), {
    mouseScrool: OrgChart.action.ctrlZoom,
    template: template,
    enableDragDrop: false,
    enableSearch: false,
    assistantSeparation: 170,
    showYScroll: OrgChart.scroll.visible,
    mouseScrool: OrgChart.action.yScroll,
    scaleInitial: OrgChart.match.width,
    anim: {
        func: OrgChart.anim.outPow,
        duration: 0
    },
    collapse: {
        level: 1
    },
    menu: {
        pdfPreview: {
            text: "Export to PDF",
            icon: OrgChart.icon.pdf(24, 24, '#7A7A7A'),
            onClick: preview
        },
        csv: { text: "Save as CSV" }
    },
    align: OrgChart.ORIENTATION,
    toolbar: {
        fullScreen: true,
        zoom: true,
        fit: true,
        expandAll: true
    },
    nodeBinding: {
        img_0: "img1",
        img_1: "img2",
        field_0: "name",
        field_1: "title",
        durability: "durability",
        difficulty: "difficulty",
        value_1: "value1",
        value_2: "value2",
    },
    tags: {
        "all": {
            template: "invisibleGroup",
            subTreeConfig: {
                collapse: {
                    level: 1
                },
                columns: 5
            }
        },
        "category-group": {
            template: "group",
            subTreeConfig: {
                columns: 6
            }
        }
    },
    clinks: [
        { from: 11, to: 18 }
    ]
});

const url = 'https://liquidlands.io/raw/items';
async function loadJSONData() {
    const response = await fetch(url);
    const jsonData = await response.json();
    let items = convertJSON(jsonData);
    chart.load(items);
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
    html+= '<thead><tr><td>Item</td><td>Difficulty</td><td>Durability</td><td>Stats</td></tr></thead>';
    html+= '<tbody>';
    items.slice(21).forEach((item)=>{
        let value = item.value1 + '<br>' + item.value2;
        html+= '<tr><td>'+item.name+'</td><td>'+item.difficulty.replace('difficulty ', '')+'</td><td>'+item.durability.replace('durability ', '')+'</td><td>'+value +'</td></tr>';
    })
    html+= '</tbody>';
    html += '</table>';

    document.getElementById('info').innerHTML = html;
}

window.addEventListener("DOMContentLoaded", async (event) => {
    await loadJSONData();
  });

  function getChildren(items, item, parent, children, offset){
    let newItem = buildItem(item, parent, offset);
    children.push(newItem);
    
    let children1 = children;
    let children2 = [];
    let children3 = [];
    if(item.input1){
        let child = items.find((elm)=>elm.id == item.input1.id);
        children1 = getChildren(items, child, newItem.id, children);
    }

    if(item.input2){
        let child = items.find((elm)=>elm.id == item.input2.id);
        children2 = getChildren(items, child, newItem.id, children1);
    } else {
        children2 = children1;
    }

    if(item.input3){
        let child = items.find((elm)=>elm.id == item.input3.id);
        children3 = getChildren(items, child, newItem.id, children2);
    } else {
        children3 = children2;
    }
    
    return children3;
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

/* LL Item Sample
    {
      "id":5,
      "title":"Lime",
      "thumb":"/nft/content/48/94.jpg",
      "place_name":"Lime Kiln",
      "place_thumb":"/nft/content/48/95.jpg",
      "difficulty":2,
      "points":2,
      "durability":2,
      "attack":0,
      "defence":0,
      "invincibility":0,
      "leave":0,
      "min_tax":0,
      "raid":0,
      "input1":{
         "id":4,
         "title":"Limestone",
         "thumb":"/nft/content/48/92.jpg"
      },
      "input2":null,
      "input3":null
   }
*/

function convertJSON(json){
    let items = [];
    let counts = [];

    let baseNodes = [{ id: "all", tags: ["all"] }];

    json.forEach((item)=>{
        let newItem = buildItem(item, null);
        if(!itemId || itemId == newItem.pid){
            items.push(newItem);
            let children = getChildren(json, item, null, []);

            let difficulty = 0;
            children.forEach((child)=>{
                difficulty += parseInt(child.difficulty.split(' ')[1]);
            })
            counts.push(difficulty);
        }
    })

    items.sort(function(a, b) {
        return counts[items.indexOf(b)] - counts[items.indexOf(a)];
    });


    categories.forEach((category, index)=>{
        let children = 0;
        items.forEach((item)=>{
            if(item.stpid == category+'_group'){
                children++;
            }
        });
        let section = { 
            id: 1000 + index, 
            stpid: 'all', 
            // pid: category,
            name: category, 
            title: children, 
            img1: './images/'+category+'.png?v=0.1', 
            tags: []
        };
        let categoryGroup = { 
            id: category+"_group", 
            name: category, 
            pid: 1000 + index, 
            tags: ['category-group'] 
        }
        if(!itemId || itemId == section.id){
            baseNodes.push(categoryGroup);
            baseNodes.push(section);
        }
    });

    return baseNodes.concat(items);
}

let ids = [];
function buildItem(item, parent){
    let id = item.id;

    // Need unique ids for nodes
    while(ids.indexOf(id) != -1){
        id = id+100000;
    }
    ids.push(id);

    if(categories.indexOf(mappings[item.title]) == -1){
        console.log(item.title);
    }
    let pid = 1000 + categories.indexOf(mappings[item.title]);

    let values = getNonZeroNumbers(item);
    
    let elm = {
        "id":id,
        "pid": pid,
        "stpid": mappings[item.title]+"_group",
        "title":item.place_name,
        "name":item.title,
        "durability": values[0] ? (values[0].key + ' ' + values[0].value) : '',
        "difficulty": values[1] ? (values[1].key + ' ' + values[1].value) : '',
        "value1": values[2] ? (values[2].value + ' ' + values[2].key) : '',
        "value2": values[3] ? (values[3].value + ' ' + values[3].key) : '',
        "img1": item.thumb.replace('/48/', '/350/'),
        "img2": item.place_thumb.replace('/48/', '/350/'),
        "tags":[mappings[item.title], 'department']
    }
    if(parent){
        elm.pid = parent;
    }
   return elm;
}

function preview() {
    OrgChart.pdfPrevUI.show(chart, {
        format: 'A4'
    });
}

function nodePdfPreview(nodeId) {
    OrgChart.pdfPrevUI.show(chart, {
        format: 'A4',
        nodeId: nodeId
    });
}

chart.on('expcollclick', function (sender, collapsing, id, ids) {

    if (collapsing) {
        var node = chart.getNode(id);
        chart.expandCollapse(id, [], node.childrenIds);
    }
    else {
        var node = chart.getNode(id);
        var collapseIds = [];
        for (var i = 0; i < node.childrenIds.length; i++) {
            var cnode = chart.getNode(node.childrenIds[i]);
            for (var j = 0; j < cnode.childrenIds.length; j++) {
                collapseIds.push(cnode.childrenIds[j]);
            }
        }
        chart.expandCollapse(id, node.childrenIds, collapseIds);
    }

    return false;
});

chart.on('click', function(sender, args){
    console.log('node clicked:', args.node.id);
    let id = args.node.id;
    while(id > 9999){
        id -= 100000;
    }
    if(id >= 1000){
        window.location.href = './index.html?id='+id;
    }else {
        window.location.href = './item.html?id='+id;
    }
    return false;
});

chart.on('expcollclick', function (sender, isCollpasing, id, ids) {

    if (!isCollpasing) {
        setTimeout(()=>{
            var collapseIds = [];
            var clickedNode = chart.getNode('all');

                for (var i = 0; i < clickedNode.stChildren.length; i++) {
                    let children = clickedNode.stContainerNodes;
                    children.forEach((child)=>{
                        if(child.id != 'all' && id != child.pid){
                            collapseIds.push(child.id)
                        }
                    })
                }

                chart.collapse(id, collapseIds)
                chart.fit();
                // chart.zoom(2);
            }, 100)
        return false;
    }
});
