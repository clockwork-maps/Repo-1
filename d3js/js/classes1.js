let axis1 = new AxScale({
    target : 'chart1',
    target2 : 'bAxis1'
});
axis1.dmax = 200;
axis1.draw();
let axis2 = new AxScale({
    target : 'chart1',
    target2 : 'lAxis2',
    direction :  'left',
    posyscalar : .1,
    dmax : 50
})
axis2.draw();
