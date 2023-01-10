// import IUsers from '../types/User' - TODO: faire une belle interface 

export default function UserList() {

    const [fetchUsers, setFetchUsers] = useState<any>("");

    useEffect( () => {

        fetch('http://localhost:5657', {
            method: "GET",
            mode: "cors",
            credentials: "include"
        } )
            .then((response) =>  response.json())
            .then((data) => {
                setFetchUsers(data);
            }).catch(error => console.log("Erreur dans la requête fetch : " + error))
    }, [])

    return (
            <>
            {fetchUsers.post?.map( (item: any, key: any) => (
                    <div className="main-category-container"  key={key}>

                            <div
                                className="background-text"
                            />
                        <div className="body">
                            <h1>{item['title']}</h1>
                            <p>{item['post']}</p>
                        </div>
                    </div>
            ))}
        </>
    );
};


