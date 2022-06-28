
interface Dragable {
    dragStartHandler(eve:DragEvent) :void;
    dragEndHandler(eve:DragEvent) :void;
}

interface DragTargate {
    dragOverHandler(eve:DragEvent) :void;
    dropHandler(eve:DragEvent) :void;
    dragLeaveHandler(eve:DragEvent) :void;
}


enum ProjectStatus {active, finished}

class Project{
    constructor(
        public id:string,
        public title:string,
        public description:string,
        public people:number,
        public status:ProjectStatus,
    ) {}
}


type Listeners = (prjct : Project[]) => void;


interface Validatable {
    value: string;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
}

function validate(validatableInput: Validatable) {
    let isValid = true;
    if (validatableInput.required) {
        isValid = isValid && validatableInput.value.toString().trim().length !== 0;
    }
    if (
        validatableInput.minLength != null &&
        typeof validatableInput.value === 'string'
    ) {
        isValid =
            isValid && validatableInput.value.length >= validatableInput.minLength;
    }
    if (
        validatableInput.maxLength != null &&
        typeof validatableInput.value === 'string'
    ) {
        isValid =
            isValid && validatableInput.value.length <= validatableInput.maxLength;
    }
    if (
        validatableInput.min != null &&
        typeof validatableInput.value === 'number'
    ) {
        isValid = isValid && validatableInput.value >= validatableInput.min;
    }
    if (
        validatableInput.max != null &&
        typeof validatableInput.value === 'number'
    ) {
        isValid = isValid && validatableInput.value <= validatableInput.max;
    }
    return isValid;
}


class ProjectState {
    private listeners: Listeners[] =[];
    private projects: Project[] = [];
    static instance : ProjectState;

    private constructor () {}

    static getInstance() {
        if(this.instance) {
            return this.instance;
        }
        else {
            this.instance = new ProjectState;
            return this.instance;
        }
    }

    addListeners(listenerFn: Listeners) {
        this.listeners.push(listenerFn);
    }

    addProjects(title:string, description:string, noOfPeople:number) {
        const newProject = new Project(Math.random().toString(), title,description,noOfPeople, ProjectStatus.active);
        this.projects.push(newProject);
        this.listnagain();
    }

    moveProject(prjId:string, newStatus:ProjectStatus) {
        const project = this.projects.find((prj) => prj.id === prjId)
        if(project && project.status != newStatus) {
            project.status = newStatus;
            this.listnagain();
        }
    }

    private listnagain() {
        for(const listenerFn of this.listeners) {
            listenerFn(this.projects.slice());
        }
    }
}

const projectState = ProjectState.getInstance();

class ProjectItem implements Dragable{
    targetTemplate: HTMLTemplateElement;
    hostElement: HTMLElement;
    element: HTMLElement;
    private project: Project;

    get persons():string {
        if(this.project.people == 1) {
            return '1 person ';
        }
        else {
            return `${this.project.people} persons `;
        }
    }

    constructor (hostId: string, project: Project) {
        this.project = project;
        this.targetTemplate = document.getElementById('single-project')! as HTMLTemplateElement;
        this.hostElement = document.getElementById(hostId)! as HTMLElement;

        const importNode = document.importNode(this.targetTemplate.content, true);
        this.element = importNode.firstElementChild as HTMLElement;
        
        this.atach();
        this.configure();
        this.renderContent();
    }

    dragStartHandler(eve : DragEvent) {
        
        eve.dataTransfer!.setData('text/plain', this.project.id);
        eve.dataTransfer!.effectAllowed = 'move';        
    }

    dragEndHandler(event : DragEvent) {
        console.log("end");        
    }

    configure() {
        this.element.addEventListener('dragstart',this.dragStartHandler.bind(this));
        this.element.addEventListener('dragend',this.dragEndHandler.bind(this));

    }

    private renderContent() {
        this.element.querySelector('h2')!.textContent = this.project.title;
        this.element.querySelector('h3')!.textContent = this.project.description;
        this.element.querySelector('p')!.textContent = this.persons+' assigned';

    }

    private atach() {
        this.hostElement.insertAdjacentElement('afterbegin', this.element);
    }
}

class ProjectList implements DragTargate{
    targetTemplate: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLElement;

