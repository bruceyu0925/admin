var List_Array = [],
    List_Total,
    Search_Array = [],
    Search_Total,
    Page_All,
    Page_Num,
    Page_Len = 10;

// Page --------------------------------------------------

// func 產生頁碼
const PageHtml = () => {

    getId( 'PageList' ).innerHTML = '';

    var l = [];
    
    // 頁碼dom
    const p = ( n ) => {

        var h = `<button class="page-li page-btn" id="${ 'Page' + n }" onclick="PageClick(${ n })">${ n }</button>`;

        if( n === '' ) h = '<div class="page-dot">···<div>';

        return `<li>${ h }</li>`;
    };

    // 不超過7頁
    if ( Page_All <= 7 ) {

        for( let i = 1 ; i <= Page_All ; i++ ) {
            l.push( i )
        }

    // 超過7頁
    } else {

        var f = Page_Num - 2,
            b = Page_Num + 2;

        // 第一頁
        if( f - 1 === 1 ) {
            l.push( 1 )

        } else if( f - 1 > 1 ) {
            l.push( 1 , '' )
        }

        // 前後2頁
        if( f - 1 < 1 ) {
            f = 1;
            b = f + 4;

        } else if( b + 1 > Page_All ) {
            b = Page_All;
            f = b - 4;
        }

        for( let i = f ; i <= b ; i++ ){
            l.push( i )
        }
        
        // 最終頁
        if( b + 1 === Page_All ) {
            l.push( Page_All )

        } else if( b + 1 < Page_All ) {
            l.push( '' , Page_All )
        }
    }
    // 產生dom
    l.forEach( el => 
        getId( 'PageList' ).insertAdjacentHTML( 'beforeend' , p( el ) ) 
    );
};

// func 頁碼點選
const PageClick = ( n ) => {
    Page_Num = n;
    PageHtml();
    ListHtml();
};

// func 頁碼判斷
const PageJudge = () => {

    if ( Page_All <= 1 ) {
        getId( 'PagePrev' ).disabled = true;
        getId( 'PageNext' ).disabled = true;

    } else if ( Page_Num === 1 ) {
        getId( 'PagePrev' ).disabled = true;
        getId( 'PageNext' ).disabled = false;

    } else if ( Page_Num === Page_All ) {
        getId( 'PagePrev' ).disabled = false;
        getId( 'PageNext' ).disabled = true;
        
    } else {
        getId( 'PagePrev' ).disabled = false;
        getId( 'PageNext' ).disabled = false;
    };

    try {
        queOne( '.page-li.--click' ).classList.remove( '--click' );
    } catch {};

    try {
        getId( 'Page' + Page_Num ).classList.add( '--click' );
    } catch {};
};

// event 上一頁
getId( 'PagePrev' ).onclick = () => PageClick( Page_Num - 1 );

// event 下一頁
getId( 'PageNext' ).onclick = () => PageClick( Page_Num + 1 );


// List --------------------------------------------------

// event 執行搜尋
getId( 'FormSearch' ).onclick = () => {

    Loading( true );
    ListFilter();

    var s = queOne( '.td-sort-btn.--click' ),
        v = s.value;
    alert('dfdf')
    // 處理排序
    // Search_Array.sort( ( a , b ) => {

    //     if( s.classList.contains( '--max' ) ) {
    //         return a[ v ] < b[ v ] ? 1 : -1

    //     } else if( s.classList.contains( '--min' ) ) {
    //         return a[ v ] > b[ v ] ? 1 : -1
    //     }
    // });
    
    // 處理參數
    Search_Total = Search_Array.length;
    Page_All     = Math.ceil( Search_Total / Page_Len );
    Page_Num     = 1;
    
    setTimeout( () => {

        Loading( false );
        PageHtml();
        ListHtml();

        getId( 'SearchTotal' ).innerHTML = '共 ' + Search_Total + ' 筆資料';
        
    } , 300 );
};

// event 重設搜尋
getId( 'FormReset' ).onclick = () => {

    queAll( '.form-input' ).forEach( el => el.value = '' );
    getId( 'FormSearch' ).click();
};

// event 切換排序
queAll( '.td-sort-btn' ).forEach( el => {

    el.onclick = () => {

        if( el.classList.contains( '--click' ) ) {

            el.classList.toggle( '--max' );
            el.classList.toggle( '--min' );
        }

        queOne( '.td-sort-btn.--click' ).classList.remove( '--click' );
        el.classList.add( '--click' );

        getId( 'FormSearch' ).click();
    }
});