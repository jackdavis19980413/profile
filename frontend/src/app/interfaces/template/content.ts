export interface AboutMe {
    id: string              // (e.g.) about_me
    firstname:  string,
    lastname:   string,
    src:        string,     // image path   (e.g.)  assets/cards/android3.png
    typedtext:  string[]
}

export interface Card {
    id:         string,     // (e.g.)   android_platform
    title:      string,     // (e.g.)   Android Platform Developer
    alt:        string,     // (e.g.)   Android Platfrom
    src:        string,     // image path   (e.g.)  assets/cards/android3.png
    item:       string[]
}

export interface Skills {
    id: string          // (e.g.) about_me
    title:      string,     // (e.g.) MY SKILLS
    cards:      Card[]
}

export interface Container {
    position:   string,     // left or right
    we_date:    string,     // (e.g.) Sep 2023 - Now
    alt:        string,     // (e.g.) Volvo CE Logo
    src:        string,     // (e.g.) assets/timeline/volvo.png
    c_title:    string,
    c_subtitle: string,
}

export interface Timeline {
    id: string          // (e.g.) about_me
    title:      string      // (e.g.) WORK EXPERIENCE or EDUCATION
    containers: Container[]
}

export interface Project {
    id: string          // (e.g.) about_me
    title:      string,     // (e.g.) PROJECTS
    projects:   ProjectCard[]
}

export interface ProjectCard {
    title:      string,
    src:        string,
    description:    string
}

export interface Section {
    section: AboutMe | Skills | Timeline | Project
}

export interface Content {
    sections: Section[]
}
