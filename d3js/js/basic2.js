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
LCNLogo('#logo');