import "./Card.css"

const Card = () =>{
    const data = [
        {title:"Item 1",desc:"gdfbfdbnbvnvb"},
        {title:"Item 2",desc:"nbdsdfghjkj"},
        {title:"Item 3",desc:"jnkjdfsaretryftguyh"},
        {title:"Item 4",desc:"fdsgfgfhfgf"}
]
    return (
        <>
            <div className="list">
                {data && data.map((items,i)=>(
                    <div className="list-item">
                    <h2>{items.title}</h2>
                    <p>{items.desc}</p>
                    </div>
                ))}
            </div>
        </>
    )
}
export default Card;