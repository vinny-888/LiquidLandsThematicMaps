let template = 'deborah';
OrgChart.templates[template].plus = '<circle cx="15" cy="15" r="15" fill="#ffffff" stroke="#aeaeae" stroke-width="1"></circle>'
    + '<text text-anchor="middle" style="font-size: 18px;cursor:pointer;" fill="#757575" x="15" y="22">{collapsed-children-count}</text>';

OrgChart.templates[template].field_0 = `
    <text data-width="125" data-text-overflow="ellipsis" style="font-size: 16px;" fill="#ffffff" x="15" y="25" text-anchor="start">{val}</text>
`;
OrgChart.templates[template].field_1 = `
    <text width="105" text-overflow="ellipsis" style="font-size: 12px;" fill="#ffffff" x="15" y="135" text-anchor="start">{val}</text>
`;
OrgChart.templates[template].img_0 = `
    <clipPath id="{randId}">
    <rect fill="#ffffff" stroke="#002c41" stroke-width="1" x="5" y="5" rx="15" ry="15" width="140" height="140"></rect>
    </clipPath>
    <image preserveAspectRatio="xMidYMid slice" clip-path="url(#{randId})" xlink:href="{val}" x="5" y="5"  width="140" height="140"></image>
    <rect x="3" y="5" height="30" width="144" fill="#002c41" opacity="0.5" rx="3" ry="3"></rect>
    <rect x="3" y="115" height="30" width="144" fill="#002c41" opacity="0.5" rx="3" ry="3"></rect>
    `;
OrgChart.templates.invisibleGroup.padding = [20, 0, 0, 0];

const categories = [
    "Animals",
    "Minerals and Gasses",
    "Metals",
    "Materials",
    "Food and Drink",
    "Technology",
    "Weapons",
    "Energy",
    "Clothing",
    "Skills"
];

const urlParams = new URLSearchParams(window.location.search);
let itemId = urlParams.get('id');
if(itemId){
    itemId = parseInt(itemId);
    document.getElementById('item_name').innerHTML = categories[itemId-1000];
} else {
    itemId = null;
    document.getElementById('item_name').innerHTML = '';
}

// title
const mappings = {
    'Coal':'Minerals and Gasses',
    'Limestone':'Metals',
    'Lime':'Minerals and Gasses',
    'Iron Ore':'Metals',
    'Pig Iron':'Metals',
    'Steel':'Metals',
    'Wood':'Materials',
    'Steel Dagger':'Weapons',
    'Wooden Club':'Weapons',
    'Clay':'Metals',
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
    'Aluminium Ore':'Metals',
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
        img_0: "img",
        field_0: "name",
        field_1: "title",
        // field_2: "text",
    },
    tags: {
        // "item": {
        //     subTreeConfig: {
        //         layout: OrgChart.mixed,
        //         collapse: {
        //             level: 2
        //         }
        //     },
        // },
        "all": {
            template: "invisibleGroup",
            subTreeConfig: {
                // orientation: OrgChart.orientation.bottom,
                collapse: {
                    level: 1
                }
            }
        },
        "item": {
            subTreeConfig: {
                layout: OrgChart.treeRightOffset,
                collapse: {
                    level: 1
                }
            },
        },
        "department": {
            template: "group"
        },
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
    // let categories = [{ id: "hr-team", pid: "top-management", tags: ["hr-team", "department"], name: "HR department" },
    // { id: "it-team", pid: "top-management", tags: ["it-team", "department"], name: "IT department" },
    // { id: "sales-team", pid: "top-management", tags: ["sales-team", "department"], name: "Sales department" }]

    chart.load(items);
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

    /*
    { id: "all", tags: ["all"] },
    { id: "hr-team", pid: "all", tags: ["hr-team", "department"], name: "HR department" },
    { id: 1, stpid: "all", name: "Nicky Phillips", title: "CEO", img: "https://cdn.balkan.app/shared/anim/1.gif", tags: ["seo-menu"] },
    */
    
    /*
    categories.forEach((title)=>{
        let category = { 
            id: title, 
            name: title,
            pid: "all", 
            tags: [title, "department", "item"]
            
        };
        
        baseNodes.push(category);
    });*/

    categories.forEach((category, index)=>{
        let section = { 
            id: 1000 + index, 
            stpid: 'all', 
            // pid: category,
            name: category, 
            title: category, 
            img: './images/'+category+'.png', 
            tags: []
        };
        if(!itemId || itemId == section.id){
            baseNodes.push(section);
        }
    });


    json.forEach((item)=>{
        let newItem = buildItem(item, null);
        if(!itemId || itemId == newItem.pid){
            items.push(newItem);
            let children = getChildren(json, item, null, []);

            let difficulty = 0;
            children.forEach((child)=>{
                difficulty += child.difficulty;
            })
            counts.push(difficulty);
        }
    })

    items.sort(function(a, b) {
        return counts[items.indexOf(b)] - counts[items.indexOf(a)];
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
    let elm = {
        "id":id,
        "pid": pid,
        "title":item.place_name,
        "name":item.title,
        "difficulty":item.difficulty,
        "img": 'https://liquidlands.io'+item.thumb.replace('/48/', '/350/'),
        "tags":[mappings[item.title]]
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
      var collapseIds = [];
      var clickedNode = chart.getNode('all');

    for (var i = 0; i < clickedNode.stChildren.length; i++) {
        let child = clickedNode.stChildren[i];
        if(clickedNode.stChildrenIds[i] != id){
            for (var j = 0; j < child.childrenIds.length; j++) {
                collapseIds.push(child.childrenIds[j])
            }
        }
    }

      chart.collapse(id, collapseIds)

    //   chart.collapse(id, collapseIds, function () {
    //     chart.expand(id, clickedNode.childrenIds)
    //   })
      return false;
    }
  });