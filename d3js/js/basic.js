function init(){
    function getRA(min, max) {
        return Math.random() * (max - min) + min;
    }
    function bcolor(){
        let blues = Math.floor(getRA(200, 255));
        let greys = Math.floor(getRA(175, 195));
        return `rgba(${greys},${greys},${blues}, ${Math.random()})`;
    }
    function bbcolor(){
        let blues = Math.floor(getRA(185, 195));
        let greens = Math.floor(getRA(145, 155));
        let reds = Math.floor(getRA(135, 145));
        return `rgba(${reds},${greens},${blues}, ${getRA(0.8,1)})`;
    }
    function brcolor(){
        let reds = Math.floor(getRA(80,101));
        let greens = Math.floor(getRA(47,68));
        let blues = Math.floor(getRA(21,43));
        return `rgba(${reds},${greens},${blues}, ${getRA(0.4,0.6)})`;
    }
    function brcolor2(){
        let reds = Math.floor(getRA(166,206));
        let greens = Math.floor(getRA(133,176));
        let blues = Math.floor(getRA(107,154));
        return `rgba(${reds},${greens},${blues}, ${getRA(0.3,0.5)})`;
    }
    function brcolor3(){
        let reds = Math.floor(getRA(26,52));
        let greens = Math.floor(getRA(12,27));
        let blues = Math.floor(getRA(0,6));
        return `rgba(${reds},${greens},${blues}, ${getRA(0.3,0.5)})`;
    }
    function rcolor(){
        return `rgb(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)})`;
    }
    function slideCorrect(oldn, newn, scalar){
        if(newn == oldn){
            return oldn - scalar;
        } else if(newn > oldn){
            return (oldn - (newn - oldn)) - scalar;
        } else {
            return (oldn + (oldn - newn)) - scalar;
        }
    }
    let anchor = d3.select("#anchor");
    let h31 = d3.create('h3');
    h31.html("D3 Intro & Demonstration");
    h31.classed('has-text-centered', true);
    anchor.node().appendChild(h31.node());
    let p1 = d3.create('p');
    p1.html("D3 is a js library that is somewhat famous for both its potency and complexity. This whole page is being written via D3 functions, which aren't too far off from how one would write them using vanilla js. What makes D3 a notable and useful library is how focused D3 is around data and data manipulation, something vanilla js can handle--but D3 does more naturally.");
    anchor.node().appendChild(p1.node());
    let p2 = d3.create('p');
    p2.html(`For example, we can dynamically attach data to a given element using D3. Building on functionality <a href="https://d3js.org/" target="_blank">showcased in D3's homepage</a> we can set this paragraph to have a random color every time we click it.`);
    p2.style("cursor", "pointer");
    p2.on("click", function(){
        p2.transition().duration(750).style("color", rcolor());
    });
    anchor.node().appendChild(p2.node());
    let h41 = d3.create('h4');
    h41.html('This subtitle cycles through Bulma classes!');
    h41.style("cursor", "pointer");
    h41.classed('has-text-centered', true);
    window.h4num = 3;
    h41.on("click", function(){
        let bstyles = ['subtitle has-text-centered is-2', 'subtitle has-text-centered is-3', 'subtitle has-text-centered is-4'];
        let p = window.h4num % 3;
        window.h4num++;
        let tstyle = bstyles[p];
        h41.node().className=tstyle;
    });
    anchor.node().appendChild(h41.node());
    let p3 = d3.create('p');
    p3.html('However, what D3 is most famous for is SVG creation and manipulation. Below is a chart drawn with random data.');
    anchor.node().appendChild(p3.node());
    let svg1 = d3.create('svg');
    svg1.style("height", "200px");
    svg1.style("width", "800px");
    svg1.property("id", "graph");
    svg1.style("cursor", "pointer");
    svg1.style("border", "1px solid rgba(0,0,0,0.1)");
    svg1.style("background-color", "rgb(255, 255, 255)");
    svg1.style("margin-left", "20%");
    svg1.style("margin-right", "20%");
    anchor.node().appendChild(svg1.node());
    for(let i=0;i<20;i++){
        let tg = d3.create('g');
        svg1.node().appendChild(tg.node());
        tg.attr("transform", function(){return `translate(${i*40},0)`;});
        let tnum=Math.floor(Math.random()*170);
        let trect=d3.create('rect');
        trect.attr('height', tnum);
        trect.attr('width', 38);
        trect.attr('fill', 'rgb(0, 0, 0)');
        tg.node().appendChild(trect.node());
        let label = d3.create('text');
        let xnum = 20 + (tnum.toString().length * 4);
        label.attr('x', xnum);
        label.attr('y', tnum + 10);
        label.attr("transform", `rotate(180, ${xnum}, ${tnum + 10})`);
        label.style("z-index", 20);
        label.attr("fill", "rgb(0, 0, 0)");
        label.html(tnum);
        tg.node().appendChild(label.node());
    }
    svg1.html(svg1.node().innerHTML);
    svg1.attr("transform", "rotate(180)");    
    svg1.on('click', function(){
        let tsvg = d3.select('#graph');
        let sfill = tsvg.node().style.backgroundColor == 'rgb(255, 255, 255)' ? 'rgb(0, 0, 0)' : 'rgb(255, 255, 255)';
        tsvg.transition().duration(500).style('background-color', sfill);
        let groups = tsvg.selectAll('g');
        groups.each(function(){
            let group = d3.select(this);
            let trect = group.select('rect');
            let tnum = Math.floor(Math.random()*170);
            let xn2 = 20 + (tnum.toString().length * 4);
            trect.transition().duration(500).attr('height', tnum).attr('fill', rcolor());
            let tlabel = group.select('text');
            let oy = tlabel.node().dataset.oy ? Number(tlabel.node().dataset.oy) : Number(tlabel.node().getAttribute('y'));
            if(!tlabel.node().dataset.oy) tlabel.attr('data-oy', oy);
            let ynum = slideCorrect(oy, tnum, 10);
            let ox = tlabel.node().dataset.ox ? Number(tlabel.node().dataset.ox) : Number(tlabel.node().getAttribute('x'));
            if(!tlabel.node().dataset.ox) tlabel.attr('data-ox', ox);
            let xnum = slideCorrect(ox, xn2, 0);            
            let tfill = tlabel.node().getAttribute('fill') == 'rgb(0, 0, 0)' ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)';
            tlabel.transition().duration(500).attr('x', xnum).attr('y', ynum).attr('fill', tfill).text(tnum);
        });
    });
    let p4 = d3.create('p');
    p4.html('As you might have guessed from the cursor, this chart can be reloaded and animated when clicked on. Animation is a particular strength of D3 and can be seen here through the transition of font, background, and bar color; and the changing of bar and label heights.');
    anchor.node().appendChild(p4.node());
    let p5 = d3.create('p');
    p5.html('However, one can do more than chart animations when harnessing d3: the library is capable of any type of visualization so long as it involves SVG. Below here will be the last visualization in the demo page: a crude simulation of some bubbles floating through water.');
    anchor.node().appendChild(p5.node());    
    let svg2 = d3.create('svg');
    svg2.style('height', '600px');
    svg2.style('width', '900px');
    svg2.style('border', '1px solid rgba(0,0,0,0.1)');
    svg2.style('margin-left', '15%');
    svg2.style('margin-right', '15%');
    svg2.style('background-color', bbcolor());
    svg2.property('id', 'bubble');    
    let pry = null;
    let pry2 = null;
    let pry3 = null;
    for(let i=0;i<100;i++){
        let cx = getRA(30, 870);
        let cy = getRA(30, 430);
        let cr = getRA(3, 30);
        let cir = d3.create('circle');
        cir.attr('transform', `translate(${cx}, ${cy})`).attr('r', cr).attr('fill', bcolor()).attr('data-px', cx).attr('data-py', cy);
        svg2.node().appendChild(cir.node());
        let ry;
        if(!!pry){
            let mnry = pry-8<430?430:pry-8;
            let mry = pry+8>525?525:pry+8;
            ry=getRA(mnry, mry);
        }
        else ry=getRA(430,525);
        pry = ry;
        let height = 600-ry;
        let patch = d3.create('rect');
        let ox = i*9;
        patch.attr('transform', `translate(${ox}, ${ry})`).attr('height', height).attr('width', 18).attr('fill', brcolor()).attr('rx', 3).classed('darks', true).attr('data-ox',ox);
        svg2.node().appendChild(patch.node());
        let ry2;
        if(!!pry2){
            mnry = pry2-8<475?475:pry2-8;
            mry = pry2+8>575?575:pry2+8;
            ry2=getRA(mnry, mry);
        }
        else ry2=getRA(475,575);
        pry2 = ry2;
        let height2 = 600-ry2;
        let patch2 = d3.create('rect');
        patch2.attr('transform', `translate(${ox}, ${ry2})`).attr('height', height2).attr('width', 18).attr('fill', brcolor2()).attr('rx', 3).classed('lights', true).attr('data-ox',ox);
        svg2.node().appendChild(patch2.node());
        let ry3;
        if(!!pry3){
            mnry = pry3-8<500?500:pry3-8;
            mry = pry3+8>575?575:pry3+8;
            ry3=getRA(mnry, mry);
        }
        else ry3=getRA(500,575);
        pry3 = ry3;
        let height3 = 600-ry3;
        let patch3 = d3.create('rect');
        patch3.attr('transform', `translate(${ox}, ${ry3})`).attr('height', height3).attr('width', 18).attr('fill', brcolor3()).attr('rx', 3).classed('fores', true).attr('data-ox',ox);
        svg2.node().appendChild(patch3.node());
    }
    svg2.html(svg2.node().innerHTML);
    anchor.node().appendChild(svg2.node());
    function bDrift(){
        let bgraph = d3.select('#bubble');
        bgraph.transition().duration(1250).style('background-color', bbcolor());
        let bubbles = bgraph.selectAll('circle');
        bubbles.each(function(){
            let bubble = d3.select(this);
            let px = Number(bubble.node().dataset.px);
            let py = Number(bubble.node().dataset.py);
            let mnx = px-100<30 ? 30 : px-100;
            let mx = px+100>870 ? 870 : px+100;
            let mny = py-100<30? 30 : py-100;
            let my = py+100>430? 430 : py+100; 
            let cx = getRA(mnx, mx);
            let cy = getRA(mny, my);
            let cr = getRA(3, 30);
            bubble.transition().duration(1250).attr('transform', `translate(${cx}, ${cy})`).attr('r', cr).attr('fill', bcolor()).attr('data-px', cx).attr('data-py', cy);
        });
        let darks = bgraph.selectAll('.darks');
        pry = null;
        darks.each(function(){
            let dark = d3.select(this);
            let ry;
            if(!!pry){
                let mnry = pry-8<430?430:pry-8;
                let mry = pry+8>525?525:pry+8;
                ry=getRA(mnry, mry);
            }
            else ry=getRA(430,525);
            pry = ry;
            let height = 600-ry;
            let tx = dark.node().dataset.ox;
            dark.transition().duration(1250).attr('transform', `translate(${tx}, ${ry})`).attr('height', height).attr('fill', brcolor());
        });
        let lights = bgraph.selectAll('.lights');
        pry2 = null;
        lights.each(function(){
            let light = d3.select(this);
            let ry2;
            if(!!pry2){
                mnry = pry2-8<475?475:pry2-8;
                mry = pry2+8>575?575:pry2+8;
                ry2=getRA(mnry, mry);
            }
            else ry2=getRA(475,575);
            pry2 = ry2;
            let height2 = 600-ry2;
            let tx = light.node().dataset.ox;
            light.transition().duration(1250).attr('transform', `translate(${tx}, ${ry2})`).attr('height', height2).attr('fill', brcolor2());
        });
        let fores = bgraph.selectAll('.fores');
        pry3 = null;
        fores.each(function(){
            let fore = d3.select(this);
            let ry3;
            if(!!pry3){
                mnry = pry3-8<500?500:pry3-8;
                mry = pry3+8>575?575:pry3+8;
                ry3=getRA(mnry, mry);
            }
            else ry3=getRA(500,575);
            pry3 = ry3;
            let height3 = 600-ry3;
            let tx = fore.node().dataset.ox;
            fore.transition().duration(1250).attr('transform', `translate(${tx}, ${ry3})`).attr('height', height3).attr('fill', brcolor3());
        })
    }
    bDrift();
    setInterval(bDrift, 1250);
}