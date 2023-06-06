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
    let target2 = obj.target2 || 'bars';
    let chart = d3.select(target);
    let ctbounds = chart.node().getBoundingClientRect();
    let ctln = ctbounds.width;    
    let ctht = ctbounds.height;
    let dNum = obj.dNum || 5;
    let origin = obj.origin || 'bottom';
    let hbool = ['left','right'].indexOf(origin) != -1;
    let smax = hbool? ctln*.8 : ctht*.8;
    let data = [];
    let vals = [];
    let vkey = obj.vkey || 'val';
    if(!!obj.data) data = obj.data;
    else for (let i=0;i<dNum;i++) data.push({pk: i+1, [vkey] : getRA(5, getRA(30,200))});
    for(let i=0;i<data.length;i++)vals.push(data[i][vkey]);
    let dmin = Math.min(...vals) < 0 ? Math.min(...vals) : 0;
    let dmax = Math.max(...vals);
    let bthick = hbool?ctln*.8/data.length:ctht*.8/data.length-2;
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
    .data(data)
    .join('rect')
    .transition().duration(tranD)
    .attr('x', function(d,i){
        if(hbool) return origin=='left'?ctln*.1:ctln*.9-scale(d[vkey]);
        else return ((ctln*.8/data.length)*i)+ctln*.1;
    })
    .attr('y', function(d,i){
        if(hbool) return ((ctht*.8/data.length)*i)+ctht*.1;
        else return origin=='top'?ctht*.1:ctht*.9-scale(d[vkey]);
    })
    .attr('width', function(d){ return hbool?scale(d[vkey]):bthick;})
    .attr('height', function(d){ return hbool?bthick:scale(d[vkey])})
    .attr('fill', color);
}
function LCNLogo(target){
    let chart = d3.select(target);
    let ctbounds = chart.node().getBoundingClientRect();
    let ctln = ctbounds.width;    
    let ctht = ctbounds.height;
    let leg = Math.min(ctln, ctht);
    let bsize = (leg/11);
    let xpad = ctln - ctht > 0 ? (ctln - ctht)/2 : bsize*.5;
    let ypad = ctht - ctln > 0 ? (ctht - ctln)/2 : bsize*.5;
    let yellowList = ['0 0','0 1','1 0','1 1','5 0','5 1'];
    let orangeList = ['2 0','2 1','5 2','5 3','6 2','6 3'];
    let pinkList = ['1 4','4 2'];
    let redList1 = ['0 2','0 3','1 2','1 3','8 3'];
    let redList2 = ['0 5','2 2','2 3','3 2','3 3'];
    let purpleList1 = ['3 4'];
    let purpleList2 = ['4 4'];
    let blueList1 = ['1 7','5 5'];
    let blueList2 = ['4 5','8 5'];
    let blueList3 = ['3 5','5 6','1 8'];
    let blueList4 = ['2 8','3 6','3 7','4 6','4 7'];
    let greenList1 = ['6 6','6 7','7 6','7 7','9 10'];
    let greenList2 = ['1 9', '7 9'];
    let greenList3 = ['8 8'];
    let blackList = ['5 8'];
    let arrList = [yellowList,orangeList, pinkList, redList1, redList2, purpleList1, purpleList2, blueList1, blueList2, blueList3, blueList4, greenList1, greenList2, greenList3, blackList];
    let fillers = ['#FFD300', '#FF9000', '#D40070', '#F90012', '#C10029', '#3C036D', '#67028B', '#5A9EDB', '#065EAC', '#031856', '#0B2A86', '#97CB00', '#415700', '#114000', '#141414'];
    for (let i=0;i<11;i++) for (let j=0;j<10;j++) for (let p=0;p<arrList.length;p++) if (arrList[p].includes(`${j} ${i}`)){
        let rx = i * bsize + xpad;
        let ry = j * bsize + ypad;
        let box = chart.append('rect');
        box.attr('transform', `translate(${rx},${ry})`).attr('width',bsize).attr('height',bsize).attr('fill',fillers[p]).classed('pixel', true);
    }
}
function pieChart(obj){
    let target = obj.target;
    let target2 = obj.target2 || 'pie';
    let chart = d3.select(target);
    let colors = obj.colors || ['url("#pattern6")', 'url("#pattern2")','url("#pattern4")'];
    let ctbounds = chart.node().getBoundingClientRect();
    let ctln = ctbounds.width;    
    let ctht = ctbounds.height;
    let dNum = obj.dNum || 5;
    let ormax = Math.min(ctln, ctht)/3;
    let irmax = ormax/3;
    let data = [];
    let vkey = obj.vkey || 'val';
    if(!!obj.data) data = obj.data;
    else for (let i=0;i<dNum;i++) data.push({pk: i+1, [vkey] : getRA(5, getRA(30,200))});
    let pieGenerator = d3.pie().value((d)=>{return d.val}).sort((a,b)=>{return b.pk>a.pk});
    let arcData = pieGenerator(data);
    let arcGenerator = d3.arc();
    arcGenerator
    .innerRadius(getRA(5,irmax))
    .outerRadius(getRA(irmax, ormax))
    .padAngle(0.2)
    .padRadius(irmax/2.5)
    .cornerRadius(irmax/5);
    let tranD = obj.duration || 0;
    let pie;
    if(!!chart.node().querySelector(`.${target2}`))pie=d3.select(`.${target2}`)
    else pie=chart.append('g').classed(target2,true).attr('transform', `translate(${ctln/2},${ctht/2})`);
    pie.selectAll('path')
    .data(arcData)
    .join('path')
    .transition().duration(tranD)
    .attr('d', arcGenerator)
    .attr('fill', function(d,i){
        return colors[i%3];
    });
}
function scales(obj){
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
    let barDomain = numScale > 0 ? [dmin, dmax] : domArray;
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
    let tnum = obj.tnum || 10;
    let scale = hbool ? scales[scaleSelect]().domain(barDomain).range([0, rmax]) : scales[scaleSelect]().domain(barDomain.reverse()).range([0, rmax]);
    let axis = axes[direction](scale).ticks(tnum);
    let ctBool = obj.ctBool || false;
    let cscale;
    if(!!chart.node().querySelector(`.${target2}`))cscale=d3.select(`.${target2}`)
    else cscale=chart.append('g').classed(target2,true);
    let stroke = obj.stroke || window.getComputedStyle(cscale.select('path').node()).getPropertyValue('stroke');
    cscale.attr('transform',`translate(${posx},${posy})`);
    cscale.transition().duration(tranD).call(axis);
    cscale.select('path')
    .attr('stroke', stroke);
    cscale.selectAll('g')
    .select('line')
    .attr('stroke', stroke);
    
    if(ctBool){
        let ctext = chart.select('.display');
        ctext.attr('transform',`translate(${ctln*.9},${ctht*.9})`);
        if(!!ctext.node().querySelector('.dInfo'))ctext.select('.dInfo').text(scaleSelect);
        else ctext.append('text').text(scaleSelect).classed('dInfo',true);
    }
    
}