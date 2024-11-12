export const exampleResponseCreate ={  
    "status": "success",
    "message": "Request successful",
    "data": {
        ok: true,
        msg: 'Tarea creada con exíto',
        data: "result"        
    }
}

export const exampleResponseUpdate ={
    "status": "success",
    "message": "Request successful",
    "data": {
        "_id": "6731fc25da6255dfef6d9ac3",
        "userId": "6731e5cc95b0522eec77c240",
        "title": "Tarea 210",
        "description": "Descripcion 210",
        "deadLine": "2024-11-11T23:59:59.000Z",
        "status": "COMPLETADO",
        "__v": 0
    }
}

export const exampleResponseDelete ={
    "status": "success",
    "message": "Request successful"
}

export const exampleResponseGetAll ={      
    "status": "success",
    "message": "Request successful",
    "data": [
        {
            "_id": "6731fecfb04f011f2b6e1e23",
            "userId": "6731e5cc95b0522eec77c240",
            "title": "Tarea 21",
            "description": "Descripcion 21",
            "deadLine": "2024-11-11T23:59:59.000Z",
            "status": "PENDIENTE",
            "__v": 0
        },
        {
            "_id": "6731fed5b04f011f2b6e1e25",
            "userId": "6731e5cc95b0522eec77c240",
            "title": "Tarea 22",
            "description": "Descripcion 22",
            "deadLine": "2024-11-11T23:59:59.000Z",
            "status": "PENDIENTE",
            "__v": 0
        }
    ]    
}

export const exampleResponseGetOne ={
    "status": "success",
    "message": "Request successful",
    "data": {
        "_id": "6731fc25da6255dfef6d9ac3",
        "userId": "6731e5cc95b0522eec77c240",
        "title": "Tarea 210",
        "description": "Descripcion 210",
        "deadLine": "2024-11-11T23:59:59.000Z",
        "status": "COMPLETADO",
        "__v": 0
    }
}

export const exampleResponseAuth ={  
    "status": "success",
    "message": "Request successful",
    "data": {
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3R1c2VyQGdtYWlsLmNvbSIsInN1YiI6IjY3MzMyMjlhMzE4NjZmODMzNDVlMmI2MiIsImlhdCI6MTczMTQwNDQ0NywiZXhwIjoxNzMxNDA4MDQ3fQ.oDLHs6hzGTtKHvMLfhSlqFT8lZWhcGLcqDaF_bDdSFA"
    }
}
