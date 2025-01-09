export class Technology{
    name!: string
    logo!: string
}

export const Technologies: Record<string, Technology> = {
    JAVASCRIPT: {name:'javascript', logo: './assets/tecnologies/javascript.svg'},
    TYPESCRIPT:{name:'typescript', logo: './assets/tecnologies/typescript.svg'},
    ANGULAR:{name:'angular', logo: './assets/tecnologies/angular.svg'},
    NODE:{name:'node', logo: './assets/tecnologies/node.svg'},
    FIGMA:{name:'figma', logo: './assets/tecnologies/figma.svg'},
    PHP:{name:'php', logo: './assets/tecnologies/php.svg'},
    PYTHON:{name:'python', logo: './assets/tecnologies/python.svg'},
    POSTMAN:{name:'postman', logo: './assets/tecnologies/postman.svg'},
    MIRO:{name:'miro', logo: './assets/tecnologies/miro.svg'},
    JIRA:{name:'jira', logo: './assets/tecnologies/jira.svg'},
    MONDAY:{name:'monday', logo: './assets/tecnologies/monday.svg'},
    APACHE:{name:'apache', logo: './assets/tecnologies/apache.svg'},
    DOCKER:{name:'docker', logo: './assets/tecnologies/docker.svg'},
    TEAMS:{name:'teams', logo: './assets/tecnologies/teams.svg'}
}