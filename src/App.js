import React from 'react';
import './App.css';

function App() {
  const [count, setCount] = React.useState(0);
  const [list, setList] = React.useState([{id: 0, title: "", description:""}])
  const [mySave, setMySave] = React.useState([])

  const getCount = (type) => {
    let newList = list
    if (count === 0) {
      if (type === 'plus') {
        setCount(count + 1)
        newList.push({id: count + 1, title: "", description: ""});
        setList(newList)
      }
    }else {
      if (type === 'plus') {
        setCount(count + 1)
        newList.push({id: count + 1, title: "", description: ""});
        setList(newList)
      }else if (type === 'minus') {
        setCount(count - 1)
        let newList2 = [];
        newList.forEach(item => {
          if (item.id < count) {
            newList2.push(item)
          }
        })
        setList(newList2)
      }
    }
  };

  const handleChange = (e, id) => {
    let newList = list;
    newList.forEach(item => {
      if (item.id === id) {
        item[`${e.target.name}`] = e.target.value;
      }
    })
    setList(newList)
  };

  const getSave = () => {
    let myList = list;
    setMySave([...list, myList[myList.length - 1]])
  };
  
  return (
    <div className="App">
      <h1>Custom Spesification</h1>
      <button style={{width: '60px', height: "30px",marginRight: '10px', fontWeight: 'bolder', fontSize: '15px'}} type="button" onClick={() => getCount('plus')}>+</button>
      <button style={{width: '60px', height: "30px",marginRight: '10px', fontWeight: 'bolder', fontSize: '15px'}} type="button" onClick={() => getCount('minus')}>-</button>
      <hr />
      {list.map((item, index) => {
        return(
          <div key={index} >
            <input placeholder="Title" name="title" onChange={e => handleChange(e, item.id)} />
            <input placeholder="Description" name="description" onChange={e => handleChange(e, item.id)}/>
          </div>
        )
      })}
      <button style={{marginTop: '15px'}} type="button" onClick={getSave}>Save</button>
      <hr />
      <ItemList save={mySave} />
    </div>
  )

};


function ItemList(props) {

  const [save, setSave] = React.useState([]);

  React.useEffect(() => {
    setSave(props.save)
  },[props.save])

  return (
    <React.Fragment>
      {save.map((item, index) => {
        if (item.title !== "" && item.description !== "") {
          return(
            <div key={index}>
              <h2>{item.title}: {item.description}</h2>
            </div>
          )
        }
        return ""
      })}
    </React.Fragment>
  )
}
 
export default App;