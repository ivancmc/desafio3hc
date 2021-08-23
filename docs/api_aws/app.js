const AWS = require("aws-sdk");

const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  let body;
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json"
  };

  try {
    switch (event.routeKey) {
      case "DELETE /leads/{id}":
        await dynamo
          .delete({
            TableName: "http-crud-leads",
            Key: {
              id: event.pathParameters.id
            }
          })
          .promise();
        body = `Deleted lead ${event.pathParameters.id}`;
        break;
      case "GET /leads/{id}":
        body = await dynamo
          .get({
            TableName: "http-crud-leads",
            Key: {
              id: event.pathParameters.id
            }
          })
          .promise();
        break;
      case "GET /leads":
        body = await dynamo
          .scan({ TableName: "http-crud-leads" })
          .promise();
        break;
      case "PUT /leads":
        let requestJSON = JSON.parse(event.body);
        await dynamo
          .put({
            TableName: "http-crud-leads",
            Item: {
              id: requestJSON.id,
              name: requestJSON.name,
              email: requestJSON.email,
              phone: requestJSON.phone
            }
          })
          .promise();
        body = `Put lead ${requestJSON.id}`;
        break;
      default:
        throw new Error(`Unsupported route: "${event.routeKey}"`);
    }
  } catch (err) {
    statusCode = 400;
    body = err.message;
  } finally {
    body = JSON.stringify(body);
  }

  return {
    statusCode,
    body,
    headers
  };
};
