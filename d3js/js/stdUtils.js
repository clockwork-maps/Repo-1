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