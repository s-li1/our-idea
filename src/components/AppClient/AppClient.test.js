import { LEFT, RIGHT } from '../../constants/swipeActions';
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

    it('can query a project', async () => {
        const pid = "test";
        const project = await client.getProject(pid);
        expect(project.projectID).toEqual(pid);
    });

    it('can retrieve all projects this user is a part of', async () => {
        const pid = "test";
        const projects = await client.getMyProjects();
        expect(projects[0].projectID).toEqual(pid);
    });

    it('can create and then remove a user from a project', async () => {
        const project = {
            name: "MyProject",
            description: "Another test project",
            maxMembers: 4
        };
        const pid = await client.createProject(project);
        const projectIds = (await client.getMyProjects()).map(p => p.projectID);

        await client.removeUserFromProject(pid);
        const postProjectIds = (await client.getMyProjects()).map(p => p.projectID);

        expect(projectIds).toContain(pid);
        expect(postProjectIds).not.toContain(pid);
    });

    it('can swipe a project right', async () => {
        const pid = "test2";
        const timestamp = '2';

        await client.swipeProject(pid, RIGHT);

        const projectIds = (await client.getMyProjects()).map(p => p.projectID); 
        const user = await client.getUser(client.auth.currentUser.uid);

        await client.removeUserFromProject(pid);
        expect(projectIds).toContain(pid);
        expect(user.lastProjectTimestamp).toEqual(timestamp);
    });
})