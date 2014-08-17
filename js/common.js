var Pix = function(canvasName,pix){
    this.pix = pix;

    this.canvas = $('.' + canvasName)[0];
    this.ctx = this.canvas.getContext('2d');

    this.widthNum = pix[0].length;
    this.heightNum = pix.length;

    this.squareWidth = 25;
    this.squareHeight = 25;

    this.canvas.width = this.widthNum * 25;
    this.canvas.height = this.heightNum * 25;

    this.stageWidth = this.canvas.width;
    this.stageHeight = this.canvas.height;

    this.squareAry = [];
    this.squareRowAry = this.createRowAry();

    this.color = "rgb(255, 0, 255)";

    this.ctx.strokeStyle = this.color;
    this.ctx.fillStyle = this.color;

    this.$elCol = $('.col');
    this.$elRow = $('.row');


    this.createSquaresInfo();
};

Pix.prototype.squares = function() {
    var colLength = this.stageWidth / this.squareWidth,
        rowLength = this.stageHeight / this.squareHeight,
        squareLength = colLength * rowLength;

    for(var i = 0;i < this.heightNum;i++) {
        this.squareAry[i] = [];
        for(var j = 0;j < this.widthNum;j++) {
            var leftPosition = j * this.squareWidth;
            var topPosition = i * this.squareHeight;
            this.squareAry[i][j] = {
                colNum: j,
                rowNum: i,
                leftPosition: leftPosition,
                topPosition: topPosition,
                isDrow: false,
                hasCompleted: false ===  !!this.pix[i][j]
            };
            this.squareStroke(this.squareAry[i][j]);
        }
    }
};

Pix.prototype.setEvents = function() {
    $(this.canvas).on('click',function(e){
        var squarePosition = this.getOffsetSquare(e.offsetX,e.offsetY);
        this.squareToggle(squarePosition);

        if(this.hasAllCompleted()) {
            alert('完成！');
        }
    }.bind(this));
};

Pix.prototype.getOffsetSquare = function(x,y){
    var squareWidthNum = Math.floor(x / this.squareWidth);
    var squareHeightNum = Math.floor(y / this.squareHeight);

    return(this.squareAry[squareHeightNum][squareWidthNum]);
};

Pix.prototype.squareStroke = function(squareInfo) {
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
    squareInfo.hasCompleted = squareInfo.isDrow === !!this.pix[squareInfo.rowNum][squareInfo.colNum];
};

Pix.prototype.squareClaer = function(squareInfo) {
    this.ctx.fillStyle = "rgb(255, 255, 255)";
    this.ctx.fillRect(
        squareInfo.leftPosition,
        squareInfo.topPosition,
        this.squareWidth,
        this.squareHeight
    );
    squareInfo.isDrow = false;
    squareInfo.hasCompleted = squareInfo.isDrow === !!this.pix[squareInfo.rowNum][squareInfo.colNum];
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


Pix.prototype.createRowAry = function() {
    var rowAry = [];
    for(var i = 0;i < this.pix.length;i++) {
        for(var j = 0;j < this.pix[i].length;j++) {
            if(!rowAry[j]) {rowAry[j] = [];}
            rowAry[j].push(this.pix[i][j]);
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

Pix.prototype.createSquaresInfo = function() {
    for(var i = 0;i < this.pix.length;i++) {
        this.$elCol.append('<li>' + this.squaresInfo(this.pix[i]).join(' ') + '</li>');
    }
    for(var j = 0;j < this.squareRowAry.length;j++) {
        this.$elRow.append('<li>' + this.squaresInfo(this.squareRowAry[j]).join(' ') + '</li>');
    }
};

var pix = new Pix('pix',[
    [1,0,1,1,1,0,1,1],
    [1,0,1,1,1,0,1,0],
    [1,1,1,1,1,0,0,0],
    [1,0,1,0,1,0,1,0],
    [1,1,1,1,1,0,0,0],
    [1,0,1,1,1,0,1,0],
]);
pix.squares();
pix.setEvents();