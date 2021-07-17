const supertest = require('supertest');
const app = require('../API');

describe('regular POST request testing', () => {
    let request = supertest(app);

    test('Valid POST request for section (/api/section)', async () => {
        const resp = await request.post('/api/section').type('form').send({section: 'Evening'}).set('Accept', 'application/json');
        expect(resp.statusCode).toBe(200);
        expect(resp.body.section_name).toBe('Evening')
    });
    test('Invalid POST request for section - wrong argument (/api/section)', async () => {
        const resp = await request.post('/api/section').type('form').send({ddddd: 'Evening'}).set('Accept', 'application/json');
        expect(resp.statusCode).toBe(400);
        expect(resp.body.errors[0].message).toBe('Section.section_name cannot be null')
    });
    test('POST request for task (/api/task)', async () => {
        const resp = await request.post('/api/task').type('form').send({title: 'Waking Up', description: 'Getting out of bed slowly', labels: 'days', sectionIDForTask: 1}).set('Accept', 'application/json');
        expect(resp.statusCode).toBe(200);
        expect(resp.body.task_name).toBe('Waking Up')
    });
    test('Invalid POST request for task - wrong argument (/api/task)', async () => {
        const resp = await request.post('/api/task').type('form').send({ddddd: 'Waking Up'}).set('Accept', 'application/json');
        expect(resp.statusCode).toBe(400);
        expect(resp.body.errors[0].message).toBe('Task.task_name cannot be null')
    });
});

describe('regular GET request testing', () => {

    let request = supertest(app);

    test('GET request from test param (/api)', async () => {
        const resp = await request.get('/api');
        expect(resp.statusCode).toBe(200);
        expect(resp.body.message).toBe('Hello from server!')
    });
    test('GET request to return all entries for section (/api/section)', async () => {
        const resp = await request.get('/api/section');
        const section = resp.body[0];
        expect(resp.statusCode).toBe(200);
        expect(resp.body.length).toEqual(1);
        expect(section.section_name).toBe('Evening');
    });
    test('GET request to return all entries for task (/api/task)', async () => {
        const resp = await request.get('/api/task');
        const task = resp.body[0];
        expect(resp.statusCode).toBe(200);
        expect(resp.body.length).toEqual(1);
        expect(task.task_name).toBe('Waking Up');
        expect(task.task_description).toBe('Getting out of bed slowly');
        expect(task.task_labels).toBe('days')
    });
});

describe('regular PUT request testing', () => {
    let request = supertest(app);

    test('Valid PUT request for section (/api/section/1)', async () => {
        const resp = await request.put('/api/section/1').type('form').send({section: '7am'}).set('Accept', 'application/json');
        expect(resp.statusCode).toBe(204);
        const resp2 = await request.get('/api/section');
        const section = resp2.body[0];
        expect(section.section_name).toBe('7am');
    });
    test('Invalid PUT request for section (/api/section/1)', async () => {
        const resp = await request.put('/api/section/1').type('form').send({ddddd: '8am'}).set('Accept', 'application/json');
        expect(resp.statusCode).toBe(400);
    });
    test('Valid PUT request for task title (/api/task/1)', async () => {
        const resp = await request.put('/api/task/1').type('form').send({title: 'Breakfast'}).set('Accept', 'application/json');
        expect(resp.statusCode).toBe(204);
        const resp2 = await request.get('/api/task');
        const task = resp2.body[0];
        expect(task.task_name).toBe('Breakfast');
    });
    test('Invalid PUT request for task (/api/task/1)', async () => {
        const resp = await request.put('/api/task/1').type('form').send({ddddd: 'malformed info'}).set('Accept', 'application/json');
        expect(resp.statusCode).toBe(400);
    });
    test('Valid PUT request for task desc (/api/task/1)', async () => {
        const resp = await request.put('/api/task/1').type('form').send({description: 'Cereal and some toast'}).set('Accept', 'application/json');
        expect(resp.statusCode).toBe(204);
        const resp2 = await request.get('/api/task');
        const task = resp2.body[0];
        expect(task.task_description).toBe('Cereal and some toast');
    });
    test('Valid PUT request for task labels (/api/task/1)', async () => {
        const resp = await request.put('/api/task/1').type('form').send({labels: 'morning_glory'}).set('Accept', 'application/json');
        expect(resp.statusCode).toBe(204);
        const resp2 = await request.get('/api/task');
        const task = resp2.body[0];
        expect(task.task_labels).toBe('morning_glory');
    });
});

describe('regular DELETE request testing', () => {
    let request = supertest(app);

    test('Valid DELETE request for task (/api/task/1)', async () => {
        const resp = await request.delete('/api/task/1')
        expect(resp.statusCode).toBe(200);
    });
    test('Invalid DELETE request for task (does not exist) (/api/task/2)', async () => {
        const resp = await request.delete('/api/task/2')
        expect(resp.statusCode).toBe(404);
    });
    test('DELETE request for section (/api/section/1)', async () => {
        const resp = await request.delete('/api/section/1')
        expect(resp.statusCode).toBe(200);
    });
    test('Invalid DELETE request for section (does not exist) (/api/section/2)', async () => {
        const resp = await request.delete('/api/section/2')
        expect(resp.statusCode).toBe(404);
    });
})