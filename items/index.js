let items;
let currentItem = 'Hydrogen Powered Lazer Drone';
let currentIndex = 0;
let quantity = 1;
let filteredItems = [];
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
    html+= '<thead><tr><th>Item</th><th>Required</th></tr></thead>';
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

function buildRows(arr){
    let html = '';
    let total_bricks = 0;
    getSortedKeys(arr).forEach((key, index)=>{
        let count = arr[key];
        let item = items.find((item)=>item.title == key);
        let composite = item.children && item.children.length > 0 ? true : false;
        
        html+= '<tr onclick="loadTree(\''+item.title+'\')" class="'+(composite ? 'composite' : '')+'">';
        html += '<td>'+item.title+'</td>';
        html += '<td>'+ (count * quantity) +'</td>';
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