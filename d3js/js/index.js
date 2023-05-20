let preview = d3.selectAll('.preview');
let mobBool = false;
preview.each(function(){
    let tsvg = d3.select(this);
    let parent = tsvg.node().parentElement;
    let pbounds = parent.getBoundingClientRect();
    let pmin = Math.min(pbounds.width, pbounds.height)/10;
    parent.style.padding = `${pmin}px`;
    if(pbounds.width >= 800) tsvg.style('height', `${8*pmin}px`).style('width', `${12*pmin}px`).style('top', `${pmin*2}px`).style('right', `${pmin}px`);
    else{
        let cwidth = pbounds.width-pmin*2;
        let cheight = cwidth*(2/3);
        tsvg.style('height', `${cheight}px`).style('width', `${cwidth}px`).style('bottom', `${pmin}px`);
        let block = parent.parentElement;
        let hrefresh = d3.select(this).node().parentElement.getBoundingClientRect().height;
        block.style.height = `${hrefresh+cheight+pmin*2}px`; 
        mobBool = true;
    }
    
});
let eventText = d3.selectAll('.eventText');
eventText.each(function(){
    let ttext = d3.select(this);
    let parent = ttext.node().parentElement;
    let pbounds = parent.getBoundingClientRect();
    let pmin = Math.min(pbounds.width, pbounds.height)/10;
    if(pbounds.width >= 800) ttext.style('top', `${pmin*.1}px`).style('right',`${pmin*4}px`);
    else {
        let svg = parent.querySelector('.preview');
        let bottom = Number(svg.style.bottom.slice(0,-2));
        let height = Number(svg.style.height.slice(0,-2));
        ttext.style('bottom', `${height+5}px`);
    }
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
let xscalar = mobBool? .2 : .3;
scales({target: '#chart4', target2: 'bAxis', stroke: 'red', posyscalar: .7, posxscalar: xscalar, tnum: 4, barscalar:.6, dmax: 100});
scales({target: '#chart4', target2: 'lAxis', stroke: 'red', posyscalar: .2, posxscalar: xscalar, tnum: 4, barscalar:.5, direction: 'left', dmax: 100});
d3.select('#chart4').on('click', function(event){
    event.preventDefault();
    scales({target: '#chart4', target2: 'bAxis', stroke: 'red', posyscalar: .7, posxscalar: xscalar, tnum: 2, barscalar:.6, duration: 750});
    scales({target: '#chart4', target2: 'lAxis', stroke: 'red', posyscalar: .2, posxscalar: xscalar, tnum: 2, barscalar:.5, direction: 'left', duration: 750});
})