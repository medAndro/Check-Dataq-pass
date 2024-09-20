// ==UserScript==
// @name         Dataq 데이터자격검정 필기 야매합
// @namespace    https://github.com/medAndro/Check-Dataq-pass
// @version      0.9
// @description  스크립트를 적용한 뒤 https://www.dataq.or.kr/www/mypage/accept/result.do 에서 새로고침 하세요.
// @author       medandro
// @match        https://www.dataq.or.kr/www/mypage/accept/result.do
// @icon         https://www.google.com/s2/favicons?sz=64&domain=dataq.or.kr
// @grant        none
// @updateURL    https://raw.githubusercontent.com/medAndro/Check-Dataq-pass/main/Check-Dataq-pass.js
// @downloadURL  https://raw.githubusercontent.com/medAndro/Check-Dataq-pass/main/Check-Dataq-pass.js
// @supportURL   https://github.com/medAndro/Check-Dataq-pass/issues
// ==/UserScript==


var button1 = $('<button>').text('야매 필기합격확인서').addClass('btn btn-primary').click(function() {
    var $scope = {
        loading : false
        , examopr : { info : {aplySeq : 0} }
        , list : []
        , phtchgInfo : {}
    };
    var nparmap = {};
    $.rest.url(contextRoot + '/mypage/accept/result.dox').post({
        param : nparmap,
        success : function(data, status){
            $scope.list = data.list;
            $scope.listCnt = data.list.length;
            $scope.examopr.info = $scope.list[0];

            var selectObj = $("input[name=idx]:checked");

            if(selectObj.length != 1){
                alert("시험을 선택하여 주십시오.");
                return;
            }
            $scope.examopr.info = $scope.list[selectObj.val()];
            var examinfo = $scope.examopr.info;
            webUtil.fnLypop_remove(3);

            // SiteFunction.prototype.openPgPass({aplySeq : examinfo.aplySeq});
            console.log(examinfo);
            siteFn.openPgPass({aplySeq : examinfo.aplySeq , class1 : examinfo.class1, encAplySeq: examinfo.encAplySeq , encUserId: examinfo.encUserid});

        }
    });
});

setTimeout(() => {
    $('.io-fn-openPilgiPrint').after(button1);
}, "500");
