let chart1 = d3.select('#chart1');
function drawBScale(target, stroke='#000',dmin=0,dmax=100, scalar=.8){
    let chart = d3.select(target);
    let ctbounds = chart.node().getBoundingClientRect();
    let ctln = ctbounds.width;
    let ctht = ctbounds.height;
    let scale = d3.scaleLinear().domain([dmin, dmax]).range([0, ctln*scalar]);
    let axis = d3.axisBottom(scale);
    let bg = chart.append('g');
    bg.attr('transform',`translate(${ctln*.1},${ctht*.4})`).classed('bAxis', true);
    bg.call(axis);
    bg.select('path')
    .attr('stroke', stroke);
    bg.selectAll('g')
    .select('line')
    .attr('stroke', stroke);
}
drawBScale('#chart1', stroke='red');
function updateBScale(obj){
    let target = obj.target;
    let target2 = obj.target2;
    let dmin = obj.dmin || 0;
    let dmax = obj.dmax || Math.round(getRA(30,10000));
    let scalar = obj.scalar || .8;
    let chart = d3.select(target);
    let ctbounds = chart.node().getBoundingClientRect();
    let ctln = ctbounds.width;
    let scale = d3.scaleLinear().domain([dmin, dmax]).range([0, ctln*scalar]);
    let axis = d3.axisBottom(scale);
    let bg = chart.select(target2);
    bg.transition().duration(750).call(axis);
    let stroke = window.getComputedStyle(bg.select('path').node()).getPropertyValue('stroke');
    bg.selectAll('g')
    .select('line')
    .attr('stroke', stroke);
}
chart1.on('click', function(){
    updateBScale({target:'#chart1', target2:'.bAxis'});
});
chart1.style('cursor', 'pointer');
let chart2 = d3.select('#chart2');
chart2.append('g').classed('bAxis', true);
chart2.append('g').classed('lAxis', true);
function drawScales(obj){
    let axes = {'bottom':d3.axisBottom, 'left': d3.axisLeft, 'top':d3.axisTop, 'right':d3.axisRight};
    let direction = obj.direction || 'bottom';
    let target = obj.target;
    let target2 = obj.target2;
    let dmin = obj.dmin || 0;
    let dmax = obj.dmax || Math.round(getRA(30,10000));
    let barscalar = obj.barscalar || .8;
    let tranD = obj.duration || 0;
    let chart = d3.select(target);
    let ctbounds = chart.node().getBoundingClientRect();
    let ctln = ctbounds.width;
    let ctht = ctbounds.height;
    let hbool = direction == 'bottom' || direction == 'top';
    let rmax = hbool ? ctln*barscalar : ctht*barscalar;
    let posx = ctln * obj.posxscalar || ctln * .1;
    let posy = ctht * obj.posyscalar || ctht * .9;
    let scale = hbool ? d3.scaleLinear().domain([dmin, dmax]).range([0, rmax]) : d3.scaleLinear().domain([dmax, dmin]).range([0, rmax]);
    let axis = axes[direction](scale);
    let bg = chart.select(target2);
    let stroke = obj.stroke || window.getComputedStyle(bg.select('path').node()).getPropertyValue('stroke');
    bg.attr('transform',`translate(${posx},${posy})`);
    bg.transition().duration(tranD).call(axis);
    bg.select('path')
    .attr('stroke', stroke);
    bg.selectAll('g')
    .select('line')
    .attr('stroke', stroke);
}
drawScales({target: '#chart2', target2: '.bAxis', stroke: 'red', dmax: 100});
drawScales({target: '#chart2', target2: '.lAxis', stroke: 'red', posyscalar: .1, direction: 'left', dmax: 100});
chart2.on('click', function(){
    drawScales({target: '#chart2', target2: '.bAxis', duration: 750});
    drawScales({target: '#chart2', target2: '.lAxis', direction: 'left', posyscalar: .1, duration: 750});
});
chart2.style('cursor', 'pointer');
let chart3 = d3.select('#chart3');
chart3.append('g').classed('bAxis', true);
chart3.append('g').classed('display', true);
function drawScalesII(obj){
    let axes = {'bottom':d3.axisBottom, 'left': d3.axisLeft, 'top':d3.axisTop, 'right':d3.axisRight};
    let scales = {'linear':d3.scaleLinear, 'sqrt':d3.scaleSqrt, 'log':d3.scaleLog, 'time':d3.scaleTime, 'band':d3.scaleBand, 'point':d3.scalePoint};
    let scaleSelect = obj.scale || 'linear';
    let direction = obj.direction || 'bottom';
    let target = obj.target;
    let target2 = obj.target2;
    let dmin = obj.dmin || 0;
    let dmax = obj.dmax || Math.round(getRA(30,10000));
    let numScale = ['linear','sqrt','log'].indexOf(scaleSelect) + 1;
    let domArray = obj.domain || ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    let barDomain = numScale ? [dmin, dmax] : domArray;
    let barscalar = obj.barscalar || .8;
    let tranD = obj.duration || 0;
    let chart = d3.select(target);
    let ctbounds = chart.node().getBoundingClientRect();
    let ctln = ctbounds.width;
    let ctht = ctbounds.height;
    let hbool = direction == 'bottom' || direction == 'top';
    let rmax = hbool ? ctln*barscalar : ctht*barscalar;
    let posx = ctln * obj.posxscalar || ctln * .1;
    let posy = ctht * obj.posyscalar || ctht * .9;
    let scale = hbool ? scales[scaleSelect]().domain(barDomain).range([0, rmax]) : scales[scaleSelect]().domain(barDomain.reverse()).range([0, rmax]);
    let axis = axes[direction](scale);
    let bg = chart.select(target2);
    let stroke = obj.stroke || window.getComputedStyle(bg.select('path').node()).getPropertyValue('stroke');
    bg.attr('transform',`translate(${posx},${posy})`);
    bg.transition().duration(tranD).call(axis);
    bg.select('path')
    .attr('stroke', stroke);
    bg.selectAll('g')
    .select('line')
    .attr('stroke', stroke);
    let ctext = chart.select('.display');
    ctext.attr('transform',`translate(${ctln*.9},${ctht*.9})`);
    if(!!ctext.node().querySelector('.dInfo'))ctext.select('.dInfo').text(scaleSelect);
    else ctext.append('text').text(scaleSelect).classed('dInfo',true);
}
drawScalesII({target: '#chart3', target2:'.bAxis', stroke: 'red', posyscalar: .4, scale: 'band'});
let num = 5
let scaleArray = ['time', 'band', 'point'];
let dates = [new Date(2023, 1, 15), new Date(2023, 1, 25)]
chart3.on('click', function(){
    let tScale = scaleArray[num%3];
    num++;
    if (tScale == 'time') drawScalesII({target: '#chart3', target2:'.bAxis', stroke: 'red', posyscalar: .4, scale: tScale, domain: dates, duration: 750});
    else drawScalesII({target: '#chart3', target2:'.bAxis', stroke: 'red', posyscalar: .4, scale: tScale, duration: 750});
});
chart3.style('cursor','pointer');