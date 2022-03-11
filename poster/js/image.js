// 圖片拖曳
var Bw , Bh , Iw , Ih , Sx , Sy;

window.onload = () => {
    getId( 'FormImg' ).addEventListener( 'mousedown' , dragStart );
    dragReset();
}

function dragReset() {
    var w = getId( 'FormImg' ).offsetWidth,
        h = getId( 'FormImg' ).offsetHeight,
        s = getId( 'FormImg' ).style;
    switch( true ) {
        case w > h:
            s.width  = 'auto';
            s.height = '100%';
            break;
        case h > w:
            s.width  = '100%';
            s.height = 'auto';
            break;
    }
    s.top  = '0%';
    s.left = '0%';
    Bw = getId( 'FormBlock' ).offsetWidth;
    Bh = getId( 'FormBlock' ).offsetHeight;
    Iw = getId( 'FormImg' )  .offsetWidth;
    Ih = getId( 'FormImg' )  .offsetHeight;
}

function dragStart( e ) {
    e.preventDefault();
    Sx = e.clientX - getId( 'FormImg' ).style.left.replace( '%' , '' ) * Bw / 100;
    Sy = e.clientY - getId( 'FormImg' ).style.top .replace( '%' , '' ) * Bh / 100;
    document.addEventListener( 'mousemove' , dragMove );
    document.addEventListener( 'mouseup'   , dragStop );
}

function dragMove( e ) {
    var x = e.clientX - Sx,
        y = e.clientY - Sy;
    x < Bw - Iw ? x = Bw - Iw : null;
    x > 0       ? x = 0       : null;
    y < Bh - Ih ? y = Bh - Ih : null;
    y > 0       ? y = 0       : null;
    getId( 'FormImg' ).style.left = Math.round( x / Bw * 100 ) + '%';
    getId( 'FormImg' ).style.top  = Math.round( y / Bh * 100 ) + '%';
}

function dragStop() {
    document.removeEventListener( 'mousemove' , dragMove );
    document.removeEventListener( 'mouseup'   , dragStop );
}

// 刪除圖片
getId( 'FormImgDel' ).onclick = () => {
    getId( 'FormImgDel' ).style.display = 'none';
    getId( 'FormImg' )   .style.display = 'none';
    getId( 'FormImg' ).setAttribute( 'src' , '' );
}

// 新增圖片
getId( 'FormImgAdd' ).onclick = () => {
    getId( 'FormFile' ).click();
}

getId( 'FormFile' ).onchange = () => {
    var f = getId( 'FormFile' ).files[ 0 ],
        r = new FileReader;
    r.onload = ( e ) => {
        getId( 'FormImg' ).setAttribute( 'src' , e.target.result );
        getId( 'FormImg' )   .style.display = 'block';
        getId( 'FormImgDel' ).style.display = 'flex';
        getId( 'FormImg' ).onload = () => dragReset();
    }
    try{
        r.readAsDataURL( f );
    } catch {}
}