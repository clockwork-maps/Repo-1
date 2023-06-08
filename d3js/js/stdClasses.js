class AxScale {
    static getRA(min, max) {
        return Math.random() * (max - min) + min;
    }    
    static axes = {'bottom':d3.axisBottom, 'left': d3.axisLeft, 'top':d3.axisTop, 'right':d3.axisRight};
    static scales = {'linear':d3.scaleLinear, 'sqrt':d3.scaleSqrt, 'log':d3.scaleLog, 'time':d3.scathisime, 'band':d3.scaleBand, 'point':d3.scalePoint};
    static posarray = [[.1,.9],[.2,.7]];
    constructor (params){
        this._scaleSelect = params.scale || 'linear';
        this._direction = params.direction || 'bottom';
        this._target = params.target.slice(0) == '#' || params.target.slice(0) == '.' ? params.target : `#${params.target}` ;
        this._target2 = params.target2;
        this._dmin = params.dmin || 0;
        this._dmax = params.dmax || null;
        this._demoBool = !('dmax' in params);
        this._numScale = ['linear','sqrt','log'].indexOf(this._scaleSelect) + 1;
        this._domArray = params.domain || ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
        this._barDomain = this._numScale > 0 ? [this._dmin, this._dmax] : this._domArray;
        this._tranD = params.duration || 0;
        this._chart = d3.select(this._target);
        this._ctbounds = this._chart.node().getBoundingClientRect();
        this._ctln = this._ctbounds.width;
        this._ctht = this._ctbounds.height;
        this._mobile = window.innerWidth < 1024;
        this._barscalar = params.barscalar || this._mobile && this._hbool ? .6 : this._mobile ? .5 : .8;
        this._hbool = this._direction == 'bottom' || this._direction == 'top';
        this._rmax = this._hbool ? this._ctln*this._barscalar : this._ctht*this._barscalar;
        this._positionBase = this._mobile ? AxScale.posarray[1] : AxScale.posarray[0];
        this._positions = {'left':[0,0],'top':[0,0],'bottom':[0,1],'right':[1,0]}[this._direction].map(x => this._positionBase[x]);
        this._posxscalar = params.posxscalar || this._positions[0];
        this._posyscalar = params.posyscalar || this._positions[1];
        this._posx = this._ctln * this._posxscalar;
        this._posy = this._ctht * this._posyscalar;
        this._tnum = params.tnum || this._mobile ? 3 : 10;
        this._scale = this._hbool ? AxScale.scales[this._scaleSelect]().domain(this._barDomain).range([0, this._rmax]) : AxScale.scales[this._scaleSelect]().domain(this._barDomain.reverse()).range([0, this._rmax]);
        this._axis = AxScale.axes[this._direction](this._scale).ticks(this._tnum);
        this._cscale = !!this._chart.node().querySelector(`.${this._target2}`) ? d3.select(`.${this._target2}`) : this._chart.append('g').classed(this._target2,true);
        this._stroke = params.stroke || 'red';
    }
    get dmin(){ return this._dmin;}
    set dmin(val){
        this._dmin = val;
        this._barDomain = this._numScale ? [this._dmin, this._dmax] : this._domArray;
        this._scale = this._hbool ? AxScale.scales[this._scaleSelect]().domain(this._barDomain).range([0, this._rmax]) : AxScale.scales[this._scaleSelect]().domain(this._barDomain.reverse()).range([0, this._rmax]);
        this._axis = AxScale.axes[this._direction](this._scale).ticks(this._tnum);
    }
    get dmax(){ return this._dmax;}
    set dmax(val){
        this._dmax = val;
        this._demoBool = false;
        this._barDomain = this._numScale ? [this._dmin, this._dmax] : this._domArray;
        this._scale = this._hbool ? AxScale.scales[this._scaleSelect]().domain(this._barDomain).range([0, this._rmax]) : AxScale.scales[this._scaleSelect]().domain(this._barDomain.reverse()).range([0, this._rmax]);
        this._axis = AxScale.axes[this._direction](this._scale).ticks(this._tnum);
    }
    get scale(){ return this._scale;}
    _demoScale(){        
        this._dmax = Math.round(AxScale.getRA(30,10000));
        this._barDomain = this._numScale ? [this._dmin, this._dmax] : this._domArray;
        this._scale = this._hbool ? AxScale.scales[this._scaleSelect]().domain(this._barDomain).range([0, this._rmax]) : AxScale.scales[this._scaleSelect]().domain(this._barDomain.reverse()).range([0, this._rmax]);
        this._axis = AxScale.axes[this._direction](this._scale).ticks(this._tnum);
    }
    draw(){
        if(this._demoBool && this._numScale > 0) this._demoScale();
        this._cscale.attr('transform',`translate(${this._posx},${this._posy})`);
        this._cscale.transition().duration(this._tranD).call(this._axis);
        this._cscale.select('path')
        .attr('stroke', this._stroke);
        this._cscale.selectAll('g')
        .select('line')
        .attr('stroke', this._stroke);
    }
}