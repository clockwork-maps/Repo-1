let preview = d3.selectAll('.preview');
preview.each(function(){
    let tsvg = d3.select(this);
    let parent = tsvg.node().parentElement;
    let pbounds = parent.getBoundingClientRect();
    let pmin = Math.min(pbounds.width, pbounds.height)/10;
    parent.style.padding = `${pmin}px`;
    pmin = Math.min(pbounds.width, pbounds.height)/10;
    tsvg.style('height', `${8*pmin}px`).style('width', `${12*pmin}px`).style('top', `${pmin*2}px`).style('right', `${pmin}px`);
});
let eventText = d3.selectAll('.eventText');
eventText.each(function(){
    let ttext = d3.select(this);
    let parent = ttext.node().parentElement;
    let pbounds = parent.getBoundingClientRect();
    let pmin = Math.min(pbounds.width, pbounds.height)/10;
    ttext.style('top', `${pmin*.1}px`).style('right',`${pmin*4}px`);
})
barChart({target:'#chart1',target2:'bars', dNum:8});
d3.select('#chart1').on('click', function(event){
    event.preventDefault();
    barChart({target:'#chart1',target2:'bars',duration:750, dNum:8});    
})
LCNLogo('#chart2');
pieChart({target: '#chart3'});
d3.select('#chart3').on('click', function(event){
    event.preventDefault();
    pieChart({target:'#chart3',duration:750, dNum:Math.round(getRA(5,8))});    
})
scales({target: '#chart4', target2: 'bAxis', stroke: 'red', posyscalar: .7, posxscalar: .3, tnum: 4, barscalar:.6, dmax: 100});
scales({target: '#chart4', target2: 'lAxis', stroke: 'red', posyscalar: .2, posxscalar: .3, tnum: 4, barscalar:.5, direction: 'left', dmax: 100});
d3.select('#chart4').on('click', function(event){
    event.preventDefault();
    scales({target: '#chart4', target2: 'bAxis', stroke: 'red', posyscalar: .7, posxscalar: .3, tnum: 2, barscalar:.6, duration: 750});
    scales({target: '#chart4', target2: 'lAxis', stroke: 'red', posyscalar: .2, posxscalar: .3, tnum: 2, barscalar:.5, direction: 'left', duration: 750});
})