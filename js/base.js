// module
const getId  = n => document.getElementById( n ),
      queOne = n => document.querySelector( n ),
      queAll = n => document.querySelectorAll( n ),
      GAS    = n => { return `https://script.google.com/macros/s/${ n }/exec` };

// func 讀取畫面
const Loading = ( state = true ) => {

    if( state === true ) {
        getId( 'Load' ).classList.add( '--show' );
        getId( 'Html' ).classList.add( '--lock' );

    } else if( state === false ) {
        getId( 'Load' ).classList.remove( '--show' );
        getId( 'Html' ).classList.remove( '--lock' );
    }
}

// func 日期轉換
const DateTran = ( date ) => {

    var n = new Date( date ),
        Y = ( n.getFullYear()  ).toString(),
        M = ( n.getMonth() + 1 ).toString(),
        D = ( n.getDate()      ).toString(),
        h = ( n.getHours()     ).toString(),
        m = ( n.getMinutes()   ).toString(),
        s = ( n.getSeconds()   ).toString();

    if ( M.length < 2 ) M = '0' + M;
    if ( D.length < 2 ) D = '0' + D;
    if ( h.length < 2 ) h = '0' + h;
    if ( m.length < 2 ) m = '0' + m;
    if ( s.length < 2 ) s = '0' + s;

    return `${ Y }-${ M }-${ D } ${ h }:${ m }:${ s }`
}

!function() {

    // 共用dom
    getId( 'Header' ).innerHTML =
        `<div class="header-head">
            <div id="BtnBurger">
                <i class="fas fa-bars"></i>
            </div>
            <a class="header-logo" href="#">
                <img src="/admin/image/logo.svg" class="__imgresp" alt="Bruce Yu Design">
            </a>
        </div>
        <div class="header-body">
            <span id="HeaderText"></span>
            <button id="BtbSet" class="header-btn">
                <i class="fas fa-cog"></i>
            </button>
            <button id="BtbLogout" class="header-btn">
                <i class="fas fa-sign-out-alt"></i>
            </button>
        </div>`;

    getId( 'Aside' ).innerHTML =
        `<a id="AsideHome" class="aside-li" href="/admin/index.html">
            <i class="fas fa-home"></i>
            首頁
        </a>
        <a id="AsideAccount" class="aside-li" href="/admin/account/index.html">
            <i class="fas fa-user-alt"></i>
            帳號管理
        </a>
        <a id="AsidePoster" class="aside-li" href="/admin/poster/index.html">
            <i class="fas fa-image"></i>
            海報管理
        </a>
        <a id="AsidePaint" class="aside-li" href="/admin/paint/index.html">
            <i class="fas fa-palette"></i>
            繪圖管理
        </a>
        <a id="AsideSkill" class="aside-li" href="/admin/skill/index.html">
            <i class="fas fa-wrench"></i>
            技能管理
        </a>`;

    // 路徑
    var href = ( location.href ).toString(),
        path = '';

    switch( true ) {

        case href.match( 'account' ) !== null:
            getId( 'AsideAccount' ).classList.add( '--click' );
            getId( 'HeadTitle' ).innerHTML = '帳號管理';
            path += '帳號管理';
            break;

        case href.match( 'poster' ) !== null:
            getId( 'AsidePoster' ).classList.add( '--click' );
            getId( 'HeadTitle' ).innerHTML = '海報管理';
            path += '海報管理';
            break;

        case href.match( 'paint' ) !== null:
            getId( 'AsidePaint' ).classList.add( '--click' );
            getId( 'HeadTitle' ).innerHTML = '繪圖管理';
            path += '繪圖管理';
            break;

        case href.match( 'skill' ) !== null:
            getId( 'AsideSkill' ).classList.add( '--click' );
            getId( 'HeadTitle' ).innerHTML = '技能管理';
            path += '技能管理';
            break;
    }

    href.match( 'kind' ) ? path += ' ／ 類別管理' : null;

    switch( true ) {

        case href.match( 'create' ) !== null:
            path += ' ／ 新增資料';
            break;

        case href.match( 'upload' ) !== null:
            path += ' ／ 修改資料';
            break;
    }

    getId( 'PathText' ).innerHTML = path;

    // 歡迎語
    getId( 'HeaderText' ).innerHTML = '您好，Bruce Yu！';
}()

getId( 'BtnBurger' ).onclick = () => {
    getId( 'Aside' ).classList.toggle( '--show' );
    getId( 'Main' ) .classList.toggle( '--lock' );
    getId( 'Html' ) .classList.toggle( '--lock' );
}