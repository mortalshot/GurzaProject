function adjustLine(from, to, line) {

    var fT = from.offsetTop + from.offsetHeight / 2;
    var tT = to.offsetTop + to.offsetHeight / 2;
    var fL = from.offsetLeft + from.offsetWidth / 2;
    var tL = to.offsetLeft + to.offsetWidth / 2;

    var CA = Math.abs(tT - fT);
    var CO = Math.abs(tL - fL);
    var H = Math.sqrt(CA * CA + CO * CO);
    var ANG = 180 / Math.PI * Math.acos(CA / H);

    if (tT > fT) {
        var top = (tT - fT) / 2 + fT;
    } else {
        var top = (fT - tT) / 2 + tT;
    }
    if (tL > fL) {
        var left = (tL - fL) / 2 + fL;
    } else {
        var left = (fL - tL) / 2 + tL;
    }

    if ((fT < tT && fL < tL) || (tT < fT && tL < fL) || (fT > tT && fL > tL) || (tT > fT && tL > fL)) {
        ANG *= -1;
    }
    top -= H / 2;

    line.style["-webkit-transform"] = 'rotate(' + ANG + 'deg)';
    line.style["-moz-transform"] = 'rotate(' + ANG + 'deg)';
    line.style["-ms-transform"] = 'rotate(' + ANG + 'deg)';
    line.style["-o-transform"] = 'rotate(' + ANG + 'deg)';
    line.style["-transform"] = 'rotate(' + ANG + 'deg)';
    line.style.top = top + 15 + 'px';
    line.style.left = left + 'px';
    line.style.height = H - 15 + 'px';
}

setInterval(() => {
    adjustLine(
        document.getElementById('shop__chevron1'),
        document.getElementById('shop__chevron2'),
        document.getElementById('line1')
    );
    adjustLine(
        document.getElementById('shop__chevron1'),
        document.getElementById('shop__chevron3'),
        document.getElementById('line2')
    );
    adjustLine(
        document.getElementById('shop__chevron2'),
        document.getElementById('shop__chevron3'),
        document.getElementById('line3')
    );
    adjustLine(
        document.getElementById('shop__chevron2'),
        document.getElementById('shop__chevron4'),
        document.getElementById('line4')
    );
    adjustLine(
        document.getElementById('shop__chevron3'),
        document.getElementById('shop__chevron4'),
        document.getElementById('line5')
    );
    adjustLine(
        document.getElementById('shop__chevron4'),
        document.getElementById('shop__chevron5'),
        document.getElementById('line6')
    );
    adjustLine(
        document.getElementById('shop__chevron4'),
        document.getElementById('shop__chevron7'),
        document.getElementById('line7')
    );
    adjustLine(
        document.getElementById('shop__chevron4'),
        document.getElementById('shop__chevron8'),
        document.getElementById('line8')
    );
    adjustLine(
        document.getElementById('shop__chevron7'),
        document.getElementById('shop__chevron8'),
        document.getElementById('line9')
    );
    adjustLine(
        document.getElementById('shop__chevron8'),
        document.getElementById('shop__chevron5'),
        document.getElementById('line10')
    );
    adjustLine(
        document.getElementById('shop__chevron5'),
        document.getElementById('shop__chevron6'),
        document.getElementById('line11')
    );
    adjustLine(
        document.getElementById('shop__chevron5'),
        document.getElementById('shop__chevron9'),
        document.getElementById('line12')
    );
    adjustLine(
        document.getElementById('shop__chevron6'),
        document.getElementById('shop__chevron10'),
        document.getElementById('line13')
    );
    adjustLine(
        document.getElementById('shop__chevron9'),
        document.getElementById('shop__chevron10'),
        document.getElementById('line14')
    );
    adjustLine(
        document.getElementById('shop__chevron3'),
        document.getElementById('shop__chevron7'),
        document.getElementById('line15')
    );
    adjustLine(
        document.getElementById('shop__chevron7'),
        document.getElementById('shop__chevron11'),
        document.getElementById('line16')
    );
    adjustLine(
        document.getElementById('shop__chevron8'),
        document.getElementById('shop__chevron12'),
        document.getElementById('line17')
    );
    adjustLine(
        document.getElementById('shop__chevron9'),
        document.getElementById('shop__chevron12'),
        document.getElementById('line18')
    );
    adjustLine(
        document.getElementById('shop__chevron10'),
        document.getElementById('shop__chevron12'),
        document.getElementById('line19')
    );
    adjustLine(
        document.getElementById('shop__chevron9'),
        document.getElementById('shop__chevron6'),
        document.getElementById('line20')
    );
    adjustLine(
        document.getElementById('shop__chevron12'),
        document.getElementById('shop__chevron11'),
        document.getElementById('line21')
    );
    adjustLine(
        document.getElementById('shop__chevron12'),
        document.getElementById('shop__chevron13'),
        document.getElementById('line22')
    );
    adjustLine(
        document.getElementById('shop__chevron11'),
        document.getElementById('shop__chevron13'),
        document.getElementById('line23')
    );
    adjustLine(
        document.getElementById('shop__chevron13'),
        document.getElementById('shop__chevron14'),
        document.getElementById('line24')
    );
}, 500);
