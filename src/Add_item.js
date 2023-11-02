let items = [

]

function Add_item() {
  return (
    <div className='add_item'>
      <input type='text' id="add_text"></input>
      <button onClick={on_click}>submit</button>
    </div>
  );
}

function on_click() {
  const content_box = document.querySelectorAll(".item_box");
  const add_text_area = document.querySelector("#add_text");
  items.push({id:content_box.length, data:add_text_area.value, on_check:""});
  console.log(items);
}

/*[ToDo]
  firebaseサーバから情報をとってきて，それにon_click関数で新しいitemを追加するようにする．
  新しいitemを追加した状態のものをfirebaseサーバに送信しする．
*/ 

export default Add_item;