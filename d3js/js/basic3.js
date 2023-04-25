function getRA(min, max) {
    return Math.random() * (max - min) + min;
}
function getPList(xmax,ymax,pnum=5,xmin=0,ymin=0){
    let points = [];
    for(i=0;i<pnum;i++)points.push([getRA(xmin,xmax),getRA(ymin,ymax)]);
    return points;
}
function drawGrats(target){
    let chart = d3.select(target);
    let ctbounds = chart.node().getBoundingClientRect();
    let ctln = ctbounds.width;
    let ctht = ctbounds.height;
    for(let i=0;i<5;i++) for(let j=0;j<4;j++){
        let ty = ctht/4;
        let tx = ctln/5;
        let rx = i*tx;
        let ry = j*ty;
        let grat = chart.append('rect');
        grat.attr('transform',`translate(${rx}, ${ry})`).attr('height', ty).attr('width',tx).attr('fill','#fff').attr('stroke','rgba(0,0,0,0.1)');
    }
}
function drawLine(target, target2, num=5){
    let chart = d3.select(target);
    let ctbounds = chart.node().getBoundingClientRect();
    let ctln = ctbounds.width;
    let ctht = ctbounds.height;
    let points = getPList(ctln,ctht,num);
    let lineGenerator = d3.line();
    let pathData = lineGenerator(points);
    chart.append('path').attr('d',pathData).attr('stroke','#000').attr('stroke-width',1.5).attr('fill','none');
    let str = d3.select(target2);
    str.text(pathData);
}
drawGrats('#chart1');
drawLine('#chart1','#string1');
let chart1 = d3.select('#chart1');
chart1.on('click', function(){
    let path = chart1.select('path');
    let ctbounds = chart1.node().getBoundingClientRect();
    let ctln = ctbounds.width;
    let ctht = ctbounds.height;
    let points = getPList(ctln,ctht);
    let lineGenerator = d3.line();
    let pathData = lineGenerator(points);
    path.transition().duration(750).attr('d',pathData);
    let str = d3.select('#string1');
    str.text(pathData);
});
chart1.style('cursor','pointer');
function drawCurvedLine(target, target2, num=5){
    let chart = d3.select(target);
    let ctbounds = chart.node().getBoundingClientRect();
    let ctln = ctbounds.width;
    let ctht = ctbounds.height;
    let points = getPList(ctln,ctht,num);
    let lineGenerator = d3.line().curve(d3.curveCardinal);
    let pathData = lineGenerator(points);
    chart.append('path').attr('d',pathData).attr('stroke','#000').attr('stroke-width',1.5).attr('fill','none');
    let str = d3.select(target2);
    str.text(pathData);
}
drawGrats('#chart2');
drawCurvedLine('#chart2', '#string2');
let chart2 = d3.select('#chart2');
chart2.on('click', function(){
    let path = chart2.select('path');
    let ctbounds = chart2.node().getBoundingClientRect();
    let ctln = ctbounds.width;
    let ctht = ctbounds.height;
    let points = getPList(ctln,ctht);
    let lineGenerator = d3.line().curve(d3.curveCardinal);
    let pathData = lineGenerator(points);
    path.transition().duration(750).attr('d',pathData);
    let str = d3.select('#string2');
    str.text(pathData);
});
chart2.style('cursor','pointer');
drawGrats('#chart3');
function getAngles(quant){
    let holder = [];
    let n = 0;
    for (let i=0;i<quant;i++){
        if (n == 2){ 
            holder.push(2*Math.PI); 
            n=0;
        }
        else { 
            holder.push(n*Math.PI);
            n+=0.25;
        }
    }
    return holder;
}
function getRPoints(quant,width,height){
    let angles = getAngles(quant);
    let rbase = Math.min(width, height)/8;
    let rads = [];
    for (let i=0;i<quant;i++) {
        rads.push(rbase);
        if(angles[i]!=2*Math.PI)rbase += getRA(0,10);
    }
    let points = angles.map(function(e,i){return [e, rads[i]]});
    return points;
}
function drawRadialLine(target, target2, num=16){
    let chart = d3.select(target);
    let ctbounds = chart.node().getBoundingClientRect();
    let ctln = ctbounds.width;
    let ctht = ctbounds.height;
    let points = getRPoints(num, ctln, ctht);
    let lineGenerator = d3.lineRadial();
    let pathData = lineGenerator(points);
    chart.append('path').attr('d',pathData).attr('stroke','#000').attr('stroke-width',1.5).attr('fill','none').attr('transform', `translate(${ctln/2},${ctht/2})`);
    let str = d3.select(target2);
    str.text(pathData);
}
drawRadialLine('#chart3','#string3');
let chart3 = d3.select('#chart3');
chart3.on('click', function(){
    let path = chart3.select('path');
    let ctbounds = chart3.node().getBoundingClientRect();
    let ctln = ctbounds.width;
    let ctht = ctbounds.height;
    let points = getRPoints(Math.round(getRA(12,36)), ctln, ctht);
    let lineGenerator = d3.lineRadial();
    let pathData = lineGenerator(points);
    path.transition().duration(750).attr('d',pathData);
    let str = d3.select('#string3');
    str.text(pathData);
});
chart3.style('cursor','pointer');
drawGrats('#chart4');
function getSimpleArea(target, num=16, yval=0){
    let chart = d3.select(target)
    let ctbounds = chart.node().getBoundingClientRect();
    let ctln = ctbounds.width;
    let ctht = ctbounds.height;
    let step = ctln/num;
    let points = [];
    for (let i=0;i<num;i++){
        let tx = i*step;
        let ty = getRA(0, ctht);
        points.push([tx,ty]);
    }
    let areaGenerator = d3.area();
    let pathData = areaGenerator(points);
    chart.append('path').attr('d',pathData).attr('stroke','rgb(0,0,0)').attr('stroke-width',1).attr('fill','rgba(0,0,0,0.2)').attr('transform', `translate(${step/2},0)`);
}
getSimpleArea('#chart4');
let chart4 = d3.select('#chart4');
chart4.on('click', function(){
    let path = chart4.select('path');
    let ctbounds = chart4.node().getBoundingClientRect();
    let ctln = ctbounds.width;
    let ctht = ctbounds.height;
    let num = Math.round(getRA(12,128));
    let step = ctln/num;
    let points = [];
    for (let i=0;i<num;i++){
        let tx = i*step;
        let ty = getRA(0, ctht);
        points.push([tx,ty]);
    }
    let areaGenerator = d3.area();
    let pathData = areaGenerator(points);
    path.transition().duration(750).attr('d',pathData).attr('transform', `translate(${step/2},0)`);
});
chart4.style('cursor', 'pointer');
drawGrats('#chart5');
function getSimpleAreaII(target, num=16, yval=0){
    let chart = d3.select(target)
    let ctbounds = chart.node().getBoundingClientRect();
    let ctln = ctbounds.width;
    let ctht = ctbounds.height;
    let step = ctln/num;
    let points = [];
    for (let i=0;i<num;i++){
        let tx = i*step;
        let ty = getRA(0, ctht);
        points.push([tx,ty]);
    }
    let areaGenerator = d3.area();
    areaGenerator.y0(ctht);
    let pathData = areaGenerator(points);
    chart.append('path').attr('d',pathData).attr('stroke','rgb(0,0,0)').attr('stroke-width',1).attr('fill','rgba(0,0,0,0.2)').attr('transform', `translate(${step/2},0)`);
}
getSimpleAreaII('#chart5');
let chart5 = d3.select('#chart5');
chart5.on('click', function(){
    let path = chart5.select('path');
    let ctbounds = chart5.node().getBoundingClientRect();
    let ctln = ctbounds.width;
    let ctht = ctbounds.height;
    let num = Math.round(getRA(12,128));
    let step = ctln/num;
    let points = [];
    for (let i=0;i<num;i++){
        let tx = i*step;
        let ty = getRA(0, ctht);
        points.push([tx,ty]);
    }
    let areaGenerator = d3.area();
    areaGenerator.y0(ctht);
    let pathData = areaGenerator(points);
    path.transition().duration(750).attr('d',pathData).attr('transform', `translate(${step/2},0)`);
});
chart5.style('cursor', 'pointer');
drawGrats('#chart6');
function getBoundedArea(target, num=36){
    let chart = d3.select(target);
    let ctbounds = chart.node().getBoundingClientRect();
    let ctln = ctbounds.width;
    let ctht = ctbounds.height;
    let step = ctln/num;
    let incmax = ctht/num;
    let points = [];
    let ys = [];
    let py0=null;let py1=null;
    for(let i=0;i<num;i++){
        let ty0;
        if(!!py0){
            let inc = getRA(0,incmax);
            let mny0 = py0-inc < 0 ? 0 : py0-inc;
            let mxy0 = py0+inc > ctht ? ctht : py0-inc;
            let prey0 = getRA(mny0, mxy0);
            ty0 = prey0 < py1 ? py1 + inc : prey0;
            py0 = ty0;
        }
        else ty0 = getRA((ctht/2)+1,ctht);
        ys.push(ty0);
        let ty1;
        if(!!py1){
            let inc = getRA(0,incmax);
            let mny1 = py1-inc < 0 ? 0 : py1-inc;
            let mxy1 = py1+inc > ctht ? ctht : py1-inc;
            let prey1 = getRA(mny1, mxy1);
            ty1 = prey1 > ty0 ? ty0 - inc : prey1;
            py1 = ty1;
        }
        else ty1 = getRA(0,ctht/2);
        ys.push(ty1);
        points.push({x: i*step, low: ty1, high: ty0})
    }
    let min = Math.min.apply(null, ys), max = Math.max.apply(null, ys);
    let yScale = d3.scaleLinear().domain([min, max]).range([0,ctht]);
    let areaGenerator = d3.area();
    areaGenerator.x(function(d){
        return d.x;
    })
    .y0(function(d){
        return yScale(d.low);
    })
    .y1(function(d){
        return yScale(d.high);
    });
    let pathData = areaGenerator(points);
    chart.append('path').attr('d',pathData).attr('stroke','rgb(0,0,0)').attr('stroke-width',1).attr('fill','rgba(0,0,0,0.2)').attr('transform', `translate(${step/2},0)`);
}
getBoundedArea('#chart6');
let chart6 = d3.select('#chart6');
chart6.on('click', function(){
    let path = chart6.select('path');
    let ctbounds = chart6.node().getBoundingClientRect();
    let ctln = ctbounds.width;
    let ctht = ctbounds.height;
    let num = Math.round(getRA(12,128));
    let step = ctln/num;
    let incmax = ctht/num;
    let points = [];
    let ys = [];
    let py0=null;let py1=null;
    for(let i=0;i<num;i++){
        let ty0;
        if(!!py0){
            let inc = getRA(0,incmax);
            let mny0 = py0-inc < 0 ? 0 : py0-inc;
            let mxy0 = py0+inc > ctht ? ctht : py0-inc;
            let prey0 = getRA(mny0, mxy0);
            ty0 = prey0 < py1 ? py1 + inc : prey0;
            py0 = ty0;
        }
        else ty0 = getRA((ctht/2)+1,ctht);
        ys.push(ty0);
        let ty1;
        if(!!py1){
            let inc = getRA(0,incmax);
            let mny1 = py1-inc < 0 ? 0 : py1-inc;
            let mxy1 = py1+inc > ctht ? ctht : py1-inc;
            let prey1 = getRA(mny1, mxy1);
            ty1 = prey1 > ty0 ? ty0 - inc : prey1;
            py1 = ty1;
        }
        else ty1 = getRA(0,ctht/2);
        ys.push(ty1);
        points.push({x: i*step, low: ty1, high: ty0})
    }
    let min = Math.min.apply(null, ys), max = Math.max.apply(null, ys);
    let yScale = d3.scaleLinear().domain([min, max]).range([0,ctht]);
    let areaGenerator = d3.area();
    areaGenerator.x(function(d){
        return d.x;
    })
    .y0(function(d){
        return yScale(d.low);
    })
    .y1(function(d){
        return yScale(d.high);
    });
    let pathData = areaGenerator(points);
    path.transition().duration(750).attr('d',pathData).attr('transform', `translate(${step/2},0)`);
});
chart6.style('cursor', 'pointer');
drawGrats('#chart7');
function getRadArea(target, num=36){
    let chart = d3.select(target);
    let ctbounds = chart.node().getBoundingClientRect();
    let ctln = ctbounds.width;    
    let ctht = ctbounds.height;
    rmax = Math.min(ctln, ctht)/2;
    let inc = 2/num;
    let spoke = getRA(5, rmax/6);
    let radshape = [];
    for (let i=0;i<num+1;i++){
        let tang = (i* inc) * Math.PI;
        let tr = getRA(spoke, rmax);
        radshape.push({angle: tang, r0: spoke, r1: tr});
    }
    let raGen = d3.areaRadial();
    raGen.angle(function(d){
        return d.angle;
    }).innerRadius(function(d){
        return d.r0;
    }).outerRadius(function(d){
        return d.r1;
    })
    .curve(d3.curveCatmullRom);
    let tdefs = chart.append('defs');
    let pattern = tdefs.append('pattern');
    pattern.attr('id', 'pattern1').attr('width','10').attr('height','10').attr('patternUnits','userSpaceOnUse').attr('patternTransform','rotate(60)');
    let prect = pattern.append('rect');
    prect.attr('width','10').attr('height','10').attr('fill', 'rgba(0,0,0,0.7)');
    let pcirc = pattern.append('circle');
    pcirc.attr('r','2').attr('transform', 'translate(5,5)').attr('fill','#fff');
    let pathData = raGen(radshape);
    chart.append('path').attr('d',pathData).style('fill', 'url(#pattern1)').attr('transform', `translate(${ctln/2},${ctht/2})`);
}
getRadArea('#chart7');
let chart7 = d3.select('#chart7');
chart7.on('click', function(){
    let path = chart7.select('path');
    let ctbounds = chart7.node().getBoundingClientRect();
    let ctln = ctbounds.width;
    let ctht = ctbounds.height;
    let num = Math.round(getRA(12,128));
    rmax = Math.min(ctln, ctht)/2;
    let inc = 2/num;
    let spoke = getRA(5, rmax/6);
    let radshape = [];
    for (let i=0;i<num+1;i++){
        let tang = (i* inc) * Math.PI;
        let tr = getRA(spoke, rmax);
        radshape.push({angle: tang, r0: spoke, r1: tr});
    }
    let raGen = d3.areaRadial();
    raGen.angle(function(d){
        return d.angle;
    }).innerRadius(function(d){
        return d.r0;
    }).outerRadius(function(d){
        return d.r1;
    })
    .curve(d3.curveCatmullRom);
    let pathData = raGen(radshape);
    path.transition().duration(750).attr('d', pathData);
});
chart7.style('cursor', 'pointer');
drawGrats('#chart8');
function getStacks(target, num=5){
    let colors = ['url("#pattern2")', 'url("#pattern3")', 'url("#pattern4")'];
    let chart = d3.select(target);
    let ctbounds = chart.node().getBoundingClientRect();
    let ctln = ctbounds.width;    
    let ctht = ctbounds.height;
    let bheight = ctht/num;
    smax = ctln/3;
    let stacks = [];
    for (let i=0;i<num;i++) stacks.push({pk: i+1, first: getRA(5, smax),second: getRA(5, smax),third: getRA(5, smax)});
    let stack = d3.stack();
    stack.keys(['first', 'second', 'third']);
    let pathData = stack(stacks);
    let tdefs = chart.append('defs');
    let pattern2 = tdefs.append('pattern');
    pattern2.attr('id', 'pattern2').attr('width','10').attr('height','10').attr('patternUnits','userSpaceOnUse').attr('patternTransform','rotate(60)');
    let prect2 = pattern2.append('rect');
    prect2.attr('width','10').attr('height','10').attr('fill', 'rgb(244,213,0)');
    let pcirc2 = pattern2.append('circle');
    pcirc2.attr('r','2').attr('transform', 'translate(5,5)').attr('fill','#282828');
    let pattern3 = tdefs.append('pattern');
    pattern3.attr('id', 'pattern3').attr('width', '10').attr('height','10').attr('patternUnits','userSpaceOnUse').attr('patternTransform', 'rotate(120)');
    let prect31 = pattern3.append('rect');
    prect31.attr('width','10').attr('height','10').attr('fill','#513551');
    let prect32 = pattern3.append('rect');
    prect32.attr('width','3').attr('height','3').attr('fill','#fff');
    let pattern4 = tdefs.append('pattern');
    pattern4.attr('id', 'pattern4').attr('width','10').attr('height','10').attr('patternUnits','userSpaceOnUse').attr('patternTransform','rotate(240)');
    let prect41 = pattern4.append('rect');
    prect41.attr('width','8').attr('height','10').attr('fill','#de3163').attr('transform', 'translate(2,0)');    
    let bg = chart.append('g')
    .selectAll('g.series')
    .data(pathData)
    .join('g')
    .classed('series', true)
    .style('fill', function(d, i){
        return colors[i];
    });
    bg.selectAll('rect')
	.data(function(d) {
		return d;
	})
	.join('rect')
	.attr('width', function(d) {
		return d[1] - d[0];
	})
	.attr('x', function(d) {
		return d[0];
	})
	.attr('y', function(d, i) {
		return i * bheight;
	})
	.attr('height', bheight-2);
}
getStacks('#chart8');
let chart8 = d3.select('#chart8');
chart8.on('click', function(){
    let num=5;
    let ctbounds = chart8.node().getBoundingClientRect();
    let ctln = ctbounds.width;
    smax = ctln/3;
    let stacks = [];
    for (let i=0;i<num;i++) stacks.push({pk: i+1, first: getRA(5, smax),second: getRA(5, smax),third: getRA(5, smax)});
    let stack = d3.stack();
    stack.keys(['first', 'second', 'third']);
    let pathData = stack(stacks);
    let bg = chart8.select('g')
    .selectAll('g.series')
    .data(pathData)
    .selectAll('rect')
    .data(function(d) {
        return d;
    })
    .join('rect')
    .transition().duration(750)
    .attr('width', function(d) {
        return d[1] - d[0];
    })
    .attr('x', function(d) {
        return d[0];
    });
});
chart8.style('cursor','pointer');
drawGrats('#chart9');
function getAStacks(target, num=10){
    let colors = ['url("#pattern2")', 'url("#pattern3")', 'url("#pattern4")'];
    let chart = d3.select(target);
    let ctbounds = chart.node().getBoundingClientRect();
    let ctln = ctbounds.width;    
    let ctht = ctbounds.height;
    let xinter = ctln/num;
    let smax = ctht/3;
    let stacks = [];
    for (let i=0;i<num+1;i++) stacks.push({pk: i+1, first: getRA(5, smax),second: getRA(5, smax),third: getRA(5, smax)});
    let stack = d3.stack();
    stack.keys(['first', 'second', 'third']);
    let pathData = stack(stacks);   
    let areaGenerator = d3.area();
    areaGenerator
    .x(function(d, i){
        return i * xinter;
    })
    .y0(function(d){
        return ctht-d[0];
    })
    .y1(function(d){
        return ctht-d[1];
    });
    let bg = chart.append('g')
    .selectAll('path')
    .data(pathData)
    .join('path')
    .style('fill', function(d, i){
        return colors[i];
    })
    .attr('d', areaGenerator);
}
getAStacks('#chart9');
let chart9 = d3.select('#chart9');
chart9.on('click', function(){
    let num = 10;
    let ctbounds = chart9.node().getBoundingClientRect();
    let ctln = ctbounds.width;    
    let ctht = ctbounds.height;
    let xinter = ctln/num;
    let smax = ctht/3;
    let stacks = [];
    for (let i=0;i<num+1;i++) stacks.push({pk: i+1, first: getRA(5, smax),second: getRA(5, smax),third: getRA(5, smax)});
    let stack = d3.stack();
    stack.keys(['first', 'second', 'third']);
    let pathData = stack(stacks);   
    let areaGenerator = d3.area();
    areaGenerator
    .x(function(d, i){
        return i * xinter;
    })
    .y0(function(d){
        return ctht-d[0];
    })
    .y1(function(d){
        return ctht-d[1];
    });
    let bg = chart9.select('g')
    .selectAll('path')
    .data(pathData)
    .join('path')
    .transition().duration(750)
    .attr('d', areaGenerator);
});
chart9.style('cursor', 'pointer');
drawGrats('#chart10');
function getAStacksOffset(target, num=10){
    let chart = d3.select(target);
    let tdefs = chart.append('defs');
    let pattern5 = tdefs.append('pattern');
    pattern5.attr('id', 'pattern5').attr('width','800').attr('height','446').attr('patternUnits','userSpaceOnUse');
    let img1 = pattern5.append('image');
    img1.attr('href', 'webb1.jpg').attr('width','110%').attr('height','110%');
    let colors = ['url("#pattern2")', 'url("#pattern5")', 'url("#pattern4")'];
    let ctbounds = chart.node().getBoundingClientRect();
    let ctln = ctbounds.width;    
    let ctht = ctbounds.height;
    let xinter = ctln/num;
    let smax = ctht/3;
    let stacks = [];
    let ys = [];
    for (let i=0;i<num+1;i++) {
        stacks.push({pk: i+1, first: getRA(5, smax),second: getRA(5, smax),third: getRA(5, smax)});
        ys.push(stacks[i].first, stacks[i].second, stacks[i].third);
    }
    let yScale = d3.scaleLinear().domain([0,.5]).range([0,Math.max(...ys)]);
    let stack = d3.stack();
    stack.keys(['first', 'second', 'third']).offset(d3.stackOffsetExpand);
    let pathData = stack(stacks);  
    let areaGenerator = d3.area();
    areaGenerator
    .x(function(d, i){
        return i * xinter;
    })
    .y0(function(d){
        return ctht-yScale(d[0]);
    })
    .y1(function(d){
        return ctht-yScale(d[1]);
    })
    .curve(d3.curveCatmullRom);
    let bg = chart.append('g')
    .selectAll('path')
    .data(pathData)
    .join('path')
    .style('fill', function(d, i){
        return colors[i];
    })
    .attr('d', areaGenerator);
    bg.attr('transform', `translate(0, -${(ctht-Math.max(...ys))/4})`);
}
getAStacksOffset('#chart10');
let chart10 = d3.select('#chart10');
chart10.on('click', function(){
    let num = 10;
    let ctbounds = chart10.node().getBoundingClientRect();
    let ctln = ctbounds.width;    
    let ctht = ctbounds.height;
    let xinter = ctln/num;
    let smax = ctht/3;
    let stacks = [];
    let ys = [];
    for (let i=0;i<num+1;i++) {
        stacks.push({pk: i+1, first: getRA(5, smax),second: getRA(5, smax),third: getRA(5, smax)});
        ys.push(stacks[i].first, stacks[i].second, stacks[i].third);
    }
    let yScale = d3.scaleLinear().domain([0,.5]).range([0,Math.max(...ys)]);
    let stack = d3.stack();
    stack.keys(['first', 'second', 'third']).offset(d3.stackOffsetExpand);
    let pathData = stack(stacks);   
    let areaGenerator = d3.area();
    areaGenerator
    .x(function(d, i){
        return i * xinter;
    })
    .y0(function(d){
        return ctht-yScale(d[0]);
    })
    .y1(function(d){
        return ctht-yScale(d[1]);
    })
    .curve(d3.curveCatmullRom);
    let bg = chart10.select('g')
    .selectAll('path')
    .data(pathData)
    .join('path')
    .transition().duration(750)
    .attr('d', areaGenerator)
    .attr('transform', `translate(0, -${(ctht-Math.max(...ys))/4})`);
});
chart10.style('cursor','pointer');
drawGrats('#chart11');
function getPieChart(target, num=8){
    let chart = d3.select(target);
    let tdefs = chart.append('defs');
    let pattern6 = tdefs.append('pattern');
    pattern6.attr('id', 'pattern6').attr('width','1000').attr('height','560').attr('patternUnits','userSpaceOnUse');
    let img1 = pattern6.append('image');
    img1.attr('href', 'webb1.jpg').attr('width','1000').attr('height','560').attr('preserveAspectRatio', 'xMidYMin slice');
    let colors = ['url("#pattern6")', 'url("#pattern2")','url("#pattern4")'];
    let ctbounds = chart.node().getBoundingClientRect();
    let ctln = ctbounds.width;    
    let ctht = ctbounds.height;
    let ormax = Math.min(ctln, ctht)/3;
    let irmax = ormax/3;
    let data = [];
    for (let i=3;i<num+3;i++) data.push({val:getRA(20,200),pk:i-3});
    let pieGenerator = d3.pie().value((d)=>{return d.val}).sort((a,b)=>{return b.pk>a.pk});
    let arcData = pieGenerator(data);
    let arcGenerator = d3.arc();
    arcGenerator
    .innerRadius(getRA(5,irmax))
    .outerRadius(getRA(irmax, ormax))
    .padAngle(0.2)
    .padRadius(15)
    .cornerRadius(4);
    let bg = chart.append('g').attr('transform', `translate(${ctln/2},${ctht/2})`);
    bg.selectAll('path')
    .data(arcData)
    .join('path')
    .attr('d', arcGenerator)
    .attr('fill', function(d,i){
        return colors[i%3];
    });
}
getPieChart('#chart11');
let chart11 = d3.select('#chart11');
chart11.on('click', function(){
    let num = Math.round(getRA(6,12));
    let colors = ['url("#pattern6")', 'url("#pattern2")','url("#pattern4")'];
    let ctbounds = chart11.node().getBoundingClientRect();
    let ctln = ctbounds.width;    
    let ctht = ctbounds.height;
    let ormax = Math.min(ctln, ctht)/3;
    let irmax = ormax/3;
    let data = [];
    for (let i=3;i<num+3;i++) data.push({val:getRA(20,200),pk:i-3});
    let pieGenerator = d3.pie().value((d)=>{return d.val}).sort((a,b)=>{return b.pk>a.pk});
    let arcData = pieGenerator(data);
    let arcGenerator = d3.arc();
    arcGenerator
    .innerRadius(getRA(5,irmax))
    .outerRadius(getRA(irmax, ormax))
    .padAngle(0.2)
    .padRadius(15)
    .cornerRadius(4);
    let bg = chart11.select('g')
    .selectAll('path')
    .data(arcData)
    .join('path')
    .attr('fill', function(d,i){
        return colors[i%3];
    })
    .transition().duration(750)
    .attr('d', arcGenerator);
})
chart11.style('cursor','pointer');