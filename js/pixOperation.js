var PixOperation = function(pix){
    this.pix = pix;
    this.$operation = $('.' + pix.canvasName + 'Operation');
    this.$createMode = this.$operation.find('.createMode');
    this.$widthNum = this.$operation.find('.widthNum input');
    this.$heightNum = this.$operation.find('.heightNum input');
    this.$save = this.$operation.find('.save');
    this.$url = this.$operation.find('.url');
};

PixOperation.prototype.setEvents = function() {
    $(this.$save).on('click',function(e){
       var deflatePix = deflate(JSON.stringify(pix.nowPix));
       this.$url.html('<a href="' + location.pathname + '?' + deflatePix + '">' + location.pathname + '?' + deflatePix + '</a>');
    }.bind(this));


    $(this.$heightNum).add(this.$widthNum).on('change',function(e){
        this.pix.pix = [];
        this.pix.widthNum = this.$widthNum.val();
        this.pix.heightNum = this.$heightNum.val();

        this.pix.color = "rgb(255, 0, 111)";
        this.pix.createSquares();
        this.pix.setEvents();

        this.pix.squareRowAry = this.pix.createRowAry(this.pix.nowPix);
        this.pix.createSquaresInfo(this.pix.nowPix);
    }.bind(this));

    $(this.$createMode).on('click',function(e){
        this.pix.isCreateMode = !this.pix.isCreateMode;
        this.$operation.removeClass('on').addClass(this.pix.isCreateMode ? 'on' : '');

        if(this.pix.isCreateMode) {
            this.pix.pix = [];
            this.pix.widthNum = this.$widthNum.val();
            this.pix.heightNum = this.$heightNum.val();

            this.pix.color = "rgb(255, 0, 111)";
            this.pix.createSquares();
            this.pix.setEvents();

            this.pix.squareRowAry = this.pix.createRowAry(this.pix.nowPix);
            this.pix.createSquaresInfo(this.pix.nowPix);
        } else {
            this.pix = new Pix(this.pix.canvasName,this.pix.nowPix);

            this.pix.color = "rgb(255, 0, 111)";
            this.pix.createSquares();
            this.pix.setEvents();
        }
    }.bind(this));
};