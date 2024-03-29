const urlParams = new URLSearchParams(window.location.search);
let itemId = urlParams.get('id');
if(itemId){
    itemId = parseInt(itemId);
} else {
    itemId = 163;
}
let template = 'deborah';

OrgChart.templates[template].field_0 = `
    <text data-width="125" data-text-overflow="ellipsis" style="font-size: 13px;" fill="#ffffff" x="15" y="20" text-anchor="start">{val}</text>
`;
OrgChart.templates[template].field_1 = `
    <text width="105" text-overflow="ellipsis" style="font-size: 10px;" fill="#dddddd" x="15" y="35" text-anchor="start">{val}</text>
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
// OrgChart.templates[template].field_number_children = '<circle cx="50" cy="50" r="15" fill="#F57C00"></circle><text fill="#ffffff" x="50" y="50" text-anchor="middle">{val}</text>';


OrgChart.templates.invisibleGroup.padding = [20, 0, 0, 0];

var chart = new OrgChart(document.getElementById("tree"), {
    mouseScrool: OrgChart.action.ctrlZoom,
    template: template,
    enableDragDrop: false,
    enableSearch: false,
    assistantSeparation: 170,
    collapse: {
        level: 2
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
        durability: "durability",
        difficulty: "difficulty",
        value_1: "value1",
        value_2: "value2",
        // field_number_children: "numberOfChldren"
    },
    tags: {
        "item": {
            subTreeConfig: {
                layout: OrgChart.mixed,
                collapse: {
                    level: 2
                }
            },
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
    let items = convertJSON(jsonData, itemId);
    chart.load(items);

    buildInfoTable(items);
    // chart.fit();
}

function buildInfoTable(items){
    let stats = {};
    let total = 0;
    items.slice(1).forEach((item)=>{
        if(!stats[item.name]){
            stats[item.name] = 0;
        }
        stats[item.name]++;
        total++;
    })

    let html = '<table>';
    html+= '<thead><tr><td>'+items[0].name+'</td><td>'+total+'</td></tr></thead>';
    html+= '<tbody>';
    let keys = Object.keys(stats)
    keys.sort(function(a, b) {
        return stats[a] - stats[b];
    });
    keys.forEach((key)=>{
        let item = stats[key];
        html+= '<tr><td>'+key+'</td><td>'+item+'</td></tr>';
    })
    html+= '</tbody>';
    html += '</table>';

    document.getElementById('info').innerHTML = html;
}

window.addEventListener("DOMContentLoaded", async (event) => {
    await loadJSONData();
  });


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

function convertJSON(json, id){
    let item = json.find((elm)=>elm.id == id);
    document.getElementById('item_name').innerHTML = item.title;
    return getChildren(json, item, null, []);
}

function getChildren(items, item, parent, children){
    let newItem = buildItem(item, parent);
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

let ids = [];
function buildItem(item, parent){
    let id = item.id;

    // Need unique ids for nodes
    while(ids.indexOf(id) != -1){
        id = id+100000;
    }
    ids.push(id);

    let values = getNonZeroNumbers(item);

    let elm = {
        "id":id,
        "title":item.place_name,
        "name":item.title,
        "durability": values[0] ? (values[0].key + ' ' + values[0].value) : '',
        "difficulty": values[1] ? (values[1].key + ' ' + values[1].value) : '',
        "value1": values[2] ? (values[2].value + ' ' + values[2].key) : '',
        "value2": values[3] ? (values[3].value + ' ' + values[3].key) : '',
        "img": item.thumb.replace('/48/', '/350/'),
        "tags":['item']
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
    window.location.href = './item.html?id='+id;
    return false;
});

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
            if (typeof obj[key] === 'number' && obj[key] !== 0 && key != 'durability' && key != 'difficulty' && key != 'points') {
                results.push({
                    key: key,
                    value: obj[key]
                });
            }
        }
    }
    return results;
}

var iterate = function (c, n, args){
    args.count += n.childrenIds.length + n.stChildrenIds.length;
    for(var i = 0; i < n.childrenIds.length; i++){    
        var node = c.getNode(n.childrenIds[i]);
        iterate(c, node, args);  
    }
    for(var i = 0; i < n.stChildrenIds.length; i++){    
        var node = c.getNode(n.stChildrenIds[i]);
        iterate(c, node, args);  
    }
}

// chart.on('field', function(sender, args){
//     if (args.name == "numberOfChldren"){
//         var arg = {
//                 count: 0
//         };
//         iterate(sender, args.node, arg);
//         args.data['numberOfChldren'] = arg.count + 1;
//     }
//  });
