//Initialize the SVG Container and variables
var svgContainer;
var widthBottom, widthMiddle, widthTop, heightLeft, heightRight, lengthLeft, lengthRight;
//Pixel per inch multiplier default = 15
var pixPerInch = 15;
//Initialize variables and values to default
var length, width, height, weight = 0;
var solidOriginPoints = {
    A: { x: 160.5, y: 274.5 },
    B: { x: 289.5, y: 274.5 },
    C: { x: 160.5, y: 145.5 },
    D: { x: 289.5, y: 145.5 },
    E: { x: 237.9, y: 93.9 },
    F: { x: 108.9, y: 93.9 },
    G: { x: 108.9, y: 222.9 }
};
svgContainer = d3.select("#svgWrap");
widthBottom = svgContainer.append("line").attr("x1", solidOriginPoints.A.x).attr("y1", solidOriginPoints.A.y).attr("x2", solidOriginPoints.B.x).attr("y2", solidOriginPoints.B.y).attr("stroke", "#ddd").attr("stroke-width", 4).attr("fill", "none");
widthMiddle = svgContainer.append("line").attr("x1", solidOriginPoints.C.x).attr("y1", solidOriginPoints.C.y).attr("x2", solidOriginPoints.D.x).attr("y2", solidOriginPoints.D.y).attr('stroke', '#ddd').attr("stroke-width", 4).attr("fill", "none");
widthTop = svgContainer.append("line").attr("x1", solidOriginPoints.E.x).attr("y1", solidOriginPoints.E.y).attr("x2", solidOriginPoints.F.x).attr("y2", solidOriginPoints.F.y).attr('stroke', '#ddd').attr("stroke-width", 4).attr("fill", "none");
heightLeft = svgContainer.append("line").attr("x1", solidOriginPoints.A.x).attr("y1", solidOriginPoints.A.y).attr("x2", solidOriginPoints.C.x).attr("y2", solidOriginPoints.C.y).attr('stroke', '#ddd').attr("stroke-width", 4).attr("fill", "none");
heightRight = svgContainer.append("line").attr("x1", solidOriginPoints.B.x).attr("y1", solidOriginPoints.B.y).attr("x2", solidOriginPoints.D.x).attr("y2", solidOriginPoints.D.y).attr('stroke', '#ddd').attr("stroke-width", 4).attr("fill", "none");
heightBack = svgContainer.append("line").attr("x1", solidOriginPoints.F.x).attr("y1", solidOriginPoints.F.y).attr("x2", solidOriginPoints.G.x).attr("y2", solidOriginPoints.G.y).attr('stroke', '#ddd').attr("stroke-width", 4).attr("fill", "none");
lengthLeft = svgContainer.append("line").attr("x1", solidOriginPoints.C.x).attr("y1", solidOriginPoints.C.y).attr("x2", solidOriginPoints.F.x).attr("y2", solidOriginPoints.F.y).attr('stroke', '#ddd').attr("stroke-width", 4).attr("fill", "none");
lengthRight = svgContainer.append("line").attr("x1", solidOriginPoints.D.x).attr("y1", solidOriginPoints.D.y).attr("x2", solidOriginPoints.E.x).attr("y2", solidOriginPoints.E.y).attr('stroke', '#ddd').attr("stroke-width", 4).attr("fill", "none");
lengthBottom = svgContainer.append("line").attr("x1", solidOriginPoints.A.x).attr("y1", solidOriginPoints.A.y).attr("x2", solidOriginPoints.G.x).attr("y2", solidOriginPoints.G.y).attr('stroke', '#ddd').attr("stroke-width", 4).attr("fill", "none");
//Initialize IDs for all labels
var weightLabel = document.getElementById('weightLabel');
var widthLabel = document.getElementById('widthLabel');
var lengthLabel = document.getElementById('lengthLabel');
var heightLabel = document.getElementById('heightLabel');
widthLabel.style.top = '394.5px';
widthLabel.style.left = '250px';
lengthLabel.style.top = '214.7px';
lengthLabel.style.left = '304.7px';
heightLabel.style.top = '310px';
heightLabel.style.left = '329.5px';

