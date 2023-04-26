let logo = d3.select('#logo');
logo.style('width', '400px').style('height', '400px').style('margin-left', '30%').style('margin-right', '30%');
function NKLBuilder(leg, target){
    let canvas = d3.select(target);
    let bsize = (leg/11);
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
    for(let i=0;i<11;i++){
        for (let j=0;j<10;j++){
            let rx = i * bsize;
            let ry = j * bsize;
            let box = canvas.append('rect');
            box.attr('transform', `translate(${rx},${ry})`).attr('width',bsize+1).attr('height',bsize+1).attr('fill','#fff');
            if(yellowList.includes(`${j} ${i}`)) box.classed('yellow1', true);
            else if(orangeList.includes(`${j} ${i}`)) box.classed('orange1', true);
            else if(pinkList.includes(`${j} ${i}`)) box.classed('pink1', true);
            else if(redList1.includes(`${j} ${i}`)) box.classed('red1', true);
            else if(redList2.includes(`${j} ${i}`)) box.classed('red2', true);
            else if(purpleList1.includes(`${j} ${i}`)) box.classed('purple1', true);
            else if(purpleList2.includes(`${j} ${i}`)) box.classed('purple2', true);
            else if(blueList1.includes(`${j} ${i}`)) box.classed('blue1', true);
            else if(blueList2.includes(`${j} ${i}`)) box.classed('blue2', true);
            else if(blueList3.includes(`${j} ${i}`)) box.classed('blue3', true);
            else if(blueList4.includes(`${j} ${i}`)) box.classed('blue4', true);
            else if(greenList1.includes(`${j} ${i}`)) box.classed('green1', true);
            else if(greenList2.includes(`${j} ${i}`)) box.classed('green2', true);
            else if(greenList3.includes(`${j} ${i}`)) box.classed('green3', true);
            else if(blackList.includes(`${j} ${i}`)) box.classed('black1', true);
            else box.classed('whites', true);            
        }
    }
    let yellow1 = d3.selectAll('.yellow1');
    yellow1.each(function(){
        let box = d3.select(this);
        box.attr('fill', '#FFD300');
    });
    let orange1 = d3.selectAll('.orange1');
    orange1.each(function(){
        let box = d3.select(this);
        box.attr('fill', '#FF9000');
    });
    let pink1 = d3.selectAll('.pink1');
    pink1.each(function(){
        let box = d3.select(this);
        box.attr('fill','#D40070')
    })
    let red1 = d3.selectAll('.red1');
    red1.each(function(){
        let box = d3.select(this);
        box.attr('fill', '#F90012');
    });
    let red2 = d3.selectAll('.red2');
    red2.each(function(){
        let box = d3.select(this);
        box.attr('fill', '#C10029');
    });
    let purple1 = d3.selectAll('.purple1');
    purple1.each(function(){
        let box = d3.select(this);
        box.attr('fill', '#3C036D');
    });
    let purple2 = d3.selectAll('.purple2');
    purple2.each(function(){
        let box = d3.select(this);
        box.attr('fill', '#67028B');
    });
    let blue1 = d3.selectAll('.blue1');
    blue1.each(function(){
        let box = d3.select(this);
        box.attr('fill', '#5A9EDB');
    });
    let blue2 = d3.selectAll('.blue2');
    blue2.each(function(){
        let box = d3.select(this);
        box.attr('fill', '#065EAC');
    });
    let blue3 = d3.selectAll('.blue3');
    blue3.each(function(){
        let box = d3.select(this);
        box.attr('fill', '#031856');
    });
    let blue4 = d3.selectAll('.blue4');
    blue4.each(function(){
        let box = d3.select(this);
        box.attr('fill', '#0B2A86');
    });
    let green1 = d3.selectAll('.green1');
    green1.each(function(){
        let box = d3.select(this);
        box.attr('fill', '#97CB00');
    });
    let green2 = d3.selectAll('.green2');
    green2.each(function(){
        let box = d3.select(this);
        box.attr('fill', '#415700');
    });
    let green3 = d3.selectAll('.green3');
    green3.each(function(){
        let box = d3.select(this);
        box.attr('fill', '#114000');
    });
    let black1 = d3.selectAll('.black1');
    black1.each(function(){
        let box = d3.select(this);
        box.attr('fill','#141414')
    });
}
NKLBuilder(400,'#logo');