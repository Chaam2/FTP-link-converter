// 쿠키 설정 함수
function setCookie(name, value, days) {
  var expires = '';
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie = name + '=' + (value || '') + expires + '; path=/';
}

// 쿠키 가져오기 함수
function getCookie(name) {
  var nameEQ = name + '=';
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

// 페이지 로드 시 쿠키에서 계정 이름 로드
window.onload = function () {
  var savedAccountName = getCookie('accountName');
  if (savedAccountName) {
    document.getElementById('accountName').value = savedAccountName;
    document.getElementById('remember').checked = true;
  }
};

// 링크 변환 함수
function convertLink() {
  // 계정 이름과 입력된 FTP 링크를 가져옴
  var accountName = document.getElementById('accountName').value;
  var ftpLinks = document.getElementById('ftpLink').value.split('\n');

  // 결과를 저장할 배열
  var results = [];

  // 각 링크를 변환
  for (var i = 0; i < ftpLinks.length; i++) {
    var ftpLink = ftpLinks[i].trim();
    if (ftpLink) {
      var httpLink = ftpLink.replace(/ftp:\/\/[^@]+@/, 'http://');
      httpLink = httpLink.replace(/\/{2,}/g, '/');
      httpLink = httpLink.replace('http:/', 'http://');
      var imgTag = '<img src="' + httpLink + '"/>';
      results.push(imgTag);
    }
  }

  // 결과 표시
  var resultElement = document.getElementById('result');
  resultElement.value = results.join('\n');

  // 기억하기 체크되어 있으면 쿠키에 계정 이름 저장
  if (document.getElementById('remember').checked) {
    setCookie('accountName', accountName, 30); // 30일 동안 쿠키 저장
  } else {
    setCookie('accountName', '', -1); // 쿠키 삭제
  }
}

// 복사 기능 추가
function copyToClipboard() {
  var resultElement = document.getElementById('result');
  resultElement.select();
  resultElement.setSelectionRange(0, 99999); // 모바일 장치에서의 선택 범위
  document.execCommand('copy');
  alert('복사되었습니다: ' + resultElement.value);
}
