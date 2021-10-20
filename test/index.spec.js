import app from "../src/server.js";
import request from "supertest";

describe('Get /task', () => {

    test('should response with a 200 status code', async () => {
        const res = await request(app).get("/task").send();
        expect(res.status).toBe(200);
    });

    test('should response with an array', async () => {
        const res = await request(app).get("/task").send();
        expect(res.body).toBeInstanceOf(Array);
    });
});

describe('Post /task', () => {

    test('should response with a 200 status code', async () => {
        const res = await request(app).post("/task").send({
            title: "jest" , 
            task:"aprendiendo jest"
        });
        expect(res.statusCode).toBe(200);
    });

   
    test('should have a content-type: application/json in header', async () => {
        const res = await request(app).post("/task").send();
        expect(res.headers['content-type']).toEqual(expect.stringContaining("json"));
    });

    test('should response with an task ID', async () => {
        const res = await request(app).post("/task").send({
            title: "jest" , 
            task:"aprendiendo jest"
        });
        expect(res.body.id).toBeDefined();
    });
   
    test('should response a 400 status code', async () => {
        const fields = [
            {},
            {title:'Jest'},
            {task: 'aprender jest'}
        ];

        for ( const body of fields ){
            const res = await request(app).post("/task").send(body);
            expect(res.status).toBe(400);
        }
        
    });
});