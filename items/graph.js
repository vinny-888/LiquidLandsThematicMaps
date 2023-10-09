let items;
let part_cc_p = 25;
function loadTree(name){
    if(!items){
        // Fetch the data from the URL
        fetch("https://liquidlands.io/raw/items")
            .then(response => response.json())
            .then(data => {
                items = transformData(data);
                buildTree(name);
            })
            .catch(error => console.error("Error fetching data:", error));
    } else {
        buildTree(name);
    }

}

function loadItem(name){
    // Assuming the root node is the first item in the array
    Object.keys(items).forEach((key)=>{
        let item = items[key];
        if(item.title == name){
            document.getElementById('graph').innerHTML = '';
            setTimeout(()=>{
                loadData(item);
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
            name: d.title,
            children: []
        };
    });

    // For each data item, check its inputs and nest this item under the inputs
    data.forEach(d => {
        if (d.input1) dataMap[d.id].children.push(dataMap[d.input1.id]);
        if (d.input2) dataMap[d.id].children.push(dataMap[d.input2.id]);
        if (d.input3) dataMap[d.id].children.push(dataMap[d.input3.id]);
    });

    // Identify the root item(s). These are items without inputs.
    // let roots = data.filter(d => !d.input1 && !d.input2 && !d.input3).map(d => dataMap[d.id]);

    return dataMap; // Return all root nodes
}

function findItem(name){
    let it = null;
    Object.keys(items).forEach((key)=>{
        let item = items[key];
        if(item.title == name){
            it = item;
        }
    })
    return it;
}
function buildTree(name) {
  root = findItem(name);
  root.x0 = h / 2;
  root.y0 = 0;

  // Initialize the display to show a few nodes.
//   root.children.forEach(toggleAll);
//   toggle(root.children[0].children[0]);
//   toggle(root.children[9]);
//   toggle(root.children[9].children[0]);

  update(root);
};
var realWidth = window.innerWidth;
var realHeight = window.innerHeight;

var m = [40, 240, 40, 240],
    w = realWidth -m[0] -m[0],
    h = realHeight -m[0] -m[2],
    i = 0,
    root;

var tree = d3.layout.tree()
    .size([h, w]);

var diagonal = d3.svg.diagonal()
    .projection(function(d) { return [d.y, d.x]; });

var vis = d3.select("#graph").append("svg:svg")
    .attr("class","svg_container")
    .attr("width", w)
    .attr("height", h)
    .style("overflow", "scroll")
    .style("background-color","#EEEEEE")
  .append("svg:g")
    .attr("class","drawarea")
  .append("svg:g")
    .attr("transform", "translate(" + m[3] + "," + m[0] + ")");

var botao = d3.select("#form #button");


function loadData(json) {
    root = json;
    d3.select("#processName").html(root.text);
    root.x0 = h / 2;
    root.y0 = 0;
    botao.on("click", function(){toggle(root); update(root);});
    
    update(root);  
}

function update(source) {
    var duration = d3.event && d3.event.altKey ? 5000 : 500;
    
    // Compute the new tree layout.
    var nodes = tree.nodes(root).reverse();
    console.warn(nodes)
    
    // Normalize for fixed-depth.
    nodes.forEach(function(d) { d.y = d.depth * 50; });
    
    // Update the nodes…
    var node = vis.selectAll("g.node")
    .data(nodes, function(d) { return d.id || (d.id = ++i); });
    
    // Enter any new nodes at the parent's previous position.
    var nodeEnter = node.enter().append("svg:g")
    .attr("class", "node")
    .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
    .on("click", function(d) { toggle(d); update(d); });
    
    nodeEnter.append("svg:circle")
    .attr("r", function(d){ 
        return  Math.sqrt((part_cc_p*1))+4;
    })
    .attr("class", function(d) { return "level"+d.part_level; })
    .style("stroke", function(d){
        if(d._children){return "blue";}
    })    
    ;
    
    nodeEnter.append("svg:text")
    .attr("x", function(d) { return d.children || d._children ? -((Math.sqrt((part_cc_p*1))+6)+this.getComputedTextLength() ) : Math.sqrt((part_cc_p*1))+6; })
    .attr("y", function(d) { return d.children || d._children ? 0 : 0; })
    .attr("dy", ".35em")
    .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
    .text(function(d) { 
        if(d.part_level>0){return d.name;}
        else
            if(d.part_multi>1){return "Part " + d.name+ " ["+d.part_multi+"]";}
        else{return "Part " + d.name;}
    })
    .attr("title", 
          function(d){ 
              var node_type_desc;
              if(d.part_level!=0){node_type_desc = "Labour";}else{node_type_desc = "Component";}
              return ("Part Name: "+d.text+"<br/>Part type: "+d.part_type+"<br/>Cost so far: "+d3.round(d.part_cc, 2)+"&euro;<br/>"+"<br/>"+node_type_desc+" cost at this node: "+d3.round(d.part_cost, 2)+"&euro;<br/>"+"Total cost added by this node: "+d3.round(d.part_cost*d.part_multi, 2)+"&euro;<br/>"+"Node multiplicity: "+d.part_multi);
          })
    .style("fill-opacity", 1e-6);
    
    // Transition nodes to their new position.
    var nodeUpdate = node.transition()
    .duration(duration)
    .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });
    
    nodeUpdate.select("circle")
    .attr("r", function(d){ 
        return  Math.sqrt((part_cc_p*1))+4;
    })
    .attr("class", function(d) { return "level"+d.part_level; })
    .style("stroke", function(d){
        if(d._children){return "blue";}else{return null;}
    })
    ;
    
    nodeUpdate.select("text")
    .style("fill-opacity", 1);
    
    // Transition exiting nodes to the parent's new position.
    var nodeExit = node.exit().transition()
    .duration(duration)
    .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
    .remove();
    
    nodeExit.select("circle")
    .attr("r", function(d){ 
        return  Math.sqrt((part_cc_p*1))+4;
    });
    
    nodeExit.select("text")
    .style("fill-opacity", 1e-6);
    
    // Update the links…
    var link = vis.selectAll("path.link")
    .data(tree.links(nodes), function(d) { return d.target.id; });
    
    // Enter any new links at the parent's previous position.
    link.enter().insert("svg:path", "g")
    .attr("class", "link")
    .attr("d", function(d) {
        var o = {x: source.x0, y: source.y0};
        return diagonal({source: o, target: o});
    })
    .transition()
    .duration(duration)
    .attr("d", diagonal);
    
    // Transition links to their new position.
    link.transition()
    .duration(duration)
    .attr("d", diagonal);
    
    // Transition exiting nodes to the parent's new position.
    link.exit().transition()
    .duration(duration)
    .attr("d", function(d) {
        var o = {x: source.x, y: source.y};
        return diagonal({source: o, target: o});
    })
    .remove();
    
    // Stash the old positions for transition.
    nodes.forEach(function(d) {
        d.x0 = d.x;
        d.y0 = d.y;
    });
    
    d3.select("svg")
        .call(d3.behavior.zoom()
              .scaleExtent([0.5, 5])
              .on("zoom", zoom));
    
}

