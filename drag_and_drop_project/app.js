var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus[ProjectStatus["active"] = 0] = "active";
    ProjectStatus[ProjectStatus["finished"] = 1] = "finished";
})(ProjectStatus || (ProjectStatus = {}));
var Project = /** @class */ (function () {
    function Project(id, title, description, people, status) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.people = people;
        this.status = status;
    }
    return Project;
}());
function validate(validatableInput) {
    var isValid = true;
    if (validatableInput.required) {
        isValid = isValid && validatableInput.value.toString().trim().length !== 0;
    }
    if (validatableInput.minLength != null &&
        typeof validatableInput.value === 'string') {
        isValid =
            isValid && validatableInput.value.length >= validatableInput.minLength;
    }
    if (validatableInput.maxLength != null &&
        typeof validatableInput.value === 'string') {
        isValid =
            isValid && validatableInput.value.length <= validatableInput.maxLength;
    }
    if (validatableInput.min != null &&
        typeof validatableInput.value === 'number') {
        isValid = isValid && validatableInput.value >= validatableInput.min;
    }
    if (validatableInput.max != null &&
        typeof validatableInput.value === 'number') {
        isValid = isValid && validatableInput.value <= validatableInput.max;
    }
    return isValid;
}
var ProjectState = /** @class */ (function () {
    function ProjectState() {
        this.listeners = [];
        this.projects = [];
    }
    ProjectState.getInstance = function () {
        if (this.instance) {
            return this.instance;
        }
        else {
            this.instance = new ProjectState;
            return this.instance;
        }
    };
    ProjectState.prototype.addListeners = function (listenerFn) {
        this.listeners.push(listenerFn);
    };
    ProjectState.prototype.addProjects = function (title, description, noOfPeople) {
        var newProject = new Project(Math.random().toString(), title, description, noOfPeople, ProjectStatus.active);
        this.projects.push(newProject);
        this.listnagain();
    };
    ProjectState.prototype.moveProject = function (prjId, newStatus) {
        var project = this.projects.find(function (prj) { return prj.id === prjId; });
        if (project && project.status != newStatus) {
            project.status = newStatus;
            this.listnagain();
        }
    };
    ProjectState.prototype.listnagain = function () {
        for (var _i = 0, _a = this.listeners; _i < _a.length; _i++) {
            var listenerFn = _a[_i];
            listenerFn(this.projects.slice());
        }
    };
    return ProjectState;
}());
var projectState = ProjectState.getInstance();
var ProjectItem = /** @class */ (function () {
    function ProjectItem(hostId, project) {
        this.project = project;
        this.targetTemplate = document.getElementById('single-project');
        this.hostElement = document.getElementById(hostId);
        var importNode = document.importNode(this.targetTemplate.content, true);
        this.element = importNode.firstElementChild;
        this.atach();
        this.configure();
        this.renderContent();
    }
    Object.defineProperty(ProjectItem.prototype, "persons", {
        get: function () {
            if (this.project.people == 1) {
                return '1 person ';
            }
            else {
                return this.project.people + " persons ";
            }
        },
        enumerable: true,
        configurable: true
    });
    ProjectItem.prototype.dragStartHandler = function (eve) {
        eve.dataTransfer.setData('text/plain', this.project.id);
        eve.dataTransfer.effectAllowed = 'move';
    };
    ProjectItem.prototype.dragEndHandler = function (event) {
        console.log("end");
    };
    ProjectItem.prototype.configure = function () {
        this.element.addEventListener('dragstart', this.dragStartHandler.bind(this));
        this.element.addEventListener('dragend', this.dragEndHandler.bind(this));
    };
    ProjectItem.prototype.renderContent = function () {
        this.element.querySelector('h2').textContent = this.project.title;
        this.element.querySelector('h3').textContent = this.project.description;
        this.element.querySelector('p').textContent = this.persons + ' assigned';
    };
    ProjectItem.prototype.atach = function () {
        this.hostElement.insertAdjacentElement('afterbegin', this.element);
    };
    return ProjectItem;
}());
var ProjectList = /** @class */ (function () {
    function ProjectList(type) {
        var _this = this;
        this.type = type;
        this.targetTemplate = document.getElementById('project-list');
        this.hostElement = document.getElementById('app');
        var importNode = document.importNode(this.targetTemplate.content, true);
        this.element = importNode.firstElementChild;
        this.element.id = this.type + "-projects";
        this.configure();
        projectState.addListeners(function (prjects) {
            var unListEl = document.getElementById(_this.type + "-project-list");
            unListEl.innerHTML = '';
            var renderProject = prjects.filter(function (prj) {
                if (_this.type == 'active') {
                    return ProjectStatus.active === prj.status;
                }
                else {
                    return ProjectStatus.finished === prj.status;
                }
            });
            for (var _i = 0, renderProject_1 = renderProject; _i < renderProject_1.length; _i++) {
                var prj = renderProject_1[_i];
                // const lists = document.createElement('li');
                // lists.textContent = prj.title;
                // unListEl.appendChild(lists);
                new ProjectItem(_this.element.querySelector('ul').id, prj);
            }
        });
        this.atach();
        this.renderContent();
    }
    ProjectList.prototype.dragOverHandler = function (event) {
        if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
            event.preventDefault();
            var listEl = this.element.querySelector('ul');
            listEl.classList.add('droppable');
        }
    };
    ;
    ProjectList.prototype.dropHandler = function (event) {
        var id = event.dataTransfer.getData('text/plain');
        projectState.moveProject(id, this.type === 'active' ? ProjectStatus.active : ProjectStatus.finished);
    };
    ;
    ProjectList.prototype.dragLeaveHandler = function (_2) {
        var listEl = this.element.querySelector('ul');
        listEl.classList.add('droppable');
    };
    ;
    ProjectList.prototype.configure = function () {
        this.element.addEventListener('dragover', this.dragOverHandler.bind(this));
        this.element.addEventListener('dragleave', this.dragLeaveHandler.bind(this));
        this.element.addEventListener('drop', this.dropHandler.bind(this));
    };
    ProjectList.prototype.renderContent = function () {
        var listId = this.type + "-project-list";
        this.element.querySelector('ul').id = listId;
        this.element.querySelector('h2').textContent = this.type.toUpperCase() + ' PROJECT';
    };
    ProjectList.prototype.atach = function () {
        this.hostElement.insertAdjacentElement('beforeend', this.element);
    };
    return ProjectList;
}());
var ProjectInput = /** @class */ (function () {
    function ProjectInput() {
        this.targetTemplate = document.getElementById('project-input');
        this.hostElement = document.getElementById('app');
        var importNode = document.importNode(this.targetTemplate.content, true);
        this.element = importNode.firstElementChild;
        this.element.id = 'user-input';
        this.titleElement = this.element.querySelector('#title');
        this.descriptionElement = this.element.querySelector('#description');
        this.peopleElement = this.element.querySelector('#people');
        this.inputData();
        this.atach();
    }
    ProjectInput.prototype.getInput = function () {
        var inputTitle = this.titleElement.value;
        var inputDescription = this.descriptionElement.value;
        var inputPeople = this.peopleElement.value;
        var titleValidate = {
            value: inputTitle,
            required: true
        };
        var descriptionValidate = {
            value: inputDescription,
            required: true,
            minLength: 6
        };
        var peopleValidate = {
            value: inputPeople.toString(),
            required: true,
            min: 1,
            max: 5
        };
        if (!validate(titleValidate) ||
            !validate(descriptionValidate) ||
            !validate(peopleValidate)) {
            alert('Invalid input, please try again!');
            return;
        }
        else {
            return [inputTitle, inputDescription, +inputPeople];
        }
    };
    ProjectInput.prototype.clearInput = function () {
        this.titleElement.value = '';
        this.descriptionElement.value = '';
        this.peopleElement.value = '';
    };
    ProjectInput.prototype.submit = function (eve) {
        eve.preventDefault();
        var myInput = this.getInput();
        if (Array.isArray(myInput)) {
            var title = myInput[0], desc = myInput[1], people = myInput[2];
            projectState.addProjects(title, desc, people);
            this.clearInput();
        }
    };
    ProjectInput.prototype.inputData = function () {
        this.element.addEventListener('submit', this.submit.bind(this));
    };
    ProjectInput.prototype.atach = function () {
        this.hostElement.insertAdjacentElement('afterbegin', this.element);
    };
    return ProjectInput;
}());
var input = new ProjectInput();
var activeProject = new ProjectList('active');
var finishedProject = new ProjectList('finished');
