import AppClient from './AppClient';

require('dotenv').config();

describe('it should run', () => {
    /** @type {AppClient} */
    let client;

    beforeAll(async () => {
        client = new AppClient();
        await client.login(process.env.TEST_EMAIL, process.env.TEST_PASS);
    });

    afterAll(() => client.logoff());
    
    it('retrieves a project', async () => {
        const pid = "test";
        const project = await client.getProject(pid);
        console.log(project);
        expect(project.projectID).toEqual(pid);
    });

    it('retrieves the next project', async () => {
        const pid = "test2";
        const project = await client.getNextProject();
        expect(project.projectID).toEqual(pid);
    });

    it('can query a user', async () => {
        const uid = "wCoQsArnE1VD6lsGQayAW2CVceT2";
        const user = await client.getUser(uid);
        expect(user.userID).toEqual(uid);
    });
})