// Toggle children.
function toggle(d) {
    if (d.children) {
        d._children = d.children;
        d.children = null;
    } else {
        d.children = d._children;
        d._children = null;
    }
    
}

function zoom() {
    var scale = d3.event.scale,
        translation = d3.event.translate,
        tbound = -h * scale,
        bbound = h * scale,
        lbound = (-w + m[1]) * scale,
        rbound = (w - m[3]) * scale;
    // limit translation to thresholds
    translation = [
        Math.max(Math.min(translation[0], rbound), lbound),
        Math.max(Math.min(translation[1], bbound), tbound)
    ];
    d3.select(".drawarea")
        .attr("transform", "translate(" + translation + ")" +
              " scale(" + scale + ")");
}


/*
loadData({
    "name": "flare",
    "children": [
        {
            "name": "analytics",
            "children": [
                {
                    "name": "cluster",
                    "children": [
                        {"name": "AgglomerativeCluster", "size": 3938},
                        {"name": "CommunityStructure", "size": 3812},
                        {"name": "HierarchicalCluster", "size": 6714},
                        {"name": "MergeEdge", "size": 743}
                    ]
                },
                {
                    "name": "graph",
                    "children": [
                        {"name": "BetweennessCentrality", "size": 3534},
                        {"name": "LinkDistance", "size": 5731},
                        {"name": "MaxFlowMinCut", "size": 7840},
                        {"name": "ShortestPaths", "size": 5914},
                        {"name": "SpanningTree", "size": 3416}
                    ]
                },
                {
                    "name": "optimization",
                    "children": [
                        {"name": "AspectRatioBanker", "size": 7074}
                    ]
                }
            ]
        },
        {
            "name": "animate",
            "children": [
                {"name": "Easing", "size": 17010},
                {"name": "FunctionSequence", "size": 5842},
                {
                    "name": "interpolate",
                    "children": [
                        {"name": "ArrayInterpolator", "size": 1983},
                        {"name": "ColorInterpolator", "size": 2047},
                        {"name": "DateInterpolator", "size": 1375},
                        {"name": "Interpolator", "size": 8746},
                        {"name": "MatrixInterpolator", "size": 2202},
                        {"name": "NumberInterpolator", "size": 1382},
                        {"name": "ObjectInterpolator", "size": 1629},
                        {"name": "PointInterpolator", "size": 1675},
                        {"name": "RectangleInterpolator", "size": 2042}
                    ]
                },
                {"name": "ISchedulable", "size": 1041},
                {"name": "Parallel", "size": 5176},
                {"name": "Pause", "size": 449},
                {"name": "Scheduler", "size": 5593},
                {"name": "Sequence", "size": 5534},
                {"name": "Transition", "size": 9201},
                {"name": "Transitioner", "size": 19975},
                {"name": "TransitionEvent", "size": 1116},
                {"name": "Tween", "size": 6006}
            ]
        },
        {
            "name": "data",
            "children": [
                {
                    "name": "converters",
                    "children": [
                        {"name": "Converters", "size": 721},
                        {"name": "DelimitedTextConverter", "size": 4294},
                        {"name": "GraphMLConverter", "size": 9800},
                        {"name": "IDataConverter", "size": 1314},
                        {"name": "JSONConverter", "size": 2220}
                    ]
                },
                {"name": "DataField", "size": 1759},
                {"name": "DataSchema", "size": 2165},
                {"name": "DataSet", "size": 586},
                {"name": "DataSource", "size": 3331},
                {"name": "DataTable", "size": 772},
                {"name": "DataUtil", "size": 3322}
            ]
        }
    ]
});
*/