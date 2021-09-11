import { document } from "../utils/dynamodbClient";
import { v4 as uuidv4 } from "uuid";

interface ICreateTodo {
  title: string;
  deadline: Date;
}

export const handle = async (event) => {

    const { userid: user_id } = event.pathParameters;
    const { title, deadline } = JSON.parse(event.body) as ICreateTodo;

    const response = await document.put({
      TableName: "users_todos",
      Item: {
        id: uuidv4(),
        user_id,
        title,
        done: false,
        deadline: new Date(deadline)
      }
    }).promise();

    return {
      statusCode: 201,
      body: JSON.stringify({
        message: "Todo Created!",
        content: response,
      }),
      headers: {
        "Content-type": "application/json",
      },
    }
};