function getRA(min, max) {
    return Math.random() * (max - min) + min;
}
function nvcolor(){
    return `rgba(${getRA(0,255)},${getRA(0,255)},${getRA(0,255)},${getRA(0.5,1)})`;
}
let brand = d3.select('.navbar-brand');
let bsvg = brand.append('svg');
bsvg.style('height', '40px').style('width', '40px').style('background-color', '#fff').style('border', '1px solid rgba(0,0,0,0.1)')
.style('margin', 'auto').style('margin-left', '15px');
for(let i=0;i<10;i++){
    let cir = bsvg.append('circle');
    let cx = getRA(2,40);
    let cy = getRA(2,40);
    let cr = getRA(2,4);
    cir.attr('transform', `translate(${cx},${cy})`).attr('r', cr).attr('fill', nvcolor());
}
function cDrift(){
    let cirs = bsvg.selectAll('circle');
    cirs.each(function(){
        let cir = d3.select(this);
        let cx = getRA(2,40);
        let cy = getRA(2,40);
        let cr = getRA(2,4);
        cir.transition().duration(7000).delay(0).attr('transform', `translate(${cx},${cy})`).attr('r', cr).attr('fill', nvcolor());
    });
}
cDrift();
setInterval(cDrift, 5000);