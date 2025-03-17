import Card from "../grid/Card"

const ImportantTask =()=>{
    return(
        <div>
            <h1>Important Task</h1>
            <Card home={false} showImportantOnly={true}/>
        </div>
    )
}
export default ImportantTask