    constructor(private type: 'active' | 'finished') {

        this.targetTemplate = document.getElementById('project-list')! as HTMLTemplateElement;
        this.hostElement = document.getElementById('app')! as HTMLDivElement;

        const importNode = document.importNode(this.targetTemplate.content, true);
        this.element = importNode.firstElementChild as HTMLFormElement;
        this.element.id = `${this.type}-projects`;
        
        this.configure();
        projectState .addListeners((prjects:Project[]) => {
            const unListEl = document.getElementById(`${this.type}-project-list`) as HTMLUListElement;
            unListEl.innerHTML = '';
            const renderProject = prjects.filter((prj) => {
                if(this.type == 'active') {
                    return ProjectStatus.active === prj.status;
                }
                else {
                    return ProjectStatus.finished === prj.status;
                }
            })
            for(const prj of renderProject) {
                // const lists = document.createElement('li');
                // lists.textContent = prj.title;
                // unListEl.appendChild(lists);
                                
                new ProjectItem(this.element.querySelector('ul')!.id, prj);
            }

        })
        this.atach();
        this.renderContent();
    }

    dragOverHandler(event:DragEvent) :void {
        if(event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
            event.preventDefault();
            const listEl = this.element.querySelector('ul')!;
            listEl.classList.add('droppable');
        }
        
    };

    dropHandler(event:DragEvent) :void {        
        const id = event.dataTransfer!.getData('text/plain');
        projectState.moveProject(id, this.type === 'active' ? ProjectStatus.active : ProjectStatus.finished)
    };

    dragLeaveHandler(_2:DragEvent) :void{
        const listEl = this.element.querySelector('ul')!;
        listEl.classList.add('droppable');
    };

    configure() {
        this.element.addEventListener('dragover',this.dragOverHandler.bind(this));
        this.element.addEventListener('dragleave',this.dragLeaveHandler.bind(this));
        this.element.addEventListener('drop',this.dropHandler.bind(this));

    }

    private renderContent() {
        const listId = `${this.type}-project-list`
        this.element.querySelector('ul')!.id = listId;
        this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECT';
    }

    private atach() {
        this.hostElement.insertAdjacentElement('beforeend', this.element);
    }



}


class ProjectInput {

    targetTemplate: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLFormElement;
    titleElement: HTMLInputElement;
    descriptionElement: HTMLInputElement;
    peopleElement: HTMLInputElement;

    constructor() {

        this.targetTemplate = document.getElementById('project-input')! as HTMLTemplateElement;
        this.hostElement = document.getElementById('app')! as HTMLDivElement;

        const importNode = document.importNode(this.targetTemplate.content, true);
        this.element = importNode.firstElementChild as HTMLFormElement;
        this.element.id = 'user-input';

        this.titleElement = this.element.querySelector('#title')!;
        this.descriptionElement = this.element.querySelector('#description')!;
        this.peopleElement = this.element.querySelector('#people')!;



        this.inputData();
        this.atach();
    }

    private getInput(): [string, string, number] | void {
        const inputTitle = this.titleElement.value;
        const inputDescription = this.descriptionElement.value;
        const inputPeople = this.peopleElement.value;

        const titleValidate: Validatable = {
            value: inputTitle,
            required: true
        };
        const descriptionValidate: Validatable = {
            value: inputDescription,
            required: true,
            minLength: 6
        };
        const peopleValidate: Validatable = {
            value: inputPeople.toString(),
            required: true,
            min: 1,
            max: 5
        };

        if (
            !validate(titleValidate) ||
            !validate(descriptionValidate) ||
            !validate(peopleValidate)
        ) {
            alert('Invalid input, please try again!');
            return;
        } else {
            return [inputTitle, inputDescription, +inputPeople];
        }
    }

    private clearInput() {
        this.titleElement.value = '';
        this.descriptionElement.value = '';
        this.peopleElement.value = '';
    }



    private submit(eve: Event) {

        eve.preventDefault();
        const myInput = this.getInput();
        if (Array.isArray(myInput)) {
            const [title, desc, people] = myInput;
            projectState.addProjects(title, desc, people);           
            this.clearInput();
        }
    }

    private inputData() {
        this.element.addEventListener('submit', this.submit.bind(this))
    }

    private atach() {
        this.hostElement.insertAdjacentElement('afterbegin', this.element);
    }
}

const input = new ProjectInput();

const activeProject = new ProjectList('active');
const finishedProject = new ProjectList('finished');
