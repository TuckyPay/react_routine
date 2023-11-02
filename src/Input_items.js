import { useState, useEffect } from "react";
import { auth, database } from "./firebase";
import { ref, set } from "firebase/database";
import { useAuthState } from 'react-firebase-hooks/auth';

let items = [
  {id:0, item:"Blenderを使って何か作る", on_check:""},
  {id:1, item:"何か絵を描く", on_check:""},
  {id:2, item:"何かプログラムを書く", on_check:""}
];

export default function InputItems() {
  const data = items.map((item) => {
    return (
      <div className="item_box" key={item.id}>
        <label><input type='checkbox' value={item.item} onChange={() => handleOnClick(item.id)}></input>{item.item}</label>
        <button>delete</ button>
      </div>
    );
    });

  //[MEMO] DBに実際に書き込む
  const [hash, setHash] = useState(null);
  const [user] = useAuthState(auth);
  const write_db = (hash) => {
    set(ref(database, 'root/' + hash), {
      //[MEMO] オブジェクト型が入った配列をそのままpush
      items
    })
  }

  //[TODO] DBの値を読み込んで，input要素に反映させる．
  //[参考資料] https://helixcode.notion.site/React-firebase-a91c3cb01fbd4cb1a3ff29471919f9c8#711f1f963ec04a49a9e431fc54c6fc68

  //[MEMO] SHA256で与えられた文字列をハッシュ化する関数
  async function sha256(text) {
    const uint8 = new TextEncoder().encode(text);
    const digest = await crypto.subtle.digest('SHA-256', uint8);
    return Array.from(new Uint8Array(digest)).map(v => v.toString(16).padStart(2, '0')).join('');
  }

  //{MEMO} ログイン情報からハッシュ値を作成する関数
  useEffect(() => {
    sha256(user.email.replaceAll(".", "_").replaceAll("@", "_at_")).then(_hash => {
      setHash(_hash);
    });
  }, []);

  const handleOnClick = (v) => {
    for(let i = 0; i < items.length; i++){
      if(items[i].id === v) {
        if(items[i].on_check === "") {
          items[i].on_check = "checked";
        }else if(items[i].on_check === "checked") {
          items[i].on_check = "";
        }
      }
    }
    write_db(hash);
  }

  return (data);
}