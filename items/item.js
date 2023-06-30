const urlParams = new URLSearchParams(window.location.search);
let itemId = urlParams.get('id');
if(itemId){
    itemId = parseInt(itemId);
} else {
    itemId = 163;
}
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
    <rect fill="#ffffff" stroke="#039BE5" stroke-width="1" x="5" y="5" rx="15" ry="15" width="140" height="140"></rect>
    </clipPath>
    <image preserveAspectRatio="xMidYMid slice" clip-path="url(#{randId})" xlink:href="{val}" x="5" y="5"  width="140" height="140"></image>
    <rect x="3" y="5" height="30" width="144" fill="#039BE5" opacity="0.5" rx="3" ry="3"></rect>
    <rect x="3" y="115" height="30" width="144" fill="#039BE5" opacity="0.5" rx="3" ry="3"></rect>
    `;

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

chart.on('exportstart', function (sender, args) {
    args.styles = document.getElementById('myStyles').outerHTML;
});

const url = 'https://liquidlands.io/raw/items';
async function loadJSONData() {
    const response = await fetch(url);
    const jsonData = await response.json();
    let items = convertJSON(jsonData, itemId);
    chart.load(items);
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
        id = id+10000;
    }
    ids.push(id);
    let elm = {
        "id":id,
        "title":item.place_name,
        "name":item.title,
        "img": 'https://liquidlands.io'+item.thumb.replace('/48/', '/350/'),
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
    window.location.href = '/item.html?id='+args.node.id;
    return false;
});