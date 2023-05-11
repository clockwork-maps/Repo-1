function getRA(min, max) {
    return Math.random() * (max - min) + min;
}
function nvcolor(){
    return `rgba(${getRA(0,255)},${getRA(0,255)},${getRA(0,255)},${getRA(0.5,1)})`;
}
let brand = d3.select('.navbar-brand');
let bsvg = brand.append('svg');
let tdefs = bsvg.append('defs');
let pattern = tdefs.append('pattern');
pattern.attr('id', 'pattern1').attr('width','10').attr('height','10').attr('patternUnits','userSpaceOnUse').attr('patternTransform','rotate(60)');
let prect = pattern.append('rect');
prect.attr('width','10').attr('height','10').attr('fill', 'rgba(0,0,0,0.7)');
let pcirc = pattern.append('circle');
pcirc.attr('r','2').attr('transform', 'translate(5,5)').attr('fill','#fff');
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
let pattern5 = tdefs.append('pattern');
pattern5.attr('id', 'pattern5').attr('width','800').attr('height','446').attr('patternUnits','userSpaceOnUse');
let img1 = pattern5.append('image');
img1.attr('href', 'webb1.jpg').attr('width','110%').attr('height','110%');
let pattern6 = tdefs.append('pattern');
pattern6.attr('id', 'pattern6').attr('width','1000').attr('height','560').attr('patternUnits','userSpaceOnUse');
let img2 = pattern6.append('image');
img2.attr('href', 'webb1.jpg').attr('width','1000').attr('height','560').attr('preserveAspectRatio', 'xMidYMin slice');
bsvg.style('height', '40px').style('width', '40px').style('background-color', '#fff').style('border', '1px solid rgba(0,0,0,0.1)')
.style('margin', 'auto').style('margin-left', '15px');
for(let i=0;i<10;i++){
    let cir = bsvg.append('circle');
    let cx = getRA(2,40);
    let cy = getRA(2,40);
    let cr = getRA(2,4);
    cir.attr('transform', `translate(${cx},${cy})`).attr('r', cr).attr('fill', nvcolor()).classed('cdrift', true);
}
function cDrift(){
    let cirs = bsvg.selectAll('.cdrift');
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