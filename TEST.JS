const { PutItemCommand, DynamoDBClient } = require("@aws-sdk/client-dynamodb");

const client = new DynamoDBClient({
    region: "us-east-1",
    credentials: {
        accessKeyId: "AKIAWTIA3STNB4B3VHMG",
        secretAccessKey: "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",
    },
});

/**
 * @description Function to delete a given arn topic
 * @param {string} topicArn - ARN of topic to delete
 * @returns Response of client to command, if error returns the error
 */
async function test(topicArn) {
    try {
        const command = new PutItemCommand({
            TableName: "PalletizedDetails",
            Item: {
                IDPalletizedDetails: { S: "1" },
                test: { S: "TEST" },
            },
        });
        const response = await client.send(command);
        return response;
    } catch (err) {
        console.error(err);
        return err;
    }
}

async function main() {
    try {
        await test();
    } catch (error) {
        console.error(error);
    }
}

main();
