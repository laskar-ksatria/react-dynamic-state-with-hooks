import React from 'react';

function DynamicForm() {


    const [state, setState] = React.useState([]);
    const [listItem, setListItem] = React.useState([]);


    const getForm = (type) => {
        let count = state.length;
        if (type === 'plus') {
            setState(prevState => ([...prevState, {id: count, title: "", description: ""}]))
        }else if (type === 'minus') {
            if (count > 0) {
                let newState = [];
                state.forEach(item => {
                    if (item.id < count - 1) {
                        newState.push(item)
                    }
                })
                setState(newState)
            }
        }
    };


    const handleChange = (e, id) => {
        
        let newState = state
        newState.forEach(item => {
            if (item.id === id) {
                item[`${e.target.name}`] = e.target.value;
            }
        })
        setState(newState);
    };

    const getSave = () => {
        let newState = state;
        let newState2 = []
        newState.forEach(item => {
            if (item.title !== "") {
                newState2.push(item)
            } 
        })
        setListItem(newState2);
    };


    return (
        <React.Fragment>
            <button style={{cursor: 'pointer'}} type="button" onClick={() => getForm('plus')}>Tambah</button>
            <button style={{cursor: 'pointer'}} type="button" onClick={() => getForm('minus')}>Kurang</button>
            <hr />
            
            {state.map((item, index) => {
                if (item) {
                    return (
                        <div key={index}>
                            <input name="title" placeholder="Title" onChange={(e) => handleChange(e, item.id)} />
                            <input name="description" placeholder="Description" onChange={(e) => handleChange(e, item.id)} />
                        </div>
                    )
                }else {
                    return ""
                }
            })}

            <button onClick={getSave} style={{marginTop: '10px', cursor: 'pointer'}} type="button">Save</button>

            <hr />

            {listItem.map((item, index) => {
                if (item.title === "") {
                    return(
                        <div key={index}>
                            <h3>{index + 1}. Hallo: {item.description}</h3>
                        </div>
                    )
                }else {
                    return(
                        <div key={index}>
                            <h3>{index + 1}. {item.title}: {item.description}</h3>
                        </div>
                    )
                }
            })}

            {/* <table>
                <thead>
                    <tr>
                        <td>No</td>
                        <td>Title</td>
                        <td>Description</td>
                    </tr>
                </thead>
            
            
            <tbody>


            {listItem.map((item,index) => {
            
                    return (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.title}</td>
                            <td>{item.description}</td>
                        </tr>
                    )

            })}


            </tbody>
            </table> */}

        </React.Fragment>

    )

};

export default DynamicForm