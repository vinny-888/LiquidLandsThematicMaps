let i = 0;
let tree = d3.tree().size([580, 700]);
let root;
let g;
let items;

document.addEventListener('DOMContentLoaded', ()=>{
    // Event listeners for buttons
    document.getElementById('expandAll').addEventListener('click', function() {
        expandAll(root);
        update(root);
    });
    
    document.getElementById('collapseAll').addEventListener('click', function() {
        collapseAll(root);
        update(root);
    });
});

function loadTree(name){
    if(!items){
        // Fetch the data from the URL
        fetch("https://liquidlands.io/raw/items")
            .then(response => response.json())
            .then(data => {
                items = transformData(data);
                loadItem(name);
            })
            .catch(error => console.error("Error fetching data:", error));
    } else {
        loadItem(name);
    }

}

function loadItem(name){
    // Assuming the root node is the first item in the array
    Object.keys(items).forEach((key)=>{
        let item = items[key];
        if(item.title == name){
            document.getElementById('graph').innerHTML = '';
            setTimeout(()=>{
                drawTree(item);
            }, 0);
        }
    })
}

// This function will convert the flat structure into a nested one.
function transformData(data) {
    let dataMap = {};

    // Initialize each data item with an empty children array
    data.forEach(d => {
        dataMap[d.id] = {
            ...d,
            children: []
        };
    });

    // For each data item, check its inputs and nest this item under the inputs
    data.forEach(d => {
        if (d.input1) dataMap[d.id].children.push(d.input1.id);
        if (d.input2) dataMap[d.id].children.push(d.input2.id);
        if (d.input3) dataMap[d.id].children.push(d.input3.id);
    });

    // Identify the root item(s). These are items without inputs.
    // let roots = data.filter(d => !d.input1 && !d.input2 && !d.input3).map(d => dataMap[d.id]);

    return dataMap; // Return all root nodes
}

function drawTree(rootNode) {
    const svg = d3.select("#graph").append("svg")
        .attr("width", 800)
        .attr("height", 600)
        .style("border", "1px solid black");

    g = svg.append("g").attr("transform", "translate(100,0)");

    root = d3.hierarchy(rootNode, function (d) {
        return [d.input1, d.input2, d.input3].filter(i => i);
    });

    root.x0 = 290;
    root.y0 = 50;

    if (root._children) {
        root.children = root._children;
        root._children = null;
    }

    update(root);

    //... [rest of the code from the previous example]
}

function update(source) {
    const treeData = tree(root);

    const nodes = treeData.descendants(),
        links = treeData.descendants().slice(1);

    nodes.forEach(function (d) {
        d.y = d.depth * 180;
    });

    const node = g.selectAll('g.node')
        .data(nodes, function (d) {
            return d.id || (d.id = ++i);
        });

    const nodeEnter = node.enter().append('g')
        .attr('class', 'node')
        .attr("transform", function (d) {
            return "translate(" + source.y0 + "," + source.x0 + ")";
        })
        .on('click', click);

    nodeEnter.append('circle')
        .attr('class', 'node')
        .attr('r', 1e-6)
        .style("fill", function (d) {
            return d._children ? "lightsteelblue" : "#fff";
        });

    nodeEnter.append('text')
        .attr("dy", ".35em")
        .attr("x", function (d) {
            return d.children || d._children ? -13 : 13;
        })
        .attr("text-anchor", function (d) {
            return d.children || d._children ? "end" : "start";
        })
        .text(function (d) {
            return d.data.title;
        });

    const nodeUpdate = nodeEnter.merge(node);

    nodeUpdate.transition()
        .duration(200)
        .attr("transform", function (d) {
            return "translate(" + d.y + "," + d.x + ")";
        });

    nodeUpdate.select('circle.node')
        .attr('r', 10)
        .style("fill", function (d) {
            return d._children ? "lightsteelblue" : "#fff";
        });

    const nodeExit = node.exit().transition()
        .duration(200)
        .attr("transform", function (d) {
            return "translate(" + source.y + "," + source.x + ")";
        })
        .remove();

    nodeExit.select('circle')
        .attr('r', 1e-6);

    nodeExit.select('text')
        .style('fill-opacity', 1e-6);

    const link = g.selectAll('path.link')
        .data(links, function (d) {
            return d.id;
        });

    const linkEnter = link.enter().insert('path', "g")
        .attr("class", "link")
        .attr('d', function (d) {
            const o = {x: source.x0, y: source.y0};
            return diagonal(o, o);
        });

    const linkUpdate = linkEnter.merge(link);

    linkUpdate.transition()
        .duration(200)
        .attr('d', function (d) {
            return diagonal(d, d.parent)
        });

    link.exit().transition()
        .duration(200)
        .attr('d', function (d) {
            const o = {x: source.x, y: source.y};
            return diagonal(o, o);
        })
        .remove();

    nodes.forEach(function (d) {
        d.x0 = d.x;
        d.y0 = d.y;
    });

    function diagonal(s, d) {
        const path = `M ${s.y} ${s.x}
        C ${(s.y + d.y) / 2} ${s.x},
            ${(s.y + d.y) / 2} ${d.x},
            ${d.y} ${d.x}`;

        return path;
    }
}

function expandAll(node) {
    if (node._children) {
        node.children = node._children;
        node._children = null;
    }
    if (node.children) {
        node.children.forEach(expandAll);
    }
}

function collapseAll(node) {
    if (node.children) {
        node._children = node.children;
        node.children = null;
    }
    if (node._children) {
        node._children.forEach(collapseAll);
    }
}

function click(node) {
    let d = items[node.data.id];
    if (d.children) {
        d._children = d.children;
        d.children = null;
    } else {
        d.children = d._children;
        d._children = null;
    }
    update(d);
}