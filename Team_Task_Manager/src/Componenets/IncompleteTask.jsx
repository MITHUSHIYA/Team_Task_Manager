import Card from "../grid/Card"

const IncompleteTask = () =>{
    return(
        <div>
            <h1>Incomplete Tasks</h1>
            <Card home={false} showInCompOnly={true}/>
        </div>
    )
}
export default IncompleteTask