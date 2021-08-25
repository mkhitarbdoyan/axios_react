
function HeadItem(props) {

    const { actionEdit, actionDelete, index, actionValueEdit } = props;
    const vichak = props.item.vichak;
    const text = props.item.text;


    console.log("vichak", vichak);

    if (!vichak) {
        return (
            <div>
                <span>{text}</span>
                <button onClick={(evt) => {
                    actionEdit(index);
                }}>Edit</button>
                <button onClick={() => {
                    actionDelete(index);
                }}>X</button>

            </div>
        )


    }

    else {
        return (
            <div>
                <button onClick={(evt) => {
                    actionEdit(index);
                }}>OK</button>
                <button onClick={() => {
                    actionDelete(index);
                }}>X</button>
                <input type="text" value={text} onChange={(evt) => {
                    actionValueEdit(index, evt.target.value);
                }}></input>
            </div>
        )
    }


}



export default HeadItem;