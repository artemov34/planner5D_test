import axios from 'axios';

export class ProjectService {
    getProjects(){
        return axios.get('api/projects');
    }
    
    getProject(hash: string){
        const timestamp = new Date().getTime();
        return axios.get(`/api/project/${hash}?{}&_=${timestamp}`).then(e => e.data);
    }
}