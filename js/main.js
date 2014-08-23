var locationSearch = decodeURI(window.location.search.substring(1,window.location.search.length)).replace(/%23/g,'#'),

	pixAry = !!locationSearch ?
		JSON.parse(inflate(locationSearch)) :
		[
			[0,0,0,0,0],
			[0,0,0,0,0],
			[0,0,0,0,0],
			[0,0,0,0,0],
			[0,0,0,0,0]
		];

var pix = new Pix('pix',pixAry),
	pixOperation = new PixOperation(pix);

pix.color = "rgb(255, 0, 111)";
pix.createSquares();
pix.setEvents();

pix.createSquaresInfo(pix.pix);

pixOperation.setEvents();


