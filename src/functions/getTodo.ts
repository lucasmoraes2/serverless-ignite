import { document } from "src/utils/dynamodbClient";

export const handle = async (event) => {

    const { userid: user_id } = event.pathParameters;

    const response = await document.query({
        TableName: "users_todos",
        KeyConditionExpression: "user_id = :userid",
        ExpressionAttributeValues: {
            ":userid": user_id
        }
    }).promise();

    if(!response){
        return{
            statusCode: 400,
            body: JSON.stringify({
                message: "User does not exists.",            
            })
        }
    }

    return { 
        statusCode: 200,
        body: JSON.stringify({
            message: "Todos list!",
            content: response,
        }),
        headers: {
            "Content-type": 'application/json',
        },
    };
}