import Card from "../grid/Card"

const CompleteTask =() =>{
    return(
        <div>
            <h1>Completed Tasks</h1>
            <Card home={false} showCompOnly={true}/>
        </div>
    )
}
export default CompleteTask