function changeWeight() {
    weight = parseFloat($('#myWeight').val());
    if(weight < 0) { weight = 1;
        $('#myWeight').val(1); }
    $('#weightAmt').text(weight);
};
//Change the animation on userInput
function changeItUp() {
    //4.2
    height = parseFloat($('#myHeight').val());
    width = parseFloat($('#myWidth').val());
    length = parseFloat($('#myLength').val());
    //Check for all dimensions before calculating/animating
    if(!length || !width || !height) {
        return;
    }
    if(length < 0) {
        length = 1;
        $('#myLength').val(1);
    }
    if(length > 100) {
        //$('#errorMsg').text('Dimensions must be less than 100');
        length = 100;
        $('#myLength').val(100);
    }
    if(width < 0) {
        width = 1;
        $('#myWidth').val(1);
    }
    if(width > 100) {
        //$('#errorMsg').text('Dimensions must be less than 100');
        width = 100;
        $('#myWidth').val(100);
    }
    if(height < 0) {
        height = 1;
        $('#myHeight').val(1);
    }
    if(height > 100) {
        $('#errorMsg').text('Dimensions must be less than 100');
        height = 100;
        $('#myHeight').val(100);
    }
    $('#lengthAmt').text(length);
    $('#widthAmt').text(width);
    $('#heightAmt').text(height);
    if(length < 3 && height < 3 && width < 5) {
        pixPerInch = 60;
    } else if(length < 5 && height < 5 && width < 10) {
        pixPerInch = 30;
    } else if(length * pixPerInch > 300 || width * pixPerInch > 340 || height * pixPerInch > 240) {
        changePixPerInch();
    } else if(length * pixPerInch < 300 && width * pixPerInch < 340 && height * pixPerInch < 240) {
        changePixPerInch();
    }
    //descrease the ratio for length to give the illusion of the z dimension
    var lengthInch2Px = length * pixPerInch * 0.4;
    var heightInch2Px = height * pixPerInch;
    var widthInch2Px = width * pixPerInch;
    var midPlusHalfWidth = 225 + widthInch2Px / 2;
    var midMinusHalfWidth = 225 - widthInch2Px / 2;
    //Solid Origin Points Transform
    //Change width based positions
    solidOriginPoints.A.x = midMinusHalfWidth;
    solidOriginPoints.B.x = midPlusHalfWidth;
    solidOriginPoints.C.x = midMinusHalfWidth;
    solidOriginPoints.D.x = midPlusHalfWidth;
    //Change height based positions
    solidOriginPoints.A.y = 210 + heightInch2Px / 2;
    solidOriginPoints.B.y = 210 + heightInch2Px / 2;
    solidOriginPoints.C.y = 210 - heightInch2Px / 2;
    solidOriginPoints.D.y = 210 - heightInch2Px / 2;
    //Change length based positions
    solidOriginPoints.E.y = solidOriginPoints.D.y - lengthInch2Px;
    solidOriginPoints.F.y = solidOriginPoints.C.y - lengthInch2Px;
    solidOriginPoints.G.y = solidOriginPoints.A.y - lengthInch2Px;
    //Change length/width based positions
    solidOriginPoints.E.x = solidOriginPoints.D.x - lengthInch2Px;
    solidOriginPoints.F.x = solidOriginPoints.C.x - lengthInch2Px;
    solidOriginPoints.G.x = solidOriginPoints.A.x - lengthInch2Px;
    animateBox();
}

function changePixPerInch() {
    var r, s, t = 0;
    r = 181 / length;
    s = 181 / height;
    t = 205 / width;
    if(r > s) {
        if(s > t) {
            pixPerInch = t;
        } else {
            pixPerInch = s;
        }
    } else if(r > t) {
        pixPerInch = t;
    } else {
        pixPerInch = r;
    }
    console.log('pixPerInch');
    console.log(pixPerInch);
}

