import fetch from 'node-fetch';

export default async function testCaseHandler({query: {id}}, res) {
    console.log('testCaseHandler id', id);
    var options = {
        method: 'GET',
        headers: {
            'content-type': 'application/json; charset=utf-8',
            authorization: process.env.TM4J_API_KEY,
        },
    };
    const caseResponse = await fetch(`https://api.adaptavist.io/tm4j/v2/testcases/${id}`, options);

    const caseJson = await caseResponse.json();
    if (!caseJson) {
        res.status(404).json({message: `Test case for ${id} not found.`});
    }

    const stepResponse = await fetch(`https://api.adaptavist.io/tm4j/v2/testcases/${id}/teststeps`, options);
    const stepJson = await stepResponse.json();
    if (!stepJson || !stepJson.values) {
        res.status(404).json({message: `Test step for ${id} not found.`});
    }

    res.status(200).json({
        key: caseJson.key,
        name: caseJson.name,
        objective: caseJson.objective,
        precondition: caseJson.precondition,
        steps: stepJson.values,
    });
}
