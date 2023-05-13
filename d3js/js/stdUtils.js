function getRA(min, max) {
    return Math.random() * (max - min) + min;
}
function rndRGBA(){
    return `rgba(${getRA(0,255)},${getRA(0,255)},${getRA(0,255)},${getRA(0.5,1)})`;
}
function drawGrats(target, n1=5, n2=4){
    let chart = d3.select(target);
    let ctbounds = chart.node().getBoundingClientRect();
    let ctln = ctbounds.width;
    let ctht = ctbounds.height;
    for(let i=0;i<n1;i++) for(let j=0;j<n2;j++){
        let ty = ctht/n1;
        let tx = ctln/n2;
        let rx = i*tx;
        let ry = j*ty;
        let grat = chart.append('rect');
        grat.attr('transform',`translate(${rx}, ${ry})`).attr('height', ty).attr('width',tx).attr('fill','#fff').attr('stroke','rgba(0,0,0,0.1)');
    }
}
function barChart(obj){
    let target = obj.target;
    let target2 = obj.target2;
    let chart = d3.select(target);
    let ctbounds = chart.node().getBoundingClientRect();
    let ctln = ctbounds.width;    
    let ctht = ctbounds.height;
    let dNum = obj.dNum || 5;
    let origin = obj.origin || 'bottom';
    let hbool = ['left','right'].indexOf(origin) != -1;
    let smax = hbool? ctln*.8 : ctht*.8;
    let tdata = [];
    let vals = [];
    let vkey = obj.vkey || 'val';
    if(!!obj.data) tdata = obj.data;
    else for (let i=0;i<dNum;i++) tdata.push({pk: i+1, [vkey] : getRA(5, getRA(30,200))});
    for(let i=0;i<tdata.length;i++)vals.push(tdata[i][vkey]);
    let dmin = Math.min(...vals) < 0 ? Math.min(...vals) : 0;
    let dmax = Math.max(...vals);
    let bthick = hbool?ctln*.8/tdata.length:ctht*.8/tdata.length-2;
    let scales = {'linear':d3.scaleLinear, 'sqrt':d3.scaleSqrt, 'log':d3.scaleLog, 'time':d3.scaleTime, 'band':d3.scaleBand, 'point':d3.scalePoint};
    let scaleSelect = obj.scale || 'linear';
    let numScale = ['linear','sqrt','log'].indexOf(scaleSelect) + 1;
    let domArray = obj.domain || ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    let barDomain = numScale ? [dmin, dmax] : domArray;
    let scale = scales[scaleSelect]().domain(barDomain).range([0, smax]);
    let color = obj.color || '#282828';
    let tranD = obj.duration || 0;
    let bars;
    if(!!chart.node().querySelector(`.${target2}`))bars=d3.select(`.${target2}`)
    else bars=chart.append('g').classed(target2,true);
    bars.selectAll('rect')
    .data(tdata)
    .join('rect')
    .transition().duration(tranD)
    .attr('x', function(d,i){
        if(hbool) return origin=='left'?ctln*.1:ctln*.9-scale(d[vkey]);
        else return ((ctln*.8/tdata.length)*i)+ctln*.1;
    })
    .attr('y', function(d,i){
        if(hbool) return ((ctht*.8/tdata.length)*i)+ctht*.1;
        else return origin=='top'?ctht*.1:ctht*.9-scale(d[vkey]);
    })
    .attr('width', function(d){ return hbool?scale(d[vkey]):bthick;})
    .attr('height', function(d){ return hbool?bthick:scale(d[vkey])})
    .attr('fill', color);
}