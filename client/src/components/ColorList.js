import React, { useState } from "react";
import { axiosWithAuth } from "./axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) =>
{
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e =>
  {
    e.preventDefault();

    let Build = colorToEdit;
    Build.color = e.target[0].value;
    Build.code.hex = e.target[1].value;

    axiosWithAuth().put(`/colors/${Build.id}`, Build).then((response)=>
    {
      updateColors(colors.map((i)=>{return i.id === response.data.id ? response.data : i}));
      setEditing(false);
    }).catch((error)=>
    {
      console.log(error);
    })
  };

  const deleteColor = color =>
  {
    axiosWithAuth().delete(`/colors/${color.id}`).then((response)=>
    {
      if (response.statusText === "Accepted")
        updateColors(colors.filter((e)=>{return e.id === color.id ? false : true}));
    }).catch((error)=>
    {
      console.log(error);
    });
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
        <form onSubmit={(e)=>
        {
          e.preventDefault();
          let NewColor =
          {
            code:
              {
                hex:e.target.hex.value
              },
            color:e.target.name.value
          }
          axiosWithAuth().post("/colors", NewColor).then((response)=>
          {
            updateColors(response.data);
          }).catch((error)=>
          {
            console.log(error.response.data);
          })
        }}>
          <input type="text" name="name" placeholder="Name" />
          <input type="text" name="hex" placeholder="Hex Color" />
          <button type="submit">Add color</button>
        </form>
      <div className="spacer" />

      </div>
  );
};

export default ColorList;
