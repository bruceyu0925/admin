// 圖片拖曳
var Bw , Bh , Iw , Ih , Sx , Sy;

window.onload = () => {
    getId( 'FormImg' ).addEventListener( 'mousedown'  , dragStart );
    getId( 'FormImg' ).addEventListener( 'touchstart' , dragStart , { passive: false } );
    dragReset();
}

// 參數重設
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

// 點選圖片
function dragStart( e ) {
    e.preventDefault();
    Sx = e.clientX || e.targetTouches[ 0 ].pageX;
    Sx = Sx - getId( 'FormImg' ).style.left.replace( '%' , '' ) * Bw / 100;
    Sy = e.clientY || e.targetTouches[ 0 ].pageY;
    Sy = Sy - getId( 'FormImg' ).style.top .replace( '%' , '' ) * Bh / 100;
    document.addEventListener( 'mousemove' , dragMove );
    document.addEventListener( 'mouseup'   , dragStop );
    document.addEventListener( 'touchmove' , dragMove , { passive: false } );
    document.addEventListener( 'touchend'  , dragStop , { passive: false } );
}

// 拖動圖片
function dragMove( e ) {
    try {
        var x = e.clientX || e.targetTouches[ 0 ].pageX,
            y = e.clientY || e.targetTouches[ 0 ].pageY;
        x = x - Sx;
        y = y - Sy;
        x < Bw - Iw ? x = Bw - Iw : null;
        x > 0       ? x = 0       : null;
        y < Bh - Ih ? y = Bh - Ih : null;
        y > 0       ? y = 0       : null;
        getId( 'FormImg' ).style.left = Math.round( x / Bw * 100 ) + '%';
        getId( 'FormImg' ).style.top  = Math.round( y / Bh * 100 ) + '%';
    } catch {}
}

// 放掉圖片
function dragStop() {
    document.removeEventListener( 'mousemove' , dragMove );
    document.removeEventListener( 'mouseup'   , dragStop );
    document.removeEventListener( 'touchmove' , dragMove , { passive: false } );
    document.removeEventListener( 'touchend'  , dragStop , { passive: false } );
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
        r = new FileReader();
    r.onload = e => {
        resizeImage( e.target.result , 594 , 1 , src => {
            getId( 'FormImg' ).setAttribute( 'src' , src );
            getId( 'FormImg' )   .style.display = 'block';
            getId( 'FormImgDel' ).style.display = 'flex';
            getId( 'FormImg' ).onload = () => dragReset();
            Loading( false );
        })
    }
    try {
        r.readAsDataURL( f );
        Loading( true );
    } catch {}
}

// 圖片壓縮
function resizeImage( base64 , maxLW , quality , callback ) {
    var i = new Image(),
        c = document.createElement( 'canvas' ),
        x = c.getContext( '2d' );
    i.src = base64;
    i.onload = () => {
        var w = i.width,
            h = i.height;
        if( w > maxLW || h > maxLW ) {
            if( w > h ) {
                h = h / ( w / maxLW );
                w = maxLW;
            } else {
                w = w / ( h / maxLW );
                h = maxLW;
            }
        }
        c.width  = w;
        c.height = h;
        x.drawImage( i , 0 , 0 , w , h );
        callback( c.toDataURL( 'image/jpeg', quality ) );
    }
};