import React, { useState, useEffect } from "react";
import Axios from "axios";

export default function Department(props) {
  const [department, setDepartment] = useState({});
  const [items, setItems] = useState([]);
  useEffect(() => {
    // axios call to deparment show
    Axios.get(`/api/departments/${props.match.params.id}`)
      .then((res) => {
        setDepartment(res.data);
        Axios.get(`/api/departments/${res.data.id}/items`).then((res) => {
          setItems(res.data);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  async function deleteItem(id) {
    console.log(id);
    const res = await Axios.delete(
      `/api/departments/${department.id}/items/${id}`
    );
    const filteredItems = items.filter((i) => i.id !== res.data.id);
    setItems(filteredItems);
  }

  function renderItems() {
    return items.map((i) => (
      <div
        style={{
          marginBottom: "10px",
          padding: "10px",
          border: "1px solid #777",
        }}
      >
        <h6 style={{ margin: 0 }}>{i.name}</h6>
        <p>{i.price}</p>
        <button onClick={() => deleteItem(i.id)}>delete</button>
      </div>
    ));
  }
  return (
    <div>
      <h1>{department.name}</h1>
      {props.match.params.id} - {department.id}
      <div onClick={props.history.goBack}>go back</div>
      {renderItems()}
    </div>
  );
}
