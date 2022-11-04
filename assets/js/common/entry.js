// import 'core-js/stable';
// import 'regenerator-runtime/runtime';

import jQuery from 'jquery/dist/jquery';
window.jQuery = jQuery;
window.$ = jQuery;

import Events from './events';
new Events();

let str = 'test';

/*
if(str){
  const username = 'テスト';
  const useremail = 'info@fromo.dev';
  const shop_url = 'https://fromo.dev/';
  const base_logo_app_request = '希望する';
  const theme = 'BOLD.';
  const url = 'https://fromo.dev/';

  const str = `
  ${username} 様

  BASEショップパートナー申請ありがとうございます。
  送信いただいた情報を元にBASEに申請いたします。
  5〜10営業日以内にはBASEから承認される見込みです。

  ※BASE社の手続き状況により承認までに1ヵ月以上かかる場合がございます。あらかじめご了承ください。

  承認されましたらご入力いただいたメールアドレス宛にBASEから手続き完了の連絡がございます。
  今しばらくお待ちください。

  ------ 受付内容 ------
  【無償化特典をご希望のテンプレート名】
  ${theme}

  【BASEロゴ非表示Appの無償化特典】
  ${base_logo_app_request}

  【BASEショップURL】
  ${shop_url}

  【BASEショップ運営責任者の氏名】
  ${username}

  【メールアドレス】
  ${useremail}

  --------------------
  FROMO
  ${url}
  `.trim().replace( /^[^\S\n\r]+/gm, "" );

  console.log(str);
}