function animateBox() {
    widthBottom.transition().duration(1000).attr("x1", solidOriginPoints.A.x).attr("y1", solidOriginPoints.A.y).attr("x2", solidOriginPoints.B.x).attr("y2", solidOriginPoints.B.y).attr('stroke', 'black');
    widthMiddle.transition().duration(1000).attr("x1", solidOriginPoints.C.x).attr("y1", solidOriginPoints.C.y).attr("x2", solidOriginPoints.D.x).attr("y2", solidOriginPoints.D.y).attr('stroke', 'black');
    widthTop.transition().duration(1000).attr("x1", solidOriginPoints.E.x).attr("y1", solidOriginPoints.E.y).attr("x2", solidOriginPoints.F.x).attr("y2", solidOriginPoints.F.y).attr('stroke', 'black');
    heightLeft.transition().duration(1000).attr("x1", solidOriginPoints.A.x).attr("y1", solidOriginPoints.A.y).attr("x2", solidOriginPoints.C.x).attr("y2", solidOriginPoints.C.y).attr('stroke', 'black');
    heightRight.transition().duration(1000).attr("x1", solidOriginPoints.B.x).attr("y1", solidOriginPoints.B.y).attr("x2", solidOriginPoints.D.x).attr("y2", solidOriginPoints.D.y).attr('stroke', 'black');
    heightBack.transition().duration(1000).attr("x1", solidOriginPoints.F.x).attr("y1", solidOriginPoints.F.y).attr("x2", solidOriginPoints.G.x).attr("y2", solidOriginPoints.G.y).attr('stroke', 'black');
    lengthLeft.transition().duration(1000).attr("x1", solidOriginPoints.C.x).attr("y1", solidOriginPoints.C.y).attr("x2", solidOriginPoints.F.x).attr("y2", solidOriginPoints.F.y).attr('stroke', 'black');
    lengthRight.transition().duration(1000).attr("x1", solidOriginPoints.D.x).attr("y1", solidOriginPoints.D.y).attr("x2", solidOriginPoints.E.x).attr("y2", solidOriginPoints.E.y).attr('stroke', 'black');
    lengthBottom.transition().duration(1000).attr("x1", solidOriginPoints.A.x).attr("y1", solidOriginPoints.A.y).attr("x2", solidOriginPoints.G.x).attr("y2", solidOriginPoints.G.y).attr('stroke', 'black');
    //Labels
    widthLabel.style.transitionDuration = "1.5s";
    widthLabel.style.top = solidOriginPoints.A.y + 125 + 'px';
    widthLabel.style.left = solidOriginPoints.A.x + (solidOriginPoints.B.x - solidOriginPoints.A.x) / 2 + 25 + 'px';
    widthLabel.style.color = "#242424";
    lengthLabel.style.top = solidOriginPoints.E.y - (solidOriginPoints.E.y - solidOriginPoints.D.y) / 2 + 100 + 'px';
    lengthLabel.style.left = solidOriginPoints.E.x + (solidOriginPoints.D.x - solidOriginPoints.E.x) / 2 + 50 + 'px';
    lengthLabel.style.transitionDuration = "1.5s";
    lengthLabel.style.color = "#242424";
    heightLabel.style.top = solidOriginPoints.C.y - (solidOriginPoints.C.y - solidOriginPoints.B.y) / 2 + 100 + 'px'; //Change on height change  600  top: 0 - 600 | bottom: 600 - 0
    heightLabel.style.left = solidOriginPoints.B.x + 50 + 'px'; // '100px';  //Change on width change 600  left: 0 - 600 | right: 600 - 0
    heightLabel.style.transitionDuration = "1.5s";
    heightLabel.style.color = "#242424";
    $('.measureType').show();
}
