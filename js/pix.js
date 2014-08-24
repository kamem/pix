var Pix = function(canvasName,pix){
    this.canvasName = canvasName;
    this.canvas = $('.' + canvasName)[0];
    this.ctx = this.canvas.getContext('2d');


    this.widthNum = pix.length === 0 ? 25 : pix[0].length;
    this.heightNum = pix.length === 0 ? 25 : pix.length;

    this.squareWidth = 20;
    this.squareHeight = 20;

    this.ctx.clearRect(0,0,this.widthNum * this.squareWidth,this.heightNum * this.squareHeight);
    this.color = '#000';

    this.stageWidth = this.canvas.width;
    this.stageHeight = this.canvas.height;


    this.$wrap = $('.' + canvasName).parent();

    this.pix = pix;
    this.nowPix = [];

    this.squareAry = [];
    this.squareRowAry = this.createRowAry(this.pix);

    this.isCreateMode = false;
};

Pix.prototype.createSquares = function() {
    this.canvas.width = this.widthNum * this.squareWidth;
    this.canvas.height = this.heightNum * this.squareHeight;

    var hasNowPix = this.nowPix.length >= this.heightNum;

    for(var i = 0;i < this.heightNum;i++) {
        this.squareAry[i] = [];
        this.nowPix[i] = hasNowPix ? this.nowPix[i] : [];

        for(var j = 0;j < this.widthNum;j++) {
            var leftPosition = j * this.squareWidth;
            var topPosition = i * this.squareHeight;
            this.squareAry[i][j] = {
                colNum: j,
                rowNum: i,
                leftPosition: leftPosition,
                topPosition: topPosition,
                isDrow: this.isCreateMode && this.pix.length !== 0 ? !!this.pix[i][j] :
                    hasNowPix ? !!this.nowPix[i][j] : false,
                hasCompleted: this.pix.length === 0 ? false : false === !!this.pix[i][j]
            };
            this.squareStroke(this.squareAry[i][j]);
            if(this.squareAry[i][j].isDrow) {this.squareDraw(this.squareAry[i][j]);}
            this.nowPix[i][j] = this.isCreateMode && this.pix.length !== 0 ? this.pix[i][j] :
                hasNowPix ? this.nowPix[i][j] : 0;
        }
    }
};

Pix.prototype.setEvents = function() {
    $(this.canvas).off('click').on('click',function(e){
        var squarePosition = this.getOffsetSquare(e.offsetX,e.offsetY);
        this.squareToggle(squarePosition);

        if(this.hasAllCompleted() && !this.isCreateMode) {
            alert('完成！');
        }

        if(this.isCreateMode) {
            this.squareRowAry = this.createRowAry(this.nowPix);
            this.createSquaresInfo(this.nowPix);
        }
    }.bind(this));
};

Pix.prototype.getOffsetSquare = function(x,y){
    var squareWidthNum = Math.floor(x / this.squareWidth);
    var squareHeightNum = Math.floor(y / this.squareHeight);

    return(this.squareAry[squareHeightNum][squareWidthNum]);
};

Pix.prototype.squareStroke = function(squareInfo) {
    this.ctx.strokeStyle = this.color;
    this.ctx.strokeRect(
        squareInfo.leftPosition,
        squareInfo.topPosition,
        this.squareWidth,
        this.squareHeight
    );
};

Pix.prototype.squareDraw = function(squareInfo) {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(
        squareInfo.leftPosition,
        squareInfo.topPosition,
        this.squareWidth,
        this.squareHeight
    );
    squareInfo.isDrow = true;
    if(!this.isCreateMode) {squareInfo.hasCompleted = squareInfo.isDrow === !!this.pix[squareInfo.rowNum][squareInfo.colNum];}
    this.nowPix[squareInfo.rowNum][squareInfo.colNum] = 1;
};

Pix.prototype.squareClaer = function(squareInfo) {
    this.ctx.fillStyle = "#fff";
    this.ctx.fillRect(
        squareInfo.leftPosition,
        squareInfo.topPosition,
        this.squareWidth,
        this.squareHeight
    );
    squareInfo.isDrow = false;
    if(!this.isCreateMode) {squareInfo.hasCompleted = squareInfo.isDrow === !!this.pix[squareInfo.rowNum][squareInfo.colNum];}
    this.nowPix[squareInfo.rowNum][squareInfo.colNum] = 0;
};

Pix.prototype.squareToggle = function(squareInfo) {
    if(squareInfo.isDrow) {
        this.squareClaer(squareInfo);
        this.squareStroke(squareInfo);
    } else {
        this.squareDraw(squareInfo);
    }
};


Pix.prototype.hasAllCompleted = function() {
    for(var i = 0;i < this.heightNum;i++) {
        for(var j = 0;j < this.widthNum;j++) {
            if(!this.squareAry[i][j].hasCompleted) {
                return false;
            }
        }
    }

   return true;
};


Pix.prototype.createRowAry = function(pix) {
    var rowAry = [];
    for(var i = 0;i < pix.length;i++) {
        for(var j = 0;j < pix[i].length;j++) {
            if(!rowAry[j]) {rowAry[j] = [];}
            rowAry[j].push(pix[i][j]);
        }
    }

    return rowAry;
};


Pix.prototype.squaresInfo = function(lineAry) {
    var squaresNumAry = [],
        areaNum = 0;

    for(var i = 0;i < lineAry.length;i++) {
        if(!!lineAry[i]) {
            if(squaresNumAry[areaNum] === undefined) {
                squaresNumAry[areaNum] = 0;
            }
            squaresNumAry[areaNum]++;
        } else {
            areaNum += i !== 0 && lineAry[i - 1] ? 1 : 0;
        }
    }

    return squaresNumAry.length === 0 ? [0] : squaresNumAry;
};

Pix.prototype.createSquaresInfo = function(pix) {
    var $elCol = this.$wrap.find('.col').html(''),
        $elRow = this.$wrap.find('.row').html('');

    for(var i = 0;i < pix.length;i++) {
        $elCol.append('<li>' + this.squaresInfo(pix[i]).join(' ') + '</li>');
    }
    for(var j = 0;j < this.squareRowAry.length;j++) {
        $elRow.append('<li>' + this.squaresInfo(this.squareRowAry[j]).join(' ') + '</li>');
    